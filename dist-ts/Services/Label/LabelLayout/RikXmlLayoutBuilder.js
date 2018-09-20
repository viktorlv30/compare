"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const xmldom_1 = require("xmldom");
const fs_1 = require("fs");
const AttributeFactory_1 = require("./Factories/AttributeFactory");
const E_LL_NODE_TYPE_1 = require("./Enums/E_LL_NODE_TYPE");
class RikXmlLayoutBuilder {
    constructor() {
        console.log(`[XML BUILDER] Creat builder...`);
    }
    SetLayoutTemplate(params) {
        this._layoutParams = params;
    }
    SetFieldsList(fields) {
        this._fieldsParams = fields;
    }
    CreateDocument(encoding) {
        console.log(`[XML BUILDER] Start creating new XML label layout => ....... ETST.FONU:`, this._layoutParams.FONU);
        const dom = new xmldom_1.DOMImplementation();
        this._document = dom.createDocument(null, `XmlLabel`, null);
        this._document.insertBefore(this._document.createProcessingInstruction('xml', `version="1.0" encoding="${encoding}"`), this._document.firstChild);
        let rootNode = this._document.documentElement;
        let layoutNode = this.GetLayoutXmlNode();
        let filedNodes = this.GetFields();
        rootNode.appendChild(layoutNode);
        filedNodes.forEach(field => {
            layoutNode.appendChild(field);
        });
        return this._document;
    }
    SaveDocument(path, document, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let file;
                if (document instanceof Object) {
                    file = this.GetLayoutAsText(document);
                }
                else if (typeof document === 'string') {
                    file = document;
                }
                console.log(`[XML BUILDER] Saving new label xlm layout to path: `, path);
                let fileEncoding = params && params.encoding ? params.encoding : 'utf8';
                let fileMode = params && params.mode ? params.mode : 0o644;
                yield new Promise((resolve, reject) => {
                    fs_1.writeFile(path, file, { encoding: fileEncoding, mode: fileMode }, (error) => {
                        if (error)
                            reject(error);
                        else
                            resolve();
                    });
                });
                return true;
            }
            catch (error) {
                console.warn(`[XML BUILDER][ERROR] Layout not saved!`, error);
                return false;
            }
        });
    }
    GetLayoutAsText(document) {
        let doc = document || this._document;
        const serializer = new xmldom_1.XMLSerializer();
        let text = serializer.serializeToString(doc);
        return text;
    }
    CreateXmlNode(name) {
        return this._document.createElement(name);
    }
    SetAttributesToNode(node, attributes) {
        attributes.forEach(attr => node.setAttribute(attr.name, attr.value));
        return node;
    }
    GetLayoutXmlNode() {
        let element = this.CreateXmlNode(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.LAYOUT);
        let abstractFactory = new AttributeFactory_1.AttributeFactory();
        let attributes = abstractFactory.GetAllAttributes(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.LAYOUT, this._layoutParams);
        element = this.SetAttributesToNode(element, attributes);
        return element;
    }
    GetFields() {
        let fieldNodes = [];
        let hasFieldAttributes = false;
        let hasAttrsAttributes = false;
        let hasDataAttributes = false;
        let factory = new AttributeFactory_1.AttributeFactory();
        this._fieldsParams.forEach(params => {
            let field = this.GetFieldXmlNode();
            let fieldAttributes = factory.GetAllAttributes(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.FIELD, params);
            this.SetAttributesToNode(field, fieldAttributes);
            let attrs = this.GetAttrsXmlNode();
            let attrsAttributes = factory.GetAllAttributes(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.ATTRS, params);
            this.SetAttributesToNode(attrs, attrsAttributes);
            let data = this.GetDataXmlNode();
            let dataAttributes = factory.GetAllAttributes(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.DATA, params);
            this.SetAttributesToNode(data, dataAttributes);
            if (fieldAttributes instanceof Array && fieldAttributes.length > 0) {
                hasFieldAttributes = true;
            }
            if (attrsAttributes instanceof Array && attrsAttributes.length > 0) {
                hasAttrsAttributes = true;
                field.appendChild(attrs);
            }
            if (dataAttributes instanceof Array && dataAttributes.length > 0) {
                hasDataAttributes = true;
                field.appendChild(data);
            }
            if (hasFieldAttributes || hasAttrsAttributes || hasDataAttributes) {
                fieldNodes.push(field);
            }
        });
        return fieldNodes;
    }
    GetFieldXmlNode() {
        return this.CreateXmlNode(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.FIELD);
    }
    GetAttrsXmlNode() {
        return this.CreateXmlNode(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.ATTRS);
    }
    GetDataXmlNode() {
        return this.CreateXmlNode(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.DATA);
    }
}
exports.RikXmlLayoutBuilder = RikXmlLayoutBuilder;
if (require.main === module) {
    main();
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const RFac = yield Promise.resolve().then(() => require('../../../Common/Repositories/RepositoryFactory'));
        const RikDB = yield Promise.resolve().then(() => require("rik-db"));
        const { join } = yield Promise.resolve().then(() => require('path'));
        console.time('create xml label layout');
        const factory = yield RFac.RepositoryFactory.GetInstance();
        factory.SetDbConfig({
            client: 'pg', connection: {
                host: '10.13.16.170',
                port: '5432',
                database: 'scale',
                user: 'scale',
                password: '111',
            }
        });
        const repo = yield (yield factory.GetRepository()).GetRikRepository();
        let plstFirstRow = yield RikDB.Plst.query().skipUndefined().select('PNUM').first();
        if (!plstFirstRow) {
            throw new Error('No articles in database');
        }
        else {
            console.log(`Found plu:`, plstFirstRow);
        }
        let { PNUM: pluGoodsNumber } = plstFirstRow;
        let article = (yield repo.tfzu(pluGoodsNumber || -1))[0];
        let esstRow = (yield repo.labelControl({ operator: RikDB.E_OPERATOR.EQUAL, parameter: { ECTR: article.ECTR } }))[0];
        let labelEtst = (yield repo.labelParameters({ operator: RikDB.E_OPERATOR.EQUAL, parameter: { ETNU: esstRow.ENU1 } }))[0];
        let labelLayoutFost = yield repo.labelFields({ operator: RikDB.E_OPERATOR.EQUAL, parameter: { FONU: labelEtst.FONU } });
        console.log(`ETST ROW: `, JSON.stringify(labelEtst));
        console.log(`FOST ROWS ARR: `, JSON.stringify(labelLayoutFost));
        let builder = new RikXmlLayoutBuilder();
        builder.SetLayoutTemplate(labelEtst);
        builder.SetFieldsList(labelLayoutFost);
        let xml = builder.CreateDocument('utf-8');
        let filePath = join(__dirname, `fake-label-layout-${labelEtst.FONU}.xml`);
        builder.SaveDocument(filePath);
        let newTemplate = builder.GetLayoutAsText();
        console.timeEnd('create xml label layout');
    });
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmlrWG1sTGF5b3V0QnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9SaWtYbWxMYXlvdXRCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxtQ0FBMEQ7QUFDMUQsMkJBQStCO0FBRy9CLG1FQUFnRTtBQUNoRSwyREFBd0Q7QUFReEQ7SUFLSTtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBTUQsaUJBQWlCLENBQUMsTUFBYTtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztJQUNoQyxDQUFDO0lBTUQsYUFBYSxDQUFDLE1BQWU7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQU9ELGNBQWMsQ0FBQyxRQUFnQjtRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLHlFQUF5RSxFQUFVLElBQUksQ0FBQyxhQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekgsTUFBTSxHQUFHLEdBQUcsSUFBSSwwQkFBaUIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLEtBQUssRUFBRSwyQkFBMkIsUUFBUSxHQUFHLENBQUMsRUFDekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQzVCLENBQUM7UUFFRixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN6QyxJQUFJLFVB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
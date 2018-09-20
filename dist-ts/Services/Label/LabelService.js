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
const assert = require("assert");
class LabelService {
    constructor() {
        let className = this.constructor.name;
        assert(!(LabelService._instance instanceof LabelService), `Instance ${className} already created.\nCall constructor directly is prohibited.\nPlease use Instance() method`);
        LabelService._instance = this;
    }
    static Instance() {
        return (LabelService._instance instanceof LabelService) ? LabelService._instance : new LabelService();
    }
    Start() {
        console.log(`[LABEL_SERVICE] Start Label Service`);
        this.ResetLabelOptions();
        this._labelDataBuilder.LoadHandlers();
        return Promise.resolve();
    }
    Stop(code) {
        console.log(`[LABEL_SERVICE] Stop Label Service with code ${code || 0}`);
        LabelService._instance = undefined;
        delete this._labelOptions;
        return Promise.resolve();
    }
    ServiceName() {
        return this.constructor.name.toUpperCase();
    }
    SetLabelOptions(options) {
        if (!this._labelOptions) {
            throw new Error('You should call Start() before use SetLabelOptions()');
        }
        Object.assign(this._labelOptions, options);
    }
    GetLabelOptions(filterFields) {
        if (!this._labelOptions) {
            throw new Error(`Label opts is undefined. You should Start() service before!`);
        }
        if (filterFields === undefined || filterFields === null) {
            return this._labelOptions;
        }
        let result = Object.create(null);
        if (filterFields !== undefined && filterFields !== null && filterFields instanceof Array) {
            filterFields.forEach((element) => {
                let propDescriptor = Object.getOwnPropertyDescriptor(this._labelOptions, element);
                if (propDescriptor) {
                    Object.assign(result, { [element]: propDescriptor.value });
                }
                else {
                    console.warn(`[WARNING][LABEL_SERVICE] Such key '${element}' doesn't exist in IDataForPrint options!`);
                }
            });
        }
        return result;
    }
    ResetLabelOptions() {
        this._labelOptions = Object.create(null);
    }
    set LabelDataBuilder(builder) {
        this._labelDataBuilder = builder;
    }
    get LabelDataBuilder() {
        return this._labelDataBuilder;
    }
    set LabelLayoutBuilder(builder) {
        this._labelLayoutBuilder = builder;
    }
    get LabelLayoutBuilder() {
        return this._labelLayoutBuilder;
    }
    GetReadyLabelData(filterFields) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._labelOptions) {
                throw new Error(`[${this.ServiceName()}] Can't get ready label data. You must set label options first!`);
            }
            let fieldsToShow = filterFields;
            if (!fieldsToShow) {
                fieldsToShow = Array.from(this.LabelDataBuilder.GetHandlersDictionary().values());
                if (!fieldsToShow) {
                    console.warn(`[WARNING] No registered handlers to get label data!`);
                    return Object.create(null);
                }
            }
            let dataBuilder = this.LabelDataBuilder.GetDataBuildMethod();
            let resultPromisesArray = [];
            const dataDictionary = this.LabelDataBuilder.GetHandlersDictionary();
            for (let field of fieldsToShow) {
                let reqSource = this.GetMapKeyByValue(dataDictionary, field);
                if (reqSource === null) {
                    continue;
                }
                let isCountedArticle = typeof this._labelOptions.quantity === 'number' && this._labelOptions.quantity > 0;
                let req = {
                    source: this._labelOptions[reqSource],
                    isCounted: isCountedArticle
                };
                let partRes = dataBuilder(req, [field]);
                if (partRes) {
                    resultPromisesArray.push(partRes);
                }
            }
            let promisesResults = yield Promise.all(resultPromisesArray);
            let result = Object.assign(Object.create(null), ...promisesResults);
            if (!result) {
                throw new Error(`[${this.ServiceName()}] Fail to build label data`);
            }
            return result;
        });
    }
    GetReadyLabelLayout(layoutOptions, layoutFields, encoding) {
        let enc = encoding || 'utf-8';
        this.LabelLayoutBuilder.SetLayoutTemplate(layoutOptions);
        this.LabelLayoutBuilder.SetFieldsList(layoutFields);
        let xml = this.LabelLayoutBuilder.CreateDocument(enc);
        let newTemplate = this.LabelLayoutBuilder.GetLayoutAsText();
        return newTemplate;
    }
    GetMapKeyByValue(map, searchValue) {
        let result = null;
        for (let [key, value] of map.entries()) {
            if (value === searchValue) {
                result = key;
            }
        }
        return result;
    }
}
exports.LabelService = LabelService;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.time('labelservice');
        const Layout = Promise.resolve().then(() => require('./LabelLayout/RikXmlLayoutBuilder'));
        const Director = Promise.resolve().then(() => require('./LabelData/LabelDataBuildDirector'));
        const Data = Promise.resolve().then(() => require('./LabelData/LabelDataBuilder'));
        const RFac = yield Promise.resolve().then(() => require('../../Common/Repositories/RepositoryFactory'));
        const RikDB = yield Promise.resolve().then(() => require("rik-db"));
        const { E_PLST_ECTR } = yield Promise.resolve().then(() => require('../../Enums/E_PLST_ECTR'));
        const { E_PLST_HALB } = yield Promise.resolve().then(() => require('../../Enums/E_PLST_HALB'));
        let labelService = LabelService.Instance();
        let xmlLayoutBuilder = new (yield Layout).RikXmlLayoutBuilder();
        let labelBuilder = new (yield Data).LabelDataBuilder();
        let labelDataDirector = new (yield Director).LabelDataBuildDirector(labelBuilder);
        labelService.LabelDataBuilder = labelDataDirector;
        labelService.LabelLayoutBuilder = xmlLayoutBuilder;
        labelService.Start();
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
        let plstFirstRow = yield RikDB.Plst.query().skipUndefined().select('PNUM').where('ECTR', '=', 23).first();
        if (!plstFirstRow) {
            throw new Error('No articles in database');
        }
        else {
            console.log(`Found plu:`, plstFirstRow);
        }
        let { PNUM: plu } = plstFirstRow;
        let tfzu = (yield repo.tfzu(plu))[0];
        let { GPR1, ECO1, PNUM, FZ_TFZU_1, FZ_TFZU_3, FZ_TFZU_4, FZ_TFZU_5, hba1, HALB, ECTR } = tfzu;
        labelService.SetLabelOptions({
            code_01: ECO1,
            pluNumber: PNUM,
            text_01: FZ_TFZU_1,
            text_03: FZ_TFZU_3,
            text_04: FZ_TFZU_4
        });
        labelService.SetLabelOptions({
            weight: 0.100,
            unitPrice: 985.10,
            price: 0.100 * 985.10,
        });
        let msInPeriod = HALB === E_PLST_HALB.FULL_DAYS
            ? 24 * 60 * 60 * 1000
            : HALB === E_PLST_HALB.HALF_DAYS
                ? 12 * 60 * 60 * 1000
                : 60 * 1000;
        let exDate = ECTR === E_PLST_ECTR.SLICED ? Date.now() + (hba1 || 0) * msInPeriod : Date.now();
        console.log(`Expiry date: `, new Date(exDate).toLocaleString());
        labelService.SetLabelOptions({
            date_02: exDate
        });
        let fieldList = [64, 147, 61, 149, 11, 151, 152, 28, 1, 31, 156, 5, 158, 7, 63, 161, 131];
        let labelData = yield labelService.GetReadyLabelData(fieldList);
        console.log(`LabelData: `, labelData);
        labelService.Stop();
        console.timeEnd('labelservice');
    });
}
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsaUNBQWlDO0FBV2pDO0lBU0k7UUFDSSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtRQUVyQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLFlBQVksWUFBWSxDQUFDLEVBQUUsWUFBWSxTQUFTLDJGQUEyRixDQUFDLENBQUM7UUFDNUssWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRO1FBQ1gsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxFQUFFLENBQUM7SUFDMUcsQ0FBQztJQUVELEtBQUs7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RDLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLENBQUMsSUFBYTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQWdELElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLFlBQVksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUMxQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBS0QsV0FBVztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQU1ELGVBQWUsQ0FBQyxPQUErQjtRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLHNEQUFzRCxDQUFDLENBQUM7U0FDM0U7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQVVELGVBQWUsQ0FBQyxZQUFzQztRQUVsRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDZEQUE2RCxDQUFDLENBQUM7U0FDbEY7UUFFRCxJQUFJLFlBQVksS0FBSyxTQUFTLElBQUksWUFBWSxLQUFLLElBQUksRUFBRTtZQUNyRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7UUFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWpDLElBQUksWUFBWSxLQUFLLFNBQVMsSUFBSSxZQUFZLEtBQUssSUFBSSxJQUFJLFlBQVksWUFBWSxLQUFLLEVBQUU7WUFDdEYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUM3QixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbEYsSUFBSSxjQUFjLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDOUQ7cUJBQU07b0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsT0FBTywyQ0FBMkMsQ0FBQyxDQUFDO2lCQUMxRztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJLGdCQUFnQixDQUFDLE9BQWdDO1FBQ2pELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDckMsQ0FBQztJQUNELElBQUksZ0JBQWdCO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO0lBQ2xDLENBQUM7SUFDRCxJQUFJLGtCQUFrQixDQUFDLE9BQTBCO1FBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxPQUFPLENBQUM7SUFDdkMsQ0FBQztJQUNELElBQUksa0JBQWtCO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLG1CQUFtQixDQUFDO0lBQ3BDLENBQUM7SUFFSyxpQkFBaUIsQ0FBQyxZQUFrQzs7WUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLGlFQUFpRSxDQUFDLENBQUM7YUFDNUc7WUFFRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDZixZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRixJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMscURBQXFELENBQUMsQ0FBQztvQkFDcEUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM5QjthQUNKO1lBRUQsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDN0QsSUFBSSxtQkFBbUIsR0FBMEIsRUFBRSxDQUFDO1lBQ3BELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ3JFLEtBQUssSUFBSSxLQUFLLElBQUksWUFBWSxFQUFFO2dCQUM1QixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7b0JBQ3BCLFNBQVM7aUJBQ1o7Z0JBRUQsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBQzFHLElBQUksR0FBRyxHQUFtQjtvQkFDdEIsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDO29CQUNyQyxTQUFTLEVBQUUsZ0JBQWdCO2lCQUM5QixDQUFDO2dCQUNGLElBQUksT0FBTyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLE9BQU8sRUFBRTtvQkFDVCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7WUFDRCxJQUFJLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3RCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztZQUVwRSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLDRCQUE0QixDQUFDLENBQUM7YUFDdkU7WUFDRCxPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO0tBQUE7SUFNRCxtQkFBbUIsQ0FBQyxhQUFvQixFQUFFLFlBQXFCLEVBQUUsUUFBaUI7UUFDOUUsSUFBSSxHQUFHLEdBQUcsUUFBUSxJQUFJLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1RCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0lBRU8sZ0JBQWdCLENBQU8sR0FBYyxFQUFFLFdBQWM7UUFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDcEMsSUFBSSxLQUFLLEtBQUssV0FBVyxFQUFFO2dCQUN2QixNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1NBQ0o7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0NBQ0o7QUFyS0Qsb0NBcUtDO0FBR0Q7O1FBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixNQUFNLE1BQU0sd0NBQVUsbUNBQW1DLEVBQUMsQ0FBQztRQUMzRCxNQUFNLFFBQVEsd0NBQVUsb0NBQW9DLEVBQUMsQ0FBQztRQUM5RCxNQUFNLElBQUksd0NBQVUsOEJBQThCLEVBQUMsQ0FBQztRQUNwRCxNQUFNLElBQUksR0FBRywyQ0FBYSw2Q0FBNkMsRUFBQyxDQUFDO1FBQ3pFLE1BQU0sS0FBSyxHQUFHLDJDQUFhLFFBQVEsRUFBQyxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRywyQ0FBYSx5QkFBeUIsRUFBQyxDQUFDO1FBQ2hFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRywyQ0FBYSx5QkFBeUIsRUFBQyxDQUFDO1FBRWhFLElBQUksWUFBWSxHQUFHLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDaEUsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2xGLFlBQVksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztRQUNsRCxZQUFZLENBQUMsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7UUFDbkQsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBR3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTNELE9BQU8sQ0FBQyxXQUFXLENBQUM7WUFDaEIsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7Z0JBQ3RCLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLEVBQUUsTUFBTTtnQkFDWixRQUFRLEVBQUUsT0FBTztnQkFDakIsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsUUFBUSxFQUFFLEtBQUs7YUFDbEI7U0FDSixDQUFDLENBQUM7UUFFSCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXRFLElBQUksWUFBWSxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDM0M7UUFDRCxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFFOUYsWUFBWSxDQUFDLGVBQWUsQ0FBQztZQUN6QixPQUFPLEVBQUUsSUFBSTtZQUNiLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7U0FDckIsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLGVBQWUsQ0FBQztZQUN6QixNQUFNLEVBQUUsS0FBSztZQUNiLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLEtBQUssRUFBRSxLQUFLLEdBQUcsTUFBTTtTQUN4QixDQUFDLENBQUM7UUFFSCxJQUFJLFVBQVUsR0FDVixJQUFJLEtBQUssV0FBVyxDQUFDLFNBQVM7WUFDMUIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7WUFDckIsQ0FBQyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsU0FBUztnQkFDNUIsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUk7Z0JBQ3JCLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUVoRSxZQUFZLENBQUMsZUFBZSxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxNQUFNO1NBQ2xCLENBQUMsQ0FBQztRQUdILElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzFGLElBQUksU0FBUyxHQUFHLE1BQU0sWUFBWSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBUXRDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FBQTtBQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7SUFDekIsSUFBSSxFQUFFLENBQUM7Q0FDViJ9
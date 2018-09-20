"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ListAttributes_1 = require("../ListAttributes/ListAttributes");
const ListAttributesFactory_1 = require("../ListAttributes/ListAttributesFactory");
const Font_1 = require("./ConcreteFactories/Font");
const Version_1 = require("./ConcreteFactories/Version");
const Build_1 = require("./ConcreteFactories/Build");
const Fontpage_1 = require("./ConcreteFactories/Fontpage");
const Distance_1 = require("./ConcreteFactories/Distance");
const Dpm_1 = require("./ConcreteFactories/Dpm");
const FormFeed_1 = require("./ConcreteFactories/FormFeed");
const BorderDistance_1 = require("./ConcreteFactories/BorderDistance");
const SizeX_1 = require("./ConcreteFactories/SizeX");
const SizeY_1 = require("./ConcreteFactories/SizeY");
const IdLayout_1 = require("./ConcreteFactories/IdLayout");
const PosX_1 = require("./ConcreteFactories/PosX");
const PosY_1 = require("./ConcreteFactories/PosY");
const LabelX_1 = require("./ConcreteFactories/LabelX");
const LabelY_1 = require("./ConcreteFactories/LabelY");
const DeviceType_1 = require("./ConcreteFactories/DeviceType");
const Reversion_1 = require("./ConcreteFactories/Reversion");
const Name_1 = require("./ConcreteFactories/Name");
const Schmucketikett_1 = require("./ConcreteFactories/Schmucketikett");
const ShowSchmucketi_1 = require("./ConcreteFactories/ShowSchmucketi");
const IdField_1 = require("./ConcreteFactories/IdField");
const TypeFactory_1 = require("./ConcreteFactories/TypeFactory");
const Width_1 = require("./ConcreteFactories/Width");
const Height_1 = require("./ConcreteFactories/Height");
const FixedValue_1 = require("./ConcreteFactories/FixedValue");
const AdjustH_1 = require("./ConcreteFactories/AdjustH");
const AdjustV_1 = require("./ConcreteFactories/AdjustV");
const Fill_1 = require("./ConcreteFactories/Fill");
const Frame_1 = require("./ConcreteFactories/Frame");
const Inset_1 = require("./ConcreteFactories/Inset");
const Size_1 = require("./ConcreteFactories/Size");
const Tclip_1 = require("./ConcreteFactories/Tclip");
const Bidi_1 = require("./ConcreteFactories/Bidi");
const Ueberl_1 = require("./ConcreteFactories/Ueberl");
const Unterl_1 = require("./ConcreteFactories/Unterl");
const Autoline_1 = require("./ConcreteFactories/Autoline");
const Leading_1 = require("./ConcreteFactories/Leading");
const EncText_1 = require("./ConcreteFactories/EncText");
const RotationLayout_1 = require("./ConcreteFactories/RotationLayout");
const E_LL_NODE_TYPE_1 = require("../Enums/E_LL_NODE_TYPE");
const RotationAttrs_1 = require("./ConcreteFactories/RotationAttrs");
const BarCodeAttributeCollection_1 = require("../ListAttributes/BarCodeAttributeCollection");
class AttributeFactory {
    constructor() {
        this._factoryStorage = new Map();
        this.Init();
    }
    RegisterConcreteFactory(key, factory) {
        this._factoryStorage.set(key, factory);
    }
    GetConcreteFactory(key) {
        return this._factoryStorage.get(key) || null;
    }
    GetAllAttributes(node, paramsObj) {
        let attributes = [];
        if (E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.DATA === node) {
            const ID_FOR_BARCODE = '31';
            const TYPE_FOR_BARCODE = '6';
            let idFieldFactory = this.GetConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ID_FIELD);
            let typeFactory = this.GetConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.TYPE);
            if (idFieldFactory && typeFactory) {
                let fieldId = idFieldFactory.GetValue(paramsObj);
                let fieldType = typeFactory.GetValue(paramsObj);
                if (ID_FOR_BARCODE === fieldId && TYPE_FOR_BARCODE === fieldType) {
                    let dataAttributes = BarCodeAttributeCollection_1.BarCodeAttributeCollection.GetAllAttributes();
                    return dataAttributes;
                }
            }
        }
        let listAttrFactory = new ListAttributesFactory_1.ListAttributesFactory().GetAttributesFactory(node);
        if (!listAttrFactory) {
            throw `Attributes factory for xml node [${node}] do not exist!`;
        }
        let listOfNodeAttributes = listAttrFactory.GetListAttributes();
        for (let attr in listOfNodeAttributes) {
            if (!listOfNodeAttributes.hasOwnProperty(attr))
                continue;
            let name = attr;
            let value = this.GetAttributeValue(listOfNodeAttributes[attr], paramsObj);
            if (value === undefined || value === null) {
                continue;
            }
            attributes.push({ name, value });
        }
        ;
        return attributes;
    }
    GetAttributeValue(attribute, params) {
        let valueFactory = this.GetConcreteFactory(attribute);
        if (!valueFactory) {
            throw `Factory for attribute [${attribute}] has not been registered!`;
        }
        let value = valueFactory.GetValue(params);
        return value;
    }
    Init() {
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.POS_X, new PosX_1.PosXFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.POS_Y, new PosY_1.PosYFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.VERSION, new Version_1.VersionFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.BUILD, new Build_1.BuildFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FONTPAGE, new Fontpage_1.FontpageFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.DISTANCE, new Distance_1.DistanceFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.DPM, new Dpm_1.DpmFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FORM_FEED, new FormFeed_1.FormFeedFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.BORDER_DISTANCE, new BorderDistance_1.BorderDistanceFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.SIZE_X, new SizeX_1.SizeXFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.SIZE_Y, new SizeY_1.SizeYFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ID_LAYOUT, new IdLayout_1.IdLayoutFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.LABEL_X, new LabelX_1.LabelXFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.LABEL_Y, new LabelY_1.LabelYFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.DEVICE_TYPE, new DeviceType_1.DeviceTypeFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.REVERSION, new Reversion_1.ReversionFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.NAME, new Name_1.NameFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.SCHMUCKETIKETT, new Schmucketikett_1.SchmucketikettFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.SHOW_SCHMUCKETI, new ShowSchmucketi_1.ShowSchmucketiFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ROTATION_LAYOUT, new RotationLayout_1.RotationLayoutFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ID_FIELD, new IdField_1.IdFieldFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.TYPE, new TypeFactory_1.TypeFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.WIDTH, new Width_1.WidthFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.HEIGHT, new Height_1.HeightFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FIXED_VALUE, new FixedValue_1.FixedValueFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ADJUST_H, new AdjustH_1.AdjustHFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ADJUST_V, new AdjustV_1.AdjustVFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FILL, new Fill_1.FillFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FONT, new Font_1.FontFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.FRAME, new Frame_1.FrameFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.INSET, new Inset_1.InsetFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ROTATION_ATTRS, new RotationAttrs_1.RotationAttrsFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.SIZE, new Size_1.SizeFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.TCLIP, new Tclip_1.TclipFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.UEBERL, new Ueberl_1.UeberlFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.UNTERL, new Unterl_1.UnterlFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.BIDI, new Bidi_1.BidiFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.AUTOLINE, new Autoline_1.AutolineFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.LEADING, new Leading_1.LeadingFactory());
        this.RegisterConcreteFactory(ListAttributes_1.E_LL_AVAILABLE_ATTRIBUTES.ENCTEXT, new EncText_1.EncTextFactory());
    }
}
exports.AttributeFactory = AttributeFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXR0cmlidXRlRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9GYWN0b3JpZXMvQXR0cmlidXRlRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLHFFQUE2RTtBQUM3RSxtRkFBZ0Y7QUFDaEYsbURBQXVEO0FBQ3ZELHlEQUE2RDtBQUM3RCxxREFBeUQ7QUFDekQsMkRBQStEO0FBQy9ELDJEQUErRDtBQUMvRCxpREFBcUQ7QUFDckQsMkRBQStEO0FBQy9ELHVFQUEyRTtBQUMzRSxxREFBeUQ7QUFDekQscURBQXlEO0FBQ3pELDJEQUErRDtBQUMvRCxtREFBdUQ7QUFDdkQsbURBQXVEO0FBQ3ZELHVEQUEyRDtBQUMzRCx1REFBMkQ7QUFDM0QsK0RBQW1FO0FBQ25FLDZEQUFpRTtBQUNqRSxtREFBdUQ7QUFDdkQsdUVBQTJFO0FBQzNFLHVFQUEyRTtBQUMzRSx5REFBNkQ7QUFDN0QsaUVBQThEO0FBQzlELHFEQUF5RDtBQUN6RCx1REFBMkQ7QUFDM0QsK0RBQW1FO0FBR25FLHlEQUE2RDtBQUM3RCx5REFBNkQ7QUFDN0QsbURBQXVEO0FBQ3ZELHFEQUF5RDtBQUN6RCxxREFBeUQ7QUFDekQsbURBQXVEO0FBQ3ZELHFEQUF5RDtBQUN6RCxtREFBdUQ7QUFDdkQsdURBQTJEO0FBQzNELHVEQUEyRDtBQUMzRCwyREFBK0Q7QUFDL0QseURBQTZEO0FBQzdELHlEQUE2RDtBQUM3RCx1RUFBMkU7QUFDM0UsNERBQXlEO0FBQ3pELHFFQUF5RTtBQUN6RSw2RkFBMEY7QUFFMUY7SUFFSTtRQUNJLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVELHVCQUF1QixDQUFDLEdBQThCLEVBQUUsT0FBd0I7UUFDNUUsSUFBSSxDQUFDLGVBQWUs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
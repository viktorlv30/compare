"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Weight_1 = require("./ConcreteHandlers/Weight");
const Price_1 = require("./ConcreteHandlers/Price");
const Barcode_1 = require("./ConcreteHandlers/Barcode");
const PriceLookUp_1 = require("./ConcreteHandlers/PriceLookUp");
const Text_1 = require("./ConcreteHandlers/Text");
const CommonHelper_1 = require("../../../Common/CommonHelper");
const Date_1 = require("./ConcreteHandlers/Date");
const Quantity_1 = require("./ConcreteHandlers/Quantity");
class LabelDataBuildDirector {
    constructor(dataBuilder) {
        this._dataBuilder = dataBuilder;
    }
    LoadHandlers() {
        this._handlersDictionary = new Map();
        this._handlersDictionary.set('weight', 1);
        this._handlersDictionary.set('unitPrice', 5);
        this._handlersDictionary.set('price', 7);
        this._handlersDictionary.set('tare', 9);
        this._handlersDictionary.set('pluNumber', 11);
        for (let i = 27, index = 1; i <= 29; i++, index++) {
            let syfix = CommonHelper_1.CommonHelper.PadStart(index.toString(), 2, '0');
            this._handlersDictionary.set(`date_${syfix}`, i);
        }
        this._handlersDictionary.set('code_01', 31);
        for (let i = 61, index = 1; i <= 70; i++, index++) {
            let syfix = CommonHelper_1.CommonHelper.PadStart(index.toString(), 2, '0');
            this._handlersDictionary.set(`text_${syfix}`, i);
        }
        this._handlersDictionary.set('quantity', 218);
        this._dataBuilder.Use(new Weight_1.WeightHandler(this.GetHandlersDictionary().get('weight') || -1, '\ue151'));
        this._dataBuilder.Use(new Price_1.PriceHandler(this.GetHandlersDictionary().get('unitPrice') || -1));
        this._dataBuilder.Use(new Price_1.PriceHandler(this.GetHandlersDictionary().get('price') || -1, '\ue129'));
        this._dataBuilder.Use(new Weight_1.WeightHandler(this.GetHandlersDictionary().get('tare') || -1));
        this._dataBuilder.Use(new PriceLookUp_1.PLUHandler(this.GetHandlersDictionary().get('pluNumber') || -1));
        this._dataBuilder.Use(new Date_1.DateHandler({ start: 27, finish: 29 }));
        this._dataBuilder.Use(new Barcode_1.BarcodeHandler(this.GetHandlersDictionary().get('code_01') || -1));
        this._dataBuilder.Use(new Text_1.TextHandler({ start: 61, finish: 70 }));
        this._dataBuilder.Use(new Quantity_1.QuantityHandler(this.GetHandlersDictionary().get('quantity') || -1));
    }
    GetDataBuildMethod() {
        return this._dataBuilder.BuildData.bind(this._dataBuilder);
    }
    GetHandlersDictionary() {
        return this._handlersDictionary;
    }
}
exports.LabelDataBuildDirector = LabelDataBuildDirector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxEYXRhQnVpbGREaXJlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvTGFiZWxEYXRhQnVpbGREaXJlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHNEQUEwRDtBQUMxRCxvREFBd0Q7QUFJeEQsd0RBQTREO0FBQzVELGdFQUE0RDtBQUM1RCxrREFBc0Q7QUFHdEQsK0RBQTREO0FBQzVELGtEQUFzRDtBQUN0RCwwREFBOEQ7QUFFOUQ7SUFJSSxZQUFZLFdBQThCO1FBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO0lBRXBDLENBQUM7SUFFRCxZQUFZO1FBRVIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFHLEtBQUssRUFBRSxFQUFFO1lBQ2hELElBQUksS0FBSyxHQUFHLDJCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUs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
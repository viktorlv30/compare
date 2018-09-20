"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LayoutAttributes_1 = require("./LayoutAttributes");
const FieldAttributes_1 = require("./FieldAttributes");
const AttrsAttributes_1 = require("./AttrsAttributes");
const DataAttributes_1 = require("./DataAttributes");
const E_LL_NODE_TYPE_1 = require("../Enums/E_LL_NODE_TYPE");
class ListAttributesFactory {
    constructor() {
        this._factories = new Map();
        this.Init();
    }
    Init() {
        this.SetFactory(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.LAYOUT, new LayoutAttributes_1.LayoutAttributesFactory());
        this.SetFactory(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.FIELD, new FieldAttributes_1.FieldAttributesFactory());
        this.SetFactory(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.ATTRS, new AttrsAttributes_1.AttrsAttributesFactory());
        this.SetFactory(E_LL_NODE_TYPE_1.E_LL_NODE_TYPE.DATA, new DataAttributes_1.DataAttributesFactory());
    }
    SetFactory(listName, factory) {
        this._factories.set(listName, factory);
    }
    GetAttributesFactory(listName) {
        return this._factories.get(listName) || null;
    }
}
exports.ListAttributesFactory = ListAttributesFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdEF0dHJpYnV0ZXNGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsTGF5b3V0L0xpc3RBdHRyaWJ1dGVzL0xpc3RBdHRyaWJ1dGVzRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlEQUE2RDtBQUM3RCx1REFBMkQ7QUFDM0QsdURBQTJEO0FBQzNELHFEQUF5RDtBQUN6RCw0REFBeUQ7QUFFekQ7SUFHSTtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUVPLElBQUk7UUFDUixJQUFJLENBQUMsVUFBVSxDQUFDLCtCQUFjLENBQUMsTUFBTSxFQUFFLElBQUksMENBQXVCLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxVQUFVLENBQUMsK0JBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSx3Q0FBc0IsRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQywrQkFBYyxDQUFDLEtBQUssRUFBRSxJQUFJLHdDQUFzQixFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLCtCQUFjLENBQUMsSUFBSSxFQUFFLElBQUksc0NBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTyxVQUFVLENBQUMsUUFBd0IsRUFBRSxPQUF3QjtRQUNqRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELG9CQUFvQixDQUFDLFFBQXdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDO0lBQ2pELENBQUM7Q0FFSjtBQXZCRCxzREF1QkMifQ==
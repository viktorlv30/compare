"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class LabelYFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let top = params.TOP || 0;
        let bott = params.BOTT || 0;
        let label = (bott - top) * this.PixelMultiplayer;
        return label.toString(10);
    }
}
exports.LabelYFactory = LabelYFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxZLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsTGF5b3V0L0ZhY3Rvcmllcy9Db25jcmV0ZUZhY3Rvcmllcy9MYWJlbFkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrREFBNEQ7QUFFNUQsbUJBQTJCLFNBQVEsbUNBQWdCO0lBQ3JDLElBQUk7SUFFZCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWE7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2pELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFYRCxzQ0FXQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class LabelXFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let right = params.RGHT || 0;
        let left = params.LEFT || 0;
        let label = (right - left) * this.PixelMultiplayer;
        return label.toString(10);
    }
}
exports.LabelXFactory = LabelXFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxYLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsTGF5b3V0L0ZhY3Rvcmllcy9Db25jcmV0ZUZhY3Rvcmllcy9MYWJlbFgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrREFBNEQ7QUFFNUQsbUJBQTJCLFNBQVEsbUNBQWdCO0lBQ3JDLElBQUk7SUFFZCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQWE7UUFDbEIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ25ELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFYRCxzQ0FXQyJ9
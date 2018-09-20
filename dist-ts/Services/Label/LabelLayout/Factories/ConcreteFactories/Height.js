"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class HeightFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let top = params.TOP || 0;
        let bott = params.BOTT || 0;
        let size = (bott - top) * this.PixelMultiplayer;
        return size.toString(10);
    }
}
exports.HeightFactory = HeightFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsTGF5b3V0L0ZhY3Rvcmllcy9Db25jcmV0ZUZhY3Rvcmllcy9IZWlnaHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwrREFBNEQ7QUFFNUQsbUJBQTJCLFNBQVEsbUNBQWdCO0lBQ3JDLElBQUk7SUFHZCxDQUFDO0lBR0QsUUFBUSxDQUFDLE1BQWE7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFDNUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0o7QUFiRCxzQ0FhQyJ9
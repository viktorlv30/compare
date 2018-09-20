"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class WidthFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let right = params.RGHT || 0;
        let left = params.LEFT || 0;
        let size = (right - left) * this.PixelMultiplayer;
        return size.toString(10);
    }
}
exports.WidthFactory = WidthFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxMYXlvdXQvRmFjdG9yaWVzL0NvbmNyZXRlRmFjdG9yaWVzL1dpZHRoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQTREO0FBRTVELGtCQUEwQixTQUFRLG1DQUFnQjtJQUNwQyxJQUFJO0lBR2QsQ0FBQztJQUdELFFBQVEsQ0FBQyxNQUFhO1FBQ2xCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNsRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBYkQsb0NBYUMifQ==
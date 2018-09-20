"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class SizeYFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let top = params.TOP || 0;
        let bott = params.BOTT || 0;
        let size = (bott - top) * this.PixelMultiplayer;
        return size.toString(10);
    }
}
exports.SizeYFactory = SizeYFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2l6ZVkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxMYXlvdXQvRmFjdG9yaWVzL0NvbmNyZXRlRmFjdG9yaWVzL1NpemVZLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQTREO0FBRTVELGtCQUEwQixTQUFRLG1DQUFnQjtJQUNwQyxJQUFJO0lBRWQsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFhO1FBQ2xCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzVCLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKO0FBWEQsb0NBV0MifQ==
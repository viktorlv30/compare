"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class IdLayoutFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        return (params.FONU || 0).toString(10);
    }
}
exports.IdLayoutFactory = IdLayoutFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWRMYXlvdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxMYXlvdXQvRmFjdG9yaWVzL0NvbmNyZXRlRmFjdG9yaWVzL0lkTGF5b3V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQTREO0FBRTVELHFCQUE2QixTQUFRLG1DQUFnQjtJQUN2QyxJQUFJO0lBRWQsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFhO1FBQ2xCLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMzQyxDQUFDO0NBQ0o7QUFSRCwwQ0FRQyJ9
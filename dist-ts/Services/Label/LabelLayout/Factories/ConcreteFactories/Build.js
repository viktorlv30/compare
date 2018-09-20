"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class BuildFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
        BuildFactory.counter = 0;
    }
    GetValue(params) {
        return (++BuildFactory.counter).toString(10);
    }
}
exports.BuildFactory = BuildFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxMYXlvdXQvRmFjdG9yaWVzL0NvbmNyZXRlRmFjdG9yaWVzL0J1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQTREO0FBRTVELGtCQUEwQixTQUFRLG1DQUFnQjtJQUVwQyxJQUFJO1FBQ1YsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFhO1FBQ2xCLE9BQU8sQ0FBQyxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBVkQsb0NBVUMifQ==
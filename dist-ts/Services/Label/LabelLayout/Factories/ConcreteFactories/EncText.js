"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class EncTextFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let text = params.FIXT;
        return text === undefined || text === '' ? null : text;
    }
}
exports.EncTextFactory = EncTextFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5jVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9GYWN0b3JpZXMvQ29uY3JldGVGYWN0b3JpZXMvRW5jVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtEQUE0RDtBQUc1RCxvQkFBNEIsU0FBUSxtQ0FBZ0I7SUFDdEMsSUFBSTtJQUdkLENBQUM7SUFHRCxRQUFRLENBQUMsTUFBYTtRQUNsQixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUMzRCxDQUFDO0NBQ0o7QUFYRCx3Q0FXQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class PosYFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        let result = (params.TOP || 0) * this.PixelMultiplayer;
        return result.toString(10);
    }
}
exports.PosYFactory = PosYFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zWS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9GYWN0b3JpZXMvQ29uY3JldGVGYWN0b3JpZXMvUG9zWS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUE0RDtBQUk1RCxpQkFBeUIsU0FBUSxtQ0FBZ0I7SUFDbkMsSUFBSTtJQUdkLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBcUI7UUFDMUIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUN2RCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUVKO0FBWEQsa0NBV0MifQ==
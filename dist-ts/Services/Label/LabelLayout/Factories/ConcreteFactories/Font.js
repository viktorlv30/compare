"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class FontFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        const fallbackFont = 55;
        const fontLimit = { from: 0, to: 34 };
        let resultFont = params.FONT || 0;
        if (resultFont < fontLimit.from || resultFont > fontLimit.to) {
            console.warn(`[WARN][FONT] FontFactory (LabelLayout) using fallbackFont: ${fallbackFont}`);
            resultFont = fallbackFont;
        }
        return resultFont.toString(10);
    }
}
exports.FontFactory = FontFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9GYWN0b3JpZXMvQ29uY3JldGVGYWN0b3JpZXMvRm9udC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtEQUE0RDtBQUU1RCxpQkFBeUIsU0FBUSxtQ0FBZ0I7SUFDbkMsSUFBSTtJQUVkLENBQUM7SUFFRCxRQUFRLENBQUMsTUFBYTtRQUVsQixNQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsTUFBTSxTQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsRUFBRSxFQUFFO1lBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsOERBQThELFlBQVksRUFBRSxDQUFDLENBQUM7WUFDM0YsVUFBVSxHQUFHLFlBQVksQ0FBQztTQUM3QjtRQUNELE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0o7QUFoQkQsa0NBZ0JDIn0=
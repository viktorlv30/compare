"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASimpleHandler_1 = require("../Abstract/ASimpleHandler");
class BarcodeHandler extends ASimpleHandler_1.ASimpleHandler {
    RequestHandler(request) {
        let resultPromise = new Promise((resolve, reject) => {
            try {
                let value = this.CalculateBarcode(request.source);
                let result = Object.assign(Object.create(null), { [this.CurrentField]: value });
                resolve(result);
            }
            catch (error) {
                reject(new Error('BarcodeHandler ' + error.message + error.stack));
            }
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[BARCODE] Handle field: ${this.CurrentField}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
    CalculateBarcode(code) {
        let odd = 0;
        let even = 0;
        let length = code.length;
        for (let i = 0; i < length; ++i) {
            let decAtI = Number.parseInt(code[length - i - 1], 10);
            if (!Number.isNaN(decAtI)) {
                if (i % 2 === 0) {
                    even += decAtI;
                }
                else {
                    odd += decAtI;
                }
            }
            else {
                return '';
            }
        }
        let control = (3 * even + odd) % 10;
        return code + ((control !== 0) ? (10 - control) : 0);
    }
}
exports.BarcodeHandler = BarcodeHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvQ29uY3JldGVIYW5kbGVycy9CYXJjb2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsK0RBQTREO0FBRzVELG9CQUE0QixTQUFRLCtCQUFjO0lBQzlDLGNBQWMsQ0FBQyxPQUF1QjtRQUVsQyxJQUFJLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM1RCxJQUFJO2dCQUNBLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xELElBQUksTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQzVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQ3RFO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsa0JBQWtCO1lBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQztZQUNGLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTztZQUNILEtBQUssRUFBRSxhQUFhO1lBRXBCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQUNOLENBQUM7SUFFTyxnQkFBZ0IsQ0FBQyxJQUFZO1FBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtZQUM3QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNiLElBQUksSUFBSSxNQUFNLENBQUM7aUJBQ2xCO3FCQUFNO29CQUNILEdBQUcsSUFBSSxNQUFNLENBQUM7aUJBQ2pCO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKO1FBQ0QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxPQUFPLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztDQUNKO0FBM0NELHdDQTJDQyJ9
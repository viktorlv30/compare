"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASimpleHandler_1 = require("../Abstract/ASimpleHandler");
class PriceHandler extends ASimpleHandler_1.ASimpleHandler {
    constructor(fieldNumber, symbol) {
        super(fieldNumber);
        symbol ? this._specSymbol = symbol : undefined;
    }
    RequestHandler(request) {
        let price = parseFloat(request.source).toFixed(2);
        if (this._specSymbol) {
            price += this._specSymbol;
        }
        const resultPromise = new Promise((resolve, reject) => {
            const result = Object.assign(Object.create(null), { [this.CurrentField]: price });
            resolve(result);
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[PRICE] Handle field: ${this.CurrentField}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.PriceHandler = PriceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxEYXRhL0NvbmNyZXRlSGFuZGxlcnMvUHJpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSwrREFBNEQ7QUFHNUQsa0JBQTBCLFNBQVEsK0JBQWM7SUFFNUMsWUFBWSxXQUFtQixFQUFFLE1BQWU7UUFDNUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNuRCxDQUFDO0lBQ0QsY0FBYyxDQUFDLE9BQXVCO1FBRWxDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNsQixLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUM3QjtRQUNELE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzlELE1BQU0sTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDOUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQjtZQUNuQixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUM7WUFDRixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hCLE9BQU87WUFDSCxLQUFLLEVBQUUsYUFBYTtZQUVwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFDTixDQUFDO0NBQ0o7QUEzQkQsb0NBMkJDIn0=
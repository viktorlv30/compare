"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASimpleHandler_1 = require("../Abstract/ASimpleHandler");
class QuantityHandler extends ASimpleHandler_1.ASimpleHandler {
    RequestHandler(request) {
        const resultPromise = new Promise((resolve, reject) => {
            try {
                const quantity = parseInt(request.source, 10);
                if (isNaN(quantity)) {
                    reject(new Error(`[Quantity] Fail to handle quantity. Source isn't correct integer number: ${request.source}`));
                }
                const result = Object.assign(Object.create(null), { [this.CurrentField]: quantity.toFixed(3) });
                resolve(result);
            }
            catch (error) {
                const handlerError = new Error(`[Quantity] Fail to handle Quantity. ${error.message}`);
                handlerError.stack = error.stack;
                reject(handlerError);
            }
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[QUANTITY] Handle field: ${this.CurrentField}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.QuantityHandler = QuantityHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVhbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxEYXRhL0NvbmNyZXRlSGFuZGxlcnMvUXVhbnRpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSwrREFBNEQ7QUFHNUQscUJBQTZCLFNBQVEsK0JBQWM7SUFDL0MsY0FBYyxDQUFDLE9BQXVCO1FBRWxDLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzlELElBQUk7Z0JBQ0EsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzlDLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNqQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsNEVBQTRFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ25IO2dCQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixNQUFNLFlBQVksR0FBRyxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLFlBQVksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDakMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsa0JBQWtCO1lBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xGLENBQUMsQ0FBQztZQUNGLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTztZQUNILEtBQUssRUFBRSxhQUFhO1lBRXBCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQTVCRCwwQ0E0QkMifQ==
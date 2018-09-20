"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASimpleHandler_1 = require("../Abstract/ASimpleHandler");
class WeightHandler extends ASimpleHandler_1.ASimpleHandler {
    constructor(fieldNumber, symbol) {
        super(fieldNumber);
        symbol ? this._specSymbol = symbol : undefined;
    }
    RequestHandler(request) {
        const resultPromise = new Promise((resolve, reject) => {
            try {
                const weight = parseFloat(request.source);
                const isCountedArticle = request.isCounted;
                if (isNaN(weight)) {
                    reject(new Error(`[Weight/Tare Handler] Fail to handle weight. Source isn't correct float number: ${request.source}`));
                }
                let weightResult = '';
                if (isCountedArticle) {
                    weightResult = weight.toFixed(0);
                }
                else {
                    weightResult = weight.toFixed(3);
                    if (this._specSymbol) {
                        weightResult += this._specSymbol;
                    }
                }
                const result = Object.assign(Object.create(null), { [this.CurrentField]: weightResult });
                resolve(result);
            }
            catch (error) {
                let handlerError = new Error(`[Weight/Tare Handler] Fail to handle weight. ${error.message}`);
                handlerError.stack = error.stack;
                reject(handlerError);
            }
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[WEIGHT/TARE] Handle field: ${this.CurrentField}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.WeightHandler = WeightHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2VpZ2h0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhYmVsL0xhYmVsRGF0YS9Db25jcmV0ZUhhbmRsZXJzL1dlaWdodC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLCtEQUE0RDtBQUc1RCxtQkFBMkIsU0FBUSwrQkFBYztJQUU3QyxZQUFZLFdBQW1CLEVBQUUsTUFBZTtRQUM1QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ25ELENBQUM7SUFDRCxjQUFjLENBQUMsT0FBdUI7UUFFbEMsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUQsSUFBSTtnQkFDQSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7Z0JBRTNDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNmLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxtRkFBbUYsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDMUg7Z0JBRUQsSUFBSSxZQUFZLEdBQVcsRUFBRSxDQUFDO2dCQUM5QixJQUFJLGdCQUFnQixFQUFFO29CQUNsQixZQUFZLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDcEM7cUJBQU07b0JBQ0gsWUFBWSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDbEIsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUM7cUJBQ3BDO2lCQUNKO2dCQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNuQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLElBQUksWUFBWSxHQUFHLElBQUksS0FBSyxDQUFDLGdEQUFnRCxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztnQkFDOUYsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxrQkFBa0I7WUFDbkIsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckYsQ0FBQyxDQUFDO1lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQixPQUFPO1lBQ0gsS0FBSyxFQUFFLGFBQWE7WUFFcEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBOUNELHNDQThDQyJ9
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASimpleHandler_1 = require("../Abstract/ASimpleHandler");
class PLUHandler extends ASimpleHandler_1.ASimpleHandler {
    RequestHandler(request) {
        let resultPromise = new Promise((resolve, reject) => {
            let value = '' + request.source;
            let result = Object.assign(Object.create(null), { [this.CurrentField]: value });
            resolve(result);
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[PLU] Price look-up Handle field: ${this.CurrentField}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.PLUHandler = PLUHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpY2VMb29rVXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxEYXRhL0NvbmNyZXRlSGFuZGxlcnMvUHJpY2VMb29rVXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSwrREFBNEQ7QUFFNUQsZ0JBQXdCLFNBQVEsK0JBQWM7SUFDMUMsY0FBYyxDQUFDLE9BQXVCO1FBRWxDLElBQUksYUFBYSxHQUFHLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzVELElBQUksS0FBSyxHQUFHLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ2hDLElBQUksTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDNUYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQjtZQUNuQixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzRixDQUFDLENBQUM7WUFDRixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2hCLE9BQU87WUFDSCxLQUFLLEVBQUUsYUFBYTtZQUVwQixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFuQkQsZ0NBbUJDIn0=
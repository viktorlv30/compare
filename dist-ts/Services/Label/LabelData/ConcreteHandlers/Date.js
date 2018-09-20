"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ARangeHandler_1 = require("../Abstract/ARangeHandler");
const CommonHelper_1 = require("../../../../Common/CommonHelper");
class DateHandler extends ARangeHandler_1.ARangeHandler {
    RequestHandler(request) {
        const fieldName = this.CurrentField;
        const resultPromise = new Promise((resolve, reject) => {
            const value = new Date(request.source);
            const dateString = [
                CommonHelper_1.CommonHelper.PadStart(value.getDate().toString(10), 2, '0'),
                CommonHelper_1.CommonHelper.PadStart((value.getMonth() + 1).toString(10), 2, '0'),
                CommonHelper_1.CommonHelper.PadStart(value.getFullYear().toString(10), 4, '0')
            ].join('.');
            const timeString = [
                CommonHelper_1.CommonHelper.PadStart(value.getHours().toString(10), 2, '0'),
                CommonHelper_1.CommonHelper.PadStart(value.getMinutes().toString(10), 2, '0'),
            ].join(':');
            const result = Object.assign(Object.create(null), { [fieldName]: `${dateString}\u231a${timeString}` });
            resolve(result);
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[DATE] Handle field: ${fieldName}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.DateHandler = DateHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvQ29uY3JldGVIYW5kbGVycy9EYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsNkRBQTBEO0FBRTFELGtFQUErRDtBQUUvRCxpQkFBeUIsU0FBUSw2QkFBYTtJQUMxQyxjQUFjLENBQUMsT0FBdUI7UUFDbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQyxNQUFNLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM5RCxNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsTUFBTSxVQUFVLEdBQUc7Z0JBQ2YsMkJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUMzRCwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFDbEUsMkJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2FBQ2xFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ1osTUFBTSxVQUFVLEdBQUc7Z0JBQ2YsMkJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDO2dCQUM1RCwyQkFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7YUFDakUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWixNQUFNLE1BQU0sR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxTQUFTLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNuSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsa0JBQWtCO1lBQ25CLENBQUMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDO1lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNoQixPQUFPO1lBQ0gsS0FBSyxFQUFFLGFBQWE7WUFFcEIsSUFBSSxFQUFFLElBQUk7U0FDYixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNUJELGtDQTRCQyJ9
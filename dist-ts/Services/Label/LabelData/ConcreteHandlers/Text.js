"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ARangeHandler_1 = require("../Abstract/ARangeHandler");
class TextHandler extends ARangeHandler_1.ARangeHandler {
    RequestHandler(request) {
        const fieldName = this.CurrentField;
        const resultPromise = new Promise((resolve, reject) => {
            const result = Object.assign(Object.create(null), { [fieldName]: (request.source !== null && request.source !== undefined) ? request.source.toString() : '' });
            resolve(result);
        });
        this.IsShowHandlerTrace
            ? resultPromise.then(data => {
                console.log(`[TEXT] Handle field: ${fieldName}`, `result:`, data);
            })
            : undefined;
        return {
            value: resultPromise,
            done: true
        };
    }
}
exports.TextHandler = TextHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvQ29uY3JldGVIYW5kbGVycy9UZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBS0EsNkRBQTBEO0FBRzFELGlCQUF5QixTQUFRLDZCQUFhO0lBQzFDLGNBQWMsQ0FBQyxPQUF1QjtRQUNsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBRXBDLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxDQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzlELE1BQU0sTUFBTSxHQUFlLE1BQU0sQ0FBQyxNQUFNLENBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQ25CLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUM5RyxDQUFDO1lBQ0YsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQjtZQUNuQixDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RFLENBQUMsQ0FBQztZQUNGLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEIsT0FBTztZQUNILEtBQUssRUFBRSxhQUFhO1lBRXBCLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQXRCRCxrQ0FzQkMifQ==
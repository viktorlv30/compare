"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RequestError_1 = require("../Errors/RequestError");
class SocketResponse {
    constructor(cookie, statusCode, statusText, data) {
        if (!(typeof statusCode === 'number' && statusCode > 0)) {
            throw new TypeError('Instance of positive number expected as statusCode');
        }
        if (!(typeof statusText === 'string')) {
            throw new TypeError('Instance of string expected as statusText');
        }
        this.statusCode = statusCode;
        this.statusText = statusText;
        this.data = data;
        this.cookie = cookie;
        if (statusCode === 404) {
        }
    }
    static FromData(cookie, value) {
        if (value instanceof SocketResponse) {
            value.cookie = cookie;
            return value;
        }
        else {
            return new SocketResponse(cookie, 200, 'OK', value);
        }
    }
    static FromError(cookie, error) {
        if (error instanceof RequestError_1.RequestError) {
            return new SocketResponse(cookie, error.statusCode, error.name, { detail: error.message });
        }
        else if (error instanceof Error) {
            return new SocketResponse(cookie, 500, error.name, { detail: error.message });
        }
        else {
            return new SocketResponse(cookie, 500, 'InternalSocketError', { detail: error });
        }
    }
    toString() {
        return `${this.statusCode} ${this.statusText}`;
    }
    toJSON() {
        return {
            statusCode: this.statusCode,
            statusText: this.statusText,
            data: this.data,
            cookie: this.cookie
        };
    }
}
exports.SocketResponse = SocketResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ja2V0UmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMtdHMvQ29tbW9uL1NvY2tldFJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEseURBQXNEO0FBRXREO0lBTUksWUFBWSxNQUFxQixFQUFFLFVBQWtCLEVBQUUsVUFBa0IsRUFBRSxJQUFTO1FBQ2hGLElBQUksQ0FBQyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDckQsTUFBTSxJQUFJLFNBQVMsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1NBQzdFO1FBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxVQUFVLEtBQUssUUFBUSxDQUFDLEVBQUU7WUFDbkMsTUFBTSxJQUFJLFNBQVMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFO1NBR3ZCO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBcUIsRUFBRSxLQUFVO1FBQzdDLElBQUksS0FBSyxZQUFZLGNBQWMsRUFBRTtZQUNqQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN0QixPQUFPLEtBQUssQ0FBQztTQUNoQjthQUFNO1lBQ0gsT0FBTyxJQUFJLGNBQWMsQ0FDckIsTUFBTSxFQUNOLEdBQUcsRUFDSCxJQUFJLEVBQ0osS0FBSyxDQUNSLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQXFCLEVBQUUsS0FBdUM7UUFDM0UsSUFBSSxLQUFLLFlBQVksMkJBQVksRUFBRTtZQUMvQixPQUFPLElBQUksY0FBYyxDQUNyQixNQUFNLEVBQ04sS0FBSyxDQUFDLFVBQVUsRUFDaEIsS0FBSyxDQUFDLElBQUksRUFDVixFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQzVCLENBQUM7U0FDTDthQUFNLElBQUksS0FBSyxZQUFZLEtBQUssRUFBRTtZQUMvQixPQUFPLElBQUksY0FBYyxDQUNyQixNQUFNLEVBQ04sR0FBRyxFQUNILEtBQUssQ0FBQyxJQUFJLEVBQ1YsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUM1QixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sSUFBSSxjQUFjLENBQ3JCLE1BQU0sRUFDTixHQUFHLEVBQ0gscUJBQXFCLEVBQ3JCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUNwQixDQUFDO1NBQ0w7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU87WUFDSCxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtTQUN0QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBM0VELHdDQTJFQyJ9
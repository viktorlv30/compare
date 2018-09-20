"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestError extends Error {
    constructor(message, code, name) {
        let _message = typeof message === 'string' ? message : 'Invalid request';
        let _name = typeof name === 'string' ? name : 'RequestError';
        let _code = typeof code === 'number' ? code : 404;
        super(_message);
        this.name = _name;
        this.statusCode = _code;
    }
    toString() {
        return `${this.name}[${this.statusCode}]: ${this.message}`;
    }
    toJSON() {
        return {
            message: this.message,
            name: this.name,
            statusCode: this.statusCode
        };
    }
}
exports.RequestError = RequestError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdEVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjLXRzL0Vycm9ycy9SZXF1ZXN0RXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxrQkFBMEIsU0FBUSxLQUFLO0lBS25DLFlBQVksT0FBZSxFQUFFLElBQVksRUFBRSxJQUFZO1FBQ25ELElBQUksUUFBUSxHQUFHLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztRQUN6RSxJQUFJLEtBQUssR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO1FBQzdELElBQUksS0FBSyxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDbEQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzVCLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsTUFBTSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0QsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUM5QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBekJELG9DQXlCQyJ9
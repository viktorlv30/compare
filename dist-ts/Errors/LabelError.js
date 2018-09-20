"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LabelError extends Error {
    constructor(reason, nextActionSuggestion) {
        let message = `Reason: ${reason}, suggestion: ${nextActionSuggestion}`;
        super(message);
        this.Reason = reason;
        this.Suggestion = nextActionSuggestion;
        this.name = this.constructor.name;
    }
    get Message() {
        return super.message;
    }
}
exports.LabelError = LabelError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxFcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9FcnJvcnMvTGFiZWxFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU9BLGdCQUF3QixTQUFRLEtBQUs7SUFHakMsWUFBWSxNQUFjLEVBQUUsb0JBQTRCO1FBQ3BELElBQUksT0FBTyxHQUFHLFdBQVcsTUFBTSxpQkFBaUIsb0JBQW9CLEVBQUUsQ0FBQztRQUN2RSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDO1FBRXZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELElBQUksT0FBTztRQUNQLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQztJQUN6QixDQUFDO0NBQ0o7QUFmRCxnQ0FlQyJ9
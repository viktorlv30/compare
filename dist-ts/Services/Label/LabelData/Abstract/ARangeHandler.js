"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AHandler_1 = require("./AHandler");
class ARangeHandler extends AHandler_1.AHandler {
    constructor(params) {
        super();
        let { start: startField, finish: finishField } = params;
        this._startField = startField;
        this._finishField = finishField;
    }
    get StartField() {
        return this._startField;
    }
    get FinishField() {
        return this._finishField;
    }
    get CurrentField() {
        return this._currentField;
    }
    set CurrentField(value) {
        this._currentField = value;
    }
    Handle(request, fieldName) {
        if (this.StartField <= fieldName && this.FinishField >= fieldName) {
            this.CurrentField = fieldName;
            return this.RequestHandler(request);
        }
        else {
            return {
                value: null,
                done: false
            };
        }
    }
}
exports.ARangeHandler = ARangeHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVJhbmdlSGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvQWJzdHJhY3QvQVJhbmdlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHlDQUFzQztBQU90QyxtQkFBb0MsU0FBUSxtQkFBUTtJQUloRCxZQUFZLE1BQXlCO1FBQ2pDLEtBQUssRUFBRSxDQUFDO1FBQ1IsSUFBSSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxZQUFZLENBQUMsS0FBd0I7UUFDckMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUF1QixFQUFFLFNBQTRCO1FBQ3hELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7WUFDOUIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFFSCxPQUFPO2dCQUNILEtBQUssRUFBRSxJQUFJO2dCQUNYLElBQUksRUFBRSxLQUFLO2FBQ2QsQ0FBQTtTQUNKO0lBQ0wsQ0FBQztDQVFKO0FBNUNELHNDQTRDQyJ9
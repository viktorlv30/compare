"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainFormat {
    constructor() {
        this._chain = [];
    }
    addDelegate(format) {
        const index = this._chain.findIndex((value) => value === format);
        if (index < 0) {
            this._chain.push(format);
        }
    }
    removeDelegate(format) {
        const index = this._chain.findIndex((value) => value === format);
        if (index >= 0) {
            this._chain.splice(index, 1);
        }
    }
    init(fullString) {
        for (let fmt of this._chain) {
            fmt.init(fullString);
        }
    }
    replace(match, replacer, offset, fullString) {
        for (let fmt of this._chain) {
            const value = fmt.replace(match, replacer, offset, fullString);
            if (value !== undefined) {
                return value;
            }
        }
        return undefined;
    }
}
exports.ChainFormat = ChainFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW4uZm9ybWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1V0aWwvZm9ybWF0L2NoYWluLmZvcm1hdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBR0k7UUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sV0FBVyxDQUFvQixNQUFlO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRU0sY0FBYyxDQUFvQixNQUFlO1FBQ3BELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDakUsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQztJQUVNLElBQUksQ0FBb0IsVUFBa0I7UUFDN0MsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDeEI7SUFDTCxDQUFDO0lBRU0sT0FBTyxDQUFvQixLQUFhLEVBQUUsUUFBZ0IsRUFBRSxNQUFjLEVBQUUsVUFBa0I7UUFDakcsS0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ3pCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDL0QsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNoQjtTQUNKO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztDQUNKO0FBcENELGtDQW9DQyJ9
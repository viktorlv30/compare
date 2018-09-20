"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keyboard_1 = require("./keyboard");
const mouse_1 = require("./mouse");
const window_1 = require("./window");
let _processor = null;
class ChainCommandProcessor {
    static get Instance() {
        return _processor || new ChainCommandProcessor();
    }
    constructor() {
        if (_processor !== null) {
            throw new Error('Invalid usage: singleton');
        }
        _processor = this;
        this._chain = [];
        this.buildArgs = this.buildArgs.bind(this);
    }
    addProcessor(processor) {
        this._chain.push(processor);
    }
    buildArgs(command) {
        for (let processor of this._chain) {
            const result = processor.buildArgs(command);
            if (result !== undefined) {
                return result;
            }
        }
        throw new Error(`Unsupported command ${JSON.stringify(command.code)}`);
    }
}
exports.ChainCommandProcessor = ChainCommandProcessor;
ChainCommandProcessor.Instance.addProcessor(new keyboard_1.KeyCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new keyboard_1.KeyUpCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new keyboard_1.KeyDownCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new keyboard_1.TypeCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.GetMouseLocationCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseDownCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseUpCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.ClickCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseMovePolarCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseMoveRectangularCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseMoveRelativePolarCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new mouse_1.MouseMoveRelativeRectangularCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new window_1.SyncAbleWindowCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new window_1.ImmediateWindowCommand());
ChainCommandProcessor.Instance.addProcessor(new window_1.WindowMoveCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new window_1.WindowResizeCommandProcessor());
ChainCommandProcessor.Instance.addProcessor(new window_1.WindowSearchCommandProcessor());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMtdHMvVXRpbC94LnV0aWwveC5kby50b29sLmNvbW1hbmRzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EseUNBT29CO0FBQ3BCLG1DQWVpQjtBQUVqQixxQ0FXa0I7QUFxQmxCLElBQUksVUFBVSxHQUFpQyxJQUFJLENBQUM7QUFFcEQ7SUFHVyxNQUFNLEtBQUssUUFBUTtRQUN0QixPQUFPLFVBQVUsSUFBSSxJQUFJLHFCQUFxQixFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVEO1FBQ0ksSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztTQUMvQztRQUNELFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sWUFBWSxDQUE4QixTQUE0QjtRQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsU0FBUyxDQUE4QixPQUF3QjtRQUMzRCxLQUFLLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDL0IsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQ3RCLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO1NBQ0o7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztDQUNKO0FBN0JELHNEQTZCQztBQUVELHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSw4QkFBbUIsRUFBRSxDQUFDLENBQUM7QUFDdkUscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLGdDQUFxQixFQUFFLENBQUMsQ0FBQztBQUN6RSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksa0NBQXVCLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSwrQkFBb0IsRUFBRSxDQUFDLENBQUM7QUFFeEUscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLHdDQUFnQyxFQUFFLENBQUMsQ0FBQztBQUVwRixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksaUNBQXlCLEVBQUUsQ0FBQyxDQUFDO0FBQzdFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSwrQkFBdUIsRUFBRSxDQUFDLENBQUM7QUFDM0UscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLDZCQUFxQixFQUFFLENBQUMsQ0FBQztBQUV6RSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksc0NBQThCLEVBQUUsQ0FBQyxDQUFDO0FBQ2xGLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSw0Q0FBb0MsRUFBRSxDQUFDLENBQUM7QUFDeEYscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLDhDQUFzQyxFQUFFLENBQUMsQ0FBQztBQUMxRixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksb0RBQTRDLEVBQUUsQ0FBQyxDQUFDO0FBRWhHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSx1Q0FBOEIsRUFBRSxDQUFDLENBQUM7QUFDbEYscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLCtCQUFzQixFQUFFLENBQUMsQ0FBQztBQUMxRSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksbUNBQTBCLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxxQ0FBNEIsRUFBRSxDQUFDLENBQUM7QUFDaEYscUJBQXFCLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLHFDQUE0QixFQUFFLENBQUMsQ0FBQyJ9
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AProcessing_1 = require("./AProcessing");
const KeyboardStatisticService_1 = require("../../Services/KeyboardStatistic/KeyboardStatisticService");
class ProcessingMessage extends AProcessing_1.AProcessing {
    constructor(client, devices, panel) {
        super(client, devices, panel);
    }
    RegisteringAllCallbacks() {
        this.AddEmitCallback('DataFromDigiLoaded', this.DataFromDigiLoaded.bind(this));
        this.AddEmitCallback('keyboardStatistic', this.KeyboardStatistic.bind(this));
    }
    MessageHandler(messages) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (typeof messages === 'string') ? JSON.parse(messages) : messages;
                let callback = this.GetEmitCallback(data.type);
                if (callback && typeof callback === 'function') {
                    callback(data);
                }
                else {
                    console.warn('[WARNING][P_MESSAGE] unknown type of message: ', data.type ? data.type : data);
                }
            }
            catch (error) {
                console.error(`[ERROR][P_MESSAGE] Error during call callback for message: `, messages ? JSON.stringify(messages) : messages);
            }
        });
    }
    DataFromDigiLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P_MESSAGE] ==> broadcast emit 'DataFromDigiLoaded'`);
            this.Client.broadcast.emit('DataFromDigiLoaded', {});
        });
    }
    KeyboardStatistic(data) {
        return __awaiter(this, void 0, void 0, function* () {
            KeyboardStatisticService_1.KeyboardStatisticService.Instance.Logging(data.value);
        });
    }
}
exports.ProcessingMessage = ProcessingMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvY2Vzc2luZ01lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmVyUklLL1Byb2Nlc3NpbmcvUHJvY2Vzc2luZ01lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLCtDQUE0RDtBQUk1RCx3R0FBcUc7QUFRckcsdUJBQStCLFNBQVEseUJBQVc7SUFDOUMsWUFBbUIsTUFBdUIsRUFBRSxPQUE0QyxFQUFFLEtBQWE7UUFDbkcsS0FBSyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELHVCQUF1QjtRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRSxJQUFJLENBQUMsZUFBZSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBTUssY0FBYyxDQUFDLFFBQWtCOztZQUNuQyxJQUFJO2dCQUVBLElBQUksSUFBSSxHQUFHLENBQUMsT0FBTyxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFFNUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLElBQUksUUFBUSxJQUFJLE9BQU8sUUFBUSxLQUFLLFVBQVUsRUFBRTtvQkFFNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsQjtxQkFBTTtvQkFFSCxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNoRzthQUNKO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyw2REFBNkQsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hJO1FBQ0wsQ0FBQztLQUFBO0lBRWEsa0JBQWtCOztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLHFEQUFxRCxDQUFDLENBQUM7WUFFbkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTtJQUVhLGlCQUFpQixDQUFDLElBQTREOztZQUN4RixtREFBd0IsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxDQUFDO0tBQUE7Q0FFSjtBQTFDRCw4Q0EwQ0MifQ==
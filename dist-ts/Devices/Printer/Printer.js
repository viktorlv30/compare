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
const e_print_state_1 = require("../../Enums/e.print.state");
const e_printer_direct_io_request_1 = require("../../Enums/e.printer.direct.io.request");
const application_state_service_1 = require("../../Services/State/application.state.service");
const ADevice_1 = require("../ADevice");
const Env_1 = require("../../ServerRIK/Env");
class Printer extends ADevice_1.ADevice {
    DirectIO(command, params) {
        return this.Call('directIO', { command, data: params.data, obj: params.obj });
    }
    PageModePrint(control) {
        return this.Call('pageModePrint', { control });
    }
    PrintBarCode(station, data, symbology, height, width, alignment, textPosition) {
        return this.Call('printBarCode', { station, data, symbology, height, width, alignment, textPosition });
    }
    PrintNormal(station, data) {
        return this.Call('printNormal', { station, data });
    }
    FormFeed() {
        return this.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.LABEL_FORM_FEED, { data: 0, obj: '' });
    }
    CreateDevice() {
        const prototype = 'BizerbaPosPrinter';
        const category = Env_1.Env.RINGO_PRINTER_SERVICE_NAME;
        console.log(`CREATE DEVICE: ${prototype}(${category})`);
        return this.Request('create', { prototype, category, });
    }
    Enable() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("Enable").call(this);
            application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.READY });
        });
    }
    Disable() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: null });
            yield _super("Disable").call(this);
        });
    }
    UpdateState(newState) {
        super.UpdateState(newState);
        if (newState.LabelRemoved) {
            application_state_service_1.ApplicationStateService.Instance.setProps({
                LabelHasToBeRemoved: true,
            });
        }
    }
}
exports.Printer = Printer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJpbnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9EZXZpY2VzL1ByaW50ZXIvUHJpbnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsNkRBQXdEO0FBTXhELHlGQUF3RjtBQUd4Riw4RkFBeUY7QUFHekYsd0NBQXFDO0FBQ3JDLDZDQUEwQztBQUUxQyxhQUFxQixTQUFRLGlCQUFPO0lBQ2hDLFFBQVEsQ0FBQyxPQUFzQyxFQUFFLE1BQXFDO1FBQ2xGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBaUIsQ0FBQztJQUNsRyxDQUFDO0lBRUQsYUFBYSxDQUFDLE9BQXNDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBaUIsQ0FBQztJQUNuRSxDQUFDO0lBRUQsWUFBWSxDQUFDLE9BQTRCLEVBQUUsSUFBWSxFQUFFLFNBQXlDLEVBQUUsTUFBYyxFQUFFLEtBQWEsRUFBRSxTQUF5QyxFQUFFLFlBQWdEO1FBQzFOLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsQ0FBaUIsQ0FBQztJQUMzSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQTRCLEVBQUUsSUFBWTtRQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFpQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxRQUFRO1FBQ0osT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLDJEQUE2QixDQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFpQixDQUFDO0lBQzlHLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxTQUFTLEdBQUcsbUJBQW1CLENBQUM7UUFDdEMsTUFBTSxRQUFRLEdBQUcsU0FBRyxDQUFDLDBCQUEwQixDQUFDO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLFNBQVMsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUssTUFBTTs7O1lBQ1IsTUFBTSxnQkFBWSxXQUFFLENBQUM7WUFDckIsbURBQXVCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSwyQkFBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEYsQ0FBQztLQUFBO0lBRUssT0FBTzs7O1lBQ1QsbURBQXVCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ25FLE1BQU0saUJBQWEsV0FBRSxDQUFDO1FBQzFCLENBQUM7S0FBQTtJQUVELFdBQVcsQ0FBQyxRQUFnQztRQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVCLElBQUksUUFBUSxDQUFDLFlBQVksRUFBRTtZQUN2QixtREFBdUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN0QyxtQkFBbUIsRUFBRSxJQUFJO2FBQzVCLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztDQUNKO0FBOUNELDBCQThDQyJ9
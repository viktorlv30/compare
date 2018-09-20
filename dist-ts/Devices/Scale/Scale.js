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
const application_state_service_1 = require("../../Services/State/application.state.service");
const ADevice_1 = require("../ADevice");
const e_scale_price_calculating_mode_1 = require("../../Enums/e.scale.price.calculating.mode");
class Scale extends ADevice_1.ADevice {
    DirectIO(command, params) {
        return this.Call('directIO', { command, data: params.data, obj: params.obj });
    }
    DoPriceCalculating(params) {
        return this.Call('doPriceCalculating', params);
    }
    SetSpecialTare(mode, tare) {
        return this.Call('setSpecialTare', { mode, tare });
    }
    FreezeValue(item, freeze) {
        return this.Call('freezeValue', { item, freeze });
    }
    DisplayText(data) {
        return this.Call('displayText', { data });
    }
    SetZero() {
        return this.Call('zeroScale', {});
    }
    SetPriceCalculationMode(mode) {
        switch (mode) {
            case e_scale_price_calculating_mode_1.SCALE_PRICE_CALCULATION_MODE.OPERATOR:
            case e_scale_price_calculating_mode_1.SCALE_PRICE_CALCULATION_MODE.SELF_SERVICE:
                application_state_service_1.ApplicationStateService.Instance.setProps({
                    MinimumWeight: 2,
                    MaximumWeight: 15000,
                });
                break;
            default:
                if (mode !== e_scale_price_calculating_mode_1.SCALE_PRICE_CALCULATION_MODE.PRICE_LABELING) {
                    console.warn(`[SCALE] Unknown price calculation mode to set: ${JSON.stringify(mode)}. Will set default (PRICE_LABELING) mode`);
                }
                application_state_service_1.ApplicationStateService.Instance.setProps({
                    MinimumWeight: 40,
                    MaximumWeight: 15000,
                });
        }
        return this.Call('setPriceCalculationMode', { mode });
    }
    CreateDevice() {
        const prototype = 'BizerbaScale';
        const category = 'BizerbaScale';
        console.log(`CREATE DEVICE: ${prototype}(${category})`);
        return this.Request('create', { prototype, category });
    }
    Enable() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield _super("Enable").call(this);
            this.SetPriceCalculationMode(e_scale_price_calculating_mode_1.SCALE_PRICE_CALCULATION_MODE.PRICE_LABELING);
        });
    }
    Disable() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            application_state_service_1.ApplicationStateService.Instance.setProps({
                MinimumWeight: null,
                MaximumWeight: null,
            });
            yield _super("Disable").call(this);
        });
    }
}
exports.Scale = Scale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NhbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvRGV2aWNlcy9TY2FsZS9TY2FsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUEsOEZBQXlGO0FBRXpGLHdDQUFxQztBQUlyQywrRkFBMEY7QUFHMUYsV0FBbUIsU0FBUSxpQkFBTztJQUM5QixRQUFRLENBQUMsT0FBZ0MsRUFBRSxNQUFxQztRQUM1RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQWlCLENBQUM7SUFDbEcsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQW1DO1FBQ2xELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQXFDLENBQUM7SUFDdkYsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUE2QixFQUFFLElBQVk7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFpQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBdUIsRUFBRSxNQUFlO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQWlCLENBQUM7SUFDdEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFZO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBaUIsQ0FBQztJQUM5RCxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFpQixDQUFDO0lBQ3RELENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxJQUFrQztRQUN0RCxRQUFRLElBQUksRUFBRTtZQUNWLEtBQUssNkRBQTRCLENBQUMsUUFBUSxDQUFDO1lBQzNDLEtBQUssNkRBQTRCLENBQUMsWUFBWTtnQkFDMUMsbURBQXVCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsYUFBYSxFQUFFLENBQUM7b0JBQ2hCLGFBQWEsRUFBRSxLQUFLO2lCQUN2QixDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWO2dCQUNJLElBQUksSUFBSSxLQUFLLDZEQUE0QixDQUFDLGNBQWMsRUFBRTtvQkFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxrREFBa0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztpQkFDbEk7Z0JBQ0QsbURBQXVCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztvQkFDdEMsYUFBYSxFQUFFLEVBQUU7b0JBQ2pCLGFBQWEsRUFBRSxLQUFLO2lCQUN2QixDQUFDLENBQUM7U0FDVjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLElBQUksRUFBRSxDQUFpQixDQUFDO0lBQzFFLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixTQUFTLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVLLE1BQU07OztZQUNSLE1BQU0sZ0JBQVksV0FBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyw2REFBNEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM5RSxDQUFDO0tBQUE7SUFFSyxPQUFPOzs7WUFDVCxtREFBdUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2dCQUN0QyxhQUFhLEVBQUUsSUFBSTtnQkFDbkIsYUFBYSxFQUFFLElBQUk7YUFDdEIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxpQkFBYSxXQUFFLENBQUM7UUFDMUIsQ0FBQztLQUFBO0NBQ0o7QUFqRUQsc0JBaUVDIn0=
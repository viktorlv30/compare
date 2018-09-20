"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const e_print_state_1 = require("../../Enums/e.print.state");
const e_scale_state_1 = require("../../Enums/e.scale.state");
const state_service_abstract_1 = require("./state.service.abstract");
const InitialProps = {
    MinimumWeight: null,
    MaximumWeight: null,
    CurrentWeight: null,
    ClearWeight: null,
    ScaleState: null,
    TareFixed: null,
    TareWeight: null,
    LabelHasToBeRemoved: null,
    LabelRemoved: null,
    Paper: null,
    PrintingState: null,
    TemperatureOk: null,
    Panels: null,
    PanelText: null,
    UnitPriceFixed: null,
    LastArticle: null,
    PaperWidth: null,
    UnitPrice: null,
    Resolution: null,
    ReversingDistance: 72,
    LabelForceReversing: null,
};
const InitialState = {};
let _instance = null;
class ApplicationStateService extends state_service_abstract_1.StateService {
    static get Instance() {
        return _instance || new ApplicationStateService();
    }
    constructor() {
        super(InitialProps, InitialState);
        if (_instance !== null) {
            throw new Error('Invalid usage. Singleton');
        }
        _instance = this;
        this.addOnChange((conditions) => {
            const { LabelRemoved, LabelHasToBeRemoved } = conditions.props;
            console.log(`[PRINTER] LabelRemoved: '${LabelRemoved}', hasToBeRemoved: '${LabelHasToBeRemoved}'.`);
        }, ['LabelRemoved', 'LabelHasToBeRemoved'], []);
        this.addOnChange((conditions) => {
            const { PrintingState } = conditions.props;
            console.log(`[PRINTER] PrintingState: '${PrintingState}'.`);
        }, ['PrintingState'], []);
        this.addOnChange((conditions) => {
            const { LabelRemoved, LabelHasToBeRemoved, PrintingState, ScaleState, UnitPriceFixed, ClearWeight, TareWeight } = conditions.props;
            let weightIsZero;
            switch (ScaleState) {
                case e_scale_state_1.SCALE_STATE.WEIGHT_IS_ZERO:
                    weightIsZero = true;
                    break;
                case e_scale_state_1.SCALE_STATE.WEIGHT_UNDERFLOW:
                    weightIsZero = ClearWeight === 0;
                    break;
                default:
                    weightIsZero = false;
            }
            const canContinue = weightIsZero || ScaleState === e_scale_state_1.SCALE_STATE.WEIGHT_NOT_STABLE;
            if (PrintingState === e_print_state_1.PRINT_STATE.PRINT_LABEL_DONE && (LabelRemoved || !LabelHasToBeRemoved) && canContinue) {
                this.setProps({
                    PrintingState: e_print_state_1.PRINT_STATE.READY,
                    UnitPrice: UnitPriceFixed ? undefined : 0,
                    PanelText: UnitPriceFixed ? undefined : '',
                });
            }
            else if (canContinue) {
                switch (PrintingState) {
                    case e_print_state_1.PRINT_STATE.PRICE_CALCULATING_ERROR:
                    case e_print_state_1.PRINT_STATE.LABEL_BUILD_ERROR:
                        this.setProps({
                            PrintingState: e_print_state_1.PRINT_STATE.READY,
                        });
                        break;
                }
            }
        }, ['LabelRemoved', 'LabelHasToBeRemoved', 'PrintingState',
            'ScaleState', 'UnitPriceFixed', 'ClearWeight', 'TareWeight'], []);
    }
}
exports.ApplicationStateService = ApplicationStateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24uc3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9TdGF0ZS9hcHBsaWNhdGlvbi5zdGF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQXdEO0FBQ3hELDZEQUF3RDtBQUN4RCxxRUFBd0Q7QUFLeEQsTUFBTSxZQUFZLEdBQXFCO0lBQ25DLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGFBQWEsRUFBRSxJQUFJO0lBQ25CLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFFaEIsbUJBQW1CLEVBQUUsSUFBSTtJQUN6QixZQUFZLEVBQUUsSUFBSTtJQUNsQixLQUFLLEVBQUUsSUFBSTtJQUNYLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGFBQWEsRUFBRSxJQUFJO0lBRW5CLE1BQU0sRUFBRSxJQUFJO0lBQ1osU0FBUyxFQUFFLElBQUk7SUFDZixjQUFjLEVBQUUsSUFBSTtJQUNwQixXQUFXLEVBQUUsSUFBSTtJQUNqQixVQUFVLEVBQUUsSUFBSTtJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGlCQUFpQixFQUFFLEVBQUU7SUFDckIsbUJBQW1CLEVBQUUsSUFBSTtDQUM1QixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQXNCLEVBQ3ZDLENBQUM7QUFFRixJQUFJLFNBQVMsR0FBbUMsSUFBSSxDQUFDO0FBR3JELDZCQUFxQyxTQUFRLHFDQUFpRDtJQUNuRixNQUFNLEtBQUssUUFBUTtRQUN0QixPQUFPLFNBQVMsSUFBSSxJQUFJLHVCQUF1QixFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsQyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQztRQUVqQixJQUFJLENBQUMsV0FBVyxDQUNaLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixZQUFZLHVCQUF1QixtQkFBbUIsSUFBSSxDQUFDLENBQUM7UUFDeEcsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxDQUNqRCxDQUFBO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FDWixDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ1gsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7WUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUNoRSxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQzNCLENBQUE7UUFFRCxJQUFJLENBQUMsV0FBVyxDQUNaLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDWCxNQUFNLEVBQUUsWUFBWSxFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ25JLElBQUksWUFBcUIsQ0FBQztZQUMxQixRQUFRLFVBQVUsRUFBRTtnQkFDaEIsS0FBSywyQkFBVyxDQUFDLGNBQWM7b0JBQzNCLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3BCLE1BQU07Z0JBQ1YsS0FBSywyQkFBVyxDQUFDLGdCQUFnQjtvQkFDN0IsWUFBWSxHQUFHLFdBQVcsS0FBSyxDQUFDLENBQUM7b0JBQ2pDLE1BQU07Z0JBQ1Y7b0JBQ0ksWUFBWSxHQUFHLEtBQUssQ0FBQzthQUM1QjtZQUVELE1BQU0sV0FBVyxHQUFHLFlBQVksSUFBSSxVQUFVLEtBQUssMkJBQVcsQ0FBQyxpQkFBaUIsQ0FBQztZQUVqRixJQUFJLGFBQWEsS0FBSywyQkFBVyxDQUFDLGdCQUFnQixJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxXQUFXLEVBQUU7Z0JBQ3pHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1YsYUFBYSxFQUFFLDJCQUFXLENBQUMsS0FBSztvQkFDaEMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUU7aUJBQzdDLENBQUMsQ0FBQzthQUNOO2lCQUFNLElBQUksV0FBVyxFQUFFO2dCQUNwQixRQUFRLGFBQWEsRUFBRTtvQkFDbkIsS0FBSywyQkFBVyxDQUFDLHVCQUF1QixDQUFDO29CQUN6QyxLQUFLLDJCQUFXLENBQUMsaUJBQWlCO3dCQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDOzRCQUNWLGFBQWEsRUFBRSwyQkFBVyxDQUFDLEtBQUs7eUJBQ25DLENBQUMsQ0FBQzt3QkFDSCxNQUFNO2lCQUNiO2FBQ0o7UUFDTCxDQUFDLEVBQ0QsQ0FBQyxjQUFjLEVBQUUscUJBQXFCLEVBQUUsZUFBZTtZQUNuRCxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUNoRSxFQUFFLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWpFRCwwREFpRUMifQ==
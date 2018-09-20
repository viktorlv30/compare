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
const RepositoryFactory_1 = require("../../Common/Repositories/RepositoryFactory");
const RequestError_1 = require("../../Errors/RequestError");
const application_state_service_1 = require("../../Services/State/application.state.service");
class AProcessing {
    constructor(client, devices, panel) {
        this.Client = client;
        this._devices = devices;
        this._panels = panel;
        this._handlers = new Map();
        if (client && client.handshake && client.handshake.address) {
            const addressArr = client.handshake.address.split(':');
            this.IpAddress = addressArr[addressArr.length - 1];
        }
        else {
            this.IpAddress = '0.0.0.0';
        }
        this.RegisteringAllCallbacks();
        this._rikRepository = this.LoadRepository();
    }
    AddEmitCallback(emitName, cb) {
        this._handlers.set(emitName, cb);
    }
    GetEmitCallback(emitName) {
        let callback = this._handlers.get(emitName);
        return callback || null;
    }
    LoadRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            const factory = yield RepositoryFactory_1.RepositoryFactory.GetInstance().GetRepository();
            return factory.GetRikRepository();
        });
    }
    GetRikRepository() {
        return this._rikRepository;
    }
    Devices() {
        return this._devices;
    }
    get ApplicationProps() {
        return application_state_service_1.ApplicationStateService.Instance.props;
    }
    PrepareResponse(response) {
        if (typeof response === 'string') {
            return response;
        }
        else {
            return response;
        }
    }
    Function404(name) {
        return Promise.reject(new RequestError_1.RequestError(`Invalid request name ${JSON.stringify(name)}`, 404, 'Not Found'));
    }
    get Panels() {
        return this._panels;
    }
}
exports.AProcessing = AProcessing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVByb2Nlc3NpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmVyUklLL1Byb2Nlc3NpbmcvQVByb2Nlc3NpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVVBLG1GQUFnRjtBQUNoRiw0REFBeUQ7QUFFekQsOEZBQXlGO0FBVXpGO0lBU0ksWUFBc0IsTUFBdUIsRUFBRSxPQUE0QyxFQUFFLEtBQWE7UUFDdEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDeEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzlCO1FBRUQsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQWVELGVBQWUsQ0FBQyxRQUFnQixFQUFFLEVBQWdCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsZUFBZSxDQUFDLFFBQWdCO1FBQzVCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sUUFBUSxJQUFJLElBQUksQ0FBQztJQUM1QixDQUFDO0lBT2EsY0FBYzs7WUFFeEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxxQ0FBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0RSxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RDLENBQUM7S0FBQTtJQUVELGdCQUFnQjtRQUNaLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN6QixDQUFDO0lBS0QsSUFBSSxnQkFBZ0I7UUFDaEIsT0FBTyxtREFBdUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFRCxlQUFlLENBQUMsUUFBYTtRQUN6QixJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUM5QixPQUFPLFFBQVEsQ0FBQztTQUNuQjthQUFNO1lBQ0gsT0FBTyxRQUFRLENBQUM7U0FDbkI7SUFDTCxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQVk7UUFDcEIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksMkJBQVksQ0FBQyx3QkFBd0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQzlHLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztDQUNKO0FBekZELGtDQXlGQyJ9
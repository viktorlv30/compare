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
const uuid = require("uuid");
const application_state_service_1 = require("../Services/State/application.state.service");
const DeviceError_1 = require("./DeviceError");
class ADevice {
    constructor(parameters, socket) {
        this._requestQueue = new Map();
        this.Port = parameters.port;
        this.Host = parameters.host;
        this._deviceSocket = socket;
        this.SocketDefaultSet();
    }
    set DeviceSocket(socket) {
        this._deviceSocket = socket;
    }
    get DeviceSocket() {
        return this._deviceSocket;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            this._deviceIDPromise = this.CreateDevice();
            yield this.Enable();
        });
    }
    Stop(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this._deviceIDPromise;
            yield this.Request('destroy', { instance });
        });
    }
    Enable() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this._deviceIDPromise;
            yield this.Request('call', { instance, method: 'enable', params: {} });
            let state = yield this.Request('state', { instance });
            this.UpdateState(state.properties);
        });
    }
    Disable() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield this._deviceIDPromise;
            yield this.Request('call', { instance, method: 'release', params: {} });
        });
    }
    Request(task, params) {
        const id = uuid.v4();
        const req = Object.create(null);
        const promise = new Promise((resolve, reject) => {
            Object.assign(req, { resolve, reject });
        });
        Object.assign(req, { promise });
        this._requestQueue.set(id, req);
        this._deviceSocket.emit('request', {
            id,
            task,
            params,
        });
        return promise;
    }
    ServiceName() {
        return this.constructor.name.toUpperCase();
    }
    SocketDefaultSet() {
        this.DeviceSocket.on('event', (message) => __awaiter(this, void 0, void 0, function* () {
            const { name, instance, params } = message;
            if (instance === (yield this._deviceIDPromise) && name === 'PropertiesChanged') {
                this.UpdateState(params);
            }
        }));
        this.DeviceSocket.on('response', (response) => {
            const deferred = this._requestQueue.get(response.id);
            if (deferred) {
                if (response.error) {
                    console.warn(`[ERROR][${this.ServiceName()}] ${JSON.stringify(response.error)}`);
                    const { name, message, code } = response.error;
                    deferred.reject(new DeviceError_1.DeviceError(name, code, message));
                }
                else {
                    deferred.resolve(response.result);
                }
            }
        });
        this.DeviceSocket.on('disconnect', (reason) => {
            console.warn(`[${this.ServiceName()}] socket disconnected. Reason: ${reason}`);
            this.DeviceSocket.removeAllListeners();
        });
    }
    UpdateState(newState) {
        const stateService = application_state_service_1.ApplicationStateService.Instance;
        const props = stateService.props;
        for (let key in newState) {
            if (!(key in props)) {
                delete newState[key];
            }
        }
        stateService.setProps(newState);
    }
    GetProps() {
        return application_state_service_1.ApplicationStateService.Instance.props;
    }
    GetState() {
        return application_state_service_1.ApplicationStateService.Instance.state;
    }
    Call(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Request('call', { instance: yield this._deviceIDPromise, method, params });
        });
    }
    Set(property, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Request('set', { instance: yield this._deviceIDPromise, property, value });
        });
    }
    Get(property) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Request('get', { instance: yield this._deviceIDPromise, property });
        });
    }
}
exports.ADevice = ADevice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQURldmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9EZXZpY2VzL0FEZXZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLDZCQUE2QjtBQUk3QiwyRkFBc0Y7QUFJdEYsK0NBQTRDO0FBRzVDO0lBTUksWUFBbUIsVUFBNkIsRUFBRSxNQUE2QjtRQUMzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBTUQsSUFBSSxZQUFZLENBQUMsTUFBNkI7UUFDMUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUksWUFBWTtRQUNaLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM5QixDQUFDO0lBSUssS0FBSzs7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzVDLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxJQUFhOztZQUNwQixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFSyxNQUFNOztZQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FB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
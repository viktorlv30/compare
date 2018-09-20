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
const express = require("express");
const path_1 = require("path");
const SocketIO = require("socket.io");
const _ = require("underscore");
const E_DEVICE_TYPE_1 = require("../Enums/E_DEVICE_TYPE");
const E_SERVICE_TYPE_1 = require("../Enums/E_SERVICE_TYPE");
const E_SLIDER_TYPE_1 = require("../Enums/E_SLIDER_TYPE");
const Media_1 = require("../Media/Media");
const application_state_service_1 = require("../Services/State/application.state.service");
const func_tools_1 = require("../Services/State/func.tools");
const ProcessingMessage_1 = require("./Processing/ProcessingMessage");
const ProcessingRequest_1 = require("./Processing/ProcessingRequest");
const Util_1 = require("../Common/Util");
const RepositoryFactory_1 = require("../Common/Repositories/RepositoryFactory");
const { renewNetwork } = require('../../services/system/settings');
class ServerRIK {
    constructor(args) {
        this._defaultServerPort = 3000;
        this._defaultServerHost = '127.0.0.1';
        this._devices = new Map();
        this._services = new Map();
        this._sliders = new Map();
        this._serverArgs = {};
        this._clients = new Map();
        if (args) {
            this._serverArgs = _.clone(args);
        }
        this.Port = this.ServerPortConfigure();
        this.Host = this.ServerHostConfigure();
        this.App = this.ExpressAppConfigure();
    }
    get MainSocket() {
        return this._mainSocket;
    }
    set MainSocket(value) {
        this._mainSocket = value;
    }
    get Port() {
        return this._port;
    }
    set Port(value) {
        this._port = value;
    }
    get Host() {
        return this._host;
    }
    set Host(value) {
        this._host = value;
    }
    get App() {
        return this._app;
    }
    set App(value) {
        this._app = value;
    }
    get HttpServer() {
        return this._httpServer;
    }
    set HttpServer(value) {
        this._httpServer = value;
    }
    get SettingsProcessor() {
        return this._settingsSetter;
    }
    set SettingsProcessor(setter) {
        this._settingsSetter = setter;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.RunAllDevices();
            yield this.RunAllServices();
            this.HttpServer = this.RunServer();
            this.MainSocket = SocketIO(this.HttpServer, { transports: ['websocket'], pingInterval: 5000, pingTimeout: 25000 });
            application_state_service_1.ApplicationStateService.Instance.prependStateListener(() => true, (conditions) => this.MainSocket.emit('StateChanged', conditions.propsChange));
            this.MainSocket.on('connection', func_tools_1.bind(this.ConfigureProcessing, this));
            let mainSlider = this._sliders.get(E_SLIDER_TYPE_1.E_SLIDER_TYPE.MAIN_SLIDER);
            if (mainSlider) {
                console.log(`[SERVER] Main slider configure!`);
                this.SliderConfigure(mainSlider, this.HttpServer, 'main');
                yield mainSlider.refresh();
            }
            let secondarySlider = this._sliders.get(E_SLIDER_TYPE_1.E_SLIDER_TYPE.SECONDARY_SLIDER);
            if (secondarySlider) {
                console.log(`[SERVER] Secondary slider configure!`);
                this.SliderConfigure(secondarySlider, this.HttpServer, 'secondary');
                yield secondarySlider.refresh();
            }
            try {
                console.info('renew network');
                renewNetwork();
            }
            catch (error) {
                console.error(`RENEW NETWORK ERROR: ${Util_1.Util.extractError(error)}`);
            }
        });
    }
    Stop(code) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.StopAllServices();
            yield this.StopAllDevices();
            application_state_service_1.ApplicationStateService.Instance.removeAllStateListeners();
            process.exit(code);
        });
    }
    GetDevice(name) {
        let result = null;
        let isDeviceExist = this._devices.has(name);
        if (isDeviceExist) {
            let device = this._devices.get(name);
            if (device) {
                result = device;
            }
        }
        return result;
    }
    AddDevice(type, device) {
        if (!device) {
            console.error(`CAN'T CREATE DEVICE '${type}'. UNKNOWN DEVICE TYPE`);
            return null;
        }
        this._devices.set(type, device);
        return device;
    }
    AddService(name, service) {
        this._services.set(name, service);
    }
    GetService(name) {
        let service = this._services.get(name);
        if (!service) {
            console.warn(`[WARNING] ServerRik doesn't have such service [${name}]`);
            return null;
        }
        return service;
    }
    ServiceName() {
        return this.constructor.name;
    }
    AddSlider(type, slider) {
        if (this._sliders.has(type)) {
            throw new Error(`Can't create slider with the same name ${type}. The same slider was created before!`);
        }
        this._sliders.set(type, slider);
        this.App.use(slider.express);
        return slider;
    }
    RunServer() {
        let server = this.App.listen(this.Port, () => {
            console.log(`Application listening at http://${this.Host}:${this.Port}`);
        });
        return server;
    }
    RunAllDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [, device] of this._devices) {
                yield device.Start();
            }
            yield this.DefaultPriceCalculatingMode();
        });
    }
    RunAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [, service] of this._services) {
                yield service.Start();
            }
        });
    }
    StopAllDevices() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [, device] of this._devices) {
                yield device.Stop();
            }
        });
    }
    StopAllServices() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let [, service] of this._services) {
                yield service.Stop();
            }
        });
    }
    ServerPortConfigure() {
        let portEnv = process.env.PORT;
        portEnv = portEnv ? portEnv : this._serverArgs['port'];
        let port;
        if (portEnv && !isNaN(parseInt(portEnv))) {
            port = parseInt(portEnv);
        }
        else {
            port = this._defaultServerPort;
        }
        return port;
    }
    ServerHostConfigure() {
        let host;
        if (typeof this._serverArgs.host === 'string') {
            host = this._serverArgs.host.toString();
        }
        if (!this._host) {
            host = host ? host : this._defaultServerHost;
        }
        else {
            host = this._host;
        }
        return host;
    }
    ExpressAppConfigure() {
        let app = express();
        app.use(express.static(path_1.join(__dirname, '../../', 'public')));
        app.get('/', (req, res) => {
            res.sendFile(path_1.join(__dirname, '../../', 'public', 'index.html'));
        });
        app.get('/secondary-screen', (req, res) => {
            res.sendFile(path_1.join(__dirname, '../../', 'public', 'secondary.html'));
        });
        app.use(Media_1.CreateMediaApp());
        return app;
    }
    ConfigureProcessing(client) {
        const weightPanel = this.GetService(E_SERVICE_TYPE_1.E_SERVICE_TYPE.PANELS);
        if (!weightPanel) {
            throw new Error(`[SERVER] Panels object expected`);
        }
        const id = client.id;
        client = client.compress(true).json;
        const container = {
            client,
            request: new ProcessingRequest_1.ProcessingRequest(client, this._devices, weightPanel),
            message: new ProcessingMessage_1.ProcessingMessage(client, this._devices, weightPanel),
        };
        const address = container.request.IpAddress;
        console.info(`[CLIENT][CONNECT][${address}]`);
        this._clients.set(id, container);
        client.on('request', func_tools_1.bind(container.request.MessageHandler, container.request));
        client.on('messages', func_tools_1.bind(container.message.MessageHandler, container.message));
        client.on('error', (error) => {
            console.error(`[CLIENT][ERROR][${address}]`, error);
        });
        client.on('disconnect', (reason) => {
            console.error(`[CLIENT][DISCONNECT][${address}]`, reason);
            client.removeAllListeners();
            this._clients.delete(id);
        });
        const props = application_state_service_1.ApplicationStateService.Instance.props;
        console.info('emitting state change', client.connected, props);
        client.emit('StateChanged', props);
    }
    SliderConfigure(slides, server, name) {
        let sliderSocketRoute = path_1.posix.join(slides.prefix, 'socket.io');
        let socket = SocketIO(server, { path: sliderSocketRoute, transports: ['websocket'], });
        function addSliderClient(client) {
            console.log(`[SLIDER] '${name}' start(): ${client.handshake.address}`);
            slides.controller.start();
            client.emit('changed', {
                slides: slides.controller.slides,
                current: slides.controller.current
            });
            client.on('disconnect', () => {
                const clients = Object.keys(socket.sockets.sockets);
                console.log(`[SLIDER] Socket '${name}' disconnect: ${client.handshake.address}, remaining sockets(${clients.length}): ${JSON.stringify(clients)}`);
                if (clients.length === 0) {
                    console.log(`[SLIDER] '${name}' stop()`, client.handshake.address);
                    slides.controller.stop();
                }
                client.removeAllListeners();
            });
            client.on('connect', addSliderClient.bind(undefined, client));
            client.on('pause', () => {
                console.log(`[SLIDER] '${name}' pause()`, client.handshake.address);
                slides.controller.pause();
            });
            client.on('resume', () => {
                slides.controller.resume();
                console.log(`[SLIDER] '${name}' resume()`, client.handshake.address);
            });
        }
        socket.on('connection', (client) => {
            const clients = Object.keys(socket.sockets.sockets);
            console.log(`[SLIDER] '${name}' screen connected. List: ${JSON.stringify(clients)}.`);
            addSliderClient(client);
        });
        socket.on('disconnect', (reason) => console.log(`[SLIDER] Socket '${name}' screen disconnected`));
        socket.on('reconnect', (attemptNumber) => console.log(`[SLIDER] Socket '${name}' screen: reconnect attempt [${attemptNumber}]`));
        slides.controller.on('changed', (data) => {
            socket.emit('changed', data);
        });
        return socket;
    }
    DefaultPriceCalculatingMode() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[SERVER-RIK] DefaultPriceCalculatingMode()`);
            const settingModeName = 'priceCalculatingMode';
            const repo = yield RepositoryFactory_1.RepositoryFactory.GetInstance().GetRepository();
            const scale = this.GetDevice(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            if (repo && scale) {
                const scaleModeRaw = (yield repo.GetRikRepository().devicesSettings())
                    .find(setting => setting.name === settingModeName && setting.device_type === E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
                if (scaleModeRaw) {
                    const mode = scaleModeRaw.value;
                    yield scale.SetPriceCalculationMode(mode);
                    console.log(`[SERVER-RIK] Set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode: ${mode}.`);
                }
                else {
                    console.log(`[SERVER-RIK] Can't set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode. The settings are depicted in the Db.`);
                }
            }
            else {
                console.log(`[SERVER-RIK] Can't set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode. Device doesn't exist or database does not available`);
            }
        });
    }
}
exports.ServerRIK = ServerRIK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyUklLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjLXRzL1NlcnZlclJJSy9TZXJ2ZXJSSUsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLG1DQUFtQztBQUduQywrQkFBbUM7QUFDbkMsc0NBQXNDO0FBRXRDLGdDQUFnQztBQUVoQywwREFBdUQ7QUFDdkQsNERBQXlEO0FBQ3pELDBEQUF1RDtBQUN2RCwwQ0FBZ0Q7QUFJaEQsMkZBQXNGO0FBQ3RGLDZEQUFvRDtBQUVwRCxzRUFBbUU7QUFDbkUsc0VBQW1FO0FBQ25FLHlDQUFzQztBQUd0QyxnRkFBNkU7QUFHN0UsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBUW5FO0lBZ0JJLFlBQVksSUFBNkI7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUUxQixJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMs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
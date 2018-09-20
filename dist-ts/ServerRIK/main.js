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
const path_1 = require("path");
const io = require("socket.io-client");
require("source-map-support/register");
const Inspector_1 = require("../Common/Inspector");
const ServerRIK_1 = require("./ServerRIK");
const Env_1 = require("./Env");
const E_DEVICE_TYPE_1 = require("../Enums/E_DEVICE_TYPE");
const E_SLIDER_TYPE_1 = require("../Enums/E_SLIDER_TYPE");
const LabelService_1 = require("../Services/Label/LabelService");
const E_SERVICE_TYPE_1 = require("../Enums/E_SERVICE_TYPE");
const Panel_1 = require("../Services/Panel/Panel");
const LabelDataBuilder_1 = require("../Services/Label/LabelData/LabelDataBuilder");
const LabelDataBuildDirector_1 = require("../Services/Label/LabelData/LabelDataBuildDirector");
const express_slider_1 = require("express-slider");
const Printer_1 = require("../Devices/Printer/Printer");
const Scale_1 = require("../Devices/Scale/Scale");
const RikXmlLayoutBuilder_1 = require("../Services/Label/LabelLayout/RikXmlLayoutBuilder");
const Migrate_1 = require("../Database/Migrations/Migrate");
inspector(Env_1.Env.DEBUG_SERVER_PORT);
main();
process.on('unhandledRejection', (exception) => {
    console.error('[RIK UNHANDLED REJECTION]', exception);
});
function inspector(debugPort) {
    const isNeedLaunchInspector = typeof debugPort === 'number';
    const inspector = Inspector_1.Inspector.Instance(debugPort);
    if (isNeedLaunchInspector) {
        console.log(`Node INSPECTOR available to launch!!! Host: ${inspector.Host}, Port: ${inspector.Port}, wait: ${inspector.IsWait}`);
    }
    inspector.Start(isNeedLaunchInspector);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userPostgres = {
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'postgres',
                password: '111',
                database: 'postgres',
                port: '5432'
            }
        };
        const userScale = {
            client: 'pg',
            connection: {
                host: '127.0.0.1',
                user: 'scale',
                password: '111',
                database: 'scale',
                port: '5432'
            }
        };
        let mainSliderOpts = {
            prefix: path_1.posix.join('/screen', 'main'),
            target: Env_1.Env.MAIN_SLIDES_PATH,
            sources: [
                Env_1.Env.MAIN_SLIDES_PATH,
                Env_1.Env.FALLBACK_SLIDES_PATH
            ],
            lastSliderDir: Env_1.Env.LAST_SLIDER_PATH
        };
        let secondarySliderOpts = {
            prefix: path_1.posix.join('/screen', 'secondary'),
            target: Env_1.Env.SECONDARY_SLIDES_PATH,
            sources: [
                Env_1.Env.SECONDARY_SLIDES_PATH,
                Env_1.Env.MAIN_SLIDES_PATH,
                Env_1.Env.FALLBACK_SLIDES_PATH
            ],
            lastSliderDir: Env_1.Env.LAST_SLIDER_PATH
        };
        console.time(`Db migrate`);
        const dbMigrate = new Migrate_1.Migrate(userPostgres, userScale);
        yield dbMigrate.RunMigrate();
        console.timeEnd(`Db migrate`);
        const server = new ServerRIK_1.ServerRIK({ port: Env_1.Env.PORT, host: Env_1.Env.HOST });
        const deviceSocket = io.connect(`http://127.0.0.1:${Env_1.Env.DEVICES_PORT}`, { path: '/pos.io', transports: ['websocket'] });
        const printer = new Printer_1.Printer({ port: Env_1.Env.DEVICES_PORT, host: server.Host }, deviceSocket);
        const scale = new Scale_1.Scale({ port: Env_1.Env.DEVICES_PORT, host: server.Host }, deviceSocket);
        server.AddDevice(E_DEVICE_TYPE_1.E_DEVICE_TYPE.PRINTER, printer);
        server.AddDevice(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE, scale);
        server.AddSlider(E_SLIDER_TYPE_1.E_SLIDER_TYPE.MAIN_SLIDER, new express_slider_1.SlidesServer(mainSliderOpts));
        server.AddSlider(E_SLIDER_TYPE_1.E_SLIDER_TYPE.SECONDARY_SLIDER, new express_slider_1.SlidesServer(secondarySliderOpts));
        const labelDataBuilder = new LabelDataBuilder_1.LabelDataBuilder();
        const labelDataBuildDirector = new LabelDataBuildDirector_1.LabelDataBuildDirector(labelDataBuilder);
        const labelLayoutService = LabelService_1.LabelService.Instance();
        labelLayoutService.LabelDataBuilder = labelDataBuildDirector;
        labelLayoutService.LabelLayoutBuilder = new RikXmlLayoutBuilder_1.RikXmlLayoutBuilder();
        yield labelLayoutService.Start();
        server.AddService(E_SERVICE_TYPE_1.E_SERVICE_TYPE.PANELS, new Panel_1.Panel());
        yield server.Start();
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9TZXJ2ZXJSSUsvbWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsK0JBQTZCO0FBQzdCLHVDQUF1QztBQUN2Qyx1Q0FBcUM7QUFFckMsbURBQWdEO0FBQ2hELDJDQUF3QztBQUN4QywrQkFBNEI7QUFDNUIsMERBQXVEO0FBQ3ZELDBEQUF1RDtBQUN2RCxpRUFBOEQ7QUFDOUQsNERBQXlEO0FBQ3pELG1EQUFnRDtBQUNoRCxtRkFBZ0Y7QUFDaEYsK0ZBQTRGO0FBQzVGLG1EQUFtRTtBQUNuRSx3REFBcUQ7QUFDckQsa0RBQStDO0FBQy9DLDJGQUF3RjtBQUN4Riw0REFBeUQ7QUFHekQsU0FBUyxDQUFDLFNBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2pDLElBQUksRUFBRSxDQUFDO0FBR1AsT0FBTyxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLFNBQWdCLEVBQUUsRUFBRTtJQUNsRCxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQyxDQUFDO0FBRUgsbUJBQW1CLFNBQTZCO0lBQzVDLE1BQU0scUJBQXFCLEdBQUcsT0FBTyxTQUFTLEtBQUssUUFBUSxDQUFDO0lBQzVELE1BQU0sU0FBUyxHQUFHLHFCQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hELElBQUkscUJBQXFCLEVBQUU7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsU0FBUyxDQUFDLElBQUksV0FBVyxTQUFTLENBQUMsSUFBSSxXQUFXLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3BJO0lBRUQsU0FBUyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFFRDs7UUFHSSxNQUFNLFlBQVksR0FBRztZQUNqQixNQUFNLEVB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
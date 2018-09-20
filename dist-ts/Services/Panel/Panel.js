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
const fs_1 = require("fs");
const x_util_1 = require("../../Util/x.util");
const e_x_do_tool_command_1 = require("../../Util/x.util/x.do.tool.commands/e.x.do.tool.command");
const application_state_service_1 = require("../State/application.state.service");
const Env_1 = require("../../ServerRIK/Env");
const util_1 = require("util");
class Panel {
    constructor() {
        this._defaultFileName = Env_1.Env.PANELS_PATH;
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.SetFileToLoadGeometry('');
            try {
                this._panelsPosition = yield this.GetPositions(this._sourceFile);
                application_state_service_1.ApplicationStateService.Instance.setProps({ Panels: this._panelsPosition });
                console.info('loadPanelsPositionFromFile', 'file: ', this._sourceFile, 'data: ', JSON.stringify(this._panelsPosition));
            }
            catch (error) {
                console.error(`Error during loadPanelsPositionFromFile ${error.message}\n${error.stack}`);
            }
        });
    }
    Stop(code) {
        console.log(`[PANELS] Call Stop()`);
        return Promise.resolve();
    }
    ServiceName() {
        return this.constructor.name;
    }
    Show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._panelsPosition) {
                throw "You should START() Panel before SHOW()";
            }
            try {
                const commands = [];
                for (let panelId in this._panelsPosition) {
                    const { left, top, width, height } = this._panelsPosition[panelId];
                    commands.push({
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MAP,
                        sync: true,
                        window: parseInt(panelId, 10),
                    }, {
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MOVE,
                        sync: true,
                        window: parseInt(panelId, 10),
                        x: left,
                        y: top,
                    }, {
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_RESIZE,
                        sync: true,
                        window: parseInt(panelId, 10),
                        width,
                        height,
                    });
                }
                yield x_util_1.xDo(commands);
                return true;
            }
            catch (error) {
                console.error(`[PANEL SHOW] ERROR: ${error}`);
                return false;
            }
        });
    }
    Hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._panelsPosition) {
                throw new Error("You should START() Panel before HIDE()");
            }
            try {
                const commands = [];
                for (let panelId in this._panelsPosition) {
                    const { left, top, width, height } = this._panelsPosition[panelId];
                    commands.push({
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_UNMAP,
                        sync: true,
                        window: parseInt(panelId, 10),
                    });
                }
                yield x_util_1.xDo(commands);
                return true;
            }
            catch (error) {
                console.error(`[PANEL HIDE] ERROR: ${error}`);
                return false;
            }
        });
    }
    GetPositions(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileName = file || '';
            let resultPositions = Object.create(null);
            if (!fileName) {
                fileName = this._defaultFileName;
            }
            try {
                yield util_1.promisify(fs_1.access)(fileName, fs_1.constants.F_OK | fs_1.constants.R_OK);
                const positions = yield util_1.promisify(fs_1.readFile)(fileName, { encoding: 'utf-8' });
                resultPositions = JSON.parse(positions);
                const parsedPositions = JSON.parse(positions);
                for (let panel in parsedPositions) {
                    const parsedPanelGeometry = parsedPositions[panel];
                    Object.assign(resultPositions, { [panel]: Object.create(null) });
                    for (let position in parsedPanelGeometry) {
                        let positionValue = parsedPanelGeometry[position];
                        positionValue = typeof positionValue === 'number' || isNaN(parseInt(positionValue)) ? positionValue : parseInt(positionValue);
                        Object.assign(resultPositions[panel], { [position]: positionValue });
                    }
                }
            }
            catch (error) {
                console.warn(`[GET PANELS] ${error.name}: ${error.message}. Returns default value:`, JSON.stringify(resultPositions));
            }
            console.warn(`[POSITIONS] Result: ${JSON.stringify(resultPositions)}`);
            return resultPositions;
        });
    }
    SetFileToLoadGeometry(file) {
        let fileName;
        if (!file) {
            fileName = this._defaultFileName;
        }
        else {
            let fileParts = file.split('.');
            let fileExt = fileParts[fileParts.length - 1].toLowerCase();
            let isExtJson = fileExt === 'json';
            fileName = isExtJson ? file : file + '.json';
        }
        this._sourceFile = fileName;
        return this._sourceFile;
    }
}
exports.Panel = Panel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvUGFuZWwvUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLDJCQUFpRDtBQUNqRCw4Q0FBd0M7QUFFeEMsa0dBQTZGO0FBQzdGLGtGQUE2RTtBQUc3RSw2Q0FBMEM7QUFDMUMsK0JBQWlDO0FBRWpDO0lBT0k7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM1QyxDQUFDO0lBRUssS0FBSzs7WUFDUCxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDL0IsSUFBSTtnQkFDQSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2pFLG1EQUF1QixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7Z0JBQzVFLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDMUg7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxLQUFLLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2FBQzdGO1FBQ0wsQ0FBQztLQUFBO0lBRUQsSUFBSSxDQUFDLElBQWE7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDcEMsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVc7UUFDUCxPQUFPLElBQUksQ0FB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
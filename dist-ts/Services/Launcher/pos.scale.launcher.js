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
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const Env_1 = require("../../ServerRIK/Env");
const format_1 = require("../../Util/format");
const fs_util_1 = require("../../Util/fs.util");
const sleep_1 = require("../../Util/sleep");
const x_util_1 = require("../../Util/x.util");
const e_x_do_tool_command_1 = require("../../Util/x.util/x.do.tool.commands/e.x.do.tool.command");
const launcher_abstract_1 = require("./launcher.abstract");
const util_1 = require("util");
const LOG_DIR = path.join(Env_1.Env.LOG_DIRECTORY, 'posscale');
const WORK_DIR = '/opt/bizerba/posscale/linux_x86';
const SLEEP_TIME = 1000;
const PROCESS_CHECK_TIME = 5000;
class PosScaleLauncher extends launcher_abstract_1.ALauncher {
    get LogDirectory() {
        return LOG_DIR;
    }
    get WorkingDirectory() {
        return WORK_DIR;
    }
    get SleepTime() {
        return SLEEP_TIME;
    }
    get PanelsPath() {
        return Env_1.Env.PANELS_PATH;
    }
    _findPanels() {
        if (this.daemon) {
            return x_util_1.findWindows(true, {
                onlyVisible: true,
                pid: this.daemon.pid,
                windowClass: /^posscale[.]x$/,
            });
        }
        else {
            return Promise.resolve([]);
        }
    }
    _preStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`[SCREEN]`, JSON.stringify(yield x_util_1.getScreenGeometry()));
            yield fs_util_1.mkdirp(this.LogDirectory);
            this._logFileId = yield util_1.promisify(fs.open)(path.join(this.LogDirectory, format_1.format('%Y-%m-%d %H:%M.log')), 'a');
        });
    }
    _postStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.daemon) {
                const screenGeometry = yield x_util_1.getScreenGeometry();
                let panels;
                while ((panels = yield this._findPanels()).length !== Object.keys(screenGeometry).length) {
                    yield sleep_1.sleep(this.SleepTime);
                }
                console.info(`[PANELS]`, JSON.stringify(panels));
                const panelsGeometry = yield x_util_1.getWindowsGeometry(panels);
                console.info(`[PANELS]`, JSON.stringify(panelsGeometry));
                yield util_1.promisify(fs.writeFile)(this.PanelsPath, JSON.stringify(panelsGeometry));
                yield x_util_1.xDo(panels.map((panelId) => ({
                    code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_UNMAP,
                    sync: true,
                    window: panelId,
                })));
            }
            else {
                throw new Error('Daemon is not started');
            }
        });
    }
    _startDaemon() {
        const logFile = this._logFileId;
        return child_process_1.spawn(path.join(this.WorkingDirectory, 'posscale.x'), [], {
            cwd: this.WorkingDirectory,
            stdio: ['ignore', logFile ? logFile : 'ignore', logFile ? logFile : 'ignore',],
            detached: true,
        });
    }
    constructor() {
        super(PROCESS_CHECK_TIME);
        this._logFileId = 0;
    }
}
if (require.main === module) {
    (new PosScaleLauncher()).start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zLnNjYWxlLmxhdW5jaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhdW5jaGVyL3Bvcy5zY2FsZS5sYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsNkNBQTBDO0FBQzFDLDhDQUEyQztBQUMzQyxnREFBNEM7QUFDNUMsNENBQXlDO0FBQ3pDLDhDQUE0RjtBQUM1RixrR0FBNkY7QUFHN0YsMkRBQWdEO0FBQ2hELCtCQUFpQztBQUdqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQUcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDekQsTUFBTSxRQUFRLEdBQUcsaUNBQWlDLENBQUM7QUFDbkQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBRWhDLHNCQUF1QixTQUFRLDZCQUFTO0lBR3BDLElBQVcsWUFBWTtRQUNuQixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsSUFBVyxnQkFBZ0I7UUFDdkIsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQVcsU0FBUztRQUNoQixPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBVyxVQUFVO1FBQ2pCLE9BQU8sU0FBRyxDQUFDLFdBQVcsQ0FBQztJQUMzQixDQUFDO0lBRU8sV0FBVztRQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNiLE9BQU8sb0JBQVcsQ0FDZCxJQUFJLEVBQ0o7Z0JBQ0ksV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUc7Z0JBQ3BCLFdBQVcsRUFBRSxnQkFBZ0I7YUFDaEMsQ0FDSixDQUFDO1NBQ0w7YUFBTTtZQUNILE9BQU8sT0FB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
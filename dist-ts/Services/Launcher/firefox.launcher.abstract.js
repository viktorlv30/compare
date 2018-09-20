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
const os = require("os");
const path = require("path");
const format_1 = require("../../Util/format");
const fs_util_1 = require("../../Util/fs.util");
const sleep_1 = require("../../Util/sleep");
const x_util_1 = require("../../Util/x.util");
const e_x_do_tool_command_1 = require("../../Util/x.util/x.do.tool.commands/e.x.do.tool.command");
const launcher_abstract_1 = require("./launcher.abstract");
const SLEEP_TIME = 1000;
const PROCESS_CHECK_TIME = 5000;
const TMP_DIRECTORY = os.tmpdir();
class FirefoxLauncher extends launcher_abstract_1.ALauncher {
    get ProfileDirectory() {
        const name = this._profileName + '-' + format_1.format('%Y-%m-%d');
        return path.join(TMP_DIRECTORY, name);
    }
    get SleepTime() {
        return SLEEP_TIME;
    }
    _findWindow() {
        if (this.daemon) {
            return x_util_1.findWindows(true, {
                onlyVisible: true,
                pid: this.daemon.pid,
            });
        }
        else {
            return Promise.resolve([]);
        }
    }
    _preStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(`[SCREEN]`, JSON.stringify(yield x_util_1.getScreenGeometry()));
            yield fs_util_1.copy('./firefox.profile', this.ProfileDirectory);
        });
    }
    _postStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            const screenGeometry = yield x_util_1.getScreenGeometry();
            for (let screenId in screenGeometry) {
                const geometry = screenGeometry[screenId];
                if ((geometry.left === 0 && geometry.top === 0) !== this._main) {
                    delete screenGeometry[screenId];
                }
            }
            const screens = Object.keys(screenGeometry);
            const screenId = screens.length !== 0 ? screens[0] : undefined;
            let windows;
            while ((windows = yield this._findWindow()).length === 0) {
                yield sleep_1.sleep(this.SleepTime);
            }
            const commands = [];
            if (screenId !== undefined) {
                const { top, left, width, height } = screenGeometry[screenId];
                for (let window of windows) {
                    commands.push({
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_RESIZE,
                        sync: true,
                        window,
                        width,
                        height,
                    }, {
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_MOVE,
                        sync: true,
                        window,
                        x: left,
                        y: top,
                    }, {
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.MOUSE_MOVE,
                        sync: true,
                        polar: true,
                        window,
                        angle: 0,
                        distance: 0,
                    }, {
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.KEY,
                        window,
                        sync: true,
                        clearModifiers: true,
                        strokes: ['F11'],
                    });
                }
            }
            else {
                for (let window of windows) {
                    commands.push({
                        code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.WINDOW_UNMAP,
                        sync: true,
                        window,
                    });
                }
            }
            yield x_util_1.xDo(commands);
        });
    }
    _startDaemon() {
        return child_process_1.spawn('/usr/bin/firefox', [
            '-P', this._profileName,
            '--profile', this.ProfileDirectory,
            '--new-instance',
            '--class', `firefox-rik-${this._profileName}`,
            ...(Number.isSafeInteger(this._port) && this._port > 0 && this._port < 65536) ? ['--start-debugger-server', this._port.toString(10)] : [],
            this._url,
        ], {
            stdio: ['ignore', 'ignore', 'ignore'],
            detached: true,
        });
    }
    constructor(main, profileName, url, port) {
        super(PROCESS_CHECK_TIME);
        this._main = main;
        this._profileName = profileName;
        this._url = url;
        this._port = port;
    }
}
exports.FirefoxLauncher = FirefoxLauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWZveC5sYXVuY2hlci5hYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYXVuY2hlci9maXJlZm94LmxhdW5jaGVyLmFic3RyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpREFBb0Q7QUFDcEQseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3Qiw4Q0FBMkM7QUFDM0MsZ0RBQWtEO0FBQ2xELDRDQUF5QztBQUV6Qyw4Q0FBd0U7QUFFeEUsa0dBQTZGO0FBQzdGLDJEQUFnRDtBQUVoRCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDaEMsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWxDLHFCQUE2QixTQUFRLDZCQUFTO0lBTTFDLElBQVcsZ0JBQWdCO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLGVBQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFDaEIsT0FBTyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVPLFdBQVc7UUFDZixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDYixPQUFPLG9CQUFXLENBQ2QsSUFBSSxFQUNKO2dCQUNJLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO2FBQ3ZCLENBQ0osQ0FBQztTQUNMO2FBQU07WUFDSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDO0lBRWUsZUFBZTs7WUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVB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
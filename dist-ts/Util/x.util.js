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
const os_1 = require("os");
const stream = require("stream");
const x_do_tool_commands_1 = require("./x.util/x.do.tool.commands");
const e_x_do_tool_command_1 = require("./x.util/x.do.tool.commands/e.x.do.tool.command");
class ProcessKilled extends Error {
    constructor(pid, code, signal) {
        super(`Process ${pid} killed by ${signal}. Exited with code ${code}`);
        this.name = 'ProcessKilled';
        this.code = code;
        this.signal = signal;
        this.pid = pid;
    }
}
exports.ProcessKilled = ProcessKilled;
class ProcessError extends Error {
    constructor(pid, code, stderr) {
        super(`Process ${pid} failed: ${code}. Message: ${stderr}`);
        this.name = 'ProcessError';
        this.code = code;
        this.stderr = stderr;
        this.pid = pid;
    }
}
exports.ProcessError = ProcessError;
function execute(command, args, stdin, env) {
    return __awaiter(this, void 0, void 0, function* () {
        const child = child_process_1.spawn(command, args, { env: env || process.env, stdio: [stdin ? 'pipe' : 'ignore', 'pipe', 'pipe'] });
        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');
        if (stdin) {
            stdin.pipe(child.stdin);
        }
        const stdout = [];
        const stderr = [];
        child.stdout.on('data', (data) => stdout.push(typeof data === 'string' ? data : data.toString()));
        child.stderr.on('data', (data) => stderr.push(typeof data === 'string' ? data : data.toString()));
        function _finally() {
            child.removeAllListeners();
            child.stdout.removeAllListeners();
            child.stderr.removeAllListeners();
        }
        let _error = null;
        let _code = 0;
        let _signal = null;
        let _stderrPromise = new Promise(resolve => child.stdout.once('close', resolve));
        let _stdoutPromise = new Promise(resolve => child.stderr.once('close', resolve));
        yield new Promise((resolve, reject) => {
            function onChildExit(code, signal) {
                _signal = signal;
                _code = code;
                resolve();
            }
            child.once('exit', onChildExit);
            child.once('close', onChildExit);
            child.once('error', (e) => {
                _error = e;
                resolve();
            });
        });
        if (_error) {
            _finally();
            throw _error;
        }
        if (_code === 0) {
            yield _stdoutPromise;
            _finally();
            return stdout.join('');
        }
        else {
            yield _stderrPromise;
            _finally();
            if (_signal) {
                throw new ProcessKilled(child.pid, _code, _signal);
            }
            else {
                throw new ProcessError(child.pid, _code, stderr.join(''));
            }
        }
    });
}
exports.execute = execute;
function buildXDoToolScript(...commands) {
    return commands.map(x_do_tool_commands_1.ChainCommandProcessor.Instance.buildArgs).join(os_1.EOL) + os_1.EOL;
}
exports.buildXDoToolScript = buildXDoToolScript;
function xDo(commands, env) {
    const script = buildXDoToolScript(...commands);
    console.info(script);
    const input = new stream.PassThrough({ highWaterMark: script.length + 1 });
    input.end(script);
    return execute('xdotool', ['-'], input, env);
}
exports.xDo = xDo;
function findWindows(all, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stdout = yield xDo([Object.assign({}, options, { all, code: e_x_do_tool_command_1.X_DO_TOOL_COMMAND.SEARCH })]);
            console.info(`FIND WINDOWS`, JSON.stringify(stdout));
            return stdout.split(/\s+/).map((value) => parseInt(value, 10)).filter((value) => !isNaN(value));
        }
        catch (error) {
            if (error instanceof ProcessError && error.code === 1) {
                return [];
            }
            else {
                throw error;
            }
        }
    });
}
exports.findWindows = findWindows;
function getScreenGeometry() {
    return __awaiter(this, void 0, void 0, function* () {
        const stdout = yield execute('xrandr', []);
        const re = /^([A-Z0-9]+)\s+connected(?:\s+primary)?\s+(\d+)x(\d+)([+-]\d+)([+-]\d+)/;
        const matches = stdout
            .split(os_1.EOL)
            .map((line) => re.exec(line));
        const screens = {};
        for (let match of matches) {
            if (match) {
                const [_, name, widthStr, heightStr, leftStr, topStr] = match;
                screens[name] = {
                    width: parseInt(widthStr, 10),
                    height: parseInt(heightStr, 10),
                    left: parseInt(leftStr, 10),
                    top: parseInt(topStr, 10),
                };
            }
        }
        return screens;
    });
}
exports.getScreenGeometry = getScreenGeometry;
function getWindowGeometry(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const stdout = yield execute('xwininfo', ['-id', id.toString(10)]);
        const re = /^\s+-geometry\s+(\d+)x(\d+)([+-]\d+)([+-]\d+)/;
        const LeftRE = /^[\s]+Absolute upper-left X:[\s]+([+-]?[\d]+)[\s]*$/;
        const TopRE = /^[\s]+Absolute upper-left Y:[\s]+([+-]?[\d]+)[\s]*$/;
        const WidthRE = /^[\s]+Width:[\s]+([+-]?[\d]+)[\s]*$/;
        const HeightRE = /^[\s]+Height:[\s]+([+-]?[\d]+)[\s]*$/;
        const matches = stdout
            .split(os_1.EOL)
            .map((line) => ({
            left: LeftRE.exec(line),
            top: TopRE.exec(line),
            width: WidthRE.exec(line),
            height: HeightRE.exec(line),
        }));
        const result = {
            left: NaN,
            top: NaN,
            width: NaN,
            height: NaN,
        };
        for (let match of matches) {
            if (match.left) {
                result.left = parseInt(match.left[1], 10);
            }
            if (match.top) {
                result.top = parseInt(match.top[1], 10);
            }
            if (match.width) {
                result.width = parseInt(match.width[1], 10);
            }
            if (match.height) {
                result.height = parseInt(match.height[1], 10);
            }
        }
        return result;
    });
}
exports.getWindowGeometry = getWindowGeometry;
function getWindowsGeometry(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {};
        const promises = ids.map(getWindowGeometry).map((p) => p.catch((e) => e));
        for (let i = 0; i !== ids.length; ++i) {
            const geometry = yield promises[i];
            if (geometry instanceof Error) {
                throw geometry;
            }
            else {
                result[ids[i]] = geometry;
            }
        }
        return result;
    });
}
exports.getWindowsGeometry = getWindowsGeometry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieC51dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjLXRzL1V0aWwveC51dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxpREFBZ0Q7QUFDaEQsMkJBQXlCO0FBQ3pCLGlDQUFpQztBQUVqQyxvRUFBb0Y7QUFDcEYseUZBQW9GO0FBR3BGLG1CQUEyQixTQUFRLEtBQUs7SUFLcEMsWUFBbUIsR0FBVyxFQUFFLElBQVksRUFBRSxNQUFjO1FBQ3hELEtBQUssQ0FBQyxXQUFXLEdBQUcsY0FBYyxNQUFNLHNCQUFzQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQVpELHNDQVlDO0FBRUQsa0JBQTBCLFNBQVEsS0FBSztJQUtuQyxZQUFtQixHQUFXLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFDeEQsS0FBSyxDQUFDLFdBQVcsR0FBRyxZQUFZLElBQUksY0FBYyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVELElBQUksQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7Q0FDSjtBQVpELG9DQVlDO0FBWUQsaUJBQThCLE9BQWUsRUFBRSxJQUFjLEVBQUUsS0FBdUIsRUFBRSxHQUF1Qjs7UUFDM0csTUFBTSxLQUFLLEdBQUcscUJBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxP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
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
class ALauncher {
    constructor(processTestRunningInterval) {
        this._runningInterval = processTestRunningInterval;
        this._daemon = null;
    }
    getOutputDescriptor() {
        return __awaiter(this, void 0, void 0, function* () {
            return 2;
        });
    }
    get daemon() {
        return this._daemon;
    }
    _postStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                function onProcessExit(code, signal) {
                    if (signal) {
                        reject(new Error(`Process exited during testing time by ${signal}`));
                    }
                    else {
                        reject(new Error(`Process exited during testing time with code ${code}`));
                    }
                }
                function onProcessError(error) {
                    reject(error);
                }
                if (this._daemon) {
                    this._daemon.once('exit', onProcessExit);
                    this._daemon.once('close', onProcessExit);
                    this._daemon.once('error', onProcessError);
                    setTimeout(resolve, this._runningInterval);
                }
                else {
                    reject(new Error('Daemon not spawned'));
                }
            });
        });
    }
    _onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error(error);
            try {
                if (this.daemon) {
                    this.daemon.kill('SIGKILL');
                }
            }
            catch (error) {
                console.warn(error);
            }
            process.exitCode = 1;
        });
    }
    _finally() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._daemon) {
                this._daemon.removeAllListeners();
                this._daemon.unref();
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._preStartDaemon();
                this._daemon = this._startDaemon();
                yield this._postStartDaemon();
            }
            catch (error) {
                yield this._onError(error);
            }
            finally {
                yield this._finally();
            }
        });
    }
}
exports.ALauncher = ALauncher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoZXIuYWJzdHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGF1bmNoZXIvbGF1bmNoZXIuYWJzdHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBO0lBS0ksWUFBc0IsMEJBQWtDO1FBQ3BELElBQUksQ0FBQyxnQkFBZ0IsR0FBRywwQkFBMEIsQ0FBQztRQUNuRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRUssbUJBQW1COztZQUNyQixPQUFPLENBQUMsQ0FBQztRQUNiLENBQUM7S0FBQTtJQUVELElBQVcsTUFBTTtRQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBS2UsZ0JBQWdCOztZQUM1QixNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUN4Qyx1QkFBdUIsSUFBWSxFQUFFLE1BQXFCO29CQUN0RCxJQUFJLE1BQU0sRUFBRTt3QkFDUixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMseUNBQXlDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDeEU7eUJBQU07d0JBQ0gsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGdEQUFnRCxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQzdFO2dCQUNMLENBQUM7Z0JBRUQsd0JBQXdCLEtBQVk7b0JBQ2hDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbEIsQ0FBQztnQkFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7b0JBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDM0MsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDOUM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztpQkFDM0M7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtJQUVlLFFBQVEsQ0FBa0IsS0FBWTs7WUFDbEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJO2dCQUNBLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDYixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDL0I7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7YUFDdEI7WUFDRCxPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUN6QixDQUFDO0tBQUE7SUFFZSxRQUFROztZQUNwQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ3hCO1FBQ0wsQ0FBQztLQUFBO0lBRVksS0FBSzs7WUFDZCxJQUFJO2dCQUNBLE1BQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbkMsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUNqQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtvQkFBUztnQkFDTixNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUN6QjtRQUNMLENBQUM7S0FBQTtDQUNKO0FBNUVELDhCQTRFQyJ9
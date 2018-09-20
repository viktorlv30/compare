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
const net = require("net");
const sleep_1 = require("../../Util/sleep");
const launcher_abstract_1 = require("./launcher.abstract");
const Env_1 = require("../../ServerRIK/Env");
const SLEEP_TIME = 1000;
const PROCESS_CHECK_TIME = 5000;
const PROCESS_CHECK_TIME_OUT = 15000;
class NodeServerLauncher extends launcher_abstract_1.ALauncher {
    get SleepTime() {
        return SLEEP_TIME;
    }
    _preStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    _postStartDaemon() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.daemon) {
                const last = Date.now() + PROCESS_CHECK_TIME_OUT;
                let lastError = null;
                for (let attempt = 0; attempt < 10; ++attempt) {
                    const connection = new net.Socket();
                    let timeout;
                    connection.connect({
                        port: Env_1.Env.DIGI_PORT,
                        host: '127.0.0.1',
                    });
                    try {
                        yield new Promise((resolve, reject) => {
                            timeout = setTimeout(() => reject(new Error('Connection timeout')), last - Date.now());
                            connection.once('error', reject);
                            connection.once('connect', resolve);
                        });
                        return;
                    }
                    catch (error) {
                        lastError = error;
                        yield sleep_1.sleep(SLEEP_TIME);
                    }
                    finally {
                        connection.removeAllListeners();
                        connection.end();
                        connection.destroy();
                        connection.unref();
                    }
                }
                if (lastError) {
                    console.error(`DIGI START FAILED. Reason: ${lastError.name}: ${lastError.message}`);
                }
                throw new Error('Process start is timed out');
            }
            else {
                throw new Error('Daemon is not started');
            }
        });
    }
    _startDaemon() {
        return child_process_1.spawn('node', ['./services/digimanager/server.js'], {
            stdio: ['ignore', 1, 2],
            detached: true,
        });
    }
    constructor() {
        super(PROCESS_CHECK_TIME);
    }
}
if (require.main === module) {
    (new NodeServerLauncher()).start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5kaWdpLmxhdW5jaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0xhdW5jaGVyL25vZGUuZGlnaS5sYXVuY2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQW9EO0FBQ3BELDJCQUEyQjtBQUMzQiw0Q0FBeUM7QUFDekMsMkRBQWdEO0FBQ2hELDZDQUEwQztBQUUxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUM7QUFDaEMsTUFBTSxzQkFBc0IsR0FBRyxLQUFLLENBQUM7QUFFckMsd0JBQXlCLFNBQVEsNkJBQVM7SUFDdEMsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFZSxlQUFlOztRQUUvQixDQUFDO0tBQUE7SUFFZSxnQkFBZ0I7O1lBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsc0JBQXNCLENBQUM7Z0JBQ2pELElBQUksU0FBUyxHQUFpQixJQUFJLENBQUM7Z0JBQ25DLEtBQUssSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUU7b0JBQzNDLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNwQyxJQUFJLE9BQXFCLENBQUM7b0JBQzFCLFVBQVUsQ0FBQyxPQUFPLENBQUM7d0JBQ2YsSUFBSSxFQUFFLFNBQUcsQ0FBQyxTQUFTO3dCQUNuQixJQUFJLEVBQUUsV0FBVztxQkFDcEIsQ0FBQyxDQUFDO29CQUNILElBQUk7d0JBQ0EsTUFBTSxJQUFJLE9BQU8sQ0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs0QkFDeEMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDdkYsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7NEJBQ2pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUN4QyxDQUFDLENBQUMsQ0FBQzt3QkFDSCxPQUFPO3FCQUNWO29CQUFDLE9BQU8sS0FBSyxFQUFFO3dCQUNaLFNBQVMsR0FBRyxLQUFLLENBQUM7d0JBQ2xCLE1BQU0sYUFBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUMzQjs0QkFBUzt3QkFDTixVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDaEMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3JCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDdEI7aUJBQ0o7Z0JBQ0QsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsU0FBUyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztpQkFDdkY7Z0JBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUM1QztRQUNMLENBQUM7S0FBQTtJQUVTLFlBQVk7UUFDbEIsT0FBTyxxQkFBSyxDQUNSLE1BQU0sRUFDTixDQUFDLGtDQUFrQyxDQUFDLEVBQ3BDO1lBQ0ksS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkIsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEO1FBQ0ksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUN6QixDQUFDLElBQUksa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0NBQ3RDIn0=
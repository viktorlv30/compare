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
const launcher_abstract_1 = require("./launcher.abstract");
const SocketIO = require("socket.io-client");
const Env_1 = require("../../ServerRIK/Env");
const SLEEP_TIME = 1000;
const PROCESS_CHECK_TIME = 10000;
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
                const connection = SocketIO.connect(`http://127.0.0.1:${Env_1.Env.PORT}`, {
                    transports: ['websocket'],
                    timeout: 10000,
                    reconnectionAttempts: 10,
                });
                try {
                    yield new Promise((resolve, reject) => {
                        connection.once('error', reject);
                        connection.once('connect', resolve);
                        connection.once('connect_timeout', () => reject(new Error('Connection Timeout')));
                    });
                }
                catch (error) {
                    throw error;
                }
                finally {
                    connection.close();
                    connection.removeAllListeners();
                }
            }
            else {
                throw new Error('Daemon is not started');
            }
        });
    }
    _startDaemon() {
        return child_process_1.spawn('node', ['./dist-ts/ServerRIK/main.js'], {
            argv0: 'node-server',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5zZXJ2ZXIubGF1bmNoZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGF1bmNoZXIvbm9kZS5zZXJ2ZXIubGF1bmNoZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlEQUFvRDtBQUVwRCwyREFBZ0Q7QUFDaEQsNkNBQTZDO0FBQzdDLDZDQUEwQztBQUUxQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFFakMsd0JBQXlCLFNBQVEsNkJBQVM7SUFDdEMsSUFBVyxTQUFTO1FBQ2hCLE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFZSxlQUFlOztRQUUvQixDQUFDO0tBQUE7SUFFZSxnQkFBZ0I7O1lBQzVCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDYixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUMvQixvQkFBb0IsU0FBRyxDQUFDLElBQUksRUFBRSxFQUM5QjtvQkFDSSxVQUFVLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0JBQ3pCLE9BQU8sRUFBRSxLQUFLO29CQUNkLG9CQUFvQixFQUFFLEVBQUU7aUJBQzNCLENBQ0osQ0FBQztnQkFDRixJQUFJO29CQUNBLE1BQU0sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7d0JBQ3hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUVqQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RGLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNaLE1BQU0sS0FBSyxDQUFDO2lCQUNmO3dCQUFTO29CQUNOLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDbkIsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUM7aUJBQ25DO2FBQ0o7aUJBQU07Z0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztLQUFBO0lBRVMsWUFBWTtRQUNsQixPQUFPLHFCQUFLLENBQ1IsTUFBTSxFQUNOLENBQUMsNkJBQTZCLENBQUMsRUFDL0I7WUFDSSxLQUFLLEVBQUUsYUFBYTtZQUNwQixLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QixRQUFRLEVBQUUsSUFBSTtTQUNWLENBQ1gsQ0FBQztJQUNOLENBQUM7SUFFRDtRQUNJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDSjtBQUVELElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7SUFDekIsQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUN0QyJ9
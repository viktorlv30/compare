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
class Inspector {
    constructor(port, host, wait) {
        this._procEnvKey = 'DEBUGGER';
        port ? this._port = port : this._port = 9229;
        host ? this._host = host : this._host = '0.0.0.0';
        wait ? this._wait = wait : this._wait = false;
    }
    get Host() {
        return this._host;
    }
    get Port() {
        return this._port;
    }
    get IsWait() {
        return this._wait;
    }
    static Instance(port, host, wait) {
        return new this(port, host, wait);
    }
    Start(isIgnoreCMD) {
        if (isIgnoreCMD === true || (isIgnoreCMD === false && process.env[this._procEnvKey] === 'true')) {
            console.info(`[DEBUGGER] Run: '${this._host}:${this._port}', wait: '${this._wait}'.`);
            this._inspector = require('inspector');
            this._inspector.open(this._port, this._host, this._wait);
            process.on('exit', () => __awaiter(this, void 0, void 0, function* () {
                yield this._inspector.close();
                this._inspector = undefined;
                this._host = undefined;
                this._port = undefined;
                this._wait = undefined;
            }));
        }
        else {
            console.info(`DEBUGGER not running, DEBUGGER env !== 'true' or 'isIgnoreCMD' !== 'true'.`);
        }
    }
    Stop() {
        (() => __awaiter(this, void 0, void 0, function* () {
            if (this._inspector) {
                console.log(`Stopping debugger: `, this._inspector.url());
                yield this._inspector.close();
                this._inspector = undefined;
                this._host = undefined;
                this._port = undefined;
                this._wait = undefined;
            }
        }))();
    }
}
exports.Inspector = Inspector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5zcGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjLXRzL0NvbW1vbi9JbnNwZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBO0lBT0ksWUFBb0IsSUFBeUIsRUFBRSxJQUF5QixFQUFFLElBQTBCO1FBRjVGLGdCQUFXLEdBQVcsVUFBVSxDQUFDO1FBR3JDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQzdDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ2xELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFRCxJQUFJLElBQUk7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQUksSUFBSTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWEsRUFBRSxJQUFhLEVBQUUsSUFBYztRQUN4RCxPQUFPLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQVFELEtBQUssQ0FBQyxXQUFvQjtRQUN0QixJQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLE1BQU0sQ0FBQyxFQUFFO1lBQzdGLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssYUFBYSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE9BQXdCLENBQUMsRUFBRSxDQUFDLE1BQWdCLEVBQUUsR0FBUyxFQUFFO2dCQUN0RCxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2dCQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyw0RUFBNEUsQ0FBQyxDQUFDO1NBQzlGO0lBQ0wsQ0FBQztJQUVELElBQUk7UUFDQSxDQUFDLEdBQVMsRUFBRTtZQUNSLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0JBQzFELE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7YUFDMUI7UUFDTCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0NBRUo7QUFqRUQsOEJBaUVDIn0=
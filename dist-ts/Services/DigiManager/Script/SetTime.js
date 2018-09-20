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
class SetTime {
    static Time(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let time = SetTime.TimeConverter(data);
                let cmd = `sudo /bizstorecard/bizerba/programs/bos_dateconfig.sh --date '${time}' --timezone UTC`;
                let [stdout, stderr] = yield SetTime.Run(cmd);
            }
            catch (error) {
                console.error('[SetTime][Time]', error);
            }
        });
    }
    static TimeConverter(UNIX_timestamp) {
        try {
            let a = new Date(UNIX_timestamp * 1000);
            let year = a.getFullYear();
            let month = SetTime.AddZerro(a.getMonth() + 1);
            let date = SetTime.AddZerro(a.getDate());
            let hour = SetTime.AddZerro(a.getHours());
            let min = SetTime.AddZerro(a.getMinutes());
            let sec = SetTime.AddZerro(a.getSeconds());
            return `${year}-${month}-${date} ${hour}:${min}:${sec}`;
        }
        catch (error) {
            console.error('[SetTime][TimeConverter]', error);
            throw error;
        }
    }
    static AddZerro(param) {
        try {
            return (param < 10) ? `0${param}` : `${param}`;
        }
        catch (error) {
            console.error('[SetTime][AddZerro]', error);
            throw error;
        }
    }
    static Run(cmd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = [];
                child_process_1.exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        console.error('[SetTime][Run]', error);
                    }
                    else {
                        result.push(stdout, stderr);
                    }
                });
                return result;
            }
            catch (error) {
                console.error('[SetTime][Run]', error);
                throw error;
            }
        });
    }
}
exports.SetTime = SetTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0VGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9EaWdpTWFuYWdlci9TY3JpcHQvU2V0VGltZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQXFDO0FBRXJDO0lBQ1csTUFBTSxDQUFPLElBQUksQ0FBQyxJQUFZOztZQUNqQyxJQUFJO2dCQUNBLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksR0FBRyxHQUFHLGlFQUFpRSxJQUFJLGtCQUFrQixDQUFDO2dCQUNsRyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqRDtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDM0M7UUFDTCxDQUFDO0tBQUE7SUFFTyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQXNCO1FBQy9DLElBQUk7WUFDQSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDeEMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDekMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxQyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFFM0MsT0FBTyxHQUFHLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7U0FDM0Q7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsTUFBTSxLQUFLLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWE7UUFDakMsSUFBSTtZQUNBLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUM7U0FDbEQ7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDNUMsTUFBTSxLQUFLLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFTyxNQUFNLENBQU8sR0FBRyxDQUFDLEdBQVc7O1lBQ2hDLElBQUk7Z0JBQ0EsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO2dCQUMxQixvQkFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUU7b0JBQ2hDLElBQUksS0FBSyxFQUFFO3dCQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7cUJBQzFDO3lCQUFNO3dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUMvQjtnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFFSCxPQUFPLE1BQU0sQ0FBQzthQUNqQjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sS0FBSyxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXRERCwwQkFzREMifQ==
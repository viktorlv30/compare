"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AGuardedCommandProcessor {
    buildArgs(command) {
        if (this._guard(command)) {
            return this._process(command);
        }
        else {
            return undefined;
        }
    }
}
exports.AGuardedCommandProcessor = AGuardedCommandProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VhcmRlZC5jb21tYW5kLnByb2Nlc3Nvci5hYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9VdGlsL3gudXRpbC94LmRvLnRvb2wuY29tbWFuZHMvZ3VhcmRlZC5jb21tYW5kLnByb2Nlc3Nvci5hYnN0cmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBO0lBR1csU0FBUyxDQUE4QyxPQUF3QjtRQUNsRixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO2FBQU07WUFDSCxPQUFPLFNBQVMsQ0FBQztTQUNwQjtJQUNMLENBQUM7Q0FDSjtBQVZELDREQVVDIn0=
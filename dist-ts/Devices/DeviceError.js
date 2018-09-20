"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DeviceError extends Error {
    constructor(name, code, message) {
        super(message);
        this.name = name;
        this.code = code;
    }
    toJSON() {
        return {
            name: this.name,
            code: this.code,
            message: this.message,
        };
    }
}
exports.DeviceError = DeviceError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV2aWNlRXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMtdHMvRGV2aWNlcy9EZXZpY2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLGlCQUF5QixTQUFRLEtBQUs7SUFFbEMsWUFBWSxJQUFZLEVBQUUsSUFBWSxFQUFFLE9BQWU7UUFDbkQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPO1lBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3hCLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFmRCxrQ0FlQyJ9
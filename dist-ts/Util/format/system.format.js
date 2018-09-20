"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SystemFormat {
    constructor() { }
    init(fullString) { }
    replace(match, replacer, offset, fullString) {
        switch (replacer) {
            case 'u':
                return process.getuid().toString();
            case 'g':
                return process.getgid().toString();
            case 'P':
                return process.pid.toString();
        }
        return undefined;
    }
}
exports.SystemFormat = SystemFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLmZvcm1hdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9VdGlsL2Zvcm1hdC9zeXN0ZW0uZm9ybWF0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSxnQkFBc0IsQ0FBQztJQUVoQixJQUFJLENBQXFCLFVBQWtCLElBQVMsQ0FBQztJQUVyRCxPQUFPLENBQXFCLEtBQWEsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxVQUFrQjtRQUNsRyxRQUFRLFFBQVEsRUFBRTtZQUNsQixLQUFLLEdBQUc7Z0JBQ0osT0FBTyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdkMsS0FBSyxHQUFHO2dCQUNKLE9BQU8sT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssR0FBRztnQkFDSixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUFoQkQsb0NBZ0JDIn0=
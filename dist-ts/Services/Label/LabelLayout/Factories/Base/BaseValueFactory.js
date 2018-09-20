"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseValueFactory {
    constructor() {
        this.DotPerMM = 8;
        this.PixelMultiplayer = 1000 / this.DotPerMM;
        this._storage = new Map();
        this.Init();
    }
    GetValue(key) {
        let value = this._storage.get(key);
        return value === undefined ? null : value;
    }
    SetValue(key, value) {
        this._storage.set(key, value);
    }
}
exports.BaseValueFactory = BaseValueFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZVZhbHVlRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbExheW91dC9GYWN0b3JpZXMvQmFzZS9CYXNlVmFsdWVGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFLSTtRQUVJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFPTSxRQUFRLENBQUMsR0FBUTtRQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFUyxRQUFRLENBQUMsR0FBUSxFQUFFLEtBQVU7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDSjtBQTFCRCw0Q0EwQkMifQ==
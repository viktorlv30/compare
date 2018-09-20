"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KeepFormat {
    constructor(accepted) {
        this._accept = new Set(accepted);
    }
    init(fullString) { }
    replace(match, replacer, offset, fullString) {
        return this._accept.has(replacer) ? replacer : undefined;
    }
}
exports.KeepFormat = KeepFormat;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2VlcC5mb3JtYXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvVXRpbC9mb3JtYXQva2VlcC5mb3JtYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQUVJLFlBQW1CLFFBQWtCO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLElBQUksQ0FBbUIsVUFBa0IsSUFBRyxDQUFDO0lBRTdDLE9BQU8sQ0FBbUIsS0FBYSxFQUFFLFFBQWdCLEVBQUUsTUFBYyxFQUFFLFVBQWtCO1FBQ2hHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdELENBQUM7Q0FDSjtBQVhELGdDQVdDIn0=
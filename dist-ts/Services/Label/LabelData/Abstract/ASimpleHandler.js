"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AHandler_1 = require("./AHandler");
class ASimpleHandler extends AHandler_1.AHandler {
    constructor(fieldName) {
        if (typeof fieldName === 'number' && fieldName < 0) {
            throw new Error(`Incorrect field name '${fieldName}'`);
        }
        super();
        this._fieldName = fieldName;
    }
    get CurrentField() {
        return this._fieldName;
    }
    Handle(request, fieldName) {
        if (this.CurrentField === fieldName) {
            return this.RequestHandler(request);
        }
        else {
            return {
                value: null,
                done: false
            };
        }
    }
}
exports.ASimpleHandler = ASimpleHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQVNpbXBsZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxEYXRhL0Fic3RyYWN0L0FTaW1wbGVIYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBSUEseUNBQXNDO0FBU3RDLG9CQUFxQyxTQUFRLG1CQUFRO0lBTWpELFlBQVksU0FBNEI7UUFDcEMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtZQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQzFEO1FBQ0QsS0FBSyxFQUFFLENBQUM7UUFDUixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxZQUFZO1FBQ1osT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBdUIsRUFBRSxTQUE0QjtRQUN4RCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBRUgsT0FBTztnQkFDSCxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUUsS0FBSzthQUNkLENBQUE7U0FDSjtJQUNMLENBQUM7Q0FRSjtBQXBDRCx3Q0FvQ0MifQ==
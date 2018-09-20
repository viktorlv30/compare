"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const BaseValueFactory_1 = require("../Base/BaseValueFactory");
class UniqueIdFactory extends BaseValueFactory_1.BaseValueFactory {
    Init() {
    }
    GetValue(params) {
        return uuid_1.v4();
    }
}
exports.UniqueIdFactory = UniqueIdFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5pcXVlSWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvTGFiZWwvTGFiZWxMYXlvdXQvRmFjdG9yaWVzL0NvbmNyZXRlRmFjdG9yaWVzL1VuaXF1ZUlkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQTBCO0FBRTFCLCtEQUE0RDtBQUU1RCxxQkFBNkIsU0FBUSxtQ0FBZ0I7SUFDdkMsSUFBSTtJQUdkLENBQUM7SUFHRCxRQUFRLENBQUMsTUFBYTtRQUNsQixPQUFPLFNBQUUsRUFBRSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQVZELDBDQVVDIn0=
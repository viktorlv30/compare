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
const rik_db_1 = require("rik-db");
const Env_1 = require("../../ServerRIK/Env");
class Migrate {
    constructor(dbUserPostgresConfig, dbUserScaleConfig) {
        this._configPostgres = dbUserPostgresConfig;
        this._configScale = dbUserScaleConfig;
    }
    RunMigrate() {
        return __awaiter(this, void 0, void 0, function* () {
            const configMigrate = new rik_db_1.VersionMigrate(Env_1.Env.DATABASE_MIGRATE_LAST, Env_1.Env.DATABASE_MIGRATE_SPECIFIC);
            const rikMigrate = new rik_db_1.RikMigrate(this._configPostgres, this._configScale);
            yield rikMigrate.RunMigrate(configMigrate);
        });
    }
}
exports.Migrate = Migrate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlncmF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9EYXRhYmFzZS9NaWdyYXRpb25zL01pZ3JhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUErRDtBQUMvRCw2Q0FBeUM7QUFHekM7SUFHSSxZQUFZLG9CQUErQixFQUFFLGlCQUE0QjtRQUNyRSxJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLElBQUksQ0FBQyxZQUFZLEdBQUcsaUJBQWlCLENBQUM7SUFDMUMsQ0FBQztJQUVLLFVBQVU7O1lBQ1osTUFBTSxhQUFhLEdBQUcsSUFBSSx1QkFBYyxDQUFDLFNBQUcsQ0FBQyxxQkFBcUIsRUFBRSxTQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNuRyxNQUFNLFVBQVUsR0FBRyxJQUFJLG1CQUFVLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFM0UsTUFBTSxVQUFVLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtDQUVKO0FBZkQsMEJBZUMifQ==
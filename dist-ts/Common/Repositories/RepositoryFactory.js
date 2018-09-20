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
const RepositoryFactoryV6_1 = require("./RepositoryFactoryV6");
class RepositoryFactory {
    static GetInstance() {
        return RepositoryFactory.Instance ? RepositoryFactory.Instance : (RepositoryFactory.Instance = new RepositoryFactory());
    }
    GetRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentVersion = yield RepositoryFactory._getCurrentVersion();
                if (currentVersion.current_version) {
                    switch (currentVersion.current_version) {
                        case "0.0.0.6":
                        case "0.0.0.7":
                        case "0.0.12.0":
                        case "0.0.13.0":
                        case "0.1.1.0":
                            return RepositoryFactoryV6_1.RepositoryFactoryV6.GetInstance();
                        default:
                            throw new Error(`The repository of version "${currentVersion.current_version}" does not exists!`);
                    }
                }
                else {
                    throw new Error('Fatal error! No versions of the program exists.');
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    constructor() {
        if (RepositoryFactory.Instance === undefined || RepositoryFactory.Instance === null) {
            this.SetDbConfig();
            return RepositoryFactory.Instance = this;
        }
        return RepositoryFactory.Instance;
    }
    static _getCurrentVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let version = yield rik_db_1.Version.query().orderBy('id', 'desc').first();
                if (version) {
                    return version;
                }
                else {
                    return new rik_db_1.Version();
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    SetDbConfig(configuration) {
        try {
            const config = configuration || {
                client: 'pg',
                connection: {
                    host: '127.0.0.1',
                    user: 'scale',
                    password: '111',
                    database: 'scale',
                    port: '5432'
                }
            };
            rik_db_1.DbSettings.setConfig(config);
        }
        catch (error) {
            console.error('[RepositoryFactory][SetDbConfig]', error);
            throw error;
        }
    }
}
exports.RepositoryFactory = RepositoryFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvQ29tbW9uL1JlcG9zaXRvcmllcy9SZXBvc2l0b3J5RmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsbUNBQWtFO0FBR2xFLCtEQUE0RDtBQUU1RDtJQUlXLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzVILENBQUM7SUFLWSxhQUFhOztZQUN0QixJQUFJO2dCQUNBLElBQUksY0FBYyxHQUFHLE1BQU0saUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDbEUsSUFBSSxjQUFjLENBQUMsZUFBZSxFQUFFO29CQUNoQyxRQUFRLGNBQWMsQ0FBQyxlQUFlLEVBQUU7d0JBQ3BDLEtBQUssU0FBUyxDQUFDO3dCQUNmLEtBQUssU0FBUyxDQUFDO3dCQUVmLEtBQUssVUFBVSxDQUFDO3dCQUNoQixLQUFLLFVBQVUsQ0FBQzt3QkFDaEIsS0FBSyxTQUFTOzRCQUNWLE9BQU8seUNBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzdDOzRCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLGNBQWMsQ0FBQyxlQUFlLG9CQUFvQixDQUFDLENBQUM7cUJBQ3pHO2lCQUNKO3FCQUNJO29CQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztpQkFDdEU7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sS0FBSyxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7SUFFRDtRQUNJLElBQUksaUJBQWlCLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ2pGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUVuQixPQUFPLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDNUM7UUFFRCxPQUFPLGlCQUFpQixDQUFDLFFBQVEsQ0FBQztJQUN0QyxDQUFDO0lBRU8sTUFBTSxDQUFPLGtCQUFrQjs7WUFDbkMsSUFBSTtnQkFDQSxJQUFJLE9BQU8sR0FBRyxNQUFNLGdCQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDbEUsSUFBSSxPQUFPLEVBQUU7b0JBQ1QsT0FBTyxPQUFPLENBQUM7aUJBQ2xCO3FCQUNJO29CQUNELE9BQU8sSUFBSSxnQkFBTyxFQUFFLENBQUM7aUJBQ3hCO2FBQ0o7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDWixNQUFNLEtBQUssQ0FBQzthQUNmO1FBQ0wsQ0FBQztLQUFBO0lBRUQsV0FBVyxDQUFDLGFBQXlCO1FBQ2pDLElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBYyxhQUFhLElBQUk7Z0JBQ3ZDLE1BQU0sRUFBRSxJQUFJO2dCQUNaLFVBQVUsRUFBRTtvQkFDUixJQUFJLEVBQUUsV0FBVztvQkFDakIsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEtBQUs7b0JBQ2YsUUFBUSxFQUFFLE9BQU87b0JBQ2pCLElBQUksRUFBRSxNQUFNO2lCQUNmO2FBQ0osQ0FBQztZQUNGLG1CQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3pELE1BQU0sS0FBSyxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0NBQ0o7QUE3RUQsOENBNkVDIn0=
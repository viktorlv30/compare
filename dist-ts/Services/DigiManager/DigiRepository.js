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
const DigiRepositoryV6_1 = require("./DigiRepositoryV6");
class DigiRepository {
    static GetRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let currentVersion = yield DigiRepository._getCurrentVersion();
                if (currentVersion.current_version) {
                    switch (currentVersion.current_version) {
                        case "0.0.0.6":
                            return DigiRepositoryV6_1.DigiRepositoryV6.GetInstance();
                        default:
                            throw new Error(`The program version "${currentVersion.current_version}" does not exists!`);
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
    constructor() {
        if (!DigiRepository._instance) {
            return DigiRepository._instance = this;
        }
        return DigiRepository._instance;
    }
}
exports.DigiRepository = DigiRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlnaVJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvRGlnaU1hbmFnZXIvRGlnaVJlcG9zaXRvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1DQUEyQztBQUUzQyx5REFBc0Q7QUFFdEQ7SUFHVyxNQUFNLENBQU8sYUFBYTs7WUFDN0IsSUFBSTtnQkFDQSxJQUFJLGNBQWMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUMvRCxJQUFJLGNBQWMsQ0FBQyxlQUFlLEVBQUU7b0JBQ2hDLFFBQVEsY0FBYyxDQUFDLGVBQWUsRUFBRTt3QkFDcEMsS0FBSyxTQUFTOzRCQUNWLE9BQU8sbUNBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQzFDOzRCQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLGNBQWMsQ0FBQyxlQUFlLG9CQUFvQixDQUFDLENBQUM7cUJBQ25HO2lCQUNKO3FCQUNJO29CQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztpQkFDdEU7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sS0FBSyxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7SUFFTyxNQUFNLENBQU8sa0JBQWtCOztZQUNuQyxJQUFJO2dCQUNBLElBQUksT0FBTyxHQUFHLE1BQU0sZ0JBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNsRSxJQUFJLE9BQU8sRUFBRTtvQkFDVCxPQUFPLE9BQU8sQ0FBQztpQkFDbEI7cUJBQ0k7b0JBQ0QsT0FBTyxJQUFJLGdCQUFPLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE1BQU0sS0FBSyxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7SUFFRDtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxFQUFFO1lBQzNCLE9BQU8sY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDMUM7UUFFRCxPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUM7SUFDcEMsQ0FBQztDQUNKO0FBM0NELHdDQTJDQyJ9
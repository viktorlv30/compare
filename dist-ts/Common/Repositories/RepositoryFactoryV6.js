"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RikRepositoryV6_1 = require("../../Database/RikRepositoryV6");
const DigiRepositoryV6_1 = require("../../Services/DigiManager/DigiRepositoryV6");
class RepositoryFactoryV6 {
    static GetInstance() {
        return RepositoryFactoryV6._instance ? RepositoryFactoryV6._instance : (RepositoryFactoryV6._instance = new RepositoryFactoryV6());
    }
    constructor() {
        if (RepositoryFactoryV6._instance) {
            return RepositoryFactoryV6._instance = this;
        }
        return RepositoryFactoryV6._instance;
    }
    GetRikRepository() {
        try {
            return RikRepositoryV6_1.RikRepositoryV6.GetInstance();
        }
        catch (error) {
            console.error('[RepositoryFactoryV6][GetRikRepository]', error);
            throw error;
        }
    }
    GetDigiRepository() {
        try {
            return DigiRepositoryV6_1.DigiRepositoryV6.GetInstance();
        }
        catch (error) {
            console.error('[RepositoryFactoryV6][GetDigiRepository]', error);
            throw error;
        }
    }
}
exports.RepositoryFactoryV6 = RepositoryFactoryV6;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeUZhY3RvcnlWNi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9Db21tb24vUmVwb3NpdG9yaWVzL1JlcG9zaXRvcnlGYWN0b3J5VjYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxvRUFBaUU7QUFDakUsa0ZBQStFO0FBRy9FO0lBSVcsTUFBTSxDQUFDLFdBQVc7UUFDckIsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDdkksQ0FBQztJQUtEO1FBQ0ksSUFBSSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUU7WUFDL0IsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQy9DO1FBRUQsT0FBTyxtQkFBbUIsQ0FBQyxTQUFTLENBQUE7SUFDeEMsQ0FBQztJQUVNLGdCQUFnQjtRQUNuQixJQUFJO1lBQ0EsT0FBTyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLHlDQUF5QyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sS0FBSyxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBQ00saUJBQWlCO1FBQ3BCLElBQUk7WUFDQSxPQUFPLG1DQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3pDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLDBDQUEwQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0NBQ0o7QUFuQ0Qsa0RBbUNDIn0=
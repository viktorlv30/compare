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
const Env_1 = require("../../ServerRIK/Env");
const RepositoryFactory_1 = require("../../Common/Repositories/RepositoryFactory");
class KeyboardStatisticService {
    static get Instance() {
        return KeyboardStatisticService._instance ? KeyboardStatisticService._instance : new KeyboardStatisticService();
    }
    constructor() {
        if (KeyboardStatisticService._instance) {
            throw new Error('Invalid usage. Singleton');
        }
        KeyboardStatisticService._instance = this;
        this._reserveStatisticInterval = 60 * 1000;
        this._saveStatisticInterval = this.GetDefaultStatisticInterval();
        this._statisticCache = Object.create(null);
        console.log(`[KB-STATISTIC] Started collecting keyboard statistic with interval: ${this._saveStatisticInterval / 1000} seconds`);
        this.SaveStatisticByInterval();
    }
    Logging(value) {
        this.CacheDataBetweenSaving(value);
    }
    GetStatisticInterval() {
        return this._saveStatisticInterval;
    }
    SetStatisticInterval(interval) {
        console.log(`[KB-STATISTIC] set new interval:`, interval);
        this._saveStatisticInterval = interval;
    }
    CalculateStatisticPeriods(interval) {
        const start = Date.now();
        const end = start + interval - start % interval;
        this._startStatisticPeriod = start;
        this._endStatisticPeriod = end;
        return { start, end };
    }
    GetDefaultStatisticInterval() {
        let defInterval = Env_1.Env.KEYBOARD_STATISTIC_INTERVAL;
        if (typeof defInterval === 'string') {
            defInterval = parseFloat(defInterval);
        }
        if (isNaN(defInterval)) {
            console.warn(`[WARNING][KB-STATISTIC] The reserve statistic interval is used!`);
            defInterval = this._reserveStatisticInterval;
        }
        return defInterval;
    }
    GetDbRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._repository) {
                return this._repository;
            }
            else {
                const factory = yield RepositoryFactory_1.RepositoryFactory.GetInstance().GetRepository();
                this._repository = factory.GetRikRepository();
                return this._repository;
            }
        });
    }
    CacheDataBetweenSaving(value) {
        const statisticEntityItem = this.CreateStatisticEntity(value);
        this._statisticCache = Object.assign(this._statisticCache, statisticEntityItem);
        return this._statisticCache;
    }
    CreateStatisticEntity(value) {
        const periodStart = this._startStatisticPeriod;
        const periodEnd = this._endStatisticPeriod;
        const isAlreadyInCache = !!this._statisticCache[value.button];
        const previousCount = isAlreadyInCache ? this._statisticCache[value.button].count : 0;
        const count = previousCount + 1;
        const statisticEntityItem = {
            [value.button]: { lang: value.lang, periodStart, periodEnd, count }
        };
        return statisticEntityItem;
    }
    ClearStatisticCache() {
        const oldCache = Object.assign(Object.create(null), this._statisticCache);
        this._statisticCache = Object.create(null);
        return oldCache;
    }
    SaveStatistic() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = yield this.GetDbRepository();
                const statistic = this.ClearStatisticCache();
                yield repo.saveKeyboardStatistic(statistic);
            }
            catch (error) {
                console.error(`[KB-STATISTIC][ERROR] ${error.message}`);
            }
        });
    }
    SaveStatisticByInterval() {
        const { start, end } = this.CalculateStatisticPeriods(this.GetStatisticInterval());
        const currentTimeout = end - start;
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.SaveStatistic();
            this.SaveStatisticByInterval();
        }), currentTimeout);
    }
}
exports.KeyboardStatisticService = KeyboardStatisticService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5Ym9hcmRTdGF0aXN0aWNTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0tleWJvYXJkU3RhdGlzdGljL0tleWJvYXJkU3RhdGlzdGljU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNkNBQTBDO0FBRTFDLG1GQUFnRjtBQVdoRjtJQVVXLE1BQU0sS0FBSyxRQUFRO1FBQ3RCLE9BQU8sd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksd0JBQXdCLEVBQUUsQ0FBQztJQUNwSCxDQUFDO0lBRUQ7UUFDSSxJQUFJLHdCQUF3QixDQUFDLFNBQVMsRUFBRTtZQUNwQyxNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7U0FDL0M7UUFDRCx3QkFBd0IsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzNDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNqRSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1RUFBdUUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksVUFBVSxDQUFDLENBQUM7UUFDakksSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQU9ELE9BQU8sQ0FBaUMsS0FBdUI7UUFFM0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFLRCxvQkFBb0I7UUFDaEIsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFDdkMsQ0FBQztJQUtELG9CQUFvQixDQUFDLFFB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
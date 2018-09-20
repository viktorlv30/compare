"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const E_PRODUCT_TYPE_1 = require("../../Enums/E_PRODUCT_TYPE");
const CommonHelper_1 = require("../../Common/CommonHelper");
const Util_1 = require("../../Common/Util");
class FieldChecker {
    static Tfzu(data) {
        let result = {
            isCorrect: true,
            describe: 'Errors:'
        };
        if (!(data.hasOwnProperty('ECO1') && (Util_1.Util.isNumber(data.ECO1) || Util_1.Util.isString(data.ECO1)))) {
            result.isCorrect = false;
            result.describe += ' ECO1,';
        }
        if (!(data.hasOwnProperty('PNUM') && (Util_1.Util.isNumber(data.PNUM) || Util_1.Util.isString(data.PNUM)))) {
            result.isCorrect = false;
            result.describe += ' PNUM,';
        }
        if (!(data.hasOwnProperty('KLAR') && (Util_1.Util.isNumber(data.KLAR) || Util_1.Util.isString(data.KLAR)))) {
            result.isCorrect = false;
            result.describe += ' KLAR,';
        }
        if (!(data.hasOwnProperty('STZW') && (Util_1.Util.isNumber(data.STZW) || Util_1.Util.isString(data.STZW)))) {
            result.isCorrect = false;
            result.describe += ' STZW,';
        }
        if (!(data.hasOwnProperty('STPA') && (Util_1.Util.isNumber(data.STPA) || Util_1.Util.isString(data.STPA)))) {
            result.isCorrect = false;
            result.describe += ' STPA,';
        }
        if (!(data.hasOwnProperty('ECTR') && (Util_1.Util.isNumber(data.ECTR) || Util_1.Util.isString(data.ECTR)))) {
            result.isCorrect = false;
            result.describe += ' ECTR,';
        }
        if (!(data.hasOwnProperty('HBA1') && (Util_1.Util.isNumber(data.HBA1) || Util_1.Util.isString(data.HBA1)))) {
            result.isCorrect = false;
            result.describe += ' HBA1,';
        }
        if (!(data.hasOwnProperty('HALB') && (Util_1.Util.isNumber(data.HALB) || Util_1.Util.isString(data.HALB)))) {
            result.isCorrect = false;
            result.describe += ' HALB,';
        }
        if (!(data.hasOwnProperty('FZ_TFZU_1') && (Util_1.Util.isNumber(data.FZ_TFZU_1) || Util_1.Util.isString(data.FZ_TFZU_1)))) {
            result.isCorrect = false;
            result.describe += ' FZ_TFZU_1,';
        }
        if (!(data.hasOwnProperty('FZ_TFZU_3') && (Util_1.Util.isNumber(data.FZ_TFZU_3) || Util_1.Util.isString(data.FZ_TFZU_3)))) {
            result.isCorrect = false;
            result.describe += ' FZ_TFZU_3,';
        }
        if (!(data.hasOwnProperty('FZ_TFZU_4') && (Util_1.Util.isNumber(data.FZ_TFZU_4) || Util_1.Util.isString(data.FZ_TFZU_4)))) {
            result.isCorrect = false;
            result.describe += ' FZ_TFZU_4';
        }
        return result;
    }
    static Cowe(cowe, units) {
        let result;
        switch (cowe) {
            case E_PRODUCT_TYPE_1.E_PT_COWE.WEIGHT:
                result = units.weight || null;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COWE.NUMBER_OF_PIECES:
                result = units.quantity || null;
                break;
            default:
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid code value: ${cowe}`);
                result = null;
        }
        return result;
    }
    static Cost(cost) {
        let result;
        switch (cost) {
            case E_PRODUCT_TYPE_1.E_PT_COST.ZERO:
                result = 0;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.THREE:
                result = 3;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.FOUR:
                result = 4;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.FIVE:
                result = 5;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.SIX:
                result = 6;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.SEVEN:
                result = 7;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.EIGHT:
                result = 8;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COST.NINE:
                result = 9;
                break;
            default:
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid code digits for code value: ${cost}`);
                result = null;
        }
        return result;
    }
    static Coop(coop) {
        let result;
        switch (coop) {
            case E_PRODUCT_TYPE_1.E_PT_COOP.FACTOR_ONE:
                result = 1;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COOP.FACTOR_TEN:
                result = 10;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COOP.DIV_TEN:
                result = 0.1;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COOP.DIV_HUNDRED:
                result = 0.01;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COOP.FACTOR_FLOAT:
                result = 1000;
                break;
            default:
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid weighting factor/floating comma (COOP): ${coop}`);
                result = null;
        }
        return result;
    }
    static Coty(coty) {
        let result;
        switch (coty) {
            case E_PRODUCT_TYPE_1.E_PT_COTY.EAN13:
                result = 12;
                break;
            case E_PRODUCT_TYPE_1.E_PT_COTY.EAN8:
                result = 7;
                break;
            default:
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid code type (COTY) ${coty}`);
                result = null;
        }
        return result;
    }
    static Coin(coin, code, article) {
        let result = '';
        if (!(/^[0-9abdgklprstvwx]{3,6}$/i.test(coin) || coin === '')) {
            console.error(`[SERVER][ERROR] Article was created wrong! Invalid code contents (COIN) ${coin}`);
            result = null;
            return result;
        }
        let tmpCoin = coin;
        let match;
        while (tmpCoin.length !== 0) {
            match = /^[0-9]+/.exec(tmpCoin);
            if (match) {
                tmpCoin = tmpCoin.slice(match[0].length);
                result += match[0];
                continue;
            }
            match = /^A{1,3}/i.exec(tmpCoin);
            if (match) {
                tmpCoin = tmpCoin.slice(match[0].length);
                result += CommonHelper_1.CommonHelper.PadStart(article.ABNU, match[0].length, '0');
                continue;
            }
            match = /^B+/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Consecutive scale-specific ticket No.`);
                result = null;
                break;
            }
            match = /^DDLL/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Mixed input, e. g. day with 2 digits and consecutive ticket number with 2 digits`);
                result = null;
                break;
            }
            match = /^DD/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Day with 2 digits`);
                result = null;
                break;
            }
            match = /^GG/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Scale (device) No. with maximum 2 digits`);
                result = null;
                break;
            }
            match = /^K{1,6}/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Customer number with maximum 6 digits`);
                result = null;
                break;
            }
            match = /^L{1,6}/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Consecutive ticket number with maximum 6 digits`);
                result = null;
                break;
            }
            match = /^P{1,6}/i.exec(tmpCoin);
            if (match) {
                tmpCoin = tmpCoin.slice(match[0].length);
                result += CommonHelper_1.CommonHelper.PadStart(article.PNUM, match[0].length, '0');
                continue;
            }
            match = /^RRRRR/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Fidelity points with 5 digits`);
                result = null;
                break;
            }
            match = /^SS/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Scale (device No.) at which processing of the actual ticket has been started `);
                result = null;
                break;
            }
            match = /^TTTTT/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Tare with 5 digits`);
                result = null;
                break;
            }
            match = /^V{1,3}/i.exec(tmpCoin);
            if (match) {
                console.error(`[SERVER][ERROR] Article was created wrong! NOT IMPLEMENTED: Operator number with maximum 3 digits`);
                result = null;
                break;
            }
            match = /^WWWW/i.exec(tmpCoin);
            if (match) {
                tmpCoin = tmpCoin.slice(match[0].length);
                result += CommonHelper_1.CommonHelper.PadStart(article.WGNU, match[0].length, '0');
                continue;
            }
            match = /^X+/i.exec(tmpCoin);
            if (match) {
                tmpCoin = tmpCoin.slice(match[0].length);
                result += CommonHelper_1.CommonHelper.PadStart(code, match[0].length, '0');
                continue;
            }
            console.error(`[SERVER][ERROR] Article was created wrong! Invalid code contents (COIN) ${tmpCoin}`);
            result = null;
            break;
        }
        return result;
    }
}
exports.FieldChecker = FieldChecker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRDaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjLXRzL1NlcnZlclJJSy9Qcm9jZXNzaW5nL0ZpZWxkQ2hlY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLCtEQUF3RjtBQUN4Riw0REFBeUQ7QUFFekQsNENBQXlDO0FBU3pDO0lBaUJJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBUztRQUNqQixJQUFJLE1BQU0sR0FBbUI7WUFDekIsU0FBUyxFQUFFLElBQUk7WUFDZixRQUFRLEVBQUUsU0FBUztTQUN0QixDQUFDO1FBQ0YsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxRixNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN6QixNQUFNLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUYsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDekIsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7U0FDL0I7UUFDRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksV0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJ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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var E_PT_COWE;
(function (E_PT_COWE) {
    E_PT_COWE[E_PT_COWE["SELLING_PRICE"] = 0] = "SELLING_PRICE";
    E_PT_COWE[E_PT_COWE["WEIGHT"] = 1] = "WEIGHT";
    E_PT_COWE[E_PT_COWE["NUMBER_OF_PIECES"] = 2] = "NUMBER_OF_PIECES";
})(E_PT_COWE = exports.E_PT_COWE || (exports.E_PT_COWE = {}));
var E_PT_KLAR;
(function (E_PT_KLAR) {
    E_PT_KLAR[E_PT_KLAR["WEIGHTED"] = 0] = "WEIGHTED";
    E_PT_KLAR[E_PT_KLAR["COUNTED"] = 1] = "COUNTED";
})(E_PT_KLAR = exports.E_PT_KLAR || (exports.E_PT_KLAR = {}));
var E_PT_STZW;
(function (E_PT_STZW) {
    E_PT_STZW[E_PT_STZW["DEFAULT_INPUT"] = 0] = "DEFAULT_INPUT";
    E_PT_STZW[E_PT_STZW["MANUAL_INPUT"] = 1] = "MANUAL_INPUT";
})(E_PT_STZW = exports.E_PT_STZW || (exports.E_PT_STZW = {}));
var E_PT_ECO1;
(function (E_PT_ECO1) {
    E_PT_ECO1[E_PT_ECO1["INSTORE"] = 0] = "INSTORE";
    E_PT_ECO1[E_PT_ECO1["EAN13_MANUFACTURED"] = 1] = "EAN13_MANUFACTURED";
    E_PT_ECO1[E_PT_ECO1["EAN8_MANUFACTURED"] = 2] = "EAN8_MANUFACTURED";
})(E_PT_ECO1 = exports.E_PT_ECO1 || (exports.E_PT_ECO1 = {}));
var E_PT_COST;
(function (E_PT_COST) {
    E_PT_COST[E_PT_COST["FOUR"] = 0] = "FOUR";
    E_PT_COST[E_PT_COST["FIVE"] = 1] = "FIVE";
    E_PT_COST[E_PT_COST["SIX"] = 2] = "SIX";
    E_PT_COST[E_PT_COST["ZERO"] = 3] = "ZERO";
    E_PT_COST[E_PT_COST["THREE"] = 4] = "THREE";
    E_PT_COST[E_PT_COST["SEVEN"] = 5] = "SEVEN";
    E_PT_COST[E_PT_COST["EIGHT"] = 8] = "EIGHT";
    E_PT_COST[E_PT_COST["NINE"] = 7] = "NINE";
})(E_PT_COST = exports.E_PT_COST || (exports.E_PT_COST = {}));
var E_PT_COOP;
(function (E_PT_COOP) {
    E_PT_COOP[E_PT_COOP["FACTOR_ONE"] = 0] = "FACTOR_ONE";
    E_PT_COOP[E_PT_COOP["FACTOR_FLOAT"] = 1] = "FACTOR_FLOAT";
    E_PT_COOP[E_PT_COOP["DIV_TEN"] = 2] = "DIV_TEN";
    E_PT_COOP[E_PT_COOP["DIV_HUNDRED"] = 3] = "DIV_HUNDRED";
    E_PT_COOP[E_PT_COOP["FACTOR_TEN"] = 4] = "FACTOR_TEN";
})(E_PT_COOP = exports.E_PT_COOP || (exports.E_PT_COOP = {}));
var E_PT_COTY;
(function (E_PT_COTY) {
    E_PT_COTY[E_PT_COTY["EAN13"] = 0] = "EAN13";
    E_PT_COTY[E_PT_COTY["EAN8"] = 1] = "EAN8";
})(E_PT_COTY = exports.E_PT_COTY || (exports.E_PT_COTY = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRV9QUk9EVUNUX1RZUEUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMtdHMvRW51bXMvRV9QUk9EVUNUX1RZUEUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDakIsMkRBQWlCLENBQUE7SUFDakIsNkNBQVUsQ0FBQTtJQUNWLGlFQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUVELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQixpREFBWSxDQUFBO0lBQ1osK0NBQVcsQ0FBQTtBQUNmLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQjtBQUVELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQiwyREFBaUIsQ0FBQTtJQUNqQix5REFBZ0IsQ0FBQTtBQUNwQixDQUFDLEVBSFcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFHcEI7QUFFRCxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDakIsK0NBQVcsQ0FBQTtJQUNYLHFFQUFzQixDQUFBO0lBQ3RCLG1FQUFxQixDQUFBO0FBQ3pCLENBQUMsRUFKVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUlwQjtBQUVELElBQVksU0FTWDtBQVRELFdBQVksU0FBUztJQUNqQix5Q0FBUSxDQUFBO0lBQ1IseUNBQVEsQ0FBQTtJQUNSLHVDQUFPLENBQUE7SUFDUCx5Q0FBUSxDQUFBO0lBQ1IsMkNBQVMsQ0FBQTtJQUNULDJDQUFTLENBQUE7SUFDVCwyQ0FBUyxDQUFBO0lBQ1QseUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFUVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVNwQjtBQUVELElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQixxREFBYyxDQUFBO0lBQ2QseURBQWdCLENBQUE7SUFDaEIsK0NBQVcsQ0FBQTtJQUNYLHVEQUFlLENBQUE7SUFDZixxREFBYyxDQUFBO0FBQ2xCLENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVELElBQVksU0FHWDtBQUhELFdBQVksU0FBUztJQUNqQiwyQ0FBUyxDQUFBO0lBQ1QseUNBQVEsQ0FBQTtBQUNaLENBQUMsRUFIVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUdwQiJ9
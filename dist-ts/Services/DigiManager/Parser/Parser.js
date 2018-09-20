"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("underscore");
const ParserModel_1 = require("../../../Common/Model/DigiManagerModel/ParserModel");
class Parser {
    constructor() {
        this.AdditionalParse = {
            PLST: (columns) => {
                try {
                    if (_.has(columns, 'PLTE') && _.isString(columns['PLTE'])) {
                        if (/^[^0-9#]*(#[0-9]+#[^0-9#]*)*$/.test(columns['PLTE'])) {
                            const res = columns['PLTE'].match(/#\d+#/);
                            if (res !== null) {
                                let PLTESplitter = _.first(res);
                                let PLTELangParts = PLTESplitter ? columns['PLTE'].split(PLTESplitter) : [columns['PLTE']];
                                let FZ_PLTE_UK = PLTELangParts.length > 0 ? PLTELangParts[0] : '';
                                let FZ_MACRO_GROUP = PLTESplitter ? PLTESplitter.replace(/#/g, '') : undefined;
                                let FZ_PLTE_RU = PLTELangParts.length > 1 ? PLTELangParts[1] : '';
                                let columnsSet = [];
                                let valuesSet = [];
                                if (FZ_PLTE_UK) {
                                    columnsSet.push('FZ_PLTE_UK');
                                    valuesSet.push(FZ_PLTE_UK);
                                }
                                if (FZ_MACRO_GROUP) {
                                    columnsSet.push('FZ_MACRO_GROUP');
                                    valuesSet.push(FZ_MACRO_GROUP);
                                }
                                if (FZ_PLTE_RU) {
                                    columnsSet.push('FZ_PLTE_RU');
                                    valuesSet.push(FZ_PLTE_RU);
                                }
                                _.extend(columns, _.object(columnsSet, valuesSet));
                            }
                        }
                        else if (/^[0-9]+$/.test(columns.PLTE)) {
                        }
                    }
                    if (_.has(columns, 'TFZU') || !_.isEmpty(columns['TFZU'])) {
                        var TFZUString = columns['TFZU'].slice(7), TFZUArray = TFZUString.split('@'), TFZUNumbers = [], iterator = 0, iterationStep = 4, counter = TFZUArray.length, resultKeys = [];
                        for (; iterator < counter; iterator += iterationStep) {
                            var part = TFZUArray.slice(iterator, iterator + iterationStep), TFZUNumber = parseInt(part.join(''), 16).toString(10);
                            TFZUNumbers.push(TFZUNumber);
                        }
                        resultKeys = _.range(1, TFZUNumbers.length + 1).map(function (item) {
                            return 'FZ_TFZU_' + item;
                        });
                        _.extend(columns, _.object(resultKeys, TFZUNumbers));
                    }
                }
                catch (error) {
                    console.error(`[Parser.AdditionalParse.PLST]`, error);
                    throw error;
                }
            }
        };
    }
    Parse(data) {
        try {
            const result = new ParserModel_1.ParseResult();
            const dataArray = data.Value.split('\u001b');
            if (dataArray.length > 0) {
                result.Table = dataArray[0].trim();
                result.Action = {
                    Type: dataArray[1].substring(0, 1),
                    Number: dataArray[1].substring(1, 3)
                };
                result.Columns = Parser.ParseRow(dataArray.slice(2));
                if (this.AdditionalParse[result.Table] && result.Action.Type === 'S') {
                    this.AdditionalParse[result.Table](result.Columns);
                }
            }
            return result;
        }
        catch (error) {
            console.error(`[Parser.Parse]`, error);
            throw error;
        }
    }
    static ParseRow(dataSet) {
        try {
            let result = {};
            const stowWords = ['', 'BLK '];
            dataSet.every(item => {
                if (_.contains(stowWords, item)) {
                    return true;
                }
                result = _.extend(result, Parser.ParseColumn(item));
                return true;
            });
            return result;
        }
        catch (error) {
            console.error(`[Parser.ParseRow]`, error);
            throw error;
        }
    }
    static ParseColumn(column) {
        try {
            const result = {};
            column = column.replace(/[\x00-\x1F]/g, '');
            const columnName = column.slice(0, 4).trim();
            const columnValue = column.slice(4);
            if (columnName) {
                result[columnName] = columnValue;
            }
            return result;
        }
        catch (error) {
            console.error(`[Parser.ParseColumn]`, error);
            throw error;
        }
    }
}
exports.Parser = Parser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjLXRzL1NlcnZpY2VzL0RpZ2lNYW5hZ2VyL1BhcnNlci9QYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQ0FBZ0M7QUFFaEMsb0ZBQThIO0FBRTlIO0lBQUE7UUFtRVksb0JBQWUsR0FBZ0I7WUFDbkMsSUFBSSxFQUFFLENBQUMsT0FBd0IsRUFBUSxFQUFFO2dCQUNyQyxJQUFJO29CQUNBLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTt3QkFDdkQsSUFBSSwrQkFBK0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7NEJBQ3ZELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7NEJBQzNDLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQ0FDZCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNoQyxJQUFJLGFBQWEsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0NBQzNGLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQ0FDbEUsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENB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
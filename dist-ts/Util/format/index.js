"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chain_format_1 = require("./chain.format");
const date_format_1 = require("./date.format");
const keep_format_1 = require("./keep.format");
const system_format_1 = require("./system.format");
const formatter = new chain_format_1.ChainFormat();
formatter.addDelegate(new date_format_1.DateFormat());
formatter.addDelegate(new system_format_1.SystemFormat());
formatter.addDelegate(new keep_format_1.KeepFormat(['%']));
function format(fmt) {
    formatter.init(fmt);
    return fmt.replace(/%([a-zA-Z0-9]|[{][a-z-A-Z0-9_-]+[}])/g, (match, replacer, offset, fullString) => {
        const res = formatter.replace(match, replacer, offset, fullString);
        return res !== undefined ? res : '';
    });
}
exports.format = format;
function addDelegate(fmt) {
    formatter.addDelegate(fmt);
}
exports.addDelegate = addDelegate;
function removeDelegate(fmt) {
    formatter.removeDelegate(fmt);
}
exports.removeDelegate = removeDelegate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvVXRpbC9mb3JtYXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBMkM7QUFDM0MsK0NBQXlDO0FBRXpDLCtDQUF5QztBQUN6QyxtREFBNkM7QUFFN0MsTUFBTSxTQUFTLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7QUFDcEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLHdCQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ3hDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSw0QkFBWSxFQUFFLENBQUMsQ0FBQztBQUMxQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksd0JBQVUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU3QyxnQkFBdUIsR0FBVztJQUM5QixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDLEtBQWEsRUFBRSxRQUFnQixFQUFFLE1BQWMsRUFBRSxVQUFrQixFQUFFLEVBQUU7UUFDaEksTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNuRSxPQUFPLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQU5ELHdCQU1DO0FBRUQscUJBQTRCLEdBQVk7SUFDcEMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBRkQsa0NBRUM7QUFFRCx3QkFBK0IsR0FBWTtJQUN2QyxTQUFTLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFGRCx3Q0FFQyJ9
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
const fs = require("fs");
const path = require("path");
const util_1 = require("util");
function hasAccess(path, mode) {
    return new Promise((resolve) => {
        fs.access(path, mode, (error) => {
            resolve(!error);
        });
    });
}
exports.hasAccess = hasAccess;
function mkdirp(directoryPath, mode) {
    return __awaiter(this, void 0, void 0, function* () {
        const dirs = [];
        for (let dir = directoryPath; dir !== path.dirname(dir) && !(yield hasAccess(dir, fs.constants.F_OK)); dir = path.dirname(dir)) {
            dirs.unshift(dir);
        }
        for (let dir of dirs) {
            yield util_1.promisify(fs.mkdir)(dir, mode);
        }
    });
}
exports.mkdirp = mkdirp;
function copy(source, target) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield util_1.promisify(fs.readdir)(source, { encoding: 'utf8' });
        yield mkdirp(target);
        for (let fileName of files) {
            const sourceFile = path.join(source, fileName);
            const targetFile = path.join(target, fileName);
            const stat = yield util_1.promisify(fs.stat)(sourceFile);
            if (stat.isFile() || stat.isSymbolicLink()) {
                yield util_1.promisify(fs.copyFile)(sourceFile, targetFile);
            }
            else if (stat.isDirectory()) {
                yield copy(sourceFile, targetFile);
            }
        }
    });
}
exports.copy = copy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9VdGlsL2ZzLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlCQUF5QjtBQUN6Qiw2QkFBNkI7QUFDN0IsK0JBQStCO0FBRS9CLG1CQUEwQixJQUFpQixFQUFFLElBQWE7SUFDdEQsT0FBTyxJQUFJLE9BQU8sQ0FBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ3BDLEVBQUUsQ0FBQyxNQUFNLENBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ04sT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUNKLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFWRCw4QkFVQztBQUVELGdCQUE2QixhQUFxQixFQUFFLElBQWtDOztRQUNsRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLEdBQUcsR0FBRyxhQUFhLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ2xCLE1BQU0sZ0JBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztDQUFBO0FBUkQsd0JBUUM7QUFFRCxjQUEyQixNQUFjLEVBQUUsTUFBYzs7UUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixLQUFLLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUN4QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLGdCQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDeEQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUN0QztTQUNKO0lBQ0wsQ0FBQztDQUFBO0FBYkQsb0JBYUMifQ==
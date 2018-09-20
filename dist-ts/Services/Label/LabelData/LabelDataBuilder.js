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
class LabelDataBuilder {
    constructor() {
        this._handlers = [];
    }
    Use(handler) {
        this._handlers.push(handler);
    }
    BuildData(request, fields) {
        return __awaiter(this, void 0, void 0, function* () {
            const handlersList = this._handlers;
            const fieldsList = fields;
            let fullResultPromisesList = [];
            for (let field of fieldsList) {
                let found = false;
                for (let handler of handlersList) {
                    let partialResult = handler.Handle(request, field);
                    if (partialResult.value instanceof Promise) {
                        found = true;
                        fullResultPromisesList.push(partialResult.value);
                    }
                    if (partialResult.done) {
                        break;
                    }
                }
                if (!found) {
                    console.warn(`[WARNING] Not found handler for field: ${field}`);
                }
            }
            let readyLabelData = null;
            try {
                let allResults = yield Promise.all(fullResultPromisesList);
                readyLabelData = this.ConvertListOfResultsToLabelData(allResults);
            }
            catch (err) {
                let message = `Error during build of label data: ` + err;
                console.warn(message);
            }
            finally {
                return readyLabelData;
            }
        });
    }
    ConvertListOfResultsToLabelData(fullResultsList) {
        let convertedObj = Object.assign(Object.create(null), ...fullResultsList);
        return convertedObj;
    }
}
exports.LabelDataBuilder = LabelDataBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGFiZWxEYXRhQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9MYWJlbC9MYWJlbERhdGEvTGFiZWxEYXRhQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBYUE7SUFHSTtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxHQUFHLENBQUMsT0FBaUI7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVFLLFNBQVMsQ0FBQyxPQUF1QixFQUFFLE1BQTJCOztZQUNoRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUMxQixJQUFJLHNCQUFzQixHQUEwQixFQUFFLENBQUM7WUFDdkQsS0FBSyxJQUFJLEtBQUssSUFBSSxVQUFVLEVBQUU7Z0JBQzFCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsS0FBSyxJQUFJLE9BQU8sSUFBSSxZQUFZLEVBQUU7b0JBQzlCLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNuRCxJQUFJLGFBQWEsQ0FBQyxLQUFLLFlBQVksT0FBTyxFQUFFO3dCQUN4QyxLQUFLLEdBQUcsSUFBSSxDQUFDO3dCQUNiLHNCQUFzQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3BEO29CQUNELElBQUksYUFBYSxDQUFDLElBQUksRUFBRTt3QkFDcEIsTUFBTTtxQkFDVDtpQkFDSjtnQkFDRCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ25FO2FBQ0o7WUFDRCxJQUFJLGNBQWMsR0FBc0IsSUFBSSxDQUFDO1lBQzdDLElBQUk7Z0JBQ0EsSUFBSSxVQUFVLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQzNELGNBQWMsR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckU7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDVixJQUFJLE9BQU8sR0FBRyxvQ0FBb0MsR0FBRyxHQUFHLENBQUM7Z0JBQ3pELE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFFekI7b0JBQVM7Z0JBQ04sT0FBTyxjQUFjLENBQUM7YUFDekI7UUFDTCxDQUFDO0tBQUE7SUFPTywrQkFBK0IsQ0FBQyxlQUE2QjtRQUVqRSxJQUFJLFlBQVksR0FBZSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUV0RixPQUFPLFlBQVksQ0FBQztJQUN4QixDQUFDO0NBQ0o7QUE3REQsNENBNkRDIn0=
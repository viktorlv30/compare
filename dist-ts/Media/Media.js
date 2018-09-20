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
const express = require("express");
const os = require("os");
const path = require("path");
const url = require("url");
const MimeIS = require("type-is");
const mmmagic = require("mmmagic");
const Env_1 = require("../ServerRIK/Env");
const MMMAGIC = new mmmagic.Magic(mmmagic.MAGIC_MIME_TYPE);
class Media {
    constructor(options) {
        this.path = options.path;
        this._sources = options.sources;
        this._mimes = (options.mimes instanceof Array && options.mimes.length > 0) ? options.mimes : undefined;
        this._target = options.target;
    }
    GetMime(source) {
        return new Promise((resolve, reject) => MMMAGIC.detectFile(source, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        }));
    }
    CheckSource(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let exists = yield new Promise((resolve, reject) => fs.exists(source, resolve));
            if (exists) {
                if (this._mimes instanceof Array && this._mimes.length > 0) {
                    let mime = yield this.GetMime(source);
                    return MimeIS.is(mime, this._mimes) !== false;
                }
                else {
                    return true;
                }
            }
            return false;
        });
    }
    SelectSource() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let source of this._sources) {
                if (yield this.CheckSource(source)) {
                    return source;
                }
            }
            return undefined;
        });
    }
    GetStream() {
        return __awaiter(this, void 0, void 0, function* () {
            let source = yield this.SelectSource();
            if (typeof source === 'string') {
                return source;
            }
            else {
                throw new Error('No source found');
            }
        });
    }
    SaveStream(stream) {
        return this.SavingStream(stream, this._target);
    }
    SavingStream(sourceStream, targetPath) {
        let targetStream = fs.createWriteStream(targetPath);
        sourceStream.pipe(targetStream);
        return new Promise((resolve, reject) => {
            sourceStream.once('error', reject);
            targetStream.once('close', resolve);
            targetStream.once('error', reject);
        });
    }
    CreateTmpDir(prefix) {
        return new Promise((resolve, reject) => fs.mkdtemp(path.join(os.tmpdir(), prefix), (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        }));
    }
    GetMedia(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedUrl = url.parse(request.url);
            console.info(`GET ${JSON.stringify(parsedUrl)} <= ${JSON.stringify(this._target)}`);
            if (this.path !== parsedUrl.pathname) {
                next();
                return;
            }
            let source = yield this.SelectSource();
            if (typeof source === 'string') {
                let mime = yield this.GetMime(source);
                response.setHeader('Content-Type', mime);
                response.sendFile(source);
            }
            else {
                response.sendStatus(404);
            }
        });
    }
    PutMedia(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let parsedUrl = url.parse(request.url);
            console.info(`PUT ${JSON.stringify(parsedUrl)} => ${JSON.stringify(this._target)}`);
            if (this.path !== parsedUrl.pathname) {
                next();
                return;
            }
            let tmpDirPath = undefined;
            let tmpPath = undefined;
            try {
                tmpDirPath = yield this.CreateTmpDir('media-');
                tmpPath = path.join(tmpDirPath, 'tmpdata');
                yield this.SavingStream(request, tmpPath);
                if (yield this.CheckSource(tmpPath)) {
                    yield this.SaveStream(fs.createReadStream(tmpPath));
                    response.sendStatus(201);
                }
                else {
                    response.sendStatus(403);
                }
            }
            catch (error) {
                response.sendStatus(500);
                if (typeof error === 'object') {
                    console.warn(`[MEDIA][PUT] ${error.name}: ${error.stack}`);
                }
                else {
                    console.warn(`[MEDIA][PUT] ${error}`);
                }
            }
            finally {
                try {
                    let tmpExists = (typeof tmpPath === 'string') &&
                        (yield new Promise((resolve, reject) => fs.exists(tmpPath ? tmpPath : '', resolve)));
                    if (tmpExists) {
                        yield new Promise((resolve, reject) => fs.unlink(tmpPath ? tmpPath : '', (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(true);
                            }
                        }));
                    }
                    let tmpDirExists = (typeof tmpDirPath === 'string') &&
                        (yield new Promise((resolve, reject) => fs.exists(tmpDirPath ? tmpDirPath : '', resolve)));
                    if (tmpDirExists) {
                        yield new Promise((resolve, reject) => fs.rmdir(tmpDirPath ? tmpDirPath : '', (error) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                resolve(true);
                            }
                        }));
                    }
                }
                catch (error) {
                    if (typeof error === 'object') {
                        console.warn(`[MEDIA][PUT][FINALLY] ${error.name}: ${error.stack}`);
                    }
                    else {
                        console.warn(`[MEDIA][PUT][FINALLY] ${error}`);
                    }
                }
            }
        });
    }
}
const PUBLIC_MEDIA = [
    new Media({
        path: '/media/printer/paper-out',
        mimes: Env_1.Env.VIDEO_MIMES,
        sources: [
            Env_1.Env.PAPER_OUT_MAIN_PATH,
            Env_1.Env.PAPER_OUT_FALLBACK_PATH,
        ],
        target: Env_1.Env.PAPER_OUT_MAIN_PATH,
    })
];
function CreateMediaApp() {
    let app = express();
    for (let media of PUBLIC_MEDIA) {
        app.get(media.path, media.GetMedia.bind(media));
        app.put(media.path, media.PutMedia.bind(media));
    }
    return app;
}
exports.CreateMediaApp = CreateMediaApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVkaWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMtdHMvTWVkaWEvTWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLHlCQUF5QjtBQUN6QixtQ0FBbUM7QUFDbkMseUJBQXlCO0FBQ3pCLDZCQUE2QjtBQUM3QiwyQkFBMkI7QUFDM0Isa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQywwQ0FBdUM7QUFFdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUzRDtJQVdJLFlBQVksT0FBOEU7UUFDdEYsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssWUFBWSxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUN2RyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDbEMsQ0FBQztJQU9ELE9BQU8sQ0FBQyxNQUFjO1FBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQ2QsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUM5RCxJQUFJLEtBQUssRUFBRTtnQkFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ25CO1FBQ0wsQ0FBQyxDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFPSyxXQUFXLENBQUMsTUFBYzs7WUFDNUIsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEYsSUFBSSxNQUFNLEVBQUU7Z0JBQ1IsSUFBSSxJQUFJLENBQUMsTUFBTSxZQUFZLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3hELElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDdEMsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxDQUFDO2lCQUNqRDtxQkFBTTtvQkFDSCxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBQ0QsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztLQUFBO0lBTUssWUFBWTs7WUFDZCxLQUFLLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzlCLElBQUksTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNoQyxPQUFPLE1BQU0sQ0FBQztpQkFDakI7YUFDSjtZQUNELE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7S0FBQTtJQU1LLFNBQVM7O1lBQ1gsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDdkMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLE9BQU8sTUFBTSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzthQUN0QztRQUNMLENBQUM7S0FBQTtJQU9ELFVBQVUsQ0FBQyxNQUFXO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFRRCxZQUFZLENBQUMsWUFBaUIsRUFBRSxVQUFrQjtRQUM5QyxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ25DLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQU9ELFlBQVksQ0FBQyxNQUFjO1FBQ3ZCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ2pHLElBQUksS0FBSyxFQUFFO2dCQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDbkI7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQVVNLFFBQVEsQ0FBYyxPQUF3QixFQUFFLFFBQTBCLEVBQUUsSUFBYzs7WUFDN0YsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3BGLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsUUFBUSxFQUFFO2dCQUNsQyxJQUFJLEVBQUUsQ0FBQztnQkFDUCxPQUFPO2FBQ1Y7WUFDRCxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN2QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUIsSUFBSSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxRQUFRLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QjtpQkFBTTtnQkFDSCxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzVCO1FBQ0wsQ0FBQztLQUFBO0lBVU0sUUFBUSxDQUFjLE9BQXdCLEVBQUUsUUFBMEIsRUFBRSxJQUFjOztZQUM3RixJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEYsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xDLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU87YUFDVjtZQUVELElBQUksVUFBVSxHQUF1QixTQUFTLENBQUM7WUFDL0MsSUFBSSxPQUFPLEdBQXVCLFNBQVMsQ0FBQztZQUM1QyxJQUFJO2dCQUNBLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2pDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7cUJBQU07b0JBQ0gsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO29CQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RDtxQkFBTTtvQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLEVBQUUsQ0FBQyxDQUFDO2lCQUN6QzthQUNKO29CQUFTO2dCQUNOLElBQUk7b0JBQ0EsSUFBSSxTQUFTLEdBQ1QsQ0FBQyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUM7eUJBQzdCLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQSxDQUFDO29CQUN2RixJQUFJLFNBQVMsRUFBRTt3QkFDWCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFFOzRCQUN0RyxJQUFJLEtBQUssRUFBRTtnQ0FDUCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7NkJBQ2pCO2lDQUFNO2dDQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDakI7d0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDUDtvQkFDRCxJQUFJLFlBQVksR0FBRyxDQUFDLE9BQU8sVUFBVSxLQUFLLFFBQVEsQ0FBQzt5QkFDL0MsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7b0JBQzdGLElBQUksWUFBWSxFQUFFO3dCQUNkLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUE0QixFQUFFLEVBQUU7NEJBQzNHLElBQUksS0FBSyxFQUFFO2dDQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDakI7aUNBQU07Z0NBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNqQjt3QkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNQO2lCQUNKO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNaLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO3dCQUMzQixPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUN2RTt5QkFBTTt3QkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLHlCQUF5QixLQUFLLEVBQUUsQ0FBQyxDQUFDO3FCQUNsRDtpQkFDSjthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBRUo7QUFFRCxNQUFNLFlBQVksR0FBRztJQUNqQixJQUFJLEtBQUssQ0FBQztRQUNOLElBQUksRUFBRSwwQkFBMEI7UUFDaEMsS0FBSyxFQUFFLFNBQUcsQ0FBQyxXQUFXO1FBQ3RCLE9BQU8sRUFBRTtZQUNMLFNBQUcsQ0FBQyxtQkFBbUI7WUFDdkIsU0FBRyxDQUFDLHVCQUF1QjtTQUM5QjtRQUNELE1BQU0sRUFBRSxTQUFHLENBQUMsbUJBQW1CO0tBQ2xDLENBQUM7Q0FDTCxDQUFDO0FBTUY7SUFDSSxJQUFJLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksS0FBSyxJQUFJLFlBQVksRUFBRTtRQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVRLHdDQUFjIn0=
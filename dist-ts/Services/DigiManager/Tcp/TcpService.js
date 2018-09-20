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
const net = require("net");
const fs = require("fs");
const RepositoryFactory_1 = require("../../../Common/Repositories/RepositoryFactory");
const Parser_1 = require("../Parser/Parser");
const SetTime_1 = require("../Script/SetTime");
const TcpServiceModel_1 = require("../../../Common/Model/DigiManagerModel/TcpServiceModel");
const Util_1 = require("../../../Common/Util");
const Env_1 = require("../../../ServerRIK/Env");
class TcpService {
    constructor() {
        this._port = Env_1.Env.DIGI_PORT;
        this._server = net.createServer();
        this._dataBuffer = new TcpServiceModel_1.DataBuffer();
        this._dataParser = new Parser_1.Parser();
        this._hasData = false;
    }
    SetRepository() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const factory = yield RepositoryFactory_1.RepositoryFactory.GetInstance().GetRepository();
                if (factory) {
                    this._repository = factory.GetDigiRepository();
                    if (this._repository) {
                        console.log('[TcpService] DiGiRepository was created.');
                    }
                    else {
                        throw new Error('[TcpService] DiGiRepository was not created!');
                    }
                }
                else {
                    throw new Error('[TcpService] DiGiRepository was not created!');
                }
            }
            catch (error) {
                console.error('[TcpService][SetRepository]', error);
                throw error;
            }
        });
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.SetRepository();
                this._server.on('connection', this.SocketMain.bind(this));
                this._server.listen(this._port, () => {
                    console.log(`Digi import server bound to port ${this._port}`);
                });
            }
            catch (error) {
                console.error(`[TcpService][Start]`, error);
            }
        });
    }
    SocketMain(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (socket == undefined)
                return;
            this._socket = socket;
            console.time(this.SocketMain.name);
            console.info(`[TCP][CLIENT] CONNECT FROM ${socket.remoteAddress} AT ${socket.remotePort}`);
            this._dataBuffer.Clear();
            this._fdPromise = undefined;
            this._hasData = false;
            this._repository.CountProcessedItems = 0;
            if (TcpService.NEED_LOG) {
                let clientConnectionDate = new Date();
                this._fdPromise = Util_1.Util.promisify(fs.open.bind(fs, `/tmp/digi-${clientConnectionDate.toISOString()}-${socket.remoteAddress}.txt`, 'w'));
            }
            this._socket.on('connect', () => {
                console.log(`Connect: ${JSON.stringify(arguments)}`);
            });
            this._socket.on('data', this.SocketData.bind(this));
            this._socket.on('error', (error) => __awaiter(this, void 0, void 0, function* () {
                this._repository.PrintHandledItems();
                yield this.CloseFd();
            }));
            this._socket.on('close', () => __awaiter(this, void 0, void 0, function* () {
                if (this._socket == undefined)
                    return;
                console.info(`[TCP][CLIENT] CLOSE FROM ${this._socket.remoteAddress} AT ${this._socket.remotePort}`);
                yield this.ProcessBuffer();
                yield this.CloseFd();
                if (this._hasData) {
                    try {
                        this._repository.PrintHandledItems();
                        this._repository.CountProcessedItems = 0;
                        yield this._repository.BuildFzPlte();
                        console.timeEnd(this.SocketMain.name);
                    }
                    catch (error) {
                        console.error(`[TCP][BUILD FZ PLTE] ${error.message}`);
                    }
                }
            }));
        });
    }
    SocketData(buffer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._socket === undefined || buffer === undefined)
                return;
            let data = buffer.toString();
            let fd = yield this._fdPromise;
            try {
                let duplicateData = false;
                if (duplicateData) {
                    yield this.WriteFd(data, '+');
                }
                else {
                    yield this.WriteFd(data, '');
                    let parsed = this._dataParser.Parse({ Value: data });
                    switch (parsed.Action.Type) {
                        case 'S':
                            this._hasData = true;
                            if (parsed.Table !== this._dataBuffer.Table || parsed.Columns.WALO !== this._dataBuffer.WALO || this._dataBuffer.Columns.length >= TcpService.BUFFER_MAX_SIZE) {
                                yield this.ProcessBuffer();
                            }
                            this._dataBuffer.Table = parsed.Table;
                            this._dataBuffer.WALO = parsed.Columns['WALO'];
                            this._dataBuffer.Columns.push(parsed.Columns);
                            break;
                        case 'L':
                            this._hasData = true;
                            yield this.ProcessBuffer();
                            yield this._repository.Truncate(parsed.Table);
                            break;
                        case 'N':
                            this._hasData = true;
                            yield this.ProcessBuffer();
                            if (parsed.Table === 'UHR') {
                                yield SetTime_1.SetTime.Time(parseInt(parsed.Columns['UUHR']));
                            }
                            break;
                        default:
                            yield this.ProcessBuffer();
                            console.warn(`[TCP][SocketData] UNHANDLED ACTION ${parsed.Action.Type}: ${JSON.stringify(parsed)}`);
                            break;
                    }
                }
                this._socket.write('QUIT0');
            }
            catch (error) {
                console.error(`[TCP][SocketData] ${error.message}`);
                yield this.CloseFd();
                this._socket.write('QUIT1');
                this._socket.destroy('error');
            }
        });
    }
    ProcessBuffer() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._dataBuffer.WALO && this._dataBuffer.Table && this._dataBuffer.Table !== "WGST") {
                try {
                    switch (this._dataBuffer.WALO) {
                        case '0':
                            yield this._repository.Insert(this._dataBuffer.Table, this._dataBuffer.Columns);
                            break;
                        case '1':
                            yield this._repository.Remove(this._dataBuffer.Table, this._dataBuffer.Columns);
                            break;
                        default:
                            console.warn('[TCP] UNHANDLED OPERATION: ', this._dataBuffer.WALO);
                            break;
                    }
                }
                catch (error) {
                    console.error(`[TCP]ProcessBuffer] ${error.message}`);
                    this._dataBuffer.Clear();
                    throw error;
                }
            }
            this._dataBuffer.Clear();
        });
    }
    CloseFd() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[TCP][FD][CLOSE]`);
            if (this._fdPromise !== undefined) {
                try {
                    const fd = yield this._fdPromise;
                    yield Util_1.Util.promisify(fs.close.bind(fs, fd));
                }
                catch (error) {
                    console.error(`[TCP][FD][CLOSE] ${error.message}`);
                }
                this._fdPromise = undefined;
            }
        });
    }
    WriteFd(data, prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._fdPromise !== undefined) {
                try {
                    const fd = yield this._fdPromise;
                    yield Util_1.Util.promisify(fs.write.bind(fs, fd, `${prefix}${JSON.stringify(data)}\n`));
                    yield Util_1.Util.promisify(fs.fsync.bind(fs, fd));
                }
                catch (error) {
                    console.warn(`[TCP][FD][WRITE] ${error.message}`);
                    yield this.CloseFd();
                }
            }
        });
    }
}
TcpService.NEED_LOG = true;
TcpService.BUFFER_MAX_SIZE = Env_1.Env.DIGI_DATA_BUFFER_SIZE;
exports.TcpService = TcpService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGNwU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9EaWdpTWFuYWdlci9UY3AvVGNwU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkJBQTJCO0FBQzNCLHlCQUF5QjtBQUV6QixzRkFBbUY7QUFFbkYsNkNBQTBDO0FBQzFDLCtDQUE0QztBQUM1Qyw0RkFBb0Y7QUFDcEYsK0NBQTRDO0FBQzVDLGdEQUE2QztBQUU3QztJQTJCSTtRQXJCaUIsVUFBSyxHQUFXLFNBQUcsQ0FBQyxTQUFTLENBQUM7UUFzQjNDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSw0QkFBVSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFYSxhQUFhOztZQUN2QixJQUFJO2dCQUNBLE1BQU0sT0FBTyxHQUFHLE1BQU0scUNBQWlCLENBQUMsV0FBVyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3RFLElBQUksT0FBTyxFQUFFO29CQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7b0JBQy9DLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO3FCQUMzRDt5QkFDSTt3QkFDRCxNQUFNLElBQUksS0FBSyxDQUFDLDhDQUE4QyxDQUFDLENBQUM7cUJBQ25FO2lCQUNKO3FCQUNJO29CQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsOENBQThDLENBQUMsQ0FBQztpQkFDbkU7YUFDSjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNaLE9B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
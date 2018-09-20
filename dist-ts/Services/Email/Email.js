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
const child_process_1 = require("child_process");
const nodemailer = require("nodemailer");
const E_T_EMAIL_1 = require("../../Enums/E_T_EMAIL");
const Util_1 = require("../../Common/Util");
const settings = require('../../../services/system/settings');
class Email {
    constructor() {
        this._transportConfig = {
            tls: { rejectUnauthorized: false },
            debug: true,
        };
        this._defaultEmailPort = 25;
        this._defaultEmailHost = 'smtp.fozzy.lan';
        this._defaultCC = ["o.fedorchuk@temabit.com"];
    }
    static get Instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new this();
        return this._instance;
    }
    Send(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendResult;
            let systemSettings = yield settings.loadSettings();
            let transporter = yield this.SetupTransport(systemSettings);
            let options = yield this.GetMailOptions(type, systemSettings);
            let { mail: mailOpts, special } = options;
            let { collectLogs, inetAddresses, hostname } = special;
            let fromField = `${(inetAddresses instanceof Array && inetAddresses.length > 0) ? inetAddresses.join('/') : 'SCALE'} <scale@${hostname || 'temabit.com'}>`;
            let logsFileName = undefined;
            try {
                if (collectLogs) {
                    let stdout = child_process_1.execFileSync('/usr/bin/sudo', ['/usr/local/bin/logcollect'], { encoding: 'utf-8' }).toString();
                    logsFileName = stdout.split('\n')[0];
                }
            }
            catch (logsError) {
                console.error(`LOGCOLLECT ERROR ${Util_1.Util.extractError(logsError)}`);
            }
            finally {
                let attachment = [];
                if (logsFileName) {
                    attachment.push({
                        path: logsFileName
                    });
                }
                mailOpts.from = fromField;
                mailOpts.cc = this._defaultCC;
                mailOpts.attachments = attachment;
                sendResult = yield transporter.sendMail(mailOpts);
                console.log(`Sent message: ${JSON.stringify(sendResult)}`);
                return sendResult;
            }
        });
    }
    SetupTransport(systemSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            this._transportConfig = yield this.GetSMTPSettings(systemSettings);
            let transport = nodemailer.createTransport(this._transportConfig);
            return transport;
        });
    }
    GetSMTPSettings(systemSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = Object.assign({}, this._transportConfig);
            let lanSettings = yield this.GetLanSettings(systemSettings);
            options.host = lanSettings.smtp_server;
            options.port = lanSettings.smtp_port;
            return options;
        });
    }
    GetLanSettings(systemSettings) {
        return __awaiter(this, void 0, void 0, function* () {
            let lanSettings = {
                smtp_port: this._defaultEmailPort,
                smtp_server: this._defaultEmailHost
            };
            let sett = systemSettings;
            try {
                let { globalSettings } = sett;
                if (globalSettings instanceof Array && globalSettings.length > 0) {
                    let { smtp_port: smtpPort, smtp_server: smtpServer } = globalSettings[0];
                    if (smtpPort) {
                        lanSettings.smtp_port = smtpPort;
                    }
                    if (smtpServer) {
                        lanSettings.smtp_server = smtpServer;
                    }
                }
                else {
                    console.error(`Error: global lan settings are incorrect!`, globalSettings);
                }
            }
            catch (error) {
                console.error(`Error during get Lan settings for emailing.`, error);
                console.error(`Will be used default settings: ${this._defaultEmailHost} on port:${this._defaultEmailPort}`);
            }
            finally {
                return lanSettings;
            }
        });
    }
    GetMailOptions(type, systemSettings) {
        let opt;
        let special = {
            hostname: '',
            inetAddresses: [],
            collectLogs: false,
        };
        switch (type) {
            case E_T_EMAIL_1.E_T_EMAIL.SERVER:
                opt = {
                    subject: 'PAPER END',
                    text: `На весах закончилась бумага`,
                    html: `<b>На весах закончилась бумага</b>`
                };
                break;
            case E_T_EMAIL_1.E_T_EMAIL.FROM_UI:
                opt = {
                    subject: 'MESSAGE FROM UI',
                    text: `Пользовательское сообщение об ошибке`,
                    html: `<b>Пользовательское сообщение об ошибке</b>`,
                };
                special.collectLogs = true;
                break;
            default:
                opt = {};
                break;
        }
        let { globalSettings, interfacesSettings } = systemSettings;
        if (globalSettings instanceof Array && globalSettings.length > 0) {
            special.hostname = globalSettings[0].host_name;
            opt.to = globalSettings[0].email;
        }
        if (interfacesSettings instanceof Array) {
            special.inetAddresses = interfacesSettings.map((networkInterfaceSettings) => {
                return networkInterfaceSettings.activeInetAddress;
            }).filter(value => value);
        }
        return { mail: opt, special: special };
    }
}
exports.Email = Email;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmljZXMvRW1haWwvRW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLGlEQUE2QztBQUM3Qyx5Q0FBeUM7QUFPekMscURBQWtEO0FBRWxELDRDQUF5QztBQUV6QyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQztBQVE5RDtJQVNJO1FBQ0ksSUFBSSxDQUFDLGdCQUFnQixHQUFHO1lBQ3BCLEdBQUcsRUFBRSxFQUFFLGtCQUFrQixFQUFFLEtBQUssRUFBRTtZQUNsQyxLQUFLLEVBQUUsSUFBSTtTQUNkLENBQUE7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUMxQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsTUFBTSxLQUFLLFFBQVE7UUFDZixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDaEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUssSUFBSSxDQUFDLElBQWU7O1lBQ3RCLElBQUksVUFBa0IsQ0FBQztZQUN2QixJQUFJLGNBQWMsR0FBb0IsTUFBTSxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDcEUsSUFBSSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVELElBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFOUQsSUFBSSxFQUFFLElB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
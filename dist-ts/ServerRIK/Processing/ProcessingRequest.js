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
const path = require("path");
const fs = require("fs");
const NodeUtil = require("util");
const child_process_1 = require("child_process");
const crypto = require("crypto");
const _ = require("underscore");
const DeviceError_1 = require("../../Devices/DeviceError");
const e_print_state_1 = require("../../Enums/e.print.state");
const e_printer_bar_code_1 = require("../../Enums/e.printer.bar.code");
const e_printer_direct_io_request_1 = require("../../Enums/e.printer.direct.io.request");
const e_printer_page_mode_control_1 = require("../../Enums/e.printer.page.mode.control");
const e_printer_station_1 = require("../../Enums/e.printer.station");
const e_scale_freeze_item_1 = require("../../Enums/e.scale.freeze.item");
const application_state_service_1 = require("../../Services/State/application.state.service");
const func_tools_1 = require("../../Services/State/func.tools");
const AProcessing_1 = require("./AProcessing");
const SocketResponse_1 = require("../../Common/SocketResponse");
const E_DEVICE_TYPE_1 = require("../../Enums/E_DEVICE_TYPE");
const rik_db_1 = require("rik-db");
const LabelService_1 = require("../../Services/Label/LabelService");
const LabelError_1 = require("../../Errors/LabelError");
const FieldChecker_1 = require("./FieldChecker");
const Util_1 = require("../../Common/Util");
const E_PRODUCT_TYPE_1 = require("../../Enums/E_PRODUCT_TYPE");
const CommonHelper_1 = require("../../Common/CommonHelper");
const Env_1 = require("../Env");
const E_PLST_HALB_1 = require("../../Enums/E_PLST_HALB");
const E_ESST_EON_1 = require("../../Enums/E_ESST_EON");
const E_ESST_EAR_1 = require("../../Enums/E_ESST_EAR");
const E_T_EMAIL_1 = require("../../Enums/E_T_EMAIL");
const Email_1 = require("../../Services/Email/Email");
const e_scale_price_calculating_mode_1 = require("../../Enums/e.scale.price.calculating.mode");
const { loadSettings, saveSettings, renewNetwork } = require('../../../services/system/settings');
class ProcessingRequest extends AProcessing_1.AProcessing {
    constructor(client, devices, panel) {
        super(client, devices, panel);
        this.ToggleLabelLayout(24);
    }
    get LastLabelLayout() {
        return this._lastUsedLabelLayout;
    }
    set LastLabelLayout(value) {
        this._lastUsedLabelLayout = Object.assign(Object.create(null), value);
    }
    RegisteringAllCallbacks() {
        this.AddEmitCallback('selectItem', func_tools_1.bind(this.OnSelectItem, this));
        this.AddEmitCallback('setPanelData', func_tools_1.bind(this.SetPanelData, this));
        this.AddEmitCallback('calculatePrice', func_tools_1.bind(this.CalculatePrice, this));
        this.AddEmitCallback('printLabel', func_tools_1.bind(this.OnPrintLabel, this));
        this.AddEmitCallback('restAll', func_tools_1.bind(this.OnRestAll, this));
        this.AddEmitCallback('freezeUnitPrice', func_tools_1.bind(this.FreezeUnitPrice, this));
        this.AddEmitCallback('getInitialProductsList', func_tools_1.bind(this.InitialProductList, this));
        this.AddEmitCallback('setupTare', func_tools_1.bind(this.SetupTare, this));
        this.AddEmitCallback('setZero', func_tools_1.bind(this.SetupZero, this));
        this.AddEmitCallback('printAfterPaperInsert', func_tools_1.bind(this.PrintAfterPaperInsert, this));
        this.AddEmitCallback('getState', func_tools_1.bind(this.GetState, this));
        this.AddEmitCallback('getSettings', func_tools_1.bind(this.OnGetSettings, this));
        this.AddEmitCallback('setSettings', func_tools_1.bind(this.OnSetSettings, this));
        this.AddEmitCallback('sendEmailAboutErrorFromUI', func_tools_1.bind(this.SendEmailAboutErrorFromUI, this));
        this.AddEmitCallback('sendEmailAboutError', func_tools_1.bind(this.SendEmailAboutError, this));
        this.AddEmitCallback('serverRestart', func_tools_1.bind(this.ServerRestart, this));
        this.AddEmitCallback('hideScalePanel', func_tools_1.bind(this.HideScalePanel, this));
        this.AddEmitCallback('showScalePanel', func_tools_1.bind(this.ShowScalePanel, this));
        this.AddEmitCallback('showDeviceSetting', func_tools_1.bind(this.ShowDeviceSetting, this));
        this.AddEmitCallback('getSoftwareVersion', func_tools_1.bind(this.GetSoftwareVersions, this));
    }
    MessageHandler(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let { name, args, cookie } = request;
            let readyResponse;
            try {
                let result;
                const callback = this.GetEmitCallback(name);
                if (!callback) {
                    result = yield this.Function404(name);
                }
                else {
                    result = yield callback.apply(this, args);
                }
                readyResponse = SocketResponse_1.SocketResponse.FromData(cookie, result);
            }
            catch (exception) {
                readyResponse = SocketResponse_1.SocketResponse.FromError(cookie, exception);
            }
            finally {
                console.log(`[P-REQUEST][${this.IpAddress}] emit response: `, readyResponse ? JSON.stringify(readyResponse).slice(0, 100) : readyResponse);
                this.Client.emit('response', readyResponse);
            }
        });
    }
    OnRestAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] call OnRestAll(). Reset scale's panel data.`);
            yield this.ResetPanelData();
        });
    }
    ResetPanelData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.SetPanelData({ text: '', price: 0, freeze: false }).catch(console.warn);
            application_state_service_1.ApplicationStateService.Instance.setProps({ LastArticle: null });
            LabelService_1.LabelService.Instance().ResetLabelOptions();
        });
    }
    SetPanelData(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const { price, text, freeze } = param;
            console.log(`[P-REQUEST] call SetPanelData() text='${text}' price='${price}' freeze='${freeze}'`);
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            const ApplicationProps = application_state_service_1.ApplicationStateService.Instance.props;
            if (ApplicationProps.UnitPriceFixed !== false) {
                yield scale.FreezeValue(e_scale_freeze_item_1.SCALE_FREEZE_ITEM.UNIT_PRICE, false);
                application_state_service_1.ApplicationStateService.Instance.setProps({ UnitPriceFixed: false });
            }
            const promises = [];
            if (price === 0 || ApplicationProps.UnitPrice !== price) {
                promises.push(scale.Set('UnitPrice', price));
            }
            if (text === '' || ApplicationProps.PanelText !== text) {
                promises.push(scale.DisplayText(text));
            }
            yield Promise.all(promises);
            if (freeze) {
                yield scale.FreezeValue(e_scale_freeze_item_1.SCALE_FREEZE_ITEM.UNIT_PRICE, true);
            }
            application_state_service_1.ApplicationStateService.Instance.setProps({
                UnitPriceFixed: !!freeze,
                PanelText: text,
            });
        });
    }
    OnSelectItem(plu) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.info(`[P-REQUEST] selectItem(${plu})`);
                return yield this.GetArticleInfo(plu);
            }
            catch (error) {
                yield this.ResetPanelData();
                return null;
            }
        });
    }
    FreezeUnitPrice(value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] FreezeUnitPrice(${value}).`);
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            yield scale.FreezeValue(e_scale_freeze_item_1.SCALE_FREEZE_ITEM.UNIT_PRICE, value);
            application_state_service_1.ApplicationStateService.Instance.setProps({ UnitPriceFixed: value });
        });
    }
    CalculatePrice(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { plu, quantity } = data;
            console.log(`[P-REQUEST] CalculatePrice(plu: ${plu}, quantity: ${quantity}).`);
            const { LastArticle } = application_state_service_1.ApplicationStateService.Instance.props;
            try {
                application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRICE_CALCULATING_PROGRESS });
                if (LastArticle && LastArticle.PNUM === plu) {
                    if (LastArticle.KLAR === E_PRODUCT_TYPE_1.E_PT_KLAR.COUNTED) {
                        console.log(`[P-REQUEST] Ignoring DoPriceCalculating() for counted goods.`);
                        this.SetPriceForCountedGoods(LastArticle, quantity);
                    }
                    else {
                        const priceCalculatingResult = yield this.ScalePriceCalculating(LastArticle);
                        this.SetPriceForWeightGoods(priceCalculatingResult);
                    }
                    application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRICE_CALCULATING_DONE });
                }
                else {
                    throw new LabelError_1.LabelError('articleWrong', 'Останій збережений артикул не співпадає із запитуваним.');
                }
            }
            catch (error) {
                application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRICE_CALCULATING_ERROR });
                throw error;
            }
        });
    }
    OnPrintLabel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { plu, quantity } = data;
            console.log(`[P-REQUEST] OnPrintLabel(plu: ${plu}, quantity: ${quantity})`);
            console.time('FULL_PRINT');
            const { LastArticle, Paper, LabelForceReversing } = application_state_service_1.ApplicationStateService.Instance.props;
            try {
                if (!Paper) {
                    throw new DeviceError_1.DeviceError('NoPaperError', 'NO_PAPER', 'No paper found');
                }
                if (LastArticle && LastArticle.PNUM === plu) {
                    yield this.PrintLabelProcedure(LastArticle);
                    application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRINT_LABEL_DONE });
                }
                else {
                    throw new LabelError_1.LabelError('articleWrong', 'Останій збережений артикул не співпадає із запитуваним.');
                }
            }
            catch (error) {
                if (error instanceof LabelError_1.LabelError) {
                    application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.LABEL_BUILD_ERROR });
                }
                else {
                    application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRINT_LABEL_ERROR });
                    throw error;
                }
            }
        });
    }
    ScalePriceCalculating(article) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] ScalePriceCalculating() pnum=`, article.PNUM);
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            return yield scale.DoPriceCalculating({ timeout: 1000 });
        });
    }
    SetPriceForCountedGoods(article, quantity) {
        const kopeckMultiplier = 0.01;
        const amount = quantity || article.STPA || 1;
        const unitPrice = article.GPR1 * kopeckMultiplier;
        console.log(`[P-REQUEST] SetPriceForCountedGoods(). Pnum=${article.PNUM}, incoming quantity = ${quantity}, will set amount = ${amount}`);
        LabelService_1.LabelService.Instance().SetLabelOptions({
            quantity: amount,
            unitPrice,
            price: amount * unitPrice,
            weight: amount
        });
    }
    SetPriceForWeightGoods(data) {
        console.log(`[P-REQUEST] SetPriceForWeightGoods() data=`, data ? JSON.stringify(data) : data);
        const kiloWeightMultiplier = 0.001;
        if (data.weightValue > 0) {
            LabelService_1.LabelService.Instance().SetLabelOptions({
                quantity: 0,
                weight: data.weightValue * kiloWeightMultiplier,
                unitPrice: data.unitPrice,
                price: data.price,
            });
            let dataForPrint = LabelService_1.LabelService.Instance().GetLabelOptions(['pluNumber']);
            if (!dataForPrint || !dataForPrint.pluNumber) {
                throw new LabelError_1.LabelError('articleWrong', `Incorrect label data, plu number ${JSON.stringify(dataForPrint)}`);
            }
            return dataForPrint.pluNumber;
        }
        else {
            throw new Error(`Can't calculate weight`);
        }
    }
    PrintLabelProcedure(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const { pluNumber: plu } = LabelService_1.LabelService.Instance().GetLabelOptions();
            const eco1 = article.ECO1;
            console.log(`[P-REQUEST] PrintLabelProcedure(), plu=`, plu);
            application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRINT_LABEL_PROGRESS });
            if (typeof plu !== 'number') {
                console.error(`[SERVER][ERROR] Article was created wrong! Incorrect pnum/plu of article.`, JSON.stringify(plu));
                throw new LabelError_1.LabelError('articleWrong', 'Помилка пошуку артикула!' + ' ' + plu);
            }
            if (!eco1) {
                console.error(`[SERVER][ERROR] Article was created wrong! ECO1 required`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            const layoutAwaiter = this.ToggleLabelLayout(article.ECTR).catch(console.error);
            const kilogramsMultiplier = 1000;
            const { HBA1, HALB, ECTR } = article;
            const labelDates = this.GetLabelDates({ PNUM: plu, HBA1: HBA1, HALB: HALB, ECTR: ECTR });
            const scaleDevice = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            const scaleTare = (scaleDevice ? scaleDevice.GetProps().TareWeight : 0) / kilogramsMultiplier;
            const barCode = yield this.CalculateBarcode(article, eco1);
            LabelService_1.LabelService.Instance().SetLabelOptions(barCode);
            LabelService_1.LabelService.Instance().SetLabelOptions({
                date_01: labelDates.package,
                date_02: labelDates.expiryHBA1,
                date_03: labelDates.expiryHBA2,
                tare: scaleTare,
            });
            let fieldList = yield LabelService_1.LabelService.Instance().GetReadyLabelData();
            const labelParameters = yield this.LabelLayoutPreparation(article.ECTR);
            yield layoutAwaiter;
            console.log(`toggleLayoutResult 'Ok'`);
            yield Promise.all(this.CreatePrintNormalPromises(fieldList, labelParameters));
            console.log(`printNormalResults 'Ok'`);
            const printer = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.PRINTER);
            const sendRenderFileResult = yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_RENDER_FILE, {
                data: 0, obj: path.join(Env_1.Env.LABEL_RENDER_PATH, `label.${Date.now()}.bmp`)
            }).catch(error => console.error(error));
            console.log(`sendRenderFileResult`, JSON.stringify(sendRenderFileResult));
            yield printer.PageModePrint(e_printer_page_mode_control_1.POS_PRINTER_PAGE_MODE_CONTROL.PRINT_SAVE);
            const { LabelForceReversing } = application_state_service_1.ApplicationStateService.Instance.props;
            if (LabelForceReversing > 0) {
        	yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.LINE_FEED, { data: LabelForceReversing, obj: '' });
        	//yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.LINE_FEED_REVERSE, { data: LabelForceReversing, obj: '' });
            }
            console.log(`setPageModeResult`, JSON.stringify(sendRenderFileResult));
            console.timeEnd('FULL_PRINT');
        });
    }
    CreatePrintNormalPromises(fieldList, labelParameters) {
        const printer = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.PRINTER);
        const printNormalPromises = [];
        for (let fieldIndex in labelParameters) {
            const fieldInfo = labelParameters[fieldIndex];
            const inty = fieldInfo.INTY || 0;
            const fieldId = inty & 0xffff;
            const fieldType = inty >> 16;
            const fieldData = fieldList[fieldId];
            if (typeof fieldData !== 'string') {
                continue;
            }
            switch (fieldType) {
                case 4:
                case 11:
                    printNormalPromises.push(printer.PrintNormal(e_printer_station_1.POS_PRINTER_STATION.S_RECEIPT, `^[${fieldId};${fieldData}`));
                    break;
                case 6:
                    printNormalPromises.push(printer.PrintBarCode(e_printer_station_1.POS_PRINTER_STATION.S_RECEIPT, `^[${fieldId};${fieldData}`, fieldData.length === 8 ? e_printer_bar_code_1.POS_PRINTER_BAR_CODE_SYMBOLOGY.EAN8 : e_printer_bar_code_1.POS_PRINTER_BAR_CODE_SYMBOLOGY.EAN13, 0, 0, e_printer_bar_code_1.POS_PRINTER_BAR_CODE_ALIGNMENT.CENTER, e_printer_bar_code_1.POS_PRINTER_BAR_CODE_TEXT_POSITION.BELOW));
                    break;
                case 7:
                    console.info(`[ICON][SKIP][${fieldId}] ${JSON.stringify(fieldData)}`);
                    break;
                default:
                    console.warn(`[UNKNOWN][${fieldType}][SKIP][${fieldId}] ${JSON.stringify(fieldData)}`);
            }
        }
        return printNormalPromises;
    }
    CalculateBarcode(article, eco1) {
        return __awaiter(this, void 0, void 0, function* () {
            let costCodePattern = /^(\d)(\d{2})(\d+)$/;
            let testStrResult = costCodePattern.exec(eco1);
            if (!(testStrResult && Util_1.Util.isArray(testStrResult) && testStrResult.length >= 0)) {
                console.error(`[SERVER][ERROR] Article was created wrong! ECO1`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let eco1TypeCode = parseInt(testStrResult[1], 10);
            let barCode;
            switch (eco1TypeCode) {
                case E_PRODUCT_TYPE_1.E_PT_ECO1.INSTORE:
                    barCode = yield this.GetBarcodeAfterCheckCost(article, testStrResult[2], testStrResult[3]);
                    break;
                case E_PRODUCT_TYPE_1.E_PT_ECO1.EAN13_MANUFACTURED:
                case E_PRODUCT_TYPE_1.E_PT_ECO1.EAN8_MANUFACTURED:
                    barCode = yield this.GetBarcodeWithoutCheckCost(article);
                    break;
                default:
                    console.error(`[SERVER][ERROR] Article was created wrong! ECO1[0] - not a number`);
                    throw new LabelError_1.LabelError(`articleWrong`, `Артикул створено невірно!`);
            }
            return barCode;
        });
    }
    GetLabelDates(plst) {
        let hba1 = plst.HBA1;
        if (hba1 === null || hba1 === undefined) {
            throw `[P-REQUEST][GET_EXPIRY_DATE] Incorrect 'PLST.HBA1= '${hba1}'`;
        }
        let halb = plst.HALB;
        let multiplayer = 0;
        switch (halb) {
            case E_PLST_HALB_1.E_PLST_HALB.FULL_DAYS:
                multiplayer = 24 * 60 * 60 * 1000;
                break;
            case E_PLST_HALB_1.E_PLST_HALB.HALF_DAYS:
                multiplayer = 12 * 60 * 60 * 1000;
                break;
            case E_PLST_HALB_1.E_PLST_HALB.MINUTES:
                multiplayer = 60 * 1000;
                break;
            default:
                throw `[P-REQUEST][GET_EXPIRY_DATE] Incorrect value 'PLST.HLAB' = '${halb}'`;
        }
        const shelfLifeMilliseconds = multiplayer * hba1;
        const packageDate = Date.now();
        const expiryHBA1Date = packageDate + shelfLifeMilliseconds;
        const expiryHBA2Date = expiryHBA1Date;
        console.log(`[P-REQUEST] Expiry date (HBA1) pnum=${plst.PNUM} => ${(new Date(expiryHBA1Date)).toLocaleString()}`);
        return { package: packageDate, expiryHBA1: expiryHBA1Date, expiryHBA2: expiryHBA2Date };
    }
    LabelLayoutPreparation(plstECTR) {
        return __awaiter(this, void 0, void 0, function* () {
            const repoDB = yield this.GetRikRepository();
            const controlEsst = (yield repoDB.labelControl({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { ECTR: plstECTR } }))[0];
            if (controlEsst.EAR1 !== E_ESST_EAR_1.E_ESST_EAR.CUSTOMIZED_LABEL) {
                throw new LabelError_1.LabelError('labelLayout', `Prepared template for such label's template number ESST.EAR1='${controlEsst.EAR1}' doesn't exist`);
            }
            if (controlEsst.EON1 !== E_ESST_EON_1.E_ESST_EON.PRINT_LABEL) {
                throw new LabelError_1.LabelError('labelLayout', `Prohibited to print label ESST.EON1 = '${controlEsst.EON1}'`);
            }
            const labelEtst = (yield repoDB.labelParameters({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { ETNU: controlEsst.ENU1 } }))[0];
            const labelLayoutFost = yield repoDB.labelFields({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { FONU: labelEtst.FONU } });
            let result = {};
            labelLayoutFost
                .forEach(e => {
                const { FONU, INTY, FIXT, LEFT, TOP, RGHT, BOTT } = e;
                result[e.FENU] = { FONU, INTY, FIXT, LEFT, TOP, RGHT, BOTT };
            });
            return result;
        });
    }
    ToggleLabelLayout(plstECTR, force) {
        return __awaiter(this, void 0, void 0, function* () {
            const newXmlLayout = yield this.CreateXmlFileLayout(plstECTR);
            const pathToLayout = this.GetLayoutFilePath(plstECTR);
            const isNeedChangeLayout = yield this.CheckLayoutShouldChange(pathToLayout, newXmlLayout, plstECTR);
            if (isNeedChangeLayout || force) {
                console.log(`Layouts with ECTR=${plstECTR} are not equal, or forced change (force=${force})`);
                yield this.ChangeLabelLayout(newXmlLayout, plstECTR);
            }
            else {
                console.log(`Layouts with ECTR=${plstECTR} are equal`);
            }
        });
    }
    GetLayoutFilePath(plstECTR) {
        return path.join(Env_1.Env.AUXILIARY_PATH, `label-layout-${plstECTR}.xml`);
    }
    ChangeLabelLayout(newXmlLayout, plstECTR) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] ChangeLabelLayout() to 'ECTR'=`, plstECTR);
            const pathToLayout = this.GetLayoutFilePath(plstECTR);
            console.log(`Label layout is saving to: ${pathToLayout}`);
            console.time('save label layout');
            const labelService = LabelService_1.LabelService.Instance();
            yield labelService.LabelLayoutBuilder.SaveDocument(pathToLayout, newXmlLayout, { encoding: 'utf8' });
            console.timeEnd('save label layout');
            yield this.SetLayoutToPrinter(pathToLayout);
            this.LastLabelLayout = { path: pathToLayout, ECTR: plstECTR };
            return this.LastLabelLayout;
        });
    }
    CheckLayoutShouldChange(pathToLayout, newLayout, ectr) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLayoutsEqual = yield this.CompareLayouts(pathToLayout, newLayout);
            const needChange = isLayoutsEqual !== true
                || !this.LastLabelLayout
                || this.LastLabelLayout.ECTR !== ectr
                || this.LastLabelLayout.path !== pathToLayout;
            return needChange;
        });
    }
    CreateXmlFileLayout(plstECTR) {
        return __awaiter(this, void 0, void 0, function* () {
            console.time('create label layout');
            const repoDB = yield this.GetRikRepository();
            const controlEsst = (yield repoDB.labelControl({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { ECTR: plstECTR } }))[0];
            const labelEtst = (yield repoDB.labelParameters({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { ETNU: controlEsst.ENU1 } }))[0];
            const labelLayoutFost = yield repoDB.labelFields({ operator: rik_db_1.E_OPERATOR.EQUAL, parameter: { FONU: labelEtst.FONU } });
            const labelService = LabelService_1.LabelService.Instance();
            application_state_service_1.ApplicationStateService.Instance.setProps({
                PaperWidth: labelEtst.ETBR || null,
                LabelForceReversing: (typeof labelEtst.ETVS === 'number' && labelEtst.ETVS > 0) ? (labelEtst.ETVS) : null,
            });
            const newXmlLayout = labelService.GetReadyLabelLayout(labelEtst, labelLayoutFost);
            console.timeEnd('create label layout');
            console.log(`New xml layout: `, newXmlLayout.slice(0, 100));
            return newXmlLayout;
        });
    }
    SetLayoutToPrinter(pathToLayout) {
        return __awaiter(this, void 0, void 0, function* () {
            console.time('printer SET_LAYOUT');
            const printer = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.PRINTER);
            yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_LABEL_OR_TICKET_MODE, { data: 2, obj: '' });
            yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_PAPER_TYPE, { data: 2, obj: '' });
            const { PaperWidth, ReversingDistance, LabelForceReversing } = application_state_service_1.ApplicationStateService.Instance.props;
            const promises = [];
            if (PaperWidth !== null) {
                promises.push(printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_PAPER_WIDTH, { data: PaperWidth, obj: '2' }));
            }
            if (ReversingDistance !== null) {
                promises.push(printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_REVERSING_DISTANCE, { data: ReversingDistance + 1 * (LabelForceReversing || 0), obj: '' }));
            }
            promises.push(printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.SET_LAYOUT, {
                data: 0,
                obj: pathToLayout
            }));
            yield Promise.all(promises);
            console.timeEnd('printer SET_LAYOUT');
            console.time('set PAGE_MODE');
            yield printer.PageModePrint(e_printer_page_mode_control_1.POS_PRINTER_PAGE_MODE_CONTROL.PAGE_MODE);
            console.timeEnd('set PAGE_MODE');
        });
    }
    CompareLayouts(pathToFile, newLayout) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = false;
            try {
                const exists = NodeUtil.promisify(fs.access);
                yield exists(pathToFile, fs.constants.R_OK);
                const prevLayout = yield NodeUtil.promisify(fs.readFile)(pathToFile, { encoding: 'utf8' });
                yield NodeUtil.promisify(fs.writeFile)('/tmp/layout.xml', newLayout, { encoding: 'utf8' });
                const prevHash = crypto.createHash('md5').update(prevLayout).digest('hex');
                const currentHash = crypto.createHash('md5').update(newLayout).digest('hex');
                result = _.isEqual(prevHash, currentHash);
                console.log(`Hash:`, 'prevHash', prevHash, 'current hash', currentHash, 'is equal:', result);
            }
            catch (error) {
                console.error(`[P-REQUEST] layout '${pathToFile}' doesn't exists.`);
                result = false;
            }
            return result;
        });
    }
    GetBarcodeAfterCheckCost(article, cost, code) {
        return __awaiter(this, void 0, void 0, function* () {
            let repo = yield this.GetRikRepository();
            let costRowArr = yield repo.cost(cost);
            let costRow;
            if (costRowArr instanceof Array && costRowArr.length > 0) {
                costRow = costRowArr[0];
            }
            if (!costRow) {
                console.error(`[SERVER][ERROR] Article was created wrong! COST: RAW WITH (${cost}) DOESN'T EXIST`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            const dataForPrint = LabelService_1.LabelService.Instance().GetLabelOptions();
            let codeValueNumber = FieldChecker_1.FieldChecker.Cowe(costRow.COWE, dataForPrint);
            if (!codeValueNumber) {
                console.error(`[SERVER][ERROR] Article was created wrong! COWE.`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let codeValueLength = FieldChecker_1.FieldChecker.Cost(costRow.COST);
            if (!codeValueLength) {
                console.error(`[SERVER][ERROR] Article was created wrong! COST.`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let codeValueFactor = FieldChecker_1.FieldChecker.Coop(costRow.COOP);
            if (!codeValueFactor) {
                console.error(`[SERVER][ERROR] Article was created wrong! COOP.`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let precodeLength = FieldChecker_1.FieldChecker.Coty(costRow.COTY);
            if (!precodeLength) {
                console.error(`[SERVER][ERROR] Article was created wrong! COTY.`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            const pnum = article.PNUM ? article.PNUM + '' : '';
            const wgnu = article.WGNU ? article.WGNU + '' : '';
            const abnu = article.ABNU ? article.ABNU + '' : '';
            let codeContent = FieldChecker_1.FieldChecker.Coin(costRow.COIN, code, { PNUM: pnum, WGNU: wgnu, ABNU: abnu });
            if (!codeContent) {
                console.error(`[SERVER][ERROR] Article was created wrong! COIN.`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let codeWeightMultiplier = 1;
            let klar = article.KLAR;
            switch (klar) {
                case E_PRODUCT_TYPE_1.E_PT_KLAR.WEIGHTED:
                    codeWeightMultiplier = 1000;
                    break;
                case E_PRODUCT_TYPE_1.E_PT_KLAR.COUNTED:
                    codeWeightMultiplier = 1;
                    break;
                default:
                    console.error(`[SERVER][ERROR] Article was created wrong! Invalid KLAR`);
                    throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            let codeValueString = CommonHelper_1.CommonHelper.PadStart(Math.floor(codeValueNumber * codeWeightMultiplier * codeValueFactor).toString(10), codeValueLength, '0');
            let barCode = '' + costRow.KEZI.toString(10) + codeContent + codeValueString;
            if (barCode.length > precodeLength) {
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid barcode length: ${barCode}`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            if (barCode.length < precodeLength) {
                barCode = CommonHelper_1.CommonHelper.PadStart(barCode, precodeLength, '0');
            }
            let cowe = costRow.COWE;
            if ((klar === E_PRODUCT_TYPE_1.E_PT_KLAR.COUNTED) !== (cowe === E_PRODUCT_TYPE_1.E_PT_COWE.NUMBER_OF_PIECES) || (klar === E_PRODUCT_TYPE_1.E_PT_KLAR.WEIGHTED) !== (cowe === E_PRODUCT_TYPE_1.E_PT_COWE.WEIGHT)) {
                console.error(`[SERVER][ERROR] Article was created wrong! Invalid pair of code value ${cowe} and PLU class ${klar}`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            console.log(`[P-REQUEST] GetBarcodeAfterCheckCost() => ${barCode}`);
            return { code_01: barCode, };
        });
    }
    GetBarcodeWithoutCheckCost(article) {
        return __awaiter(this, void 0, void 0, function* () {
            let klar = article.KLAR;
            let stzw = article.STZW;
            let stpa = article.STPA;
            if (klar !== E_PRODUCT_TYPE_1.E_PT_KLAR.COUNTED) {
                console.error(`[SERVER][ERROR] Article was created wrong! KLAR entered not like COUNTED`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            if (stzw !== E_PRODUCT_TYPE_1.E_PT_STZW.DEFAULT_INPUT) {
                console.error(`[SERVER][ERROR] Article was created wrong! STZW should be 0`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            if (stpa !== 1) {
                console.error(`[SERVER][ERROR] Article was created wrong! STPA have to be '1'`);
                throw new LabelError_1.LabelError('articleWrong', 'Артикул створено невірно!');
            }
            const barCode = article.ECO1.slice(1);
            console.log(`[P-REQUEST] GetBarcodeWithoutCheckCost() => ${barCode}`);
            return {
                code_01: barCode,
            };
        });
    }
    GetArticleInfo(pnum) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof pnum !== 'number' || pnum < 0) {
                throw new LabelError_1.LabelError('productNotFound', `Невірно введений номер артикулу '${pnum}'`);
            }
            let repo = yield this.GetRikRepository();
            let tfzuList = yield repo.tfzu(pnum);
            let article = tfzuList[0];
            if (!article) {
                throw new LabelError_1.LabelError('productNotFound', 'Вибачте, данний товар відсутній');
            }
            let checkingData = FieldChecker_1.FieldChecker.Tfzu(article);
            if (!checkingData.isCorrect) {
                throw new LabelError_1.LabelError('productNotFound', 'Оновлення данних. Повторіть операцію.');
            }
            console.log(`[GetArticleInfo]: `, JSON.stringify(article));
            LabelService_1.LabelService.Instance().SetLabelOptions({
                code_01: article.ECO1.toString(),
                pluNumber: article.PNUM,
                text_01: article.FZ_TFZU_1,
                text_02: article.FZ_TFZU_2,
                text_03: article.FZ_TFZU_3,
                text_04: article.FZ_TFZU_4,
                text_05: article.FZ_TFZU_5,
                text_06: article.FZ_TFZU_6,
                text_07: article.FZ_TFZU_7,
                text_08: article.FZ_TFZU_8,
                text_09: article.FZ_TFZU_9,
                text_10: article.FZ_TFZU_10
            });
            application_state_service_1.ApplicationStateService.Instance.setProps({ LastArticle: article });
            return article;
        });
    }
    InitialProductList() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] <== 'getInitialProductList'`);
            let repo = yield this.GetRikRepository();
            const productList = yield repo.getInitialProductsList(null);
            try {
                const allProductGroupWgnu = 500;
                const allGroupIndex = '0';
                let sortedProductList;
                if (productList && productList[allGroupIndex] && productList[allGroupIndex].type === 'GROUPS') {
                    const index = productList[allGroupIndex].value.findIndex(group => group.WGNU === allProductGroupWgnu);
                    if (index > -1) {
                        const oldFirstGroup = Object.assign({}, productList[allGroupIndex].value.find(group => group.WGNU === allProductGroupWgnu));
                        sortedProductList = productList[allGroupIndex].value.filter(group => group.WGNU !== allProductGroupWgnu);
                        sortedProductList.push(oldFirstGroup);
                    }
                }
                if (sortedProductList !== undefined) {
                    productList[allGroupIndex].value = sortedProductList;
                }
            }
            catch (error) {
                console.warn(`[WARN][P-REQUEST] Sort product groups error. Returns default product group lidt from Db.`, error);
            }
            console.log(`[P-REQUEST] InitialProductList() =>`, productList ? (JSON.stringify(productList)).slice(0, 100) : productList);
            return productList;
        });
    }
    SetupTare(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] SetupTare({value:${data.value}, freeze:${data.freeze}})`);
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            const ApplicationProps = application_state_service_1.ApplicationStateService.Instance.props;
            if (ApplicationProps.TareFixed !== false) {
                yield scale.FreezeValue(e_scale_freeze_item_1.SCALE_FREEZE_ITEM.MANUAL_TARE, false);
                application_state_service_1.ApplicationStateService.Instance.setProps({ TareFixed: false });
            }
            if (ApplicationProps.TareWeight !== data.value) {
                yield scale.Set('TareWeight', data.value);
            }
            if (data.freeze) {
                yield scale.FreezeValue(e_scale_freeze_item_1.SCALE_FREEZE_ITEM.MANUAL_TARE, true);
                application_state_service_1.ApplicationStateService.Instance.setProps({ TareFixed: true });
            }
        });
    }
    SetupZero() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] SetupZero()`);
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            yield scale.SetZero();
        });
    }
    PrintAfterPaperInsert(force) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] PrintAfterPaperInsert(force: ${force})`);
            try {
                let { Paper } = application_state_service_1.ApplicationStateService.Instance.props;
                const printer = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.PRINTER);
                if (!Paper || force) {
                    const { data: errorCode, obj: message } = yield printer.DirectIO(e_printer_direct_io_request_1.POS_PRINTER_DIRECT_IO_REQUEST.LEARNING_MODE, { data: 0, obj: '' });
                    const match = /^RETURN:\[\d+\]\s+(.*)$/.exec(message);
                    if (errorCode !== 0) {
                        throw new DeviceError_1.DeviceError('DirectIOError', errorCode.toString(10), match ? match[1] : message);
                    }
                }
                Paper = !(yield printer.Get('RecEmpty'));
                if (!Paper) {
                    throw new DeviceError_1.DeviceError('NoPaperError', 'NO_PAPER', 'No paper found');
                }
                yield printer.PageModePrint(e_printer_page_mode_control_1.POS_PRINTER_PAGE_MODE_CONTROL.PAGE_MODE);
                yield printer.PageModePrint(e_printer_page_mode_control_1.POS_PRINTER_PAGE_MODE_CONTROL.PRINT_SAVE);
                application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRINT_LABEL_DONE });
            }
            catch (error) {
                application_state_service_1.ApplicationStateService.Instance.setProps({ PrintingState: e_print_state_1.PRINT_STATE.PRINT_LABEL_ERROR });
                throw error;
            }
        });
    }
    GetState() {
        return __awaiter(this, void 0, void 0, function* () {
            return application_state_service_1.ApplicationStateService.Instance.props;
        });
    }
    OnGetSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = yield loadSettings();
            const converted = this.AdjustSettingsForClient(settings);
            return converted;
        });
    }
    OnSetSettings(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] OnSetSettings(force: ${settings ? (JSON.stringify(settings)).slice(0, 100) : settings})`);
            const adjustedSettings = this.AdjustSettingsForDb(settings);
            yield saveSettings(adjustedSettings);
            yield renewNetwork();
            yield this.SetPriceCalculatingMode();
        });
    }
    AdjustSettingsForClient(settings) {
        console.log(`[P-REQUEST] AdjustSettingsForClient()`, JSON.stringify(settings));
        const allIfaceList = settings.interfacesSettings;
        const activeInterface = allIfaceList.filter(item => item.active === true)[0] || {};
        const globalSettings = settings.globalSettings && settings.globalSettings[0] ? settings.globalSettings[0] : {};
        const sliderSettings = settings.slider_settings && settings.slider_settings[0] ? settings.slider_settings[0] : {};
        const devicesSettings = settings.devices_settings;
        const dnsServersList = settings.dnsSettings || [];
        const modeRaw = devicesSettings.find(setting => setting.name === 'priceCalculatingMode');
        let mode = e_scale_price_calculating_mode_1.SCALE_PRICE_CALCULATION_MODE.PRICE_LABELING;
        if (modeRaw) {
            mode = modeRaw.value;
        }
        const dhcpList = settings.methods
            .map(item => ({ value: item.name, label: item.title, checked: activeInterface.method === item.name }));
        const result = {
            priceCalculatingMode: mode,
            activeNetInterface: activeInterface.name,
            netInterfacesList: allIfaceList.map(iface => ({
                name: iface.name,
                currentIp: iface.activeInetAddress,
                currentMac: iface.activeHardwareAddress,
                dhcp: iface.method,
                ip: iface.manualInetAddress,
                mask: iface.manualNetmask,
                gateway: iface.manualGateway,
            })),
            dhcpList,
            hostname: globalSettings.host_name,
            dns: dnsServersList.map(dnsRaw => dnsRaw.server_address),
            email: globalSettings.email,
            smtpAddress: globalSettings.smtp_server,
            smtpPort: globalSettings.smtp_port,
            contentType: sliderSettings.content_type,
            toggleSlideInterval: sliderSettings.slide_change_interval,
            turnOnSliderTimeout: sliderSettings.slider_out_interval,
        };
        console.log(`Settings adjusted for client:`, JSON.stringify(result));
        return result;
    }
    AdjustSettingsForDb(settings) {
        console.log(`[P-REQUEST] AdjustSettingsForDb()`, JSON.stringify(settings));
        const { netInterfacesList, hostname, dns, email, smtpPort, smtpAddress, contentType, toggleSlideInterval, turnOnSliderTimeout, priceCalculatingMode } = settings;
        const globalSettings = [{
                host_name: hostname,
                email: email,
                smtp_server: smtpAddress,
                smtp_port: smtpPort,
            }];
        const interfacesSettings = !(netInterfacesList && netInterfacesList instanceof Array) ? [] : netInterfacesList.map(iface => ({
            name: iface.name,
            method: iface.dhcp,
            manualInetAddress: iface.ip,
            manualNetmask: iface.mask,
            manualGateway: iface.gateway,
            activeInetAddress: iface.currentIp,
            activeHardwareAddress: iface.currentMac,
        }));
        const dnsSettings = !(dns && dns instanceof Array) ? [] : dns.map((item, index) => {
            return {
                server_address: item,
                is_enabled: true,
                priority: index
            };
        });
        const slider_settings = [{
                content_type: contentType,
                slide_change_interval: toggleSlideInterval,
                slider_out_interval: turnOnSliderTimeout,
            }];
        const devices_settings = [{
                name: 'priceCalculatingMode',
                device_type: E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE,
                value: priceCalculatingMode
            }];
        const result = Object.assign(Object.create(null), { globalSettings, interfacesSettings, dnsSettings, slider_settings, devices_settings });
        console.log(`Settings adjusted for db:`, JSON.stringify(result));
        return result;
    }
    SendEmailAboutErrorFromUI() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] SendEmailAboutErrorFromUI()`);
            let email = Email_1.Email.Instance;
            let sendResult = yield email.Send(E_T_EMAIL_1.E_T_EMAIL.FROM_UI);
            return sendResult;
        });
    }
    SendEmailAboutError() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] SendEmailAboutError()`);
            let email = Email_1.Email.Instance;
            let sendResult = yield email.Send(E_T_EMAIL_1.E_T_EMAIL.SERVER);
            return sendResult;
        });
    }
    ExecuteProcess(command, args, detached) {
        const process = child_process_1.spawn(command, args, { detached, stdio: detached ? 'ignore' : undefined });
        if (detached) {
            process.unref();
        }
        return new Promise((resolve, reject) => {
            let stderr = [];
            let stdout = [];
            process.stderr.setEncoding('utf8');
            process.stdout.setEncoding('utf8');
            process.stderr.on('data', (data) => stderr.push(typeof data === 'string' ? data : data.toString()));
            process.stdout.on('data', (data) => stdout.push(typeof data === 'string' ? data : data.toString()));
            process.once('error', (error) => {
                reject(error);
                process.removeAllListeners();
                console.log(`[P-REQUEST] ExecuteProcess()`, error);
            });
            process.once('close', (code) => {
                if (code === 0) {
                    resolve(stdout.join(''));
                }
                else {
                    reject(new Error(`Exited with code ${code}: ${stderr.join('')}`));
                }
                process.removeAllListeners();
            });
        });
    }
    Claim() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [, device] of this.Devices()) {
                console.log(`[CLAIM]`, device.ServiceName());
                yield device.Enable();
            }
            yield this.SetPriceCalculatingMode();
        });
    }
    Release() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const [, device] of this.Devices()) {
                console.log(`[REALISING]`, device.ServiceName());
                yield device.Disable();
            }
        });
    }
    ShowScalePanel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.IpAddress === '127.0.0.1' || this.IpAddress === 'localhost') {
                    yield this.Panels.Show();
                }
                else {
                    console.log(`IGNORING SHOW PANEL from ${this.IpAddress}`);
                }
            }
            catch (exception) {
                console.error(exception);
            }
        });
    }
    HideScalePanel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IpAddress === '127.0.0.1' || this.IpAddress === 'localhost') {
                yield this.Panels.Hide();
            }
            else {
                console.log(`IGNORING HIDE PANEL from ${this.IpAddress}`);
            }
        });
    }
    ServerRestart() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] ***********************|| Do restart server ||************************`);
            yield this.ExecuteProcess('systemctl', ['restart', 'posscale.service'], true);
            return new Promise(() => undefined);
        });
    }
    ShowDeviceSetting() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] ShowDeviceSetting()`);
            yield this.Release();
            yield this.ExecuteProcess('/opt/bizerba/posconfig/linux_x86/posconfig.x', []);
            yield this.ShowScalePanel();
            yield this.Claim();
        });
    }
    SetPriceCalculatingMode(mode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`[P-REQUEST] SetPriceCalculatingMode(${mode}).`);
            const settingModeName = 'priceCalculatingMode';
            const scale = this.Devices().get(E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
            if (scale) {
                if (!mode) {
                    console.log(`[P-REQUEST] Incoming mode === 'undefined', will set mode from Db.`);
                    const repo = yield this.GetRikRepository();
                    const scaleModeRaw = (yield repo.devicesSettings())
                        .find(setting => setting.name === settingModeName && setting.device_type === E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE);
                    if (scaleModeRaw) {
                        mode = scaleModeRaw.value;
                    }
                    else {
                        throw new Error(`[P-REQUEST] Can't set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode. The settings are depicted in the Db.`);
                    }
                }
                yield scale.SetPriceCalculationMode(mode);
                console.log(`[P-REQUEST] Set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode: ${mode}.`);
            }
            else {
                console.log(`[P-REQUEST] Can't set to ${E_DEVICE_TYPE_1.E_DEVICE_TYPE.SCALE} ${settingModeName} mode. Device doesn't exist.`);
            }
        });
    }
    GetSoftwareVersions() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = Object.create(null);
            try {
                const rikVersion = yield this.ExecuteProcess('rpm', ['-q', 'rik']);
                Object.assign(result, { rikVersion });
            }
            catch (error) {
                console.log(`[WARN][P-REQUEST] Error during get RIK version by 'rpm -q rik'`);
            }
            return result;
        });
    }
}
exports.ProcessingRequest = ProcessingRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvY2Vzc2luZ1JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMtdHMvU2VydmVyUklLL1Byb2Nlc3NpbmcvUHJvY2Vzc2luZ1JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUlBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsaUNBQWlDO0FBQ2pDLGlEQUFzQztBQUN0QyxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBRWhDLDJEQUF3RDtBQUV4RCw2REFBd0Q7QUFDeEQsdUVBSXdDO0FBQ3hDLHlGQUF3RjtBQUN4Rix5RkFBd0Y7QUFDeEYscUVBQW9FO0FBQ3BFLHlFQUFvRTtBQUdwRSw4RkFBeUY7QUFDekYsZ0VBQXVEO0FBRXZELCtDQUE0QztBQUM1QyxnRUFBNkQ7QUFDN0QsNkRBQTBEO0FBRTFELG1DQUFtRztBQUNuRyxvRUFBaUU7QUFDakUsd0RBQXFEO0FBQ3JELGlEQUE4QztBQUU5Qyw0Q0FBeUM7QUFDekMsK0RBQXdGO0FBRXhGLDREQUF5RDtBQUN6RCxnQ0FBNkI7QUFDN0IseURBQXNEO0FBQ3RELHVEQUFvRDtBQUNwRCx1REFBb0Q7QUFVcEQscURBQWtEO0FBQ2xELHNEQUFtRDtBQUNuRCwrRkFBMEY7QUFHMUYsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFLbEcsdUJBQStCLFNBQVEseUJBQVc7SUFJOUMsWUFBWSxNQUF1QixFQUFFLE9BQTRDLEVBQUUsS0FBYTtRQUM1RixLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU5QixJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQVksZUFBZTtRQUN2QixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBWSxlQUFlLENB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
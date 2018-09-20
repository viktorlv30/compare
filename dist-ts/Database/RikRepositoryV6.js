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
const _ = require("underscore");
const RikRepositoryModel_1 = require("../Common/Model/RikModel/RikRepositoryModel");
const rik_db_1 = require("rik-db");
const Env_1 = require("../ServerRIK/Env");
const E_SMODE_1 = require("../Enums/E_SMODE");
const Util_1 = require("../Common/Util");
const PRELOAD_LIMIT = null;
const brand_re = /^([0-58-9]?[0-9]{2})?(?:(6[0-9]{2})(7[0-9]{2})?)?$/;
class RikRepositoryV6 {
    static GetInstance() {
        return RikRepositoryV6._instance ? RikRepositoryV6._instance : (RikRepositoryV6._instance = new RikRepositoryV6());
    }
    constructor() {
        if (!RikRepositoryV6._instance) {
            return RikRepositoryV6._instance = this;
        }
        return RikRepositoryV6._instance;
    }
    getSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const globalSettings = yield rik_db_1.NetworkGlobalSettings.query().where('network_global_setting_id', '=', 0);
                const interfacesSettings = yield rik_db_1.NetworkInterfaceSettings.query();
                const dnsSettings = yield rik_db_1.Dns.query();
                const methods = yield rik_db_1.Method.query();
                const slider_settings = yield rik_db_1.Background.query().where('background_id', '=', 0);
                const devices_settings = yield rik_db_1.DevicesSettings.query();
                if (!(globalSettings.length > 0)) {
                    const setting = new rik_db_1.NetworkGlobalSettings();
                    setting.network_global_setting_id = 0;
                    globalSettings.push(setting);
                }
                if (!(slider_settings.length > 0)) {
                    const slider = new rik_db_1.Background();
                    slider.background_id = 0;
                    slider.content_type = 'sliders';
                    slider.slide_change_interval = 3;
                    slider.slider_out_interval = 15;
                    slider_settings.push(slider);
                }
                const result = {
                    globalSettings,
                    interfacesSettings,
                    dnsSettings,
                    methods,
                    slider_settings,
                    devices_settings
                };
                return result;
            }
            catch (error) {
                console.error('[RikRepository][getSettings] Error', error);
                throw error;
            }
        });
    }
    setSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req) {
                    const { globalSettings, interfacesSettings, dnsSettings, slider_settings, devices_settings } = req;
                    const globalSettingsItems = [];
                    const globalSettingsInsertsItems = [];
                    const globalSettingsUpdatesItems = [];
                    const networkGlobalSettings = globalSettings;
                    const interfacesSettingsItems = [];
                    const interfacesSettingsInsertsItems = [];
                    const interfacesSettingsUpdatesItems = [];
                    const networkInterfacesSettings = interfacesSettings;
                    const sliderSettingsItems = [];
                    const sliderSettingsInsertsItems = [];
                    const sliderSettingsUpdatesItems = [];
                    const sliderSettings = slider_settings;
                    const dnsSettingsItems = [];
                    const dnsSettingsInsertsItems = [];
                    const dnsServerSettings = dnsSettings;
                    const devicesSettingsItems = [];
                    const devicesSettingsInsertsItems = [];
                    const devicesSettingsUpdatesItems = [];
                    const devicesSettings = devices_settings;
                    console.log('[RikRepository][setSettings] Start');
                    if (interfacesSettings instanceof Array && networkInterfacesSettings !== null && networkInterfacesSettings.length > 0) {
                        networkInterfacesSettings.forEach(element => {
                            const { name, method, manualInetAddress, manualNetmask, manualGateway } = element;
                            const ob = {
                                name: name,
                                method_name: method,
                                ip_address: manualInetAddress,
                                mask: manualNetmask,
                                gateway: manualGateway
                            };
                            Object.assign(element, ob);
                            console.log('Interface item before Parse', element);
                            const item = new rik_db_1.NetworkInterfaceSettings(element);
                            console.log('Interface item after Parse: ', item);
                            interfacesSettingsItems.push(item);
                        });
                    }
                    if (globalSettings instanceof Array && networkGlobalSettings !== null && networkGlobalSettings.length > 0) {
                        networkGlobalSettings.forEach(element => {
                            console.log('Global item before Parse: ', element);
                            const item = new rik_db_1.NetworkGlobalSettings(element);
                            console.log('Global item after Parse: ', item);
                            globalSettingsItems.push(item);
                        });
                    }
                    if (slider_settings instanceof Array && sliderSettings != null && sliderSettings.length > 0) {
                        sliderSettings.forEach(element => {
                            console.log('Slider item before Parse: ', element);
                            const item = new rik_db_1.Background(element);
                            console.log('Slider item after Parse: ', item);
                            sliderSettingsItems.push(item);
                        });
                    }
                    if (dnsSettings instanceof Array && dnsServerSettings != null && dnsServerSettings.length > 0) {
                        dnsServerSettings.forEach(setting => {
                            console.log('DNS item before Parse: ', setting);
                            const item = new rik_db_1.Dns(setting);
                            console.log('DNS item after Parse: ', item);
                            dnsSettingsItems.push(item);
                        });
                    }
                    if (devices_settings instanceof Array && devicesSettings != null && devicesSettings.length > 0) {
                        devicesSettings.forEach(setting => {
                            console.log('DEVICE setting before Parse: ', setting);
                            const item = new rik_db_1.DevicesSettings(setting);
                            console.log('DEVICE setting after Parse: ', item);
                            devicesSettingsItems.push(item);
                        });
                    }
                    if (interfacesSettingsItems.length > 0) {
                        for (let i = 0; i < interfacesSettingsItems.length; i++) {
                            let item = interfacesSettingsItems[i];
                            let updateInterfaceItem = yield rik_db_1.NetworkInterfaceSettings.query().where('name', '=', item.name);
                            if (updateInterfaceItem !== null && updateInterfaceItem !== undefined && updateInterfaceItem.length > 0) {
                                interfacesSettingsUpdatesItems.push(item);
                            }
                            else {
                                interfacesSettingsInsertsItems.push(item);
                            }
                        }
                    }
                    if (globalSettingsItems.length > 0) {
                        for (let i = 0; i < globalSettingsItems.length; i++) {
                            let item = globalSettingsItems[i];
                            let id = item.network_global_setting_id ? item.network_global_setting_id : 0;
                            let globalUpdateItems = yield rik_db_1.NetworkGlobalSettings.query().where('network_global_setting_id', '=', id);
                            if (globalUpdateItems != null && globalUpdateItems !== undefined && globalUpdateItems.length > 0) {
                                globalSettingsUpdatesItems.push(item);
                            }
                            else {
                                globalSettingsInsertsItems.push(item);
                            }
                        }
                    }
                    if (sliderSettingsItems.length > 0) {
                        for (let i = 0; i < sliderSettingsItems.length; i++) {
                            let item = sliderSettingsItems[i];
                            let id = item.background_id ? item.background_id : 0;
                            let sliderUpdateItems = yield rik_db_1.Background.query().where('background_id', '=', id);
                            if (sliderUpdateItems !== null && sliderUpdateItems !== undefined && sliderUpdateItems.length > 0) {
                                sliderSettingsUpdatesItems.push(item);
                            }
                            else {
                                sliderSettingsInsertsItems.push(item);
                            }
                        }
                    }
                    if (dnsSettingsItems.length > 0) {
                        for (let i = 0; i < dnsSettingsItems.length; i++) {
                            const item = dnsSettingsItems[i];
                            dnsSettingsInsertsItems.push(item);
                        }
                    }
                    if (devicesSettingsItems.length > 0) {
                        for (let i = 0; i < devicesSettingsItems.length; i++) {
                            const item = devicesSettingsItems[i];
                            const updateDeviceItem = yield rik_db_1.DevicesSettings.query().where('name', '=', item.name).andWhere('device_type', '=', item.device_type);
                            if (updateDeviceItem !== null && updateDeviceItem !== undefined && updateDeviceItem.length > 0) {
                                devicesSettingsUpdatesItems.push(item);
                            }
                            else {
                                devicesSettingsInsertsItems.push(item);
                            }
                        }
                    }
                    console.log('Updates interfaces items', interfacesSettingsUpdatesItems);
                    console.log('Inserts interfaces items', interfacesSettingsInsertsItems);
                    console.log('Updates global items', globalSettingsUpdatesItems);
                    console.log('Inserts global items', globalSettingsInsertsItems);
                    console.log('Updates slider items', sliderSettingsUpdatesItems);
                    console.log('Inserts slider items', sliderSettingsInsertsItems);
                    console.log('Inserts dns items', dnsSettingsInsertsItems);
                    console.log('Updates devices settings items', devicesSettingsUpdatesItems);
                    console.log('Inserts devices settings items', devicesSettingsInsertsItems);
                    let countItems = 0;
                    function addItems(params) {
                        if (params instanceof Array) {
                            countItems += params.length;
                        }
                        else {
                            countItems += params;
                        }
                    }
                    const trx = yield rik_db_1.Rik.transaction.start(rik_db_1.DbSettings.knex);
                    try {
                        const insertsInterfacesItems = yield rik_db_1.NetworkInterfaceSettings.query(trx).insertAndFetch(interfacesSettingsInsertsItems);
                        const insertsGlobalItems = yield rik_db_1.NetworkGlobalSettings.query(trx).insertAndFetch(globalSettingsInsertsItems);
                        const insertsSlidersItems = yield rik_db_1.Background.query(trx).insertAndFetch(sliderSettingsInsertsItems);
                        yield rik_db_1.Dns.query(trx).truncate();
                        const insertsDnsItems = yield rik_db_1.Dns.query(trx).insertAndFetch(dnsSettingsInsertsItems);
                        let insertsDevicesItems = yield rik_db_1.DevicesSettings.query(trx).insertAndFetch(devicesSettingsInsertsItems);
                        addItems(insertsInterfacesItems.length);
                        addItems(insertsGlobalItems.length);
                        addItems(insertsSlidersItems.length);
                        addItems(insertsDnsItems.length);
                        addItems(insertsDevicesItems.length);
                        for (let i = 0; i < interfacesSettingsUpdatesItems.length; i++) {
                            const item = interfacesSettingsUpdatesItems[i];
                            const result = yield rik_db_1.NetworkInterfaceSettings.query(trx).patch(item).where('name', '=', item.name);
                            addItems(result);
                        }
                        for (let i = 0; i < globalSettingsUpdatesItems.length; i++) {
                            const item = globalSettingsUpdatesItems[i];
                            const id = item.network_global_setting_id ? item.network_global_setting_id : 0;
                            const result = yield rik_db_1.NetworkGlobalSettings.query(trx).patch(item).where('network_global_setting_id', '=', id);
                            addItems(result);
                        }
                        for (let i = 0; i < sliderSettingsItems.length; i++) {
                            const item = sliderSettingsItems[i];
                            const id = item.background_id ? item.background_id : 0;
                            const result = yield rik_db_1.Background.query(trx).patch(item).where('background_id', '=', id);
                            addItems(result);
                        }
                        for (let i = 0; i < dnsSettingsItems.length; i++) {
                            const item = dnsSettingsItems[i];
                            const id = item.dns_id ? item.dns_id : 0;
                            const result = yield rik_db_1.Dns.query(trx).patch(item).where('dns_id', '=', id);
                            addItems(result);
                        }
                        for (let i = 0; i < devicesSettingsUpdatesItems.length; i++) {
                            const item = devicesSettingsUpdatesItems[i];
                            const result = yield rik_db_1.DevicesSettings.query(trx).patch(item).where('name', '=', item.name).andWhere('device_type', '=', item.device_type);
                            addItems(result);
                        }
                        yield trx.commit();
                    }
                    catch (error) {
                        trx.rollback(error);
                        throw error;
                    }
                    console.log('[RikRepository][setSettings] Updated and inserted items numbers:', countItems);
                }
            }
            catch (error) {
                console.error('[RikRepository][setSettings]', error);
            }
        });
    }
    getInitialProductsList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.getMacrogroupsWGNUList(req, res);
            }
            catch (error) {
                console.log(error);
                return new RikRepositoryModel_1.MacrogroupResultItem();
            }
        });
    }
    getMacrogroupsWGNUList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let results = new RikRepositoryModel_1.MacrogroupResultItem();
                let groups_base = yield rik_db_1.ProductGroup.query().select('WGNU');
                let group_ids = _.map(groups_base, group => group.WGNU);
                let group_add = (group_id, group) => {
                    let { type, value, numeric_keyboard } = group;
                    if (type !== 'GROUPS' && value instanceof Array) {
                        value = value.length;
                    }
                    if (group.value instanceof Array && group.value.length > 0) {
                        results[group_id] = group;
                    }
                };
                let group_error = (group_id, error) => {
                    console.warn(`[GROUP][LOAD][${group_id}] ${error.message}`);
                };
                for (let i = 0; i < group_ids.length; i++) {
                    const id = group_ids[i];
                    let groupItem = undefined;
                    try {
                        groupItem = yield this.all({ productGroup: id, usingAbnuFilter: E_SMODE_1.E_SMODE.GENERAL });
                        group_add(id, groupItem);
                    }
                    catch (error) {
                        group_error(id, error);
                    }
                }
                let groupItem = undefined;
                try {
                    groupItem = yield this.all({ productGroup: 0, usingAbnuFilter: E_SMODE_1.E_SMODE.GENERAL });
                    group_add(0, groupItem);
                }
                catch (error) {
                    group_error(0, error);
                }
                let changed = true;
                while (changed) {
                    changed = false;
                    for (let group_id in results) {
                        let group = results[group_id];
                        if (!(group.value instanceof Array && group.value.length > 0)) {
                            delete results[group_id];
                            changed = true;
                            continue;
                        }
                        if (group.type === 'GROUPS') {
                            for (let i = group.value.length - 1; i >= 0; i--) {
                                let inner_id = `${group.value[i].WGNU}`;
                                if (!results.hasOwnProperty(inner_id)) {
                                    group.value.splice(i, 1);
                                    changed = true;
                                }
                            }
                        }
                    }
                }
                return results;
            }
            catch (error) {
                console.error('[RikRepository][getMacrogroupsWGNUList] Error', error);
                throw error;
            }
        });
    }
    text(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.usingAbnuFilter = E_SMODE_1.E_SMODE.GENERAL;
                return this.all(req, res);
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = new RikRepositoryModel_1.ProductGroupResultItem();
                let productGroupId = (Util_1.Util.isObject(req) && req.hasOwnProperty('productGroup')) ? `${req.productGroup}` : '0';
                let text_value = (Util_1.Util.isObject(req) && req.hasOwnProperty('value')) ? `${req.value}` : undefined;
                let task = rik_db_1.ProductGroup.query().where('WGNU', '=', productGroupId).first();
                let productGroupData = yield task;
                if (productGroupData === undefined) {
                    productGroupData = new rik_db_1.ProductGroup();
                }
                let task2 = rik_db_1.ProductGroup.query().where('parent_id', '=', productGroupId).orderBy('WGNU');
                let subgroups = yield task2;
                if (subgroups.length > 0) {
                    result.type = 'GROUPS';
                    result.value = subgroups;
                    result.numeric_keyboard = productGroupData.numeric_keyboard === true;
                }
                else {
                    let order;
                    if (productGroupData.numeric_keyboard === true) {
                        order = `"PLTE"::int ASC NULLS LAST`;
                    }
                    else {
                        order = `"PLTE" ASC`;
                    }
                    let query;
                    let group_filter = new Array();
                    let text_filter = new Array();
                    if (brand_re.test(productGroupId)) {
                        let match = brand_re.exec(productGroupId);
                        if (match) {
                            let base_group_id = match[1];
                            let group_id = match[2];
                            let brand_id = match[3];
                            if (productGroupId === '0') {
                                group_filter.push(`"WGNU" = ${productGroupId}`);
                            }
                            else if (base_group_id === '500') {
                                group_filter.push('TRUE');
                            }
                            else if (base_group_id) {
                                group_filter.push(`"WGNU" = ${base_group_id}`);
                            }
                            else {
                                group_filter.push('FALSE');
                            }
                            if (group_id === '600') {
                                group_filter.push('TRUE');
                            }
                            else if (group_id !== undefined) {
                                group_filter.push(`"FZ_GROUP" = ${group_id}`);
                            }
                            else {
                                group_filter.push('TRUE');
                            }
                            if (brand_id === '700') {
                                group_filter.push('TRUE');
                            }
                            else if (brand_id !== undefined) {
                                group_filter.push(`"FZ_BRAND" = ${brand_id}`);
                            }
                            else {
                                group_filter.push('TRUE');
                            }
                        }
                    }
                    else {
                        group_filter.push('FALSE');
                    }
                    if (text_value !== undefined) {
                        text_filter.push(`"PLTE" ~* '${text_value}'`);
                    }
                    else {
                        text_filter.push('TRUE');
                    }
                    let groupJoin = group_filter.join(' AND ');
                    let textJoin = text_filter.join(' AND ');
                    let task3 = rik_db_1.Plst.query()
                        .where(rik_db_1.Rik.raw(groupJoin))
                        .andWhere(rik_db_1.Rik.raw(textJoin))
                        .andWhere('GPR1', '>', 0)
                        .andWhere('WALO', '=', 0)
                        .orderByRaw(rik_db_1.Rik.raw(order));
                    if (typeof PRELOAD_LIMIT === 'number' && PRELOAD_LIMIT > 0) {
                        task3 = task3.limit(PRELOAD_LIMIT);
                    }
                    task3 = this.AttachFilters(task3, req.usingAbnuFilter);
                    let products = yield task3;
                    result.type = 'PRODUCTS';
                    result.value = products;
                    result.numeric_keyboard = productGroupData.numeric_keyboard === true;
                }
                if (Util_1.Util.isFunction(res)) {
                    res(result);
                }
                return result;
            }
            catch (error) {
                console.error('[RikRepository][all] UNEXPECTED EXEPTION', error);
                throw error;
            }
        });
    }
    tfzu(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('RikRepository.tfzu(): incoming plu', req);
            try {
                let task = rik_db_1.Plst.query().skipUndefined()
                    .select('PNUM', 'ABNU', 'ANKE', 'PLTE', 'WGNU', 'KLAR', 'STPA', 'GPR1', 'PTYP', 'ECO1', 'TANU', 'TARA', 'RATY', 'RABZ', 'KLGE', 'ECTR', 'AKTI', 'HBA1', 'HALB', 'STZW', 'a.ATTE as FZ_TFZU_1', 'b.ATTE as FZ_TFZU_2', 'c.ATTE as FZ_TFZU_3', 'd.ATTE as FZ_TFZU_4', 'e.ATTE as FZ_TFZU_5', 'f.ATTE as FZ_TFZU_6', 'g.ATTE as FZ_TFZU_7', 'h.ATTE as FZ_TFZU_8', 'i.ATTE as FZ_TFZU_9', 'j.ATTE as FZ_TFZU_10', 'FZ_PLTE_UK', 'FZ_PLTE_RU', 'FZ_MACRO_GROUP')
                    .leftOuterJoin('ATST as a', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_1" as int)'), 'a.ATNU')
                    .leftOuterJoin('ATST as b', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_2" as int)'), 'b.ATNU')
                    .leftOuterJoin('ATST as c', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_3" as int)'), 'c.ATNU')
                    .leftOuterJoin('ATST as d', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_4" as int)'), 'd.ATNU')
                    .leftOuterJoin('ATST as e', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_5" as int)'), 'e.ATNU')
                    .leftOuterJoin('ATST as f', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_6" as int)'), 'f.ATNU')
                    .leftOuterJoin('ATST as g', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_7" as int)'), 'g.ATNU')
                    .leftOuterJoin('ATST as h', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_8" as int)'), 'h.ATNU')
                    .leftOuterJoin('ATST as i', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_9" as int)'), 'i.ATNU')
                    .leftOuterJoin('ATST as j', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_10" as int)'), 'j.ATNU')
                    .where('PLST.GPR1', '>', 0)
                    .andWhere('PLST.WALO', '=', 0)
                    .andWhere('PLST.PNUM', '=', req);
                let plst = yield task;
                return plst;
            }
            catch (error) {
                console.error('[RikRepository][tfzu] Error', error);
                throw error;
            }
        });
    }
    productGroups(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.ProductGroup.query().orderBy('WGNU');
                let groups = yield task;
                return groups;
            }
            catch (error) {
                console.error('[RikRepository][productGroups]: ERROR', error);
                throw error;
            }
        });
    }
    pnum(req, skipFilter, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Plst.query().select('PNUM', 'GPR1', 'FZ_PLTE_UK', 'STZW', 'STPA', 'KLAR', 'ABNU', 'WGNU')
                    .where('PNUM', '=', req)
                    .andWhere('GPR1', '>', 0)
                    .andWhere('WALO', '=', 0);
                task = this.AttachFilters(task);
                let listPlst = yield task;
                return listPlst;
            }
            catch (error) {
                error.name = `Database 'PNUM=${req}' error: ${error.routine}`;
                console.error('[RikRepository][pnum] Error', error);
                throw error;
            }
        });
    }
    cost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let costs = yield rik_db_1.Cost.query().select('COIN', 'KEZI', 'COWE', 'COST', 'COOP', 'COTY').where('COSN', '=', req);
                return costs;
            }
            catch (error) {
                console.log('[RikRepository][cost] Error', error);
                throw error;
            }
        });
    }
    macro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Plst.query()
                    .where('WGNU', '=', req)
                    .andWhere('GPR1', '>', 0)
                    .andWhere('WALO', '=', 0);
                let listPlst = yield task;
                return listPlst;
            }
            catch (error) {
                console.error('[RikRepository][macro] Error', error);
                throw error;
            }
        });
    }
    labelFields(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Fost.query();
                this.AddParameters(task, rik_db_1.Fost.jsonSchema, rik_db_1.Fost.tableName, req);
                const items = yield task;
                return items;
            }
            catch (error) {
                console.error('[RikRepository][labelFields]', error);
                throw error;
            }
        });
    }
    labelParameters(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Etst.query();
                this.AddParameters(task, rik_db_1.Etst.jsonSchema, rik_db_1.Etst.tableName, req);
                const items = yield task;
                return items;
            }
            catch (error) {
                console.error('[RikRepository][labelParameters]', error);
                throw error;
            }
        });
    }
    labelControl(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Esst.query();
                this.AddParameters(task, rik_db_1.Esst.jsonSchema, rik_db_1.Esst.tableName, req);
                const items = yield task;
                return items;
            }
            catch (error) {
                console.error('[RikRepository][labelControl]', error);
                throw error;
            }
        });
    }
    shopAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let address = yield rik_db_1.Atst.query().select('ATTE').where('ATNU', '=', 39999999).first();
                return address ? address : new rik_db_1.Atst();
            }
            catch (error) {
                console.error('[RikRepository][shopAddress] Error', error);
                throw error;
            }
        });
    }
    AddParameters(task, jsonSchema, tableName, req) {
        try {
            if (req && req.operator && req.parameter) {
                rik_db_1.RikModel.ChecksExistColumns(jsonSchema, tableName, req.parameter);
                Object.keys(req.parameter).forEach(key => {
                    task.andWhere(key, req.operator, req.parameter[key]);
                });
            }
        }
        catch (error) {
            throw error;
        }
    }
    AttachFilters(task, usingAbnuFilter) {
        try {
            if (usingAbnuFilter === E_SMODE_1.E_SMODE.GENERAL) {
                task = this.AddFilterByABNUInPlstTable(task);
            }
            task = this.AddFilterByKLARInPlstTable(task);
            return task;
        }
        catch (error) {
            throw error;
        }
    }
    AddFilterByABNUInPlstTable(task) {
        try {
            if (Util_1.Util.isArray(Env_1.Env.FILTER_DEPTH_MAIN_MENU) && Env_1.Env.FILTER_DEPTH_MAIN_MENU.length > 0) {
                Env_1.Env.FILTER_DEPTH_MAIN_MENU.forEach(el => {
                    task = task.andWhere('ABNU', '!=', el);
                });
            }
            return task;
        }
        catch (error) {
            throw error;
        }
    }
    AddFilterByKLARInPlstTable(task) {
        try {
            if (Util_1.Util.isArray(Env_1.Env.FILTER_COUNTED_GOODS) && Env_1.Env.FILTER_COUNTED_GOODS.length > 0) {
                Env_1.Env.FILTER_COUNTED_GOODS.forEach(el => {
                    task = task.andWhere('KLAR', '!=', el);
                });
            }
            return task;
        }
        catch (error) {
            throw error;
        }
    }
    _methodTime(method) {
        let caller = method;
        if (Util_1.Util.isFunction(caller) && typeof caller.name === 'string' && caller.name !== '') {
            console.time(caller.name);
        }
    }
    _methodTimeEnd(method) {
        let caller = method;
        if (Util_1.Util.isFunction(caller) && typeof caller.name === 'string' && caller.name !== '') {
            console.timeEnd(caller.name);
        }
    }
    saveKeyboardStatistic(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const kbStatisticItems = [];
            Object.keys(req).forEach(key => {
                const item = {
                    begin_period: (new Date(req[key].periodStart)).toLocaleString(),
                    end_period: (new Date(req[key].periodEnd)).toLocaleString(),
                    button: key,
                    localization: req[key].lang,
                    count: req[key].count,
                };
                const ksItem = new rik_db_1.KeyboardStatistic(item);
                kbStatisticItems.push(ksItem);
            });
            if (_.isEmpty(kbStatisticItems)) {
                return 0;
            }
            const trx = yield rik_db_1.Rik.transaction.start(rik_db_1.DbSettings.knex);
            try {
                const savedItems = yield rik_db_1.KeyboardStatistic.query(trx).insertAndFetch(kbStatisticItems);
                yield trx.commit();
                return savedItems.length;
            }
            catch (error) {
                trx.rollback(error);
                throw error;
            }
        });
    }
    devicesSettings(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devicesSettings = yield rik_db_1.DevicesSettings.query().select();
                return devicesSettings ? devicesSettings : [];
            }
            catch (error) {
                console.error('[RikRepository][shopAddress] Error', error);
                throw error;
            }
        });
    }
}
exports.RikRepositoryV6 = RikRepositoryV6;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmlrUmVwb3NpdG9yeVY2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjLXRzL0RhdGFiYXNlL1Jpa1JlcG9zaXRvcnlWNi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsZ0NBQWdDO0FBQ2hDLG9GQUEwSDtBQUMxSCxtQ0FVZ0I7QUFFaEIsMENBQXNDO0FBRXRDLDhDQUEyQztBQUMzQyx5Q0FBc0M7QUFHdEMsTUFBTSxhQUFhLEdBQWtCLElBQUksQ0FBQztBQUMxQyxNQUFNLFFBQVEsR0FBRyxvREFBb0QsQ0FBQztBQVV0RTtJQVFXLE1BQU0sQ0FBQyxXQUFXO1FBQ3JCLE9BQU8sZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMsQ0FBQztJQUN2SCxDQUFDO0lBS0Q7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRTtZQUM1QixPQUFPLGVBQWUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQzNDO1FBRUQsT0FBTyxlQUFlLENBQUMsU0FBUyxDQUFDO0lBQ3JDLENBQUM7SUFNWSxXQUFXLENBQUMsR0FBUyxFQUFFLEdBQVM7O1lBRXpDLElBQUk7Z0JBQ0EsTUFBTSxjQUFjLEdBQUcsTUFBTSw4QkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN0RyxNQUFNLGtCQUFrQixHQUFHLE1BQU0saUNBQXdCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2xFLE1BQU0sV0FBVyxHQUFHLE1BQU0sWUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QyxNQUFNLE9BQU8sR0FBRyxNQUFNLGVBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxlQUFlLEdBQUcsTUFB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
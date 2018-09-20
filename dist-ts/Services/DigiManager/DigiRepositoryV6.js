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
const rik_db_1 = require("rik-db");
const DigiRepositoryModel_1 = require("../../Common/Model/DigiManagerModel/DigiRepositoryModel");
const _ = require("underscore");
const SocketIOClient = require("socket.io-client");
const Env_1 = require("../../ServerRIK/Env");
const brand_re = /^([0-58-9]?[0-9]{2})?(?:(6[0-9]{2})(7[0-9]{2})?)?$/;
class DigiRepositoryV6 {
    get CountProcessedItems() {
        return this._countProcessedItems;
    }
    set CountProcessedItems(count) {
        this._countProcessedItems = count;
    }
    static GetInstance() {
        return DigiRepositoryV6._instance ? DigiRepositoryV6._instance : (DigiRepositoryV6._instance = new DigiRepositoryV6());
    }
    constructor() {
        this._countProcessedItems = 0;
        this._socketIO = SocketIOClient.connect(`http://localhost:${Env_1.Env.PORT}`, { transports: ['websocket'] });
        this._socketIO.on('connect', () => {
            console.log('[DigiRepository] SOCKET Connected!');
        });
        if (!DigiRepositoryV6) {
            return DigiRepositoryV6._instance = this;
        }
        return DigiRepositoryV6._instance;
    }
    Insert(tableName, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (columns && columns.length > 0) {
                    switch (tableName) {
                        case 'PLSF': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Plsf(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Plsf, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Plsf.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'PLST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Plst(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Plst, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Plst.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'ATST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Atst(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Atst, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Atst.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'ETST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Etst(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Etst, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Etst.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'ESST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Esst(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Esst, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Esst.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'FOST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Fost(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Fost, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Fost.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'COST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Cost(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Cost, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Cost.query().insert(insertsItems);
                            }
                            break;
                        }
                        case 'WGST': {
                            let insertsItems = [];
                            for (let i = 0; i < columns.length; i++) {
                                const element = columns[i];
                                const item = new rik_db_1.Wgst(element);
                                let needInsert = yield this.UpdateOrNeedInsert(tableName, rik_db_1.Wgst, item);
                                if (needInsert === true) {
                                    insertsItems.push(item);
                                }
                            }
                            if (insertsItems.length > 0) {
                                yield rik_db_1.Wgst.query().insert(insertsItems);
                            }
                            break;
                        }
                        default:
                            let message = `DigiRepository.Insert(tableName: string, columns: any): Promise<void>: No such table ${tableName}`;
                            throw new Error(message);
                    }
                    this.CountProcessedItems += columns.length;
                }
            }
            catch (error) {
                console.error(`[DigiRepository][Insert][Table name: ${tableName}]`, error);
                throw error;
            }
        });
    }
    UpdateOrNeedInsert(tableName, entity, item) {
        return __awaiter(this, void 0, void 0, function* () {
            if (entity === null || entity === undefined)
                return false;
            let needInsert = true;
            try {
                let idColumns = entity.idColumn;
                let ids = this.GetPrimaryKeyValues(idColumns, item);
                let exists = yield entity.query().patchAndFetchById(ids, item);
                if (exists) {
                    needInsert = false;
                }
                return needInsert;
            }
            catch (error) {
                console.error(`[DigiRepository][UpdateOrNeedInsert] on table ${tableName}`, error);
                throw error;
            }
        });
    }
    Remove(tableName, columns) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (columns && columns.length > 0) {
                    switch (tableName) {
                        case 'PLSF': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Plsf.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Plsf(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Plsf.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'PLST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Plst.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Plst(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Plst.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'ATST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Atst.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Atst(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Atst.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'ETST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Etst.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Etst(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Etst.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'ESST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Esst.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Esst(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Esst.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'FOST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Fost.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Fost(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Fost.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'COST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Cost.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Cost(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Cost.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        case 'WGST': {
                            const primaryKeyValue = new DigiRepositoryModel_1.PrimaryKeyValue();
                            let idColumns = rik_db_1.Cost.idColumn;
                            for (let i = 0; i < columns.length; i++) {
                                const item = new rik_db_1.Wgst(columns[i]);
                                yield this.MakePrimaryKeyValue(tableName, primaryKeyValue, idColumns, item);
                            }
                            if (idColumns instanceof Array && idColumns.length > 0) {
                                let task = rik_db_1.Wgst.query().delete();
                                idColumns.forEach((pKey, index) => {
                                    task.andWhere(pKey, 'IN', primaryKeyValue[pKey]);
                                });
                                yield task;
                            }
                            break;
                        }
                        default:
                            let message = `DigiRepository.Remove(tableName: string, columns: any): Promise<void>: No such table ${tableName}`;
                            throw new Error(message);
                    }
                }
            }
            catch (error) {
                console.error(`[DigiRepository][Remove][Table :${tableName}]`, error);
                throw error;
            }
        });
    }
    MakePrimaryKeyValue(tableName, primaryValue, idColumns, item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let ids = this.GetPrimaryKeyValues(idColumns, item);
                idColumns.forEach((pKey, index) => {
                    if (primaryValue.hasOwnProperty(pKey)) {
                        primaryValue[pKey].push(ids[index]);
                    }
                    else {
                        primaryValue[pKey] = [ids[index]];
                    }
                });
            }
            catch (error) {
                console.error('[DigiRepository][MakePrimaryKeyValue]', error);
                throw error;
            }
        });
    }
    Truncate(tableName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield rik_db_1.DbSettings.knex.truncate().table(tableName);
                console.log(`[DigiRepository][Truncate] Table: ${tableName} has been successful.`);
            }
            catch (error) {
                console.error(`[DigiRepository][Truncate] table: ${tableName}`, error);
                throw error;
            }
        });
    }
    BuildProductGroups(initial_groups) {
        return __awaiter(this, void 0, void 0, function* () {
            let insertedItem = undefined;
            try {
                let initialGroups = initial_groups;
                if (initialGroups && initialGroups instanceof Array) {
                    const parsedProductGroups = [];
                    let groups = {};
                    let products = {};
                    let message = '';
                    const productsInfo = yield rik_db_1.Atst.query().select('product_info.PNUM as ATNU', 'ATTE')
                        .join('PLST as product_info', rik_db_1.Rik.raw('CAST(product_info."FZ_TFZU_7" AS INT)'), 'ATST.ATNU');
                    _.forEach(productsInfo, (product) => {
                        let place = undefined;
                        if (product.ATTE) {
                            try {
                                place = JSON.parse(product.ATTE);
                            }
                            catch (error) {
                                return;
                            }
                            if (!(place instanceof Object && place.pluPlace instanceof Array)) {
                                return;
                            }
                            let [base_group_place, group_place, brand_place] = place.pluPlace;
                            let base_group_id = undefined;
                            let group_id = undefined;
                            let brand_id = undefined;
                            if (brand_re.test(base_group_place.id)) {
                                let res = brand_re.exec(base_group_place.id);
                                if (res !== null && res.length >= 2) {
                                    base_group_id = res[1];
                                }
                            }
                            if (brand_re.test(group_place.id)) {
                                let res = brand_re.exec(group_place.id);
                                if (res !== null && res.length >= 3) {
                                    group_id = res[2];
                                }
                            }
                            if (brand_re.test(brand_place.id)) {
                                let res = brand_re.exec(brand_place.id);
                                if (res !== null && res.length >= 4) {
                                    brand_id = res[3];
                                }
                            }
                            base_group_place.id = `${base_group_id}`;
                            group_place.id = `${base_group_id}${group_id}`;
                            group_place.prId = base_group_place.id;
                            brand_place.id = `${base_group_id}${group_id}${brand_id}`;
                            brand_place.prId = group_place.id;
                            _.forEach([base_group_place, group_place, brand_place], (group) => {
                                let { id, prId, caption, image } = group;
                                let stId = `${id}`;
                                let pId = parseInt(stId);
                                if (groups.hasOwnProperty(id) && brand_re.test(groups[pId])) {
                                    try {
                                        let oldGroup = groups[pId];
                                        if (!_.isEqual(group, oldGroup)) {
                                            throw new Error(`Invalid duplicate ${JSON.stringify(oldGroup)} <== ${JSON.stringify(group)}`);
                                        }
                                    }
                                    catch (error) {
                                        message = `[GROUP] ${error.message}`;
                                        console.warn(`BuildProductGroups()`, message);
                                    }
                                }
                                else {
                                    groups[pId] = group;
                                }
                                products[product.ATNU] = id;
                            });
                        }
                    });
                    console.log('\n[DigiRepositoryV6][BuildProductGroups] Groups in "Place"', groups);
                    console.log('\n');
                    for (let product_id in products) {
                        let match = brand_re.exec(products[product_id]);
                        if (match !== null && match.length > 0) {
                            let base_group_id = parseInt(match[1]);
                            let group_id = parseInt(match[2]);
                            let brand_id = parseInt(match[3]);
                            let pnum = parseInt(product_id);
                            let query = `UPDATE "PLST" SET "WGNU" = ${base_group_id}, "FZ_GROUP" = ${group_id}, "FZ_BRAND" = ${brand_id} WHERE "PNUM" = ${product_id};`;
                            try {
                                let plst = {
                                    WGNU: base_group_id,
                                    FZ_GROUP: group_id,
                                    FZ_BRAND: brand_id
                                };
                                let task = rik_db_1.Plst.query().patch(plst).where('PNUM', '=', pnum);
                                message = task.toSql();
                                yield task;
                            }
                            catch (error) {
                                console.warn(`${message} --ERROR: ${error.message}`);
                            }
                        }
                    }
                    _.forEach(initialGroups, (group) => {
                        let item = new rik_db_1.ProductGroup(group);
                        parsedProductGroups.push(item);
                    });
                    for (let key in groups) {
                        let item = groups[key];
                        if (item) {
                            let itemPlace = {};
                            itemPlace['WGNU'] = item.id;
                            itemPlace['parent_id'] = item.prId;
                            itemPlace['imageFileName'] = item.image;
                            itemPlace['imageFileTitle'] = item.caption;
                            itemPlace['numeric_keyboard'] = `${item.numeric_keyboard === true}`;
                            let constrItem = new rik_db_1.ProductGroup(itemPlace);
                            let existsItem = false;
                            for (let i = 0; i < parsedProductGroups.length; i++) {
                                if (parsedProductGroups[i].WGNU === constrItem.WGNU) {
                                    existsItem = true;
                                    break;
                                }
                            }
                            if (existsItem === false) {
                                parsedProductGroups.push(constrItem);
                            }
                        }
                    }
                    yield rik_db_1.ProductGroup.query().truncate();
                    const newProductGroups = [];
                    for (let i = 0; i < parsedProductGroups.length; i++) {
                        const item = parsedProductGroups[i];
                        insertedItem = item;
                        const inserted = yield rik_db_1.ProductGroup.query().insert(item);
                        newProductGroups.push(inserted);
                    }
                    return newProductGroups;
                }
                else {
                    throw Error('Incorrect input parameter. Expected "Array"');
                }
            }
            catch (error) {
                console.error(`[DigiRepository][BuildProductGroups]${error}\n[Item on Error]`, insertedItem);
                throw error;
            }
        });
    }
    BuildFzPlte() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let task = rik_db_1.Plst.query()
                    .select('PNUM', 'plte_uk.ATTE as FZ_PLTE_UK', 'plte_ru.ATTE as FZ_PLTE_RU')
                    .leftJoin('ATST as plte_uk', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_5" as int)'), 'plte_uk.ATNU')
                    .leftJoin('ATST as plte_ru', rik_db_1.Rik.raw('cast("PLST"."FZ_TFZU_6" as int)'), 'plte_ru.ATNU');
                console.log('BuildFZ_TE SQL query:', task.toSql());
                let items = yield task;
                console.log('result build:', JSON.stringify(items).slice(0, 150));
                console.log(`[BuildFzPlte] Start...`);
                for (let i = 0; i < items.length; i++) {
                    const plst = items[i];
                    const pnum = plst.plu || plst.PNUM;
                    yield rik_db_1.Plst.query().patch(plst).where('PNUM', '=', plst.PNUM);
                    if (i % Env_1.Env.DIGI_DATA_BUFFER_SIZE === 0) {
                        console.log(`Updated +${Env_1.Env.DIGI_DATA_BUFFER_SIZE} of PNUM ${plst.PNUM} query = `, task.toSql());
                    }
                    yield task;
                }
                console.log(`[BuildFzPlte] ...Finish`);
                console.log('[TCP] Product Groups loaded');
                console.log(`[TCP] => emit to 'messages'`, JSON.stringify({ type: 'DataFromDigiLoaded' }));
                this._socketIO.emit('messages', JSON.stringify({ type: 'DataFromDigiLoaded' }));
            }
            catch (error) {
                console.error('[DigiRepository][BuildFzPlte]', error);
                throw error;
            }
        });
    }
    GetPrimaryKeyValues(idColumns, item) {
        let ids = [];
        if (idColumns && idColumns instanceof Array) {
            idColumns.forEach(element => {
                ids.push(item[element]);
            });
        }
        else {
            ids.push(item[idColumns]);
        }
        return ids;
    }
    PrintHandledItems() {
        console.log(`Count items was handled: ${this.CountProcessedItems}`);
    }
}
exports.DigiRepositoryV6 = DigiRepositoryV6;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlnaVJlcG9zaXRvcnlWNi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9EaWdpTWFuYWdlci9EaWdpUmVwb3NpdG9yeVY2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxtQ0FHZ0I7QUFJaEIsaUdBQThJO0FBQzlJLGdDQUFnQztBQUNoQyxtREFBbUQ7QUFDbkQsNkNBQTBDO0FBRTFDLE1BQU0sUUFBUSxHQUFHLG9EQUFvRCxDQUFDO0FBRXRFO0lBUUksSUFBVyxtQkFBbUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsbUJBQW1CLENBQUMsS0FBYTtRQUN4QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQ3RDLENBQUM7SUFNTSxNQUFNLENBQUMsV0FBVztRQUNyQixPQUFPLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMsQ0FBQztJQUMzSCxDQUFDO0lBS0Q7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRTlCLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsU0FBRyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ25CLE9BQU8sZ0JBQWdCLENBQUMsU0FB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
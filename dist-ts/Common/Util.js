"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    constructor() {
        throw new TypeError(`Util class has only static methods. Do not create instance of class with 'new' operator`);
    }
    static ReqMsgParse(messages) {
        if (typeof messages === 'object') {
            return messages;
        }
        return JSON.parse(messages);
    }
    static SettingsArrayToObject(arr, nameStr, valueStr) {
        let name = nameStr || 'name';
        let value = valueStr || 'value';
        let obj = {};
        if (arr.length <= 0) {
            console.error(`Incoming parametr isn't array \n`, arr);
            return obj;
        }
        arr.forEach((item) => {
            if (item.hasOwnProperty(name) && item.hasOwnProperty(value)) {
                obj[item[name]] = item[value];
            }
        });
        return obj;
    }
    static Netmask2CIDR(netmask) {
        return (netmask.split('.').map(Number)
            .map(part => (part >>> 0).toString(2))
            .join('')).split('1').length - 1;
    }
    static CDIR2netmask(bitCount) {
        let mask = [];
        for (let i = 0; i < 4; i++) {
            let n = Math.min(bitCount, 8);
            mask.push(256 - Math.pow(2, 8 - n));
            bitCount -= n;
        }
        return mask.join('.');
    }
    static ExtendAllPropsRecursively(destination, source) {
        if (!Util.isObject(source)) {
            console.warn(`'source' is not an object. Return the same 'destination'`);
            return destination;
        }
        if (!Util.isObject(destination)) {
            destination = {};
        }
        Util.Extend(destination, source, new WeakMap());
        return destination;
    }
    static DifferenceRecursively(exists, incoming) {
        let result = {};
        if (!Util.isObject(exists)) {
            return null;
        }
        if (!Util.isObject(incoming)) {
            return null;
        }
        let difference_context = new WeakMap();
        let clone_context = new WeakMap();
        let start_context = new WeakMap();
        difference_context.set(exists, start_context);
        start_context.set(incoming, result);
        Util.Difference(exists, incoming, difference_context, clone_context, result);
        return result;
    }
    static Extend(destination, source, context) {
        for (let key in source) {
            let source_value = source[key];
            if (Util.isObject(source_value)) {
                if (context.has(source_value)) {
                    destination[key] = context.get(source_value);
                }
                else {
                    let destination_value = Util.isObject(destination[key]) ? destination[key] : (destination[key] = {});
                    context.set(source_value, destination_value);
                    Util.Extend(destination_value, source_value, context);
                }
            }
            else {
                destination[key] = source_value;
            }
        }
    }
    static Difference(source, destination, difference_context, clone_context, result) {
        for (let key in destination) {
            let source_value = source[key];
            let destination_value = destination[key];
            if (Util.isObject(source_value) && Util.isObject(destination_value)) {
                if (!difference_context.has(source_value)) {
                    difference_context.set(source_value, new WeakMap());
                }
                let source_context = difference_context.get(source_value);
                if (source_context.has(destination_value)) {
                    let inner = source_context.get(destination_value);
                    if (Object.keys(inner).length !== 0) {
                        result[key] = inner;
                    }
                }
                else {
                    let inner = {};
                    source_context.set(destination_value, inner);
                    Util.Difference(source_value, destination_value, difference_context, clone_context, inner);
                    if (Object.keys(inner).length !== 0) {
                        result[key] = inner;
                    }
                }
            }
            else if (Util.isObject(destination_value)) {
                if (clone_context.has(destination_value)) {
                    let inner = clone_context.get(destination_value);
                    if (Object.keys(inner).length !== 0) {
                        result[key] = inner;
                    }
                }
                else {
                    let inner = {};
                    clone_context.set(destination_value, inner);
                    Util.Extend(inner, destination_value, clone_context);
                    if (Object.keys(inner).length !== 0) {
                        result[key] = inner;
                    }
                }
            }
            else if (source_value !== destination_value) {
                result[key] = destination_value;
            }
        }
    }
    static isBoolean(value) {
        return typeof value === 'boolean' || value instanceof Boolean;
    }
    static isString(value) {
        return typeof value === 'string' || value instanceof String;
    }
    static isNumber(value) {
        return !isNaN(value) && (typeof value === 'number' || value instanceof Number);
    }
    static isFunction(value) {
        return value instanceof Function;
    }
    static isArray(value) {
        return value instanceof Array;
    }
    static isObject(value, BaseClass) {
        if (Util.isFunction(BaseClass) && BaseClass !== Object)
            return value instanceof BaseClass;
        else
            return (value instanceof Object) && !Util.isBoolean(value) && !Util.isFunction(value) && !Util.isString(value) && !Util.isNumber(value);
    }
    static getClassName(value) {
        if (value === undefined)
            return 'undefined';
        if (value === null)
            return 'null';
        return value.constructor.name;
    }
    static extend(object, properties) {
        if (!(Util.isObject(object) || Util.isArray(object)))
            throw new TypeError('util.extend(object, properties): Instance of Object or Array expected as object');
        if (!(Util.isObject(properties) || Util.isArray(properties)))
            throw new TypeError('util.extend(object, properties): Instance of Object or Array expected as properties');
        if (!(Util.isObject(object, properties.constructor)))
            throw new TypeError('util.extend(object, properties): object must be inherited from properties');
        for (var prop in properties) {
            if (properties.hasOwnProperty(prop)) {
                object[prop] = properties[prop];
            }
        }
        return object;
    }
    static defineMethod(object, method, method_name) {
        if (!Util.isObject(object))
            throw new TypeError('defineMethod(object, method, method_name): Instance of Object expected as object');
        if (!Util.isFunction(method))
            throw new TypeError('defineMethod(object, method, method_name): Instance of Function expected as method');
        if (!(Util.isString(method_name) || Util.isString(method.name)))
            throw new TypeError('defineMethod(object, method, method_name): Instance of String expected as method_name or method.name');
        if (!((Util.isString(method_name) && method_name !== '') || (Util.isString(method.name) && method.name !== '')))
            throw new TypeError('defineMethod(object, method, method_name): method_name or method.name must be non-empty string');
        var name = (Util.isString(method_name) && method_name !== '') ? method_name : method.name;
        return Object.defineProperty(object, name, {
            configurable: false,
            enumerable: false,
            writable: false,
            value: method
        });
    }
    static defineProperty(object, property_definition) {
        if (!Util.isObject(object))
            throw new TypeError('defineProperty(object, property_definition): Instance of Object expected as object');
        if (!Util.isObject(property_definition))
            throw new TypeError('defineProperty(object, property_definition): Instance of Object expected as property_definition');
        var { name, enumerable, configurable, get, set, value, writable } = property_definition;
        if (!(Util.isString(name) && name !== ''))
            throw new TypeError('defineProperty(object, property_definition): Instance of non-empty String expected as property_definition.name');
        enumerable = enumerable !== undefined ? !!enumerable : true;
        configurable = configurable !== undefined ? !!configurable : true;
        writable = writable !== undefined ? !!writable : true;
        if (Util.isFunction(get) && Util.isFunction(set)) {
            return Object.defineProperty(object, name, {
                get: get,
                set: set,
                configurable: configurable,
                enumerable: enumerable
            });
        }
        else if (Util.isFunction(get)) {
            return Object.defineProperty(object, name, {
                get: get,
                configurable: configurable,
                enumerable: enumerable
            });
        }
        else {
            return Object.defineProperty(object, name, {
                value: value,
                configurable: configurable,
                enumerable: enumerable,
                writable: writable
            });
        }
    }
    static extractError(error) {
        try {
            return (error instanceof Error) ? `${error.message}\n${error.stack}` : `${error}`;
        }
        catch (unexpected) {
            console.error(`UNEXPECTED: ${unexpected.message}\n${unexpected.stack}`);
            throw unexpected;
        }
    }
    static escapeSql(value) {
        let result = undefined;
        if (value === undefined || value === null)
            result = 'NULL';
        else if (value === true || value === false)
            result = value.toString();
        else if (!isNaN(value) && value !== '')
            result = value.toString();
        else {
            let stringValue = (typeof value === 'string' || value instanceof String) ? value : value.toString();
            result = `'${stringValue.replace(/'/g, '\'\'')}'`;
        }
        return result;
    }
    static processResult(resolve, reject, error, result) {
        if (!Util.isFunction(resolve)) {
            throw new TypeError('processResult(resolve, reject, error, result): Instance of Function expected as resolve');
        }
        if (!Util.isFunction(reject)) {
            throw new TypeError('processResult(resolve, reject, error, result): Instance of Function expected as reject');
        }
        if (error) {
            reject(error);
        }
        else {
            resolve(result);
        }
    }
    static promiseExecutor(func, resolve, reject) {
        return func(Util.processResult.bind(null, resolve, reject));
    }
    static promisify(func) {
        if (!Util.isFunction(func)) {
            return Promise.reject(new TypeError('promisify(func): Instance of Function expected as func'));
        }
        try {
            return new Promise(Util.promiseExecutor.bind(null, func));
        }
        catch (exception) {
            return Promise.reject(exception);
        }
    }
}
exports.Util = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy10cy9Db21tb24vVXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0lBQ0k7UUFDSSxNQUFNLElBQUksU0FBUyxDQUFDLHlGQUF5RixDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBeUI7UUFDeEMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDOUIsT0FBTyxRQUFRLENBQUM7U0FDbkI7UUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQVNELE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFVLEVBQUUsT0FBZ0IsRUFBRSxRQUFpQjtRQUN4RSxJQUFJLElBQUksR0FBVyxPQUFPLElBQUksTUFBTSxDQUFDO1FBQ3JDLElBQUksS0FBSyxHQUFXLFFBQVEsSUFBSSxPQUFPLENBQUM7UUFDeEMsSUFBSSxHQUFHLEdBQTJCLEVBQUUsQ0FBQztRQUNyQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkQsT0FBTyxHQUFHLENBQUM7U0FDZDtRQUNELEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNqQixJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDekQsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBT0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFlO1FB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
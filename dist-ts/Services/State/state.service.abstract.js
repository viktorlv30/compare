"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const func_tools_1 = require("./func.tools");
const _storage = new WeakMap();
class _StateService {
    constructor(props, state) {
        this.props = Object.assign({}, props);
        this.state = Object.assign({}, state);
        this.publicProps = Object.freeze(Object.assign({}, props));
        this.publicState = Object.freeze(Object.assign({}, state));
        this.mutators = [];
        this.listeners = [];
    }
}
function setProcessor(props, states, condition) {
    const changedProps = Object.keys(condition.propsChange);
    const changedState = Object.keys(condition.stateChange);
    return changedProps.filter((name) => props.has(name)).length !== 0
        || changedState.filter((name) => states.has(name)).length !== 0;
}
function getCachedProcessor(props, states) {
    const propsList = Array.from(props);
    const statesList = Array.from(states);
    propsList.sort();
    statesList.sort();
    const name = propsList.join('\x00') + '\x01' + statesList.join('\x00');
    let processor = processorsCache.get(name);
    if (processor === undefined) {
        processor = func_tools_1.bind(setProcessor, null, new Set(propsList), new Set(statesList));
        processorsCache.set(name, processor);
    }
    return processor;
}
const processorsCache = new Map();
class StateService {
    constructor(initialProps, initialState) {
        _storage.set(this, new _StateService(initialProps, initialState));
    }
    get state() {
        return _storage.get(this).publicState;
    }
    get props() {
        return _storage.get(this).publicProps;
    }
    setProps(values) {
        const __this = _storage.get(this);
        const { publicProps: oldProps, publicState: oldState, props, state, mutators, } = __this;
        const changedProps = {};
        let numberChangedProps = 0;
        for (let key in values) {
            const value = values[key];
            if (key in props) {
                if (value !== props[key]) {
                    changedProps[key] = props[key] = value;
                    numberChangedProps += 1;
                }
            }
            else {
                console.warn(`Unexpected property ${JSON.stringify(key)}`);
            }
        }
        if (numberChangedProps === 0) {
            return;
        }
        const newProps = __this.publicProps = Object.freeze(Object.assign({}, props));
        const readonlyChangedProps = Object.freeze(changedProps);
        const changedPropsCond = {
            props: newProps,
            propsChange: readonlyChangedProps,
            oldProps,
            state: oldState,
        };
        const fullMutation = {};
        const mutations = {};
        for (let { mutator, name } of mutators) {
            try {
                const mutation = mutator(changedPropsCond);
                for (let key in mutation) {
                    if (key in state) {
                        const newValue = mutation[key];
                        const oldValue = fullMutation[key];
                        if (key in fullMutation && oldValue !== newValue) {
                            const previous = [];
                            for (let mutatorName in mutations) {
                                const oldMutation = mutations[mutatorName];
                                if (key in oldMutation && oldMutation[key] === oldValue) {
                                    previous.push(mutatorName);
                                }
                            }
                            throw new Error(`Indeterminant mutation of property ${JSON.stringify(key)} found by ${JSON.stringify(name)}. Conflicts with ${previous.map((name) => JSON.stringify(name)).join(', ')}`);
                        }
                        else {
                            mutations[name] = mutation;
                            Object.assign(fullMutation, mutation);
                        }
                    }
                    else {
                        console.trace(`Unexpected state value ${JSON.stringify(key)} found in mutation ${JSON.stringify(name)}`);
                    }
                }
            }
            catch (error) {
                console.warn('Mutation error', error);
            }
        }
        let numberChangedState = 0;
        for (let key in fullMutation) {
            const value = fullMutation[key];
            if (state[key] !== value) {
                numberChangedState += 1;
                state[key] = value;
            }
            else {
                delete fullMutation[key];
            }
        }
        const newState = numberChangedState ? (__this.publicState = Object.freeze(Object.assign({}, state))) : __this.publicState;
        const readonlyChangeState = Object.freeze(fullMutation);
        const changedStateCond = {
            props: newProps,
            propsChange: readonlyChangedProps,
            oldProps,
            state: newState,
            stateChange: readonlyChangeState,
            oldState,
        };
        this._invokeListeners(changedStateCond);
    }
    _invokeListeners(condition) {
        const __this = _storage.get(this);
        const { listeners } = __this;
        for (let { processor, listener } of listeners) {
            try {
                if (processor(condition)) {
                    listener(condition);
                }
            }
            catch (error) {
                console.warn('Listener error', error);
            }
        }
    }
    addStateMutator(mutator, name) {
        const { mutators } = _storage.get(this);
        const old = mutators.find((m) => m.mutator === mutator);
        if (typeof name !== 'string') {
            name = uuid.v4();
        }
        if (!old) {
            if (mutators.find((m) => m.name === name)) {
                throw new Error(`Mutator ${JSON.stringify(name)} already exists`);
            }
            mutators.push({ mutator, name });
            return true;
        }
        else {
            old.name = name;
            return false;
        }
    }
    removeStateMutator(mutator) {
        const { mutators } = _storage.get(this);
        const oldIndex = mutators.findIndex((m) => m.mutator === mutator);
        if (oldIndex >= 0) {
            mutators.splice(oldIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }
    removeAllMutators() {
        const { mutators } = _storage.get(this);
        mutators.splice(0, mutators.length);
    }
    addStateListener(processor, listener) {
        const { listeners } = _storage.get(this);
        let old = listeners.find((l) => l.listener === listener && l.processor === processor);
        if (!old) {
            listeners.push({ listener, processor });
            return true;
        }
        else {
            return false;
        }
    }
    prependStateListener(processor, listener) {
        const { listeners } = _storage.get(this);
        let old = listeners.find((l) => l.listener === listener && l.processor === processor);
        if (!old) {
            listeners.unshift({ listener, processor });
            return true;
        }
        else {
            return false;
        }
    }
    removeStateListener(processor, listener) {
        const { listeners } = _storage.get(this);
        let oldIndex = listeners.findIndex((l) => l.listener === listener && l.processor === processor);
        if (oldIndex >= 0) {
            listeners.splice(oldIndex, 1);
            return true;
        }
        else {
            return false;
        }
    }
    removeAllStateListeners() {
        const { listeners } = _storage.get(this);
        listeners.splice(0, listeners.length);
    }
    addOnChange(listener, changedProps, changedState) {
        const processor = getCachedProcessor(changedProps, changedState);
        return this.addStateListener(processor, listener);
    }
    prependOnChange(listener, changedProps, changedState) {
        const processor = getCachedProcessor(changedProps, changedState);
        return this.prependStateListener(processor, listener);
    }
    removeOnChange(listener, changedProps, changedState) {
        const processor = getCachedProcessor(changedProps, changedState);
        return this.removeStateListener(processor, listener);
    }
}
exports.StateService = StateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5hYnN0cmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy10cy9TZXJ2aWNlcy9TdGF0ZS9zdGF0ZS5zZXJ2aWNlLmFic3RyYWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLDZDQUFvQztBQVVwQyxNQUFNLFFBQVEsR0FBNkQsSUFBSSxPQUFPLEVBQUUsQ0FBQztBQUV6RjtJQVNJLFlBQW1CLEtBQTBCLEVBQUUsS0FBMEI7UUFDckUsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Q0FDSjtBQUVELHNCQUE0QyxLQUFrQixFQUFFLE1BQW1CLEVBQUUsU0FBbUQ7SUFDcEksTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsT0FBTyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFF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
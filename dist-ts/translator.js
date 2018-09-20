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
var E_LANGUAGE;
(function (E_LANGUAGE) {
    E_LANGUAGE["DEFAULT"] = "en";
    E_LANGUAGE["EN"] = "en";
    E_LANGUAGE["RU"] = "ru";
    E_LANGUAGE["UA"] = "ua";
})(E_LANGUAGE = exports.E_LANGUAGE || (exports.E_LANGUAGE = {}));
class Translator {
    constructor() {
        this._currentLanguage = E_LANGUAGE.DEFAULT;
        this._sourceTranslateFile = '';
        this._dictionaryStorage = new Map();
    }
    static get instance() {
        if (!Translator._instance) {
            this._instance = new Translator();
        }
        return this._instance;
    }
    changeLanguage(lang) {
        this._currentLanguage = lang;
    }
    translate(word) {
        const currentLocale = this._currentLanguage;
        const dictionary = this._dictionaryStorage.get(currentLocale);
        let result = '';
        if (dictionary) {
            result = dictionary[word];
            if (!result) {
                throw new Error(`The word ${word} not set in locale ${currentLocale}`);
            }
        }
        else {
            console.warn(`Dictionary for locale ${currentLocale} doesn't exist. Will return word in default localization.`);
            const defaultDictionary = this._dictionaryStorage.get(E_LANGUAGE.DEFAULT);
            if (defaultDictionary) {
                result = defaultDictionary[word];
            }
            else {
                console.warn(`Default dictionary is depicted. Will return the same word which you have passed.`);
                result = word;
            }
        }
        return result;
    }
    addLocalization(localization) {
        return __awaiter(this, void 0, void 0, function* () {
            const newLocalizationFile = yield this.makeRequest(localization);
            const response = { code: 500 };
            if (response.code === 200 && newLocalizationFile !== null) {
                this._dictionaryStorage.set(localization, newLocalizationFile);
                return true;
            }
            else {
                return false;
            }
        });
    }
    setSourceTranslateFileUrl(uri) {
        this._sourceTranslateFile = uri;
    }
    makeRequest(localization) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._sourceTranslateFile || this._sourceTranslateFile === '') {
                throw new Error('Translation error. You must set localization source URL first.');
            }
            const uri = `${this._sourceTranslateFile}?lang=${localization}`;
            const fileWithTranslation = yield Promise.resolve('result json file from server with translations');
            return fileWithTranslation;
        });
    }
}
exports.Translator = Translator;
let ti = Translator.instance;
ti.setSourceTranslateFileUrl('https://temabit.com/translations');
ti.addLocalization(E_LANGUAGE.DEFAULT);
ti.addLocalization(E_LANGUAGE.RU);
ti.addLocalization(E_LANGUAGE.UA);
ti.changeLanguage(E_LANGUAGE.RU);
let x = ti.translate('hello');
ti.changeLanguage(E_LANGUAGE.UA);
x = ti.translate('hello');
ti.changeLanguage(E_LANGUAGE.EN);
x = ti.translate('hello');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy10cy90cmFuc2xhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFPQSxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDbEIsNEJBQWMsQ0FBQTtJQUNkLHVCQUFTLENBQUE7SUFDVCx1QkFBUyxDQUFBO0lBQ1QsdUJBQVMsQ0FBQTtBQUNiLENBQUMsRUFMVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUtyQjtBQUVEO0lBT0k7UUFDSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUMzQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFNRCxNQUFNLEtBQUssUUFBUTtRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBT0QsY0FBYyxDQUFDLElBQWdCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDakMsQ0FBQztJQVFELFNBQVMsQ0FBQyxJQUFZO1FBQ2xCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBMEMsQ0FBQztRQUN2RyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFaEIsSUFBSSxVQUFVLEVBQUU7WUFDWixNQUFNLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1QsTUFBTSxJ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
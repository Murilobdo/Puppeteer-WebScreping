'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrappingService = void 0;
class ScrappingService {
    constructor(inputSearch, browser, page) {
        this._browser = browser;
        this._inputSearch = inputSearch;
        this._page = page;
        this._products = new Array();
    }
    startScrapping() {
        throw new Error("Metodo startScrapping não foi implementado, e necessario a implementação para o scrappgin que esta criando.");
    }
    readLinks(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var result = new Array();
                    var elements = yield this._page.$$(selector);
                    for (let i = 0; i < elements.length; i++) {
                        let href = yield this._page.evaluate((element) => element.getAttribute('href'), elements[i]);
                        result.push(href);
                    }
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    readLinkImages(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var result = new Array();
                    var elements = yield this._page.$$(selector);
                    for (let i = 0; i < elements.length; i++) {
                        let srcset = yield this._page.evaluate((element) => element.getAttribute('srcset'), elements[i]);
                        let src = yield this._page.evaluate((element) => element.getAttribute('src'), elements[i]);
                        result.push(srcset || src);
                    }
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    readText(selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    var result = new Array();
                    var elements = yield this._page.$$(selector);
                    for (let index = 0; index < elements.length; index++) {
                        const element = elements[index];
                        const text = yield this._page.evaluate((element) => element.textContent, element);
                        result.push(text);
                    }
                    resolve(result);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    init(url) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._page.goto(url);
        });
    }
}
exports.ScrappingService = ScrappingService;
//# sourceMappingURL=ScrappingService.js.map
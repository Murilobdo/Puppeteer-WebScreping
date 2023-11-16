"use strict";
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
    constructor(url, browser, page) {
        this._URL = url;
        this._browser = browser;
        this._page = page;
        this._products = new Array();
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
                        let href = yield this._page.evaluate((element) => element.getAttribute('srcset'), elements[i]);
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
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this._page = (yield this._browser.pages())[0];
            yield this._page.goto(this._URL);
            return this;
        });
    }
    startScrapping() {
        throw new Error("Method not implemented.");
    }
}
exports.ScrappingService = ScrappingService;
//# sourceMappingURL=ScrappingService.js.map
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
exports.MercadoLivreService = void 0;
const ScrappingService_1 = require("./ScrappingService");
class MercadoLivreService extends ScrappingService_1.ScrappingService {
    constructor(url, browser, page) {
        super(url, browser, page);
        this.TITLE_SELECTOR = '.ui-search-item__group .ui-search-item__group--title';
        this.PRICE_SELECTOR = 'ui-search-card-attributes ui-search-item__group__element';
        this.URI_SELECTOR = '';
        this.CREATE_AT_SELECTOR = '';
        this.URI_IMAGE_SELECTOR = '';
    }
    startScrapping() {
        const _super = Object.create(null, {
            readText: { get: () => super.readText },
            readLinks: { get: () => super.readLinks }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            var titles = yield _super.readText.call(this, this.TITLE_SELECTOR);
            var prices = yield _super.readText.call(this, this.PRICE_SELECTOR);
            var links = yield _super.readLinks.call(this, this.URI_SELECTOR);
            var imageLinks = yield _super.readLinks.call(this, this.URI_IMAGE_SELECTOR);
            var createAt = yield _super.readLinks.call(this, this.CREATE_AT_SELECTOR);
            for (let index = 0; index < titles.length; index++) {
                this._products.push({
                    title: '',
                    price: '',
                    createAt: '',
                    link: '',
                    imageLink: ''
                });
            }
            return new Promise((resolve) => resolve(this._products));
        });
    }
}
exports.MercadoLivreService = MercadoLivreService;
//# sourceMappingURL=MercadoLivreService.js.map
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
const IModel_1 = require("../interfaces/IModel");
class MercadoLivreService extends ScrappingService_1.ScrappingService {
    constructor(inputSearch, browser, page) {
        super(inputSearch, browser, page);
        this.TITLE_SELECTOR = 'div > a .ui-search-item__title';
        this.PRICE_SELECTOR = '[class="andes-money-amount ui-search-price__part ui-search-price__part--x-tiny andes-money-amount--cents-superscript andes-money-amount--compact"]';
        this.URI_SELECTOR = 'a[class="ui-search-item__group__element ui-search-link"]';
        this.URI_IMAGE_SELECTOR = 'a > img';
    }
    startScrapping() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init(`${IModel_1.EnumURI.MercadoLivre}/${this._inputSearch}`);
            var titles = yield this.readText(this.TITLE_SELECTOR);
            var links = yield this.readLinks(this.URI_SELECTOR);
            var prices = yield this.readText(this.PRICE_SELECTOR);
            var imageLinks = yield this.readLinkImages(this.URI_IMAGE_SELECTOR);
            for (let index = 0; index < 5; index++) {
                this._products.push({
                    title: titles[index],
                    price: prices[index],
                    createAt: 'Não informado',
                    link: links[index],
                    imageLink: imageLinks[index]
                });
            }
            return new Promise((resolve) => resolve(this._products));
        });
    }
}
exports.MercadoLivreService = MercadoLivreService;
//# sourceMappingURL=MercadoLivreService.js.map
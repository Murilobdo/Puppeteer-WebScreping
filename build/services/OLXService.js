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
exports.OLXService = void 0;
const ScrappingService_1 = require("./ScrappingService");
const IModel_1 = require("./../interfaces/IModel");
class OLXService extends ScrappingService_1.ScrappingService {
    constructor(inputSearch, browser, page) {
        super(inputSearch, browser, page);
        this.URI_SELECTOR = '[data-ds-component="DS-NewAdCard-Link"]';
        this.TITLE_SELECTOR = 'a > h2';
        this.PRICE_SELECTOR = '.olx-ad-card__details-price--horizontal';
        this.URI_IMAGE_SELECTOR = 'source[type="image/jpeg"]';
        this.CREATE_AT_SELECTOR = '.olx-ad-card__location-date-container';
    }
    startScrapping() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init(IModel_1.EnumURI.OLX + this._inputSearch);
            var titles = yield this.readText(this.TITLE_SELECTOR);
            var prices = yield this.readText(this.PRICE_SELECTOR);
            var createAt = yield this.readText(this.CREATE_AT_SELECTOR);
            var links = yield this.readLinks(this.URI_SELECTOR);
            var imageLinks = yield this.readLinkImages(this.URI_IMAGE_SELECTOR);
            for (let index = 0; index < titles.length; index++) {
                this._products.push({
                    title: titles[index],
                    price: this.getPrice(prices[index]),
                    createAt: createAt[index + 1],
                    link: links[index],
                    imageLink: imageLinks[index]
                });
            }
            return new Promise((resolve) => resolve(this._products));
        });
    }
    getPrice(priceText) {
        if (priceText == null || priceText == undefined || priceText == '')
            return 0;
        let price = parseFloat(priceText
            .trim()
            .replace('R$ ', '')
            .replace('R$', '')
            .replace('.', '')
            .replace(',', '.'));
        return price;
    }
    inputSearch(search) {
        const _super = Object.create(null, {
            _page: { get: () => super._page }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super._page.type('input[placeholder="Buscar"]', search);
        });
    }
}
exports.OLXService = OLXService;
//# sourceMappingURL=OLXService.js.map
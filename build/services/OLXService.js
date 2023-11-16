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
class OLXService extends ScrappingService_1.ScrappingService {
    constructor(url, browser, page) {
        super(url, browser, page);
        this.URI_SELECTOR = '[data-ds-component="DS-NewAdCard-Link"]';
        this.TITLE_SELECTOR = 'a > h2';
        this.PRICE_SELECTOR = '.olx-ad-card__details-price--vertical';
        this.URI_IMAGE_SELECTOR = 'source[type="image/jpeg"]';
        this.CREATE_AT_SELECTOR = '.olx-ad-card__location-date-container';
        super._products = new Array();
    }
    startScrapping() {
        const _super = Object.create(null, {
            readText: { get: () => super.readText },
            readLinks: { get: () => super.readLinks },
            readLinkImages: { get: () => super.readLinkImages }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            var titles = yield _super.readText.call(this, this.TITLE_SELECTOR);
            var prices = yield _super.readText.call(this, this.PRICE_SELECTOR);
            var createAt = yield _super.readText.call(this, this.CREATE_AT_SELECTOR);
            var links = yield _super.readLinks.call(this, this.URI_SELECTOR);
            var imageLinks = yield _super.readLinkImages.call(this, this.URI_IMAGE_SELECTOR);
            for (let index = 0; index < titles.length; index++) {
                this._products.push({
                    title: titles[index],
                    price: prices[index],
                    createAt: this.getcreateAt(createAt, index),
                    link: links[index],
                    imageLink: imageLinks[index]
                });
            }
            return new Promise((resolve) => resolve(this._products));
        });
    }
    getcreateAt(addInfos, index) {
        let infos = addInfos[index].trim().split(' ');
        let createAt = infos[2];
        return createAt;
    }
}
exports.OLXService = OLXService;
//# sourceMappingURL=OLXService.js.map

import { Browser, Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { IProduct, EnumURI } from './../interfaces/IModel';

export class OLXService extends ScrappingService {

    private URI_SELECTOR: string = '[data-ds-component="DS-NewAdCard-Link"]';
    private TITLE_SELECTOR: string = 'a > h2';
    private PRICE_SELECTOR: string = '.olx-ad-card__details-price--horizontal';
    private URI_IMAGE_SELECTOR: string = 'source[type="image/jpeg"]';
    private CREATE_AT_SELECTOR: string = '.olx-ad-card__location-date-container';

    constructor(inputSearch: string, browser: Browser, page: Page) {
        super(inputSearch, browser, page);
    }

    async startScrapping(): Promise<Array<IProduct>> {

        await this.init(EnumURI.OLX + this._inputSearch);

        var titles = await this.readText(this.TITLE_SELECTOR);
        var prices = await this.readText(this.PRICE_SELECTOR);
        var createAt = await this.readText(this.CREATE_AT_SELECTOR);
        var links = await this.readLinks(this.URI_SELECTOR);
        var imageLinks = await this.readLinkImages(this.URI_IMAGE_SELECTOR);

        for (let index = 0; index < 5; index++) {
            this._products.push({
                title: titles[index],
                price: prices[index],
                createAt: createAt[index + 1],
                link: links[index],
                imageLink: imageLinks[index]
            });
        }

        return new Promise((resolve) => resolve(this._products));
    }

    async inputSearch(search: string): Promise<void> {
        super._page.type('input[placeholder="Buscar"]', search);
    }


}
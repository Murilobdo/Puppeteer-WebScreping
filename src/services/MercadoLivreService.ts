import { Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { IProduct } from "../interfaces/IModel";

export class MercadoLivreService extends ScrappingService {

    private TITLE_SELECTOR: string = 'div > a .ui-search-item__title';
    private PRICE_SELECTOR: string = '.andes-money-amount__fraction';
    private URI_SELECTOR: string = 'div > a[target="_blank"]';
    private CREATE_AT_SELECTOR: string = '';
    private URI_IMAGE_SELECTOR: string = 'a > img';

    constructor(url: string, browser: any, page: Page) {
        super(url, browser, page);
    }

    async startScrapping(): Promise<IProduct[]> {
        await this.init();

        var titles = await super.readText(this.TITLE_SELECTOR);
        var links = await super.readLinks(this.URI_SELECTOR);
        var prices = await super.readText(this.PRICE_SELECTOR);
        var imageLinks = await super.readLinkImages(this.URI_IMAGE_SELECTOR);
        var createAt = await super.readLinks(this.CREATE_AT_SELECTOR);

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
    }
}
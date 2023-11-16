import { Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { IProduct } from "../interfaces/IModel";

export class MercadoLivreService extends ScrappingService {

    private TITLE_SELECTOR: string = '';
    private PRICE_SELECTOR: string = 'ui-search-card-attributes ui-search-item__group__element';
    private URI_SELECTOR: string = '';
    private CREATE_AT_SELECTOR: string = '';
    private URI_IMAGE_SELECTOR: string = '';

    constructor(url: string, browser: any, page: Page) {
        super(url, browser, page);
    }

    async startScrapping(): Promise<IProduct[]> {
        await this.init();

        var titles = await super.readText(this.TITLE_SELECTOR);
        var prices = await super.readText(this.PRICE_SELECTOR);
        var links = await super.readLinks(this.URI_SELECTOR);
        var imageLinks = await super.readLinks(this.URI_IMAGE_SELECTOR);
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
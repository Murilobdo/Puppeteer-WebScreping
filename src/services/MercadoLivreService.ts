import { Browser, Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { EnumURI, IProduct } from "../interfaces/IModel";

export class MercadoLivreService extends ScrappingService {

    private TITLE_SELECTOR: string = 'div > a .ui-search-item__title';
    private PRICE_SELECTOR: string = '[class="andes-money-amount ui-search-price__part ui-search-price__part--x-tiny andes-money-amount--cents-superscript andes-money-amount--compact"]';
    private URI_SELECTOR: string = 'a[class="ui-search-item__group__element ui-search-link"]';
    private URI_IMAGE_SELECTOR: string = 'a > img';

    constructor(inputSearch: string, browser: Browser, page: Page) {
        super(inputSearch, browser, page);
    }

    async startScrapping(): Promise<IProduct[]> {

        await this.init(`${EnumURI.MercadoLivre}/${this._inputSearch}`);

        var titles = await this.readText(this.TITLE_SELECTOR);
        var links = await this.readLinks(this.URI_SELECTOR);
        var prices = await this.readText(this.PRICE_SELECTOR);
        var imageLinks = await this.readLinkImages(this.URI_IMAGE_SELECTOR);

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
    }
}
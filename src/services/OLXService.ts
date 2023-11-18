
import { Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { IProduct } from './../interfaces/IModel';

export class OLXService extends ScrappingService {

    private URI_SELECTOR: string = '[data-ds-component="DS-NewAdCard-Link"]';
    private TITLE_SELECTOR: string = 'a > h2';
    private PRICE_SELECTOR: string = '.olx-ad-card__details-price--vertical';
    private URI_IMAGE_SELECTOR: string = 'source[type="image/jpeg"]';
    private CREATE_AT_SELECTOR: string = '.olx-ad-card__location-date-container';
    
    constructor(url: string, browser: any, page: Page) {
        super(url, browser, page);
        super._products = new Array<IProduct>();
    }

    async startScrapping(): Promise<Array<IProduct>> {
        await this.init();

        var titles = await super.readText(this.TITLE_SELECTOR);
        var prices = await super.readText(this.PRICE_SELECTOR);
        var createAt = await super.readText(this.CREATE_AT_SELECTOR);
        var links = await super.readLinks(this.URI_SELECTOR);
        var imageLinks = await super.readLinkImages(this.URI_IMAGE_SELECTOR);

        for (let index = 0; index < titles.length; index++) {
            this._products.push({
                title: titles[index].trim(),
                price: prices[index].trim(),
                createAt: createAt[index + 1].trim(),
                link: links[index].trim(),
                imageLink: imageLinks[index].trim() 
            });
        }

        return new Promise((resolve) => resolve(this._products));
    }

   
}
import { Page } from "puppeteer";
import { ScrappingService } from "./ScrappingService";
import { IProduct } from "../interfaces/IModel";

export class KabumService extends ScrappingService {

    private URI_SELECTOR: string = '';
    private TITLE_SELECTOR: string = '';
    private PRICE_SELECTOR: string = '';
    private URI_IMAGE_SELECTOR: string = '';
    private URI_CITY_SELECTOR: string = '';
    private URI_ADD_INFOS_SELECTOR: string = '';

    constructor(url: string, browser: any, page: Page) {
        super(url, browser, page);
    }

    async startScrapping(): Promise<IProduct[]> {
       
        return new Promise((resolve) => resolve(this._products));
    }
}
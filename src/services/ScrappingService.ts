import { Browser, Page } from 'puppeteer';
import { IScrappingService } from "../interfaces/IService";
import { IProduct } from '../interfaces/IModel';

export class ScrappingService implements IScrappingService {

    private _browser: Browser;
    private _page: Page;
    private _URL: string;
    protected _products: Array<IProduct>;

    constructor(url: string, browser: any, page: Page) {
        this._URL = url;
        this._browser = browser;
        this._page = page;
        this._products = new Array<IProduct>();
    }

    async readLinks(selector: string): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            try {
                var result = new Array<string>();

                var elements = await this._page.$$(selector);

                for (let i = 0; i < elements.length; i++) {
                    let href = await this._page.evaluate(
                        (element: any) => element.getAttribute('href'),
                        elements[i]
                    );
                
                    result.push(href);
                }

                resolve(result);
            } catch (error) {
                reject(error);
            }

        });
    }

    async readLinkImages(selector: string): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            try {
                var result = new Array<string>();

                var elements = await this._page.$$(selector);

                for (let i = 0; i < elements.length; i++) {
                    let srcset = await this._page.evaluate(
                        (element: any) => element.getAttribute('srcset'),
                        elements[i]
                    );

                    let src = await this._page.evaluate(
                        (element: any) => element.getAttribute('src'),
                        elements[i]
                    );
                
                    result.push(srcset || src);
                }

                resolve(result);
            } catch (error) {
                reject(error);
            }

        });
    }

    async readText(selector: string): Promise<Array<string>> {
        return new Promise(async (resolve, reject) => {
            try {
                var result = new Array<string>();

                var elements = await this._page.$$(selector);

                for (let index = 0; index < elements.length; index++) {
                    const element = elements[index];
                    const text = await this._page.evaluate(
                        (element: any) => element.textContent,
                        element
                    );

                    result.push(text);
                }

                resolve(result);
            } catch (error) {
                reject(error);
            }
        });

    }

    async init(): Promise<IScrappingService> {
        this._page = (await this._browser.pages())[0];
        await this._page.goto(this._URL);
        return this;
    }

    startScrapping(): Promise<Array<IProduct>> {
        throw new Error("Method not implemented.");
    }

}
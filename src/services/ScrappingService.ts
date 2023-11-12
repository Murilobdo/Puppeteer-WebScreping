import puppeteer, { Browser, Page } from 'puppeteer';
import { IScrappingService } from "../interfaces/IService";

export class ScrappingService implements IScrappingService {

    public _browser: Browser;
    private _page: Page;
    private _URL: string;

    constructor(url: string, browser: any, page: Page) {
        this._URL = url;
        this._browser = browser;
        this._page = page;
    }

    async readLinks(selector: string): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            try {
                var result = new Array<string>();

                var elements = await this._page.$$(selector);

                await elements.forEach(async (element) => {
                    let href = await this._page.evaluate(
                        (element: any) => element.getAttribute('href'),
                        element
                    );

                    result.push(href);
                });

                resolve(result);
            } catch (error) {
                reject(error);
            }

        });
    }

    async read(selector: string): Promise<Array<string>> {
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

}
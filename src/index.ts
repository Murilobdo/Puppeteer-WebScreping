
import puppeteer from 'puppeteer';

import { IFileService, IScrappingService } from './interfaces/IService';
import { FileService } from './services/FileService';
import { IProduct } from './interfaces/IModel';
import { OLXService } from './services/OLXService';
import { MercadoLivreService } from './services/MercadoLivreService';


const fetchData = async () => {

    var products = new Array<IProduct>();

    let inputSearch = 'placa de video RTX';

    let browser = await puppeteer.launch({ headless: false });

    var scraps: Array<IScrappingService> = new Array<IScrappingService>();

    scraps.push(await new OLXService(inputSearch, browser, await browser.newPage()));
    scraps.push(await new MercadoLivreService(inputSearch, browser, await browser.newPage()));

    console.log('Iniciando a busca dos dados');
    console.log('Aguarde...')

    for (let current = 0; current < scraps.length; current++) {
        products = products.concat(await scraps[current].startScrapping());
    }

    products.sort((a: IProduct, b: IProduct) => a.price - b.price);

    var fileService: IFileService = new FileService();
    fileService.write('../products.json', JSON.stringify(products));
    console.log('Busca Finalizada !');
    return products;
}

fetchData();







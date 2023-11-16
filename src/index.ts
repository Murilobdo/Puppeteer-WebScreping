
import puppeteer from 'puppeteer';

import { IFileService, IScrappingService } from './interfaces/IService';
import { FileService } from './services/FileService';
import { IProduct } from './interfaces/IModel';
import { OLXService } from './services/OLXService';
import { MercadoLivreService } from './services/MercadoLivreService';

const OLX_URI = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';
const MERCADO_LIVRE_URI = 'https://lista.mercadolivre.com.br/carros-gol-quadrado';

const fetchData = async () => {

    var products = new Array<IProduct>();

    let browser = await puppeteer.launch({ headless: false });

    var scraps: Array<IScrappingService> = new Array<IScrappingService>();
    
    // scraps.push(await new OLXService(OLX_URI, browser, await browser.newPage()));
    scraps.push(await new MercadoLivreService(MERCADO_LIVRE_URI, browser, await browser.newPage()));
    
    console.log('Iniciando a busca dos dados');
    console.log('Aguarde...')

    for (let current = 0; current < scraps.length; current++) {
        products = products.concat(await scraps[current].startScrapping());
    }

    var fileService: IFileService = new FileService();
    fileService.write('../products.json', JSON.stringify(products));
    console.log('Busca Finalizada !');
    return products;
}

fetchData();







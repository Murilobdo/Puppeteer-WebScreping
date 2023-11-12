
import puppeteer from 'puppeteer';
import { IFileService, IScrappingService } from './interfaces/IService';
import { FileService } from './services/FileService';
import { ScrappingService } from './services/ScrappingService';
import { ICar } from './interfaces/IModel';


const URL = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';

const fetchData = async () => {

    var cars = new Array<ICar>();

    let browser = await puppeteer.launch({ headless: false });

    var scrapService: IScrappingService = await new ScrappingService(
        URL,
        browser,
        await browser.newPage()
    ).init();


    var titles = await scrapService.read('a > h2');
    var prices = await scrapService.read('.olx-ad-card__details-price--vertical');
    var links = await scrapService.readLinks('[data-ds-component="DS-NewAdCard-Link"]');
    
    for (let index = 0; index < titles.length; index++) {
        cars.push({
            title: titles[index],
            price: prices[index],
            kmDriven: '0',
            year: '0',
            city: '',
            link: links[index]
        });
        
    }
    
    return cars;
}


fetchData();
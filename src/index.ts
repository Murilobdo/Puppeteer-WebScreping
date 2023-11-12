
import puppeteer from 'puppeteer';
import { IFileService, IScrappingService } from './interfaces/IService';
import { FileService } from './services/FileService';
import { ScrappingService } from './services/ScrappingService';
import { ICar } from './interfaces/IModel';
import { File } from 'buffer';


const URL = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';

const fetchData = async () => {

    var cars = new Array<ICar>();

    let browser = await puppeteer.launch({ headless: false });

    var scrapService: IScrappingService = await new ScrappingService(
        URL,
        browser,
        await browser.newPage()
    ).init();

    console.log('Iniciando a busca dos dados');
    console.log('Aguarde...')

    var titles = await scrapService.readText('a > h2');
    var prices = await scrapService.readText('.olx-ad-card__details-price--vertical');
    var citys = await scrapService.readText('.olx-ad-card__location-date-container');
    var addInfos = await scrapService.readText('.olx-ad-card__labels-items');
    var links = await scrapService.readLinks('[data-ds-component="DS-NewAdCard-Link"]');

    for (let index = 0; index < titles.length; index++) {
        cars.push({
            title: titles[index],
            price: prices[index],
            kmDriven: getKmDriven(addInfos, index),
            year: getYear(addInfos, index),
            city: getCity(citys, index),
            link: links[index]
        });
    }

    var fileService: IFileService = new FileService();
    fileService.write('../cars.json', JSON.stringify(cars));
    console.log('Busca Finalizada !')
}

function getKmDriven(addInfos: string[], index: number): string {
    let infos = addInfos[index].trim().split(' ');
    let kmDriven = infos[0];

    if (kmDriven.indexOf('.') > 0) {
        return kmDriven + ' km';
    }

    return '';
}

function getYear(addInfos: string[], index: number): string {
    let infos = addInfos[index].trim().split(' ');
    let year = infos[2];
    return year;
}

function getCity(addInfos: string[], index: number): string {
    let cityTime = `${addInfos[index + 1]} - ${addInfos[index]}`;
    return cityTime;
}


fetchData();




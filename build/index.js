"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const ScrappingService_1 = require("./services/ScrappingService");
const URL = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    var cars = new Array();
    let browser = yield puppeteer_1.default.launch({ headless: false });
    var scrapService = yield new ScrappingService_1.ScrappingService(URL, browser, yield browser.newPage()).init();
    var titles = yield scrapService.read('a > h2');
    var prices = yield scrapService.read('.olx-ad-card__details-price--vertical');
    var links = yield scrapService.readLinks('[data-ds-component="DS-NewAdCard-Link"]');
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
});
fetchData();
//# sourceMappingURL=index.js.map
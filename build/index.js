"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importStar(require("express"));
const FileService_1 = require("./services/FileService");
const ScrappingService_1 = require("./services/ScrappingService");
const URL = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';
const app = (0, express_1.default)();
const route = (0, express_1.Router)();
app.use(express_1.default.json());
route.get('/cars', (req, res) => {
    fetchData().then((data) => {
        return JSON.stringify(data);
    });
});
app.listen(8280, () => 'server running on port 8280');
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    var cars = new Array();
    let browser = yield puppeteer_1.default.launch({ headless: false });
    var scrapService = yield new ScrappingService_1.ScrappingService(URL, browser, yield browser.newPage()).init();
    console.log('Iniciando a busca dos dados');
    console.log('Aguarde...');
    var titles = yield scrapService.readText('a > h2');
    var prices = yield scrapService.readText('.olx-ad-card__details-price--vertical');
    var citys = yield scrapService.readText('.olx-ad-card__location-date-container');
    var addInfos = yield scrapService.readText('.olx-ad-card__labels-items');
    var links = yield scrapService.readLinks('[data-ds-component="DS-NewAdCard-Link"]');
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
    var fileService = new FileService_1.FileService();
    fileService.write('../cars.json', JSON.stringify(cars));
    console.log('Busca Finalizada !');
    return cars;
});
function getKmDriven(addInfos, index) {
    let infos = addInfos[index].trim().split(' ');
    let kmDriven = infos[0];
    if (kmDriven.indexOf('.') > 0) {
        return kmDriven + ' km';
    }
    return '';
}
function getYear(addInfos, index) {
    let infos = addInfos[index].trim().split(' ');
    let year = infos[2];
    return year;
}
function getCity(addInfos, index) {
    let cityTime = `${addInfos[index + 1]} - ${addInfos[index]}`;
    return cityTime;
}
//# sourceMappingURL=index.js.map
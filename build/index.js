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
const FileService_1 = require("./services/FileService");
const MercadoLivreService_1 = require("./services/MercadoLivreService");
const OLX_URI = 'https://www.olx.com.br/autos-e-pecas/carros-vans-e-utilitarios/vw-volkswagen/gol/1994/estado-sp?q=gol%20quadrado';
const MERCADO_LIVRE_URI = 'https://lista.mercadolivre.com.br/carros-gol-quadrado';
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    var products = new Array();
    let browser = yield puppeteer_1.default.launch({ headless: false });
    var scraps = new Array();
    // scraps.push(await new OLXService(OLX_URI, browser, await browser.newPage()));
    scraps.push(yield new MercadoLivreService_1.MercadoLivreService(MERCADO_LIVRE_URI, browser, yield browser.newPage()));
    console.log('Iniciando a busca dos dados');
    console.log('Aguarde...');
    for (let current = 0; current < scraps.length; current++) {
        products = products.concat(yield scraps[current].startScrapping());
    }
    var fileService = new FileService_1.FileService();
    fileService.write('../products.json', JSON.stringify(products));
    console.log('Busca Finalizada !');
    return products;
});
fetchData();
//# sourceMappingURL=index.js.map
export interface IProduct
{
    title: string;
    price: string;
    createAt: string;
    link: string;
    imageLink: string;
}

export enum EnumURI
{
    OLX = "https://www.olx.com.br/estado-sp?q=",
    MercadoLivre = "https://lista.mercadolivre.com.br",
}
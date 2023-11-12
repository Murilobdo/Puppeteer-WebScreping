export interface IFileService
{
    write(nameFile: string, text: string): Promise<boolean>;
    read(nameFile: string): Promise<boolean>;
    createFile(nameFile: string): Promise<boolean>;
}

export interface IScrappingService
{
    readLinks(selector: string): Promise<Array<string>>;
    readText(selector: string): Promise<Array<string>>;
    init(): Promise<IScrappingService>;
}
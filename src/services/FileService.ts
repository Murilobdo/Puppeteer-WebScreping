import { IFileService } from "../interfaces/IService";
import { writeFileSync } from 'fs';
import { join } from 'path';

export class FileService implements IFileService {

    private _pathFolder = ""

    constructor() {
        
    }

    write(nameFile: string, text: string): Promise<boolean> {

        let data: any = {};

        try {
            writeFileSync(join(__dirname, nameFile), text, {
                flag: 'w'
            });
        } catch (error: any) {
            console.log(error);
        }


        return new Promise<boolean>((resolve, reject) => {});
    }

    read(nameFile: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {});
    }

    createFile(nameFile: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {});
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class FileService {
    constructor() {
        this._pathFolder = "";
    }
    write(nameFile, text) {
        let data = {};
        try {
            (0, fs_1.writeFileSync)((0, path_1.join)(__dirname, nameFile), text, {
                flag: 'w'
            });
        }
        catch (error) {
            console.log(error);
        }
        return new Promise((resolve, reject) => { });
    }
    read(nameFile) {
        return new Promise((resolve, reject) => { });
    }
    createFile(nameFile) {
        return new Promise((resolve, reject) => { });
    }
}
exports.FileService = FileService;
//# sourceMappingURL=FileService.js.map
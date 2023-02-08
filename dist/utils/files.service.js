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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const fs = __importStar(require("fs"));
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
class FilesService {
    static async writeFile(file, writeTo) {
        if (!fs.existsSync(writeTo)) {
            fs.mkdirSync(writeTo, { recursive: true });
        }
        let fileName = (0, uuid_1.v4)();
        const filePrevName = file.name;
        const extension = filePrevName.split('.')[filePrevName.split('.').length - 1];
        fileName += `.${extension}`;
        fs.writeFile(path.resolve(writeTo, fileName), file.data, err => {
            if (err) {
                console.log(err);
            }
        });
        return fileName;
    }
}
exports.FilesService = FilesService;

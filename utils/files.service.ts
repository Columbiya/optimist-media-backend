import * as fs from 'fs'
import { v4 as uuid } from 'uuid'
import * as path from 'path'

export class FilesService {
    declare profilePath: string

    static async writeFile(file: File, writeTo: string) {
        if (!fs.existsSync(writeTo)) {
            fs.mkdirSync(writeTo, {recursive: true})
        }

        let fileName = uuid()
        const filePrevName = file.name
        const extension = filePrevName.split('.')[filePrevName.split('.').length - 1]

        fileName += `.${extension}`

        fs.writeFile(path.resolve(writeTo, fileName), (file as any).data, err => {
            if (err) {
                console.log(err)
            }
        })

        return fileName
    }
} 
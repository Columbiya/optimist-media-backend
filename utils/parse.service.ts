import { URL } from "url";
import { ApiError } from "../error/ApiError";
import { getPageDataForLink } from "./cheerio";
import { getPageContent } from "./puppeeter";

export class ParseService {
    static async parse(url?: string) {
        if (!url) {
            throw ApiError.badRequest('no url provided')
        }

        const urlObject = new URL(url)
        const host = urlObject.host

        const content = await getPageContent(url)
        const dataObject = getPageDataForLink(content, host)

        return dataObject
    }
}
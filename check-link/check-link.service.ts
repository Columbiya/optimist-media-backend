import { ParseService } from "../utils/parse.service";

export class CheckLinkService {
    static async check(url: string) {
        const data = await ParseService.parse(url)

        return data
    }
}
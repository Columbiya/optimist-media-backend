import * as puppeteer from "puppeteer"

export const LAUNCH_PUPPETEER_OPTS = {
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
    ]
}

export const getPageContent = async (url: string) => {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS)
        const page = await browser.newPage()
        await page.goto(url)
        const content = await page.content()

        await browser.close()
        
        return content
    } catch(e) {
        throw e
    }
}
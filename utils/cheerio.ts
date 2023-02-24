import * as cheerio from "cheerio"

export const getPageDataForLink = (content: string, host: string) => {
    const $ = cheerio.load(content)

    const title = $("title").text() 
    const site_name = title.split(' ')[0]
    const description = $('meta[name=description]').attr('content')
    const imageUrl = $('link[rel=icon]').attr('href')

    console.log(imageUrl)

    return {
        title,
        site_name,
        description : description ? description: '',
        image: {
            url: `https://icons.duckduckgo.com/ip3/${host}.ico`
            // url: imageUrl
        }
    }
}
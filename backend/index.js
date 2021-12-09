const axios = require('axios')
const cheerio = require('cheerio')
const express = require("express")

let newsArr = []
async function getBusinessNews(){
    try{
        let url = "https://www.coindesk.com/business/"
        const { data } = await axios({
            method: "GET",
            url: url
        })
        // console.log(data.data)
        let $ = cheerio.load(data)
        const keys = [
            'title',
            'content',
            'link',
            'date'
        ]
        const elementSelector = '#fusion-app > div > div.layout-container > div > main > section:nth-child(1) > div > div > div.Box-sc-1hpkeeg-0.ulMBr > div:nth-child(2) > div'
        $(elementSelector).each((parentIdx, parentElem)=>{
            // console.log(parentIdx)
            let keyIdx = 0
            let newsObject ={}

            $(parentElem).find('h6').each((childIdx,childElem)=>{
                const title = $(childElem).find('a.headline').text()
                const content = $(childElem).find('span.content-text').text()
                newsObject[keys[keyIdx+1]] = content
                if($(childElem).find('a').attr('href') != undefined){
                    newsObject[keys[keyIdx]] = title
                     // console.log($(childElem).find('a').attr('href'))
                     const link = $(childElem).find('a').attr('href')
                     newsObject[keys[keyIdx+2]] = link
                }
            })
            $(parentElem).find('span.typography__StyledTypography-owin6q-0.dHSCiD').each((dateIdx,dateElem)=>{
                const date = $(dateElem).text()
                newsObject[keys[keyIdx+3]] = date
            })
            newsArr.push(newsObject)
        })
    }catch(err){
        console.error(err)

    }
}
async function getMarketNews(){
    try{
        let url = "https://www.coindesk.com/markets/"
        const { data } = await axios({
            method: "GET",
            url: url
        })
        // console.log(data.data)
        let $ = cheerio.load(data)
        const keys = [
            'title',
            'content',
            'link',
            'date'
        ]
        const elementSelector = '#fusion-app > div > div.layout-container > div > main > section:nth-child(1) > div > div > div.Box-sc-1hpkeeg-0.ulMBr > div:nth-child(2) > div'
        $(elementSelector).each((parentIdx, parentElem)=>{
            // console.log(parentIdx)
            let keyIdx = 0
            let newsObject ={}

            $(parentElem).find('h6').each((childIdx,childElem)=>{
                const title = $(childElem).find('a.headline').text()
                const content = $(childElem).find('span.content-text').text()
                newsObject[keys[keyIdx+1]] = content
                if($(childElem).find('a').attr('href') != undefined){
                    newsObject[keys[keyIdx]] = title
                     // console.log($(childElem).find('a').attr('href'))
                     const link = $(childElem).find('a').attr('href')
                     newsObject[keys[keyIdx+2]] = link
                }
            })
            $(parentElem).find('span.typography__StyledTypography-owin6q-0.dHSCiD').each((dateIdx,dateElem)=>{
                const date = $(dateElem).text()
                newsObject[keys[keyIdx+3]] = date
            })
            newsArr.push(newsObject)
        })
    }catch(err){
        console.error(err)

    }
}
const app = express()
app.get('/api/news', async(req,res) => {
    try{
        newsArr = []
        await getBusinessNews()
        await getMarketNews()
        const newsFeed = newsArr
        return res.status(200).json({
            data: newsFeed,
        })
    }catch(err){
        return res.status(500).json({
            err: err.toString()
        })
    }


})
app.listen(3000,() => {
    console.log("Running on port 3000")
})

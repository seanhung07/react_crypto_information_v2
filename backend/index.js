const axios = require('axios')
const cheerio = require('cheerio')
const express = require("express")
const rateLimit = require('axios-rate-limit')
 
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
let symbol = []
let opdata = []
async function getSymbol() {
    try {
        const data = await axios.get("https://fapi.coinglass.com/api/support/symbol");
        // console.log(data.data.data)
        data.data.data.forEach(element => {
            // console.log(element)
            symbol.push(element)
        });
        
    }catch(err){
        console.error(err)
    }
}
async function getOpenInterest() {
    //   var interval = 350;
    //     symbol.forEach(function (el, index) {
    //      setTimeout(async function () {
    //      const data = await axios.get(
    //        `https://fapi.coinglass.com/api/openInterest/pc/info?symbol=${el}`
    //      );
    //       opdata.push(data.data.data[0].oIChangePercent);
    //       console.log(data.data.data[0].symbol, " ", data.data.data[0].oIChangePercent);
    //       // console.log(opdata)
    //   }, index * interval);
    //   });
    //   console.log(opdata);
         

  for (var i = 0; i < symbol.length; i++) {
    const data = await axios.get(
      `https://fapi.coinglass.com/api/openInterest/pc/info?symbol=${symbol[i]}`
    );
      var dict = {};
      dict.name = data.data.data[0].symbol
      dict.value = data.data.data[0].oIChangePercent;
      opdata.push(dict)
    // opdata.push(data.data.data[0].oIChangePercent);
    console.log( data.data.data[0].symbol," ",data.data.data[0].oIChangePercent
    );
  }
    function compare(a, b) {
    if (a.value > b.value) {
        return -1;
    }
    if (a.value < b.value) {
        return 1;
    }
    return 0;
    }

    opdata.sort(compare);
    for (var i = 0; i < 20 ; i++){
        console.log(i+1+"."+opdata[i].name);
    }
    // console.log(opdata)
  // const interval = 0.001;
  // let i = 0;
  // let promise = Promise.resolve();
  // symbol.forEach((element) => {
  // promise = promise.then(async() => {
  //    const data = await axios.get(`https://fapi.coinglass.com/api/openInterest/pc/info?symbol=${element}`)
  // //    console.log(data.data.data[0])
  //     opdata.push(data.data.data[0].oIChangePercent);
  //     console.log(data.data.data[0].symbol," " ,data.data.data[0].oIChangePercent);
  //     // i++;
  //     return new Promise((resolve) => {
  //     setInterval(resolve, interval);
  //   })
  // })

  // });
  // console.log(opdata)
}
async function sortWithIndeces(toSort) {
    for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
    }
    toSort.sort(function (left, right) {
    return left[0] < right[0] ? -1 : 1;
    });
    toSort.sortIndices = [];
    for (var j = 0; j < toSort.length; j++) {
    toSort.sortIndices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
    }
    return toSort;
}
async function main(){
    await getSymbol()
    await getOpenInterest()
    // console.log(symbol)
    // var test = [10, 20, 15, 13,-2];
    // await sortWithIndeces(test);
    // // await console.log(opdata)
    // console.log(test.sortIndices);
    // let sorted = []
    // sorted = test.sortIndices
    // console.log(test.sort())
    // for (var i = 0; i < test.length; i++){
    //     console.log(test[sorted[i]])
    // }
}
main()
// const app = express()
// // app.get('/api/news', async(req,res) => {
// //     try{
// //         // newsArr = []
// //         // await getBusinessNews()
// //         // await getMarketNews()
// //         // const newsFeed = newsArr
// //         // return res.status(200).json({
// //         //     data: newsFeed,
// //         // })
// //     }catch(err){
// //         return res.status(500).json({
// //             err: err.toString()
// //         })
// //     }


// // })
// app.get("/api/symbol", async (req, res) => {
//   try {
//     // opdata = []
//     await getSymbol()
//     const opd = opdata
//     return res.status(200).json({
//         data: opd,
//     })
//     //   await getSymbol()
//   } catch (err) {
//     return res.status(500).json({
//       err: err.toString(),
//     });
//   }
// });
// app.listen(3000,() => {
//     console.log("Running on port 3000")
// })

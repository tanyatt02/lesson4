var axios = require('axios');
var cheerio = require('cheerio');

var cat = require('./hello.js')

module.exports = async function newsArr(req) {


    //let newsArr=['FREE NAVALNY']
    //return newsArr
    let sourceHttp = '';
    let sourceClass = '';
    switch (req.source) {
        case 'RBC':
            sourceHttp = 'http://rbc.ru/'
            sourceClass = '.main__feed__title'
            break;
        case 'meduza':
            sourceHttp = 'https://meduza.io/'
            sourceClass = '.BlockTitle-first,.BlockTitle-isFeatured'
            break;
        case 'RBC quote':
            sourceHttp = 'https://quote.rbc.ru/'
            sourceClass = '.q-item__title'
            break;


    }
    let result = await
    axios
        .get(sourceHttp)
        .then(function (res) {
            let html = res.data;
            let $ = cheerio.load(html);
            let newsArr = [];

            $(sourceClass).each(function (i, element) {
                if (i < req.count) newsArr.push($(this).text());

            });
            return newsArr

        })
        .catch(function (err) {
            console.log(err.message)
            return null
        })
    //cat()//пасхальное яйцо
    return result
}

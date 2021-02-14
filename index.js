const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser')

const newsArr = require('./news.js')

const app = express();

const news = require('./news.js')

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser())

//const handlebars = require('handlebars');
const hbs = require('hbs')


//app.engine('hbs', handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

cache = {
    source: '',
    count: 0,
    news: []
};

try {
    cache = JSON.parse(fs.readFileSync('cache.json', 'utf8'));
    console.log(cache);
} catch (e) {
    console.log(e);
}

//function cachedNews(req, res, next) {
//    if (true) {
//        if(false){
//            console.log('Translation from cache:', req.body.news);
//            res.render('news', { news: cache.news})
//        } else next();
//    } else next();
//}
//Не придумала как можно кешировать новости


app.get('/', (req, res) => {
    res.redirect('/form-news.html');
})

app.get('/cache', (req, res) => {
    console.log(Object.entries(cache));
    res.render('cache', cache);
});

function updateCache(req, res) {
    console.log(req, res);

    cache = {
        source: req.source,
        count: req.count,
        news: req.news
    }

    fs.writeFileSync('cache.json', JSON.stringify(cache));
}

async function getNews(req) {
    let news = await newsArr(req);
    return news
};


app.post('/news', async (req, res) => {
    res.cookie("source", req.body.source, {
        path: '/'
    });
    res.cookie("count", req.body.count, {
        path: '/'
    });

    let news = await getNews(req.body)
console.log('result = ',news);
    if(!news){
        //console.log(err);
        context='Error. Please, try later...'
        
        res.status(500).render('news', {
        news: news,
        context: context
    })
    }else{
    let context = '';
    if (req.body.source == 'RBC quote') {
        context = context + 'ИНВЕСТИРУЙТЕ С НАМИ';
    };
    if (req.body.source == 'RBC' && news.join().indexOf('Навальн') > -1) {
        context = context + 'СВОБОДУ НАВАЛЬНОМУ'
    } else if (req.body.source == 'RBC' && news.join().indexOf('Навальн') <= -1) {
        context = context + 'УЗНАВАЙТЕ НОВОСТИ С НАМИ'
    };
    if (req.body.source == 'meduza') {
        context = context + 'СВОБОДУ НАВАЛЬНОМУ'
    };
    console.log('context = ', context);

    res.render('news', {
        news: news,
        context: context
    })

}})


app.listen(3000, () => console.log('Listening on port 3000'));

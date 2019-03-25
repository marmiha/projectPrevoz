import "reflect-metadata";
import * as path from "path";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as ejs from "ejs";

/* Router imports */
const prevoziRouter = require("./router/Prevozi.router");

/* Constant variables */
const port = 3000;
const app = express();

/**********************/
/* Configure Express to use EJS */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
/*******************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})
/********************/



app.all('/', (req, res) => {
    res.redirect("/home");
});

app.use('/home', (req, res) => {
    res.render("index", {page:'home', body: "home", menuId:'HOME'});
});

app.all('/prevozi', (req, res) => {
    const sJson = JSON.stringify(cJson);
    const json = JSON.parse(sJson);
    res.render("index", {page:'prevozi', body: "prevozi", menuId:'PREVOZI', dataPrevozi: json.carshare_list});
});

app.all('/prevozi/:from/:to/:date', (req, res) =>{
    const from = req.params.from;
    const to   = req.params.to;
    const date = req.params.date;

    //console.log(from + to + date);

    const axios = require("axios");
    axios.get("https://prevoz.org/api/search/shares/?f=" + from + "&fc=SI&t=" + to + "&tc=SI&d=" + date + "&exact=false&intl=false")
        .then(resapi => {
            //console.log(res.data.property);
            const dataPrevozi = resapi.data.carshare_list;
            res.render("index", {page:'prevozi', body: "prevozi", menuId:'PREVOZI', dataPrevozi: dataPrevozi});
        })
        .catch(err => {
            console.log(err);
        })
});

/* Defined routes */
app.use('/api/prevozi', prevoziRouter);


app.listen(port, () => {
    console.log("Express server has started on port " + port);
});

const cJson = {"search_type": "shares", "carshare_list": [{"id": 6025185, "to": "Maribor", "date": "mon, 25.3", "from": "Ljubljana", "full": "false", "time": "ob 21:15", "type": 0, "added": "2019-03-23T05:09:38+01:00", "price": 5, "to_id": 3195506, "author": "Nastja", "comment": "Ob 21.15 sem pri polikliniki. Pobiram poliklinika, železniška ter po Dunajski cesti  vse do AC. Prosim za SMS in ime. Javite za prtljago. Hvala Nastja", "contact": "+38640838592", "from_id": 3196359, "insured": "true", "bookmark": null, "car_info": "oranžen Renault Captur- KP reg.", "is_author": "false", "num_people": 3, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T21:15:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "true", "from_country_name": "Slovenia"}, {"id": 6030727, "to": "Maribor", "date": "mon, 25.3", "from": "Ljubljana", "full": "false", "time": "ob 21:20", "type": 0, "added": "2019-03-24T16:25:52+01:00", "price": 5, "to_id": 3195506, "author": "Alex", "comment": "Pobiram pri UKC Lj in po Zaloški cesti. Odlagam pri Rutarju in Tržaški cesti.", "contact": "+38640222349", "from_id": 3196359, "insured": "true", "bookmark": null, "car_info": "Fiat", "is_author": "false", "num_people": 3, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T21:20:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "true", "from_country_name": "Slovenia"}, {"id": 6031928, "to": "Maribor", "date": "mon, 25.3", "from": "Ljubljana", "full": "false", "time": "ob 21:30", "type": 0, "added": "2019-03-25T06:21:25+01:00", "price": 5, "to_id": 3195506, "author": "Tereza", "comment": "Pisi sms", "contact": "+38640507993", "from_id": 3196359, "insured": "true", "bookmark": null, "car_info": "Crna corsa", "is_author": "false", "num_people": 3, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T21:30:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "true", "from_country_name": "Slovenia"}, {"id": 6033619, "to": "Maribor", "date": "mon, 25.3", "from": "Ljubljana", "full": "false", "time": "ob 22:15", "type": 0, "added": "2019-03-25T14:10:36+01:00", "price": 5, "to_id": 3195506, "author": "", "comment": "pobiram Ljubljana glavna železniška postaja\r\nodlagam Maribor železniška postaja ali po dogovoru\r\nKontakt  - SMS", "contact": "+38640890825", "from_id": 3196359, "insured": "true", "bookmark": null, "car_info": "beli Fiat duablo, MB registracija", "is_author": "false", "num_people": 3, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T22:15:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "true", "from_country_name": "Slovenia"}, {"id": 6025183, "to": "Slovenska Bistrica", "date": "mon, 25.3", "from": "Ljubljana", "full": "false", "time": "ob 21:15", "type": 0, "added": "2019-03-23T05:09:25+01:00", "price": 5, "to_id": 3190534, "author": "Nastja", "comment": "Ob 21.15 sem pri polikliniki. Pobiram poliklinika, železniška ter po Dunajski cesti  vse do AC. Prosim za SMS in ime. Javite za prtljago. Hvala Nastja", "contact": "+38640838592", "from_id": 3196359, "insured": "true", "bookmark": null, "car_info": "oranžen Renault Captur- KP reg.", "is_author": "false", "num_people": 3, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T21:15:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "true", "from_country_name": "Slovenia"}, {"id": 6030299, "to": "Slovenska Bistrica", "date": "mon, 25.3", "from": "Ljubljana (Center)", "full": "false", "time": "ob 22:00", "type": 0, "added": "2019-03-24T13:56:18+01:00", "price": 5, "to_id": 3190534, "author": "Aleš", "comment": "Kontakt: SMS", "contact": "+38641663907", "from_id": 10177124, "insured": "true", "bookmark": null, "car_info": "Bela škoda octavia, reg. Ms", "is_author": "false", "num_people": 4, "share_type": "share", "to_country": "SI", "carshare_id": null, "date_iso8601": "2019-03-25T22:00:00+01:00", "from_country": "SI", "business_name": null, "business_active": null, "to_country_name": "Slovenia", "business_verified": null, "confirmed_contact": "false", "from_country_name": "Slovenia"}]};
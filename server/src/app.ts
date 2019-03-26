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
    res.render("index", {page:'prevozi', body: "prevozi_input", menuId:'PREVOZI'});
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
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
let visits = 0;


app.all('/', (req, res) => {
    res.redirect("/home");
});

/**
 * Create a menu item object
 * @param id - links to navbar id selector and views/bodies/home.ejs
 * @param name - displayed name in the navbar
 * @param href - redirect link
 */
var menuItem = function(id, name, href) {
    this.id = id;
    this.name = name;
    this.href = href;
}


var menuItems = [
    new menuItem("home", "Home", "/home"),
    new menuItem("prevozi", "Prevozi", "/prevozi")
];

app.use('/home', (req, res) => {
    visits ++;
    res.render("index",
        {body: "home",
            menuId:'home',
            menuItems: menuItems
        });
});

app.all('/prevozi', (req, res) => {
    res.render("index",
        {body: "prevozi_input",
            menuId:'prevozi',
            menuItems: menuItems
        });
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
            res.render("index",
                {body: "prevozi",
                    menuId:'prevozi',
                    menuItems: menuItems,
                    dataPrevozi: dataPrevozi
                });
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

setInterval(() => {
    var d = new Date();
    var n = d.toLocaleTimeString();
    console.log(n + " visits: " + visits);
}, 60000)
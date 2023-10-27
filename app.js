const express = require("express");   //import the express package
const bodyParser = require("body-parser");   // import the body-parser package

const app = express();   // initialize express

app.set("view engine", "ejs");    // set view engine
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: "true"}))

let today = new Date();  //date object
let homeItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];
// let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// let d = new Date;
// let dayName = days[d.getDay()];

let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
};

let day = today.toLocaleDateString("en-US", options);  

app.get("/", (req,res) => {
    res.render("list", {listTitle: day, items: homeItems});
});   //initial home route


app.post("/", (req, res) => {
    let newItem = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work"){
        workItems.push(newItem);
        res.redirect("/work"); 
    }
    else{
        homeItems.push(newItem);
        res.redirect("/");
    }
    // console.log(newItem);
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", items: workItems})
    // res.send("HelloWorld");
    // res.render("list", {listTitle: day, items: homeItems});
});   // /eork route

app.post("/work", (res, req) => {
    let item = req.body.newItem;
    workItems.push(newItem);
    res.redirect("/work");
})


app.listen(8000, () => {
    console.log("Server is listening at port 3000");
})    //start app

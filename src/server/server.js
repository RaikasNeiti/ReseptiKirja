let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors')
const util = require('util');
// Create application/x-www-form-urlencoded parser

let con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "recipedb"
});
const query = util.promisify(con.query).bind(con);

app.use(express.static('public'));
app.use(cors())

app.get("/recipes", function (req, res) {
    let sql = "SELECT" + " * " + "FROM recipes"
        + " ORDER BY name";
    console.log(sql);

(async () => {
    try {
        console.log("test")
        const rows = await query(sql);
        console.log(rows);
        res.send(rows);
        } catch (err) {
            console.log("error");
        }
    })()
});


app.get("/recipe", function (req, res) {
    let id = req.query.id;
    console.log(id);
    let sql = "SELECT" + " * " + "FROM recipes"
        + " WHERE id ='"+ id + "'";
    (async () => {
        try {
            const rows = await query(sql, [id]);
            console.log(rows);
            res.send(rows);

        } catch (err) {
            console.log("error");
        }
    })()
})

app.get("/add", function (req, res) {
    let sql = "INSERT INTO recipes(name, ingredients, instructions, cookingtime, maker)"
        + "VALUES('" + req.query.nimi + "', '" + req.query.Ainekset + "', '"+ req.query.ohje +"', '"+ req.query.aika +"', '"+ req.query.author +"')";
    console.log(sql);
    (async () => {
        try {
            console.log("test")
            const rows = await query(sql);
            console.log(rows);
            res.send(rows);
        } catch (err) {
            console.log("error");
        }
    })()
});

app.get("/delete", function (req, res) {
    let id = req.query.id;
    console.log(id);
    let sql = "DELETE FROM recipes"
        + " WHERE id ='"+ id + "'";
    (async () => {
        try {
            const rows = await query(sql, [id]);
            console.log(rows);
            res.send(rows);

        } catch (err) {
            console.log("error");
        }
    })()
})

app.get("/update", function (req, res) {
    let sql = "UPDATE recipes"
        + " SET name= '" + req.query.nimi + "', ingredients= '" + req.query.Ainekset + "', instructions= '"+ req.query.ohje +"', cookingtime= '"+ req.query.aika +"', maker= '"+ req.query.author +"'"
        + " WHERE id ='" + req.query.id + "'";
    console.log(sql);
    (async () => {
        try {
            console.log("test")
            const rows = await query(sql);
            console.log(rows);
            res.send(rows);
        } catch (err) {
            console.log("error");
        }
    })()
});



let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})
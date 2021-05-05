let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors')
const util = require('util');
const {query, validationResult} = require('express-validator')


let con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "recipedb"
});
const sqlquery = util.promisify(con.query).bind(con);

app.use(express.static('public'));
app.use(cors())

app.get("/recipes", function (req, res) {
    let sql = "SELECT" + " * " + "FROM recipes"
        + " ORDER BY name";
    console.log(sql);
    (async () => {
        try {
            console.log("test")
            const rows = await sqlquery(sql);
            console.log(rows);
            res.send(rows);
        } catch (err) {
            console.log("error");
        }
    })()
});


app.get("/recipe",
    query('id').isNumeric(),
    (req, res) => {
    const errors = validationResult(req);
    console.log(errors );
    if(!errors.isEmpty()){
        res.send("parametrit")
    }else {
        let id = req.query.id;
        console.log(id);
        let sql = "SELECT" + " * " + "FROM recipes"
            + " WHERE id ='"+ id + "'";
        (async () => {
            try {
                const rows = await sqlquery(sql, [id]);
                console.log(rows);
                res.send(rows);

            } catch (err) {
                console.log("error");
            }
        })()
    }
})

app.get("/add",
    query('nimi').isLength({min: 2,max: 25}),
    query('Ainekset').isLength({min:2,max: 1000}),
    query('ohje').isLength({min: 20,max : 1000}),
    query('aika').isNumeric(),
    query('author').isLength({min: 2, max: 25}),
    function (req, res) {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        res.send("parametrit")
    }else {
        let sql = "INSERT INTO recipes(name, ingredients, instructions, cookingtime, maker)"
            + "VALUES('" + req.query.nimi + "', '" + req.query.Ainekset + "', '"+ req.query.ohje +"', '"+ req.query.aika +"', '"+ req.query.author +"')";
        console.log(sql);
        (async () => {
            try {
                console.log("test")
                const rows = await sqlquery(sql);
                console.log(rows);
                res.send(rows);
            } catch (err) {
                console.log("error");
            }
        })()
    }
});

app.get("/delete",
    query('id').isNumeric(),
    function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let id = req.query.id;
        console.log(id);
        let sql = "DELETE FROM recipes"
            + " WHERE id ='"+ id + "'";
        (async () => {
            try {
                const rows = await sqlquery(sql, [id]);
                console.log(rows);
                res.send(rows);

            } catch (err) {
                console.log("error");
            }
        })()
    }else {
        res.send("parametrit")
    }
})

app.get("/update",
    query('id').isNumeric(),
    query('nimi').isLength({min: 2,max: 25}),
    query('Ainekset').isLength({min:2,max: 1000}),
    query('ohje').isLength({min: 20,max : 1000}),
    query('aika').isNumeric(),
    query('author').isLength({min: 2, max: 25}),
    function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        let sql = "UPDATE recipes"
            + " SET name= '" + req.query.nimi + "', ingredients= '" + req.query.Ainekset + "', instructions= '"+ req.query.ohje +"', cookingtime= '"+ req.query.aika +"', maker= '"+ req.query.author +"'"
            + " WHERE id ='" + req.query.id + "'";
        console.log(sql);
        (async () => {
            try {
                console.log("test")
                const rows = await sqlquery(sql);
                console.log(rows);
                res.send(rows);
            } catch (err) {
                console.log("error");
            }
        })()
    }else {
        res.send("parametrit")
    }
});



let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})
let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors')
const util = require('util');
let bodyParser = require('body-parser')
app.use(bodyParser.json())
const {body, query, validationResult} = require('express-validator')


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

app.post("/add",
    body('nimi').isLength({min: 2,max: 25}).withMessage('nimi'),
    body('Ainekset').isLength({min:2,max: 1000}),
    body('ohje').isLength({min: 20,max : 1000}),
    body('aika').isNumeric(),
    body('author').isLength({min: 2, max: 25}),
    function (req, res) {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        res.send("parametrit")
    }else {
        let sql = "INSERT INTO recipes(name, ingredients, instructions, cookingtime, maker)"
            + "VALUES('" + req.body.nimi + "', '" + req.body.Ainekset + "', '"+ req.body.ohje +"', '"+ req.body.aika +"', '"+ req.body.author +"')";
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
        res.send("parametrit")
    }else {
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

    }
})

app.post('/update',
    body('id').isNumeric(),
    body('nimi').isLength({min: 2,max: 25}),
    body('Ainekset').isLength({min:2,max: 1000}),
    body('ohje').isLength({min: 20,max : 1000}),
    body('aika').isNumeric(),
    body('author').isLength({min: 2, max: 25}),
    (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        res.send("parametrit")
    }else {
        let sql = "UPDATE recipes"
            + " SET name= '" + req.body.nimi + "', ingredients= '" + req.body.Ainekset + "', instructions= '"+ req.body.ohje +"', cookingtime= '"+ req.body.aika +"', maker= '"+ req.body.author +"'"
            + " WHERE id ='" + req.body.id + "'";
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



let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})
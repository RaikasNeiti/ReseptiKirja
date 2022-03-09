let express = require('express');
let app = express();
let mysql = require('mysql');
let cors = require('cors')
const util = require('util');
let bodyParser = require('body-parser')
app.use(bodyParser.json())
const {body, query, validationResult} = require('express-validator')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON


let con = mysql.createConnection({
    host: "localhost",
    user: "olso",
    password: "olso",
    database: "recipedb"
});
const sqlquery = util.promisify(con.query).bind(con);

app.use(express.static('public'));
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/recipes", function (req, res) {
    let sql = "SELECT" + " * " + "FROM recipes"
        + " ORDER BY name";
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
                let rows = await sqlquery(sql, [id]);
                console.log(rows);
                if (!rows.length) {
                    console.log("error");
                } else {
                    res.send(rows);
                }
            }catch (err) {
                console.log("error");
            }


        })()
    }
})

app.post("/recipes",
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
            let authHeader = req.header("authorization");
            const token = authHeader && authHeader.split(' ')[1]
            try {
                //verify access token for update the database.
                jwt.verify(token, 'seppo', function (err){
                        if(err){
                            res.status(403).send("Err")
                        }
                            console.log("Acesstoken Verified");
                            (async () => {
                                try {
                                    const rows = await sqlquery(sql);
                                    console.log(rows);
                                    res.send(rows);
                                } catch (err) {
                                    console.log("error");
                                }
                            })()

                    }
                );
            } catch (err) {
                console.log("Invalid Key" + err);
                res.status(400).send("Post was not succesful: " + err);
            }
        })()
            /*
            try {
                console.log("test")
                const rows = await sqlquery(sql);
                console.log(rows);
                res.send(rows);
            } catch (err) {
                console.log("error");
            }

             */

    }
});

app.delete("/recipes",
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
            let authHeader = req.header("authorization");
            let find = "select maker from recipes where id= ?";
            const token = authHeader && authHeader.split(' ')[1]
            const result = await sqlquery(find, req.query.id);
            try {
                //verify access token for deleting something from the database.
                jwt.verify(token, 'seppo', function (err,decoded){
                        if(err){
                            res.status(403).send("Err")
                        }
                        if(result[0].maker === decoded.name){
                            console.log("Acesstoken Verified");
                            (async () => {
                                try {
                                    const rows = await sqlquery(sql, [id]);
                                    console.log(rows);
                                    res.send(rows);

                                } catch (err) {
                                    console.log("error");
                                }
                            })()

                        }else{
                            console.log("Failed to regonice the user.")
                            res.status(400).send("Delete was not succesful: " + err)
                        }
                    }
                );
            } catch (err) {
                console.log("Invalid Key" + err);
                res.status(400).send("Delete was not succesful: " + err);
            }
        })()
            /*try {
                const rows = await sqlquery(sql, [id]);
                console.log(rows);
                res.send(rows);

            } catch (err) {
                console.log("error");
            }

             */

    }
})

app.put('/recipes',
    body('id').isNumeric(),
    body('nimi').isLength({min: 2,max: 25}),
    body('Ainekset').isLength({min:2,max: 1000}),
    body('ohje').isLength({min: 20,max : 1000}),
    body('aika').isNumeric(),
    body('author').isLength({min: 2, max: 25}),
    (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.send("parametrit")
    }else {
        let find = "select maker from recipes where id= ?";
        let sql = "UPDATE recipes"
            + " SET name= '" + req.body.nimi + "', ingredients= '" + req.body.Ainekset + "', instructions= '"+ req.body.ohje +"', cookingtime= '"+ req.body.aika +"', maker= '"+ req.body.author +"'"
            + " WHERE id ='" + req.body.id + "'";
        console.log(sql);
        (async () => {
                let authHeader = req.header("authorization");
                const token = authHeader && authHeader.split(' ')[1]
                const result = await sqlquery(find, req.body.id);
                try {
                    //verify access token for update the database.
                    jwt.verify(token, 'seppo', function (err,decoded){
                            if(err){
                                res.status(403).send("Err")
                            }
                            if(result[0].maker === decoded.name){
                                console.log("Acesstoken Verified");
                                (async () => {
                                    try {
                                        const rows = sqlquery(sql);
                                        res.send(rows);
                                    } catch (err) {
                                        console.log("Error inputing the recipe");
                                    }
                                })()

                            }else{
                                console.log("Failed to regonice the user.")
                                res.status(400).send("Put was not succesful: " + err)
                            }
                        }
                    );
                } catch (err) {
                    console.log("Invalid Key" + err);
                    res.status(400).send("Put was not succesful: " + err);
                }
        })()
    }
});
app.post("/api/event", urlencodedParser, function (req, res) {

    console.log("body: %j", req.body);
    let jsonObj = req.body;

    let sql = "select * from user where email= ?";
    (async () => {  // IIFE (Immediately Invoked Function Expression)

            try {
                const result = await sqlquery(sql, [jsonObj.email]);
                if(bcrypt.compareSync(jsonObj.salasana, result[0].password)){
                    const accessToken = jwt.sign({name: result[0].username}, 'seppo',
                        {expiresIn: "2h"})


                    res.status(200).json({accessToken: accessToken});
                    console.log("Arvo: "+ jsonObj.email + " salasana: " + result[0].password + " username: " + result[0].username);
                    console.log("post")
                }
                else {
                    res.status(400).send("POST was not succesful ");
                }

            } catch (err) {
                console.log("Insertion into some (2) table was unsuccessful!" + err);
                res.status(400).send("POST was not succesful " + err);
            }}

    )()

});

app.post("/api/token", urlencodedParser, function (req, res) {
    let authHeader = req.header("authorization");
    const token = authHeader && authHeader.split(' ')[1]
            try {
                jwt.verify(token, 'seppo', function (err,decoded){
                    if(err){
                        res.status(403).send("Err")
                    }
                        res.status(200).json({name: decoded.name})
                    }
                );

            } catch (err) {
                console.log("Invalid Key" + err);
                res.status(400).send("POST was not succesful " + err);
            }
});



let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})
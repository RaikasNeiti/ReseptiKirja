# reseptikirjaprojecti

## Tietokannan Luonti
```
CREATE DATABASE recipedb;

CREATE TABLE recipes(
	id INT AUTO_INCREMENT,
	name VARCHAR(25),
	ingredients VARCHAR(1000),
	instructions VARCHAR(1000),
	cookingtime INT,
	maker VARCHAR(25),
	PRIMARY KEY(ID));
	
CREATE TABLE IF NOT EXISTS recipedb.user (
  username VARCHAR(16) NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL,
  create_time TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP);
 
 
CREATE TABLE IF NOT EXISTS recipedb.rating (
    id INT AUTO_INCREMENT,
    recipeid INT,
    rating INT,
    comment VARCHAR(1000),
    user VARCHAR(16),
    PRIMARY KEY(id)
    );
    
INSERT INTO user (username,email,password,create_time) VALUES ('testi','testi@gmail.com','$2a$12$OPqd2XcyxDXOzcn1c5jc0uOh.uIAX9IUt6Guq9yNHHZXHmmVMZv/S', NULL);
INSERT INTO user (username,email,password,create_time) VALUES ('testi2','testi2@gmail.com','$2a$12$FKzvbPBMruxOzIzpToDtdOOvfuMRsTbzF/uuj6C1Hq3nuwejW1Q7K'. NULL);
```

### REST API

GET /recipes
```
Hakee ja palauttaa kaikki reseptit databasesta.
```

GET /recipe
```
Hakee ja palauttaa id perusteella databasen.
```
POST /recipes
```
Luo uuden respetin. 
Syötteet: nimi, Ainekset, ohje, aika, author, headers: {Authorization: 'Bearer: '+ accesstoken}})
```
DELETE /recipes
```
Poistetaan olemassa oleva reseptiä id:n perusteella. Vaatii syötteenä Accesstoken
```
PUT /recipes
```
Päivitetään olemassa olevaa reseptiä id:n perusteella.
Syötteet: id, nimi, Ainekset, ohje, aika, author, headers: {Authorization: 'Bearer: '+ accesstoken}})
```
POST /ratings
```
Luo uuden ratingsin
Syötteet: recipeid, rating, comment, headers: {Authorization: 'Bearer: '+ accesstoken}})
```

GET /ratings
```
Hakee ja palauttaa reseptin kommentit ja arvostelun
Syötteet: recipeid
```
POST /api/login
```
Kirjautuminen sivulle joka palauttaa Accesstokenin käyttäjälle.
Syötteet: email, password
```
POST /api/token
```
Tarkistaa käyttäjän Accesstokenin ja palauttaa accesstokenin käyttäjä nimen
Syötteet: headers: {Authorization: 'Bearer: '+ accesstoken}})
```

###Testaus
Testaukseen voi käyttää: 

email: testi@gmail.com   
password: testi

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

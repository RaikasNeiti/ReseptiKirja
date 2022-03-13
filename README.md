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
Syötteet: nimi, Ainekset, ohje, aika, author
```
DELETE /recipes
```
Poistetaan olemassa oleva reseptiä id:n perusteella.
```
PUT /recipes
```
Päivitetään olemassa olevaa reseptiä id:n perusteella.
Syötteet: id, nimi, Ainekset, ohje, aika, author.
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

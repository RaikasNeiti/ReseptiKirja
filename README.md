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

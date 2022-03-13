<template>
  <div class="container">
    <div id="main">
      <p id="nimi">{{nimi}}</p>
      <p id="author">Tekijä: {{author}}</p>
      <div id="buttons" v-if=visibility>
        <button v-on:click="päivitä()">Päivitä</button>
        <button v-on:click="poista()">Poista</button>
      </div>
    </div>

    <div id ="boxes">
    <div id="ainekset">
      <br>
      <p id="ain">Ainekset</p>
      <ul>
        <template v-for="a in ainekset">
          <li :key="a">{{a}}</li>
        </template>
      </ul>
    </div>
    <div id="ohje">
      <br>
      <p id="ohjeohje">Ohje</p><br>
      <p id="aika">Valmistus Aika: {{aika}} Minuuttia</p> <br><br>

      {{ohje}}
    </div>
    </div>

    <div id ="arvo">

      <p>Arvostelu keskiarvosana= {{keskiarvosana}}/5</p><br><br>

      <div>
        <form>
          <label for="arvostelu">Valitse Arvosana</label>
          <select v-model="arvostelu" id="arvostelu" name="arvostelu">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select><br><br>
          <label for="kommentti">Kommentti</label><br>
          <textarea v-model="comment" id="kommentti"></textarea> <br><br>
          <button v-on:click="postarvo()">Tallenna</button>
        </form>

      </div>
      <br><br>
      <div v-for="rate in ratings" v-bind:key="rate.rating">
         <p>{{rate.rating}} </p>
        <br>
        <p>{{rate.comment}} </p>
        <br>
        <p>{{rate.user}} </p>
        <br><br>
      </div>

    </div>
  </div>

</template>

<script>
import axios from "axios";

class Rating {
  constructor(rating ,comment , user) {
    this.rating = rating;
    this.comment = comment;
    this.user = user;
  }
}

export default {
  name: "recipe",
  props: {},
  data: function (){
    return {recipe: this.$route.query.id, ainekset: [], nimi: '', aika: '', ohje: '', author: '', newAines: '', visibility: false, user: '', ratings: [], comment: '', arvostelu: '', keskiarvosana: 0}
  },
  methods:{
    päivitä: function () {
      this.$router.push({name: 'update', query: {id: this.$route.query.id}})
    },
    poista: function () {
      if(confirm("Do you really want to delete?")) {
        axios
            .delete('http://localhost:8081/recipes?id=' + this.$route.query.id,{
              headers: {
                Authorization:
                    'Bearer: ' + this.myToken.accessToken
              }

            })
            .then(res => {
              console.log(res.data)
              this.$router.push({name: 'home'})
            })
      }
    },
    postarvo: async function () {
      if (this.comment !== "") {
        try {
          await axios
              .post('http://localhost:8081/ratings', {
                recipeid: this.$route.query.id,
                rating: this.arvostelu,
                comment: this.comment,
              }, {
                headers: {
                  Authorization:
                      'Bearer: ' + this.myToken.accessToken
                }
              })
              .then(res => {
                let adress = res.data;
                if (adress === "parametrit") {
                  alert("virheeliset syötteet")
                } else {
                  console.log("Toimi");
                }

              })
          console.log("saved");
        } catch (err) {
          alert("virheeliset syötteet")
        }
      } else {
        console.log("not Saved")
        alert("Kaikki kohdat täytyy olla täytetty");
      }

    }
  },
  created: async function () {
    try{
      this.myToken = JSON.parse(localStorage.getItem("tokenKey"))
      await axios
          .post('http://localhost:8081/api/token',
              "data", {headers: {Authorization:
                      'Bearer: '+ this.myToken.accessToken}})
          .then(res => {
            this.user = res.data.name;

          })
    }
    catch (err){
      console.log(err)
      await this.$router.push({name: 'login', query: {location: this.$route.name}});
    }
    try{
      await axios
          .get('http://localhost:8081/recipe?id=' + this.$route.query.id)
          .then(res => {
            let recipe = res.data;
            this.ainekset = JSON.parse(recipe[0].ingredients);

            this.nimi = recipe[0].name;
            this.ohje = recipe[0].instructions;
            this.aika = recipe[0].cookingtime;
            this.author = recipe[0].maker;
            if(this.user == this.author){
              this.visibility = true;
            }
          })
      await axios
          .get('http://localhost:8081/ratings?id=' + this.$route.query.id)
          .then(res => {
            let tempRatings = res.data;
            console.log(tempRatings)
            for (let i = 0; i < tempRatings.length; i++) {
              this.ratings.push(new Rating(tempRatings[i].rating, tempRatings[i].comment, tempRatings[i].user))
              this.keskiarvosana += tempRatings[i].rating
            }
            this.keskiarvosana = Math.round(this.keskiarvosana * 10  / tempRatings.length)/10
          })

    }catch (err){
      console.log("Error catch " + err)
    }



  }

}
</script>

<style scoped>
#author{
  font-weight: bold;
}
p{
  display:inline;
}
#main{
 margin-bottom: 25px;
}
#nimi{
  margin: 25px;
  font-size: 60px;
}
#ainekset{
  margin-left: 24%;
  float:left;
  width:25%;
  height:auto;
  background-color: #f8f8f8;
}
#arvo{
  margin-left: 35%;
  margin-top: 10%;
  float:left;
  width:25%;
  height:auto;
}
#kommentti{
  width: 280px;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
#ohje{
  word-wrap: break-word;
  margin-right: 24%;
  float:right;
  width:25%;
  height:auto;
  background-color: #f8f8f8;
}
#ohjeohje{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
#ain{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}
ul{
  padding: 0;
  text-align: left;
  list-style-type: none;
  margin-left: 25%;
}
li{
  margin-bottom: 20px;
}
input[type=text]:focus {
  outline: none;
  border: 3px solid #555;
}
input{
  outline: none;
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}
</style>
<template>
  <div class="container">
    <div id="main">
      <p id="nimi">{{nimi}}</p>
      <p id="author">Tekijä: {{author}}</p>
      <div id="buttons">
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

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "recipe",
  props: {},
  data: function (){
    return {recipe: this.$route.query.id, ainekset: [], nimi: '', aika: '', ohje: '', author: '', newAines: ''}
  },
  methods:{
    päivitä: function () {
      this.$router.push({name: 'update', query: {id: this.$route.query.id}})
    },
    poista: function () {
      if(confirm("Do you really want to delete?")) {
        axios
            .delete('http://localhost:8081/recipes?id=' + this.$route.query.id)
            .then(res => {
              let response = res.data;
              console.log(response)
              this.$router.push({name: 'home'})
            })
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
            console.log(res.data)
          })
    }
    catch (err){
      console.log(err)
      await this.$router.push({name: 'login', query: {location: this.$route.name}});
    }
      axios
          .get('http://localhost:8081/recipe?id=' + this.$route.query.id)
          .then(res => {
            let recipe = res.data;
            console.log(recipe.status)
            this.ainekset = JSON.parse(recipe[0].ingredients);

            this.nimi = recipe[0].name;
            this.ohje = recipe[0].instructions;
            this.aika = recipe[0].cookingtime;
            this.author = recipe[0].maker;
          })

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
</style>
<template>
  <div class="container">
    <div>
      <input v-model="searcharvo" type="text" placeholder="Haku">
    </div>

    <h3>Reseptit:</h3>
    <div id="reseptitable">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Nimi</th>
        <th scope="col">Valmistus Aika</th>
        <th scope="col">Tekijä</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="recipe in filteredList" v-bind:key="recipe.name">
        <th scope="row" v-on:click="resepti(recipe.id)">{{recipe.nimi}}</th>
        <td>{{recipe.aika}} min</td>
        <td>{{recipe.tekijä}}</td>
      </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

class Recipe {
  constructor(id, nimi ,aika , tekijä) {
    this.id = id;
    this.nimi = nimi;
    this.aika = aika;
    this.tekijä = tekijä;
  }
}
export default {
  name: 'recipes',
  props: {

  },
  data: function (){
    return {recipes: [], searcharvo: "",recipelist: '', myToken: ""};

  },
  methods: {
    resepti: function (id){
      this.$router.push({name: 'recipe', query: {id: id}})
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
      await this.$router.push({name: 'login'});
    }

    await axios
        .get('http://localhost:8081/recipes')
        .then(res => {
          let tempRecipes = res.data;
          for (let i = 0; i < tempRecipes.length; i++) {
            this.recipes.push(new Recipe(tempRecipes[i].id, tempRecipes[i].name, tempRecipes[i].cookingtime, tempRecipes[i].maker))
          }
          console.log(this.recipes)
        })


  },
  computed: {
    filteredList() {
      return this.recipes.filter(recipe => {
        return recipe.nimi.toLowerCase().includes(this.searcharvo.toLowerCase())
      })
    }
  }
}
</script>
<style>
h3 {
  margin-bottom: 20px;
  font-weight: bold;
}
th{
  padding: 3px;
  padding-left: 20px;
  padding-right: 20px;
}
.table{
  align-self: center;
  margin: auto;

}

#reseptitable{
  background-color: #f8f8f8;
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;

}
</style>
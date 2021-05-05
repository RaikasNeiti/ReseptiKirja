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
        <td>{{recipe.author}}</td>
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
    this.author = tekijä;
  }
}
export default {
  name: 'recipes',
  props: {

  },
  data: function (){
    return {recipes: [], searcharvo: "",recipelist: ''};

  },
  methods: {
    hae: function(){
      this.searcharvo = ''
    },
    lisaa: function (){
      this.$router.push('Add')
    },
    resepti: function (id){
      this.$router.push({name: 'recipe', query: {id: id}})
    }

  },
  created: function () {
      axios
        .get('http://localhost:8081/recipes')
        .then(res => {
          let tempRecipes = res.data;
          for(let i = 0; i< tempRecipes.length; i++){
              this.recipes.push(new Recipe(tempRecipes[i].id,tempRecipes[i].name,tempRecipes[i].cookingtime,tempRecipes[i].maker))
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
#textresepti{
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
}
#reseptitable{
  background-color: #f8f8f8;
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;

}
</style>
<template>
  <div class="container">
    <div>
      <input v-model="searcharvo" type="text" placeholder="Haku">
      <button v-on:click="hae()">Hae</button>
      <p>Message is: {{ searcharvo }}</p>
    </div>
    <button v-on:click="lisaa()">Lisaa</button>
    <h3>Reseptit:</h3>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Nimi</th>
        <th scope="col">Valmistus Aika</th>
        <th scope="col">Tekijä</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="recipe in recipes" v-bind:key="recipe.name">
        <th scope="row" v-on:click="resepti(recipe.id)">{{recipe.name}}</th>
        <td>{{recipe.cookingtime}}</td>
        <td>{{recipe.maker}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'recipes',

  props: {

  },
  data: function (){
    return {recipes: null, searcharvo: "",};

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
          this.recipes = res.data;
          console.log(this.recipes)
        })

  }
}
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>
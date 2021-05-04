<template>
  <div class="hello">
  <label for="Nimi">Nimi: </label>
  <input v-model="nimi" type="text" id="Nimi"> <br><br>
  <label for="Valmistusaika">Valmistusaika: </label>
  <input v-model="aika" type="text" id="Valmistusaika"> minuuttia<br><br>


  <div id="ulli">
    <form v-on:submit.prevent="add">
      <label for="Ainesosat">Aineosat: </label>
      <input v-model="newAines" type="text" id="Ainesosat">
      <button>Add</button><br><br>
    </form>
    <ul>
      <template v-for="(a,index) in ainekset">
        <li :key="index">{{a}}<button v-on:click="asd(ainekset.indexOf(a))">Remove</button></li>
      </template>
    </ul>
  </div>

  <label for="Ohje">Ohje: </label>
  <input v-model="ohje" type="textarea" id="Ohje"> <br><br>
  <label for="Author">Tekijä: </label>
  <input v-model="author" type="text" id="Author"> <br><br>
  <button v-on:click="save()">Save</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "update",
  data: function (){
    return {ainekset: [], nimi: '', aika: '', ohje: '', author: '', newAines: ''}
  },
  methods: {
    add: function () {
      this.ainekset.push(this.newAines)
      this.newAines = ''
    },
    asd: function (index) {
      this.ainekset.splice(index, 1)
    },
  },
  created: function () {
    axios
        .get('http://localhost:8081/recipe?id='+ this.$route.query.id)
        .then(res => {
          let recipe = res.data;
          console.log(recipe[0].ingredients)

          this.ainekset = JSON.parse(recipe[0].ingredients);

          this.nimi= recipe[0].name;
          this.ohje = recipe[0].instructions;
          this.aika = recipe[0].cookingtime;
          this.author = recipe[0].cookingtime;

        })

  }
}
</script>

<style scoped>

</style>
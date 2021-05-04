<template>
  <div class="hello">
    <h1>testaus</h1>
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
      <template v-for="a in Ainekset">
        <li :key="a">{{a}}<button v-on:click="asd(Ainekset.indexOf(a))">Remove</button></li>
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
  name: 'AddSivu',
  props: ['title'],
  data: function (){
    return {Ainekset: [], nimi: '', aika: '', ohje: '', author: '', newAines: ''}
  },
  methods: {
    add: function(){
      this.Ainekset.push(this.newAines)
      this.newAines = ''
    },
    asd: function (index){
      this.Ainekset.splice(index,1)
    },
    save: function (){

      axios
        .get('http://localhost:8081/add?nimi=' + this.nimi + '&aika=' + this.aika + '&Ainekset=' + JSON.stringify(this.Ainekset) + '&ohje=' + this.ohje + '&author=' + this.author)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
</style>

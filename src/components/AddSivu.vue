<template>
  <div class="hello">
    <h1>testaus</h1>
      <label for="Nimi">Nimi: </label>
      <input type="text" id="Nimi"> <br><br>
      <label for="Valmistusaika">Valmistusaika: </label>
      <input type="text" id="Valmistusaika"> minuuttia<br><br>


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
      <input type="text" id="Ohje"> <br><br>
  </div>
</template>

<script>
export default {
  name: 'AddSivu',
  el: '#ulli',
  props: ['title'],

  data: function (){
    return {Ainekset: []}
  },
  methods: {
    add: function(){
      this.Ainekset.push(this.newAines)
      this.newAines = ''
    },
    asd: function (index){
      this.Ainekset.splice(index,1)
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

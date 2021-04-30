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
      <tr v-for="user in users" v-bind:key="user.id">
        <th scope="row">{{user.id}}</th>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Router from "vue-router";


export default {
  name: 'searcharvo',
  props: {

  },
  data: function (){
    return {searcharvo: ""};

  },
  methods: {
    hae: function(){
      this.searcharvo = ''
    },
    lisaa: function (){
      Router.push({ name: "Jotain"})
    }

  }
}
</script>
<style>
h3 {
  margin-bottom: 5%;
}
</style>
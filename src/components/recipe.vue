<template>
  <div class="container">
    <p>{{recipe}}</p>
    <button v-on:click="päivitä()">update</button>
    <button v-on:click="poista()">delete</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "recipe",
  props: {},
  data: function (){
    return {recipe: this.$route.query.id}
  },
  methods:{
    päivitä: function () {
      this.$router.push({name: 'update', query: {id: this.$route.query.id}})
    },
    poista: function () {
      axios
        .get('http://localhost:8081/delete?id='+ this.$route.query.id)
          .then(res => {
            let response = res.data;
            console.log(response)
          })
    }
  },
  created: function () {
    axios
        .get('http://localhost:8081/recipe?id='+ this.$route.query.id)
        .then(res => {
          this.recipe = res.data;
          console.log(this.recipe)
        })

  }

}
</script>

<style scoped>

</style>
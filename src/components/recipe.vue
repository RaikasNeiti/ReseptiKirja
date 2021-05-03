<template>
  <div class="container">
    <p>{{recipe}}</p>
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
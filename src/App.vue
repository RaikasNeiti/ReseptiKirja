<template>
  <div id="app">
    <router-link to="/" ><img src="./assets/rsepti.png"></router-link>
    <router-link to="/add" v-if="this.$route.name != 'Add'"><img src="./assets/lisää.png"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>






export default {
  name: 'app',

}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

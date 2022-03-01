<template>
  <div id="app">
    <router-link id="reseptikirja" to="/" v-if="this.$route.name !== 'login'"><img src="./assets/rsepti.png" alt="logo"></router-link>
    <router-link id="lisääresepti" to="/add" v-if="this.$route.name !== 'Add' && this.$route.name !== 'login'" ><img src="./assets/lisää.png" alt="lisää kuva"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',

}


</script>

<style>
#reseptikirja{
  margin: 50px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

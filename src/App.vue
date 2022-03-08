<template>
  <div id="app">
    <router-link id="reseptikirja" to="/" v-if="this.$route.name !== 'login'"><img src="./assets/rsepti.png" alt="logo"></router-link>
    <router-link id="lisääresepti" to="/add" v-if="this.$route.name !== 'Add' && this.$route.name !== 'login'" ><img src="./assets/lisää.png" alt="lisää kuva"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>

import axios from "axios";


export default {
  name: 'app',


  created: async function () {
    try{
    this.myToken = JSON.parse(localStorage.getItem("tokenKey"))
    await axios
        .post('http://localhost:8081/api/token',
            "data", {headers: {Authorization:
                    'Bearer: '+ this.myToken.accessToken}})
        .then(res => {
          console.log(res.data)
        })
    }
    catch (err){
      console.log(err)
      await this.$router.push({name: 'login'});
    }
}
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

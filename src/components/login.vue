<template>
  <form v-on:submit.prevent="logi">
    <div class="container">
      <label>Username : </label>
      <input type="text" v-model="emails" placeholder="Enter Username" name="username" required>
      <label>Password : </label>
      <input type="password" v-model="password" placeholder="Enter Password" name="password" required>
      <button >Login</button>
      Forgot <a href="#"> password? </a>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
name: "login",
  props: ['title'],
  data: function (){
    return {emails: '', password: ''}
  },
  methods: {
  logi: async function (){
    await axios
    .post('http://localhost:8081/api/event', {
      email: this.emails,
      salasana: this.password
    } ).then (res=> {
      console.log(res.data)
          localStorage.setItem("tokenKey", JSON.stringify(res.data))

          if(this.$route.query.location == null){
            this.$router.push({name: 'home'})
          }else
          {
            this.$router.push({name: this.$route.query.location});
          }
        })
  }
  }


}
</script>

<style scoped>

</style>
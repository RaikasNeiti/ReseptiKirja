<template>
  <div class="hello">
    <h1>Lisää Resepti</h1>
      <label for="Nimi">Nimi: </label>
      <input v-model="nimi" type="text" id="Nimi"> <br><br>
      <label for="Valmistusaika">Valmistusaika: </label>
      <input v-model="aika" type="text" id="Valmistusaika"> minuuttia<br><br>


    <div id="ulli">
      <form v-on:submit.prevent="add">
      <label for="Ainesosat">Aineosat: </label>
      <input v-model="newAines" type="text" id="Ainesosat">
      <button>Lisää</button><br><br>
      </form>
    <ul>
      <template v-for="a in Ainekset">
        <li :key="a">{{a}}<button v-on:click="asd(Ainekset.indexOf(a))">Poista</button></li>
      </template>
    </ul>
    </div>

    <label for="Ohje">Ohje:</label><br>
    <textarea v-model="ohje" id="Ohje"></textarea> <br><br>
    <label for="Author">Tekijä: </label>
    <input v-model="author" type="text" id="Author"> <br><br>
    <button v-on:click="save()">Tallenna</button>
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
      await this.$router.push({name: 'login', query: {location: this.$route.name}});
    }
  },
  methods: {
    add: function(){
      this.Ainekset.push(this.newAines)
      this.newAines = ''
    },
    asd: function (index){
      this.Ainekset.splice(index,1)
    },
    save: async function (){
        if (this.nimi !== '' && this.aika !== "" && !isNaN(this.aika) && this.ohje !== "" && this.author !== "") {
          console.log(this.Ainekset)
          try {


            await axios
                .post('http://localhost:8081/recipes', {
                  nimi: this.nimi,
                  Ainekset: JSON.stringify(this.Ainekset),
                  ohje: this.ohje,
                  aika: this.aika,
                  author: this.author
                })
                .then(res => {
                  let adress = res.data;
                  if (adress === "parametrit") {
                    alert("virheeliset syötteet")
                  } else {
                    console.log(adress.insertId);
                    this.$router.push({name: 'recipe', query: {id: adress.insertId}})
                  }

                })
            console.log("saved");
          }catch (err){
            alert("virheeliset syötteet")
          }
      } else {
        console.log("not Saved")
        alert("Kaikki kohdat täytyy olla täytetty");
      }
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
ul{
  list-style-type: none;
}


#Ohje{
  width: 280px;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
}
input{
  outline: none;
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}
input[type=text]:focus {
  outline: none;
  border: 3px solid #555;
}
</style>

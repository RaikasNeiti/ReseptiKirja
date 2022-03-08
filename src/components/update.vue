<template>
  <div class="hello">
  <label for="Nimi">Reseptin nimi: </label>
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
      <template v-for="(a,index) in ainekset">
        <li :key="index">{{a}}<button v-on:click="asd(ainekset.indexOf(a))">Poista</button></li>
      </template>
    </ul>
  </div>

    <label for="Ohje">Ohje:</label><br>
    <textarea v-model="ohje" id="Ohje">Ohje...</textarea> <br><br>
  <label for="Author">Tekijä: </label>
  <input v-model="author" type="text" id="Author"> <br><br>
  <button v-on:click="save()">Päivitä</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
name: "update",
  data: function (){
    return {ainekset: [], nimi: '', aika: '', ohje: '', author: '', newAines: ''}
  },
  methods: {
    add: function () {
      this.ainekset.push(this.newAines)
      this.newAines = ''
    },
    asd: function (index) {
      this.ainekset.splice(index, 1)
    },
    save: async function (){
      if(confirm("Do you really want to save?")) {
        if (this.nimi !== '' && this.aika !== "" && !isNaN(this.aika) && this.ohje !== "" && this.author !== "") {
          let id = this.$route.query.id;
          await axios.put('http://localhost:8081/recipes', {
                nimi: this.nimi,
                id: this.$route.query.id,
                Ainekset: JSON.stringify(this.ainekset),
                ohje: this.ohje,
                aika: this.aika,
                author: this.author
              })

          await this.$router.push({name: 'recipe', query: {id: id}})
          console.log("saved");
        } else {
          console.log("not Saved")
          alert("Kaikki kohdat täytyy olla täytetty");
        }
      }
    }
  },
  created: async function () {
    try {
      this.myToken = JSON.parse(localStorage.getItem("tokenKey"))
      await axios
          .post('http://localhost:8081/api/token',
              "data", {
                headers: {
                  Authorization:
                      'Bearer: ' + this.myToken.accessToken
                }
              })
          .then(res => {
            console.log(res.data)
          })
    } catch (err) {
      console.log(err)
      await this.$router.push({name: 'login', query: {location: this.$route.name}});
    }
    axios
        .get('http://localhost:8081/recipe?id=' + this.$route.query.id)
        .then(res => {
          let recipe = res.data;
          this.ainekset = JSON.parse(recipe[0].ingredients);
          this.nimi = recipe[0].name;
          this.ohje = recipe[0].instructions;
          this.aika = recipe[0].cookingtime;
          this.author = recipe[0].maker;

        })

  }
}
</script>

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
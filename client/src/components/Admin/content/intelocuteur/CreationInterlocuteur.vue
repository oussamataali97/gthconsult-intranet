<template>
  <div class="creationClient">

    <h3>CRÉATION INTERLOCUTEUR</h3>

    <Traitement :msg="msgInterlocuteur" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="nom">Nom</label>
        <input type="text" v-model="interlocuteur.nom">
      </div>

      <div>
        <label for="adresse">Prénom </label>
        <input type="text" v-model="interlocuteur.prenom">
      </div>

      <div>
        <label for="ville">E-mail</label>
        <input type="text" v-model="interlocuteur.email">
      </div>

      <div>
        <label for="ville">Password</label>
        <input type="text" v-model="interlocuteur.password" disabled>
      </div>

      <div>
        <label for="codePostal">Fonction</label>
        <input type="text" v-model="interlocuteur.fonction">
      </div>

      <div>
        <label for="pays">Téléphone</label>
        <input type="text" v-model="interlocuteur.telephone">
      </div>

      <div>
        <label for="Raison sociale">Raison sociale / Nom</label>
        <select v-model="interlocuteur.clientId">
          <option v-for="client in clients" :key="client._id" :value="client._id" > {{ client.raisonSocial }}</option>
        </select>
      </div>

      <div>
        <label for="Raison sociale">Répétez Raison sociale / Nom</label>
        <select v-model="interlocuteur.raisonSocial">
          <option v-for="client in clients" :key="client.raisonSocial" :value="client.raisonSocial" > {{ client.raisonSocial }}</option>
        </select>
      </div>

      <div>
        <input type="submit" value="Créer une interlocuteur" @click="create()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>
import Service from "../../../../Service";
import Traitement from "../Affaire/Traitement.vue"

export default {
  data() {
    return {
      traitement : null,
      msgInterlocuteur : null,
      interlocuteur: {
              nom : null,
              prenom : null,
              email : null,
              fonction : null,
              telephone : null,
              clientId : null,
              password : null,
              raisonSocial : null
      },
      clients: [],
      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },
  methods: {

    generatePassword() {
        var chars = `0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
        var passwordLength = 10;
        this.interlocuteur.password = ""
        for (var i = 0; i <= passwordLength; i++) {
          var randomNumber = Math.floor(Math.random() * chars.length);
          this.interlocuteur.password += chars.substring(randomNumber, randomNumber +1);
        }
    },

    // create Client
    create() {


      Service.createInterlocuteur(this.interlocuteur)
      .then((response) => {

              this.generatePassword();
              var finish = false;
              this.msgInterlocuteur = "Veuillez patienter quelques secondes pour enregistrer L'interlocuteur";
              this.traitement = true;
              this.interlocuteur.nom = null;
              this.interlocuteur.prenom = null; 
              this.interlocuteur.email = null;
              this.interlocuteur.fonction = null;
              this.interlocuteur.telephone = null;
              this.interlocuteur.clientId = null;
              this.interlocuteur.raisonSocial = null;

              if(response) {
                setTimeout(() => { console.log("wait"); }, 5000);
                finish = true
              }

              if(finish) {
                setTimeout(() => {
                  this.msgInterlocuteur = null;
                  this.traitement = false;
                }, 5000);
              }

      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
    }
  },

  created() {
    // get client for get raison Client
    Service.readClient()
    .then((result) => {
      this.clients = result.data.clients
    })
    .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
    });


    this.generatePassword();

  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
}

.creationClient{
  padding:5px;
}

.creationClient h3 {
  width: 100%;
  margin:auto;
  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;


}
.succes {
  background-color: #69cd5b;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.echec {
  background-color: RED;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.formCreation {
  padding:20px 0;
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  flex-wrap: wrap;

}

.formCreation div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48%;
}
.formCreation div label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#494949;
}
.formCreation div input {
  height: 40px;
  margin-bottom: 5px;
  border: 1px solid #243064;
  padding:5px;
}.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}

.formCreation div select {
  height: 40px;
}

.formCreation div:nth-child(9) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(10) input {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}



#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}

#app > div > div > div.menu-content > div.content > div > h3 {
    padding: 15px;
}

#app > div > div > div.menu-content > div.content > div > div > div > label {
  font-size: 15px;
}



</style>
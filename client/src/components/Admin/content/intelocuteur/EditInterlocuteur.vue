<template>
  <div class="creationClient">

    <h3>MODIFICATION D'UNE INTERLOCUTEUR</h3>

    <p v-if="succes" :class="{ succes: succes }">
      Pour modifier la Interlocuteur, Veuillez patienter quelques secondes
    </p>

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
        <input type="text" v-model="interlocuteur.password">
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
          <option v-for="client in clients" :key="client._id" :value="client._id" selected="selected"> {{ client.raisonSocial }}</option>
        </select>
      </div>

      <div>
        <label for="Raison sociale">Répétez Raison sociale / Nom</label>
        <select v-model="interlocuteur.raisonSocial">
          <option v-for="client in clients" :key="client.raisonSocial" :value="client.raisonSocial" selected="selected"> {{ client.raisonSocial }}</option>
        </select>
      </div>

      <div>
        <input type="submit" value="Modifier" @click="update()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>
import Service from "../../../../Service";

export default {
  data() {
    return {
      interlocuteur: {
              interlocuteurId : null,
              nom : null,
              prenom : null,
              email : null,
              fonction : null,
              telephone : null,
              clientId : null,
              raisonSocial : null,
              password: null
      },
      succes: false,
      echec: false,
      error : null,
      clients : []
    };
  },
  props : {
    infoInterlocuteur : Array,
    raisonSocial : String,
  },
  methods: {

    // Update Interlocuteurs
    update() {
      Service.updateInterlocuteur(this.interlocuteur)
      .then(() => {

          this.succes = true;
          setTimeout(() => {
              this.succes = false;
              return this.$router.go(this.$router.currentRoute)
          }, 5000);

      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });
    }
  },

  created() {

    // get clients (raison Social)

    Service.readClient()
      .then(() => {

              // Set value Interlocuteur
              this.interlocuteur.interlocuteurId = this.infoInterlocuteur[0]._id,
              this.interlocuteur.nom = this.infoInterlocuteur[0].nom,
              this.interlocuteur.prenom = this.infoInterlocuteur[0].prenom,
              this.interlocuteur.email = this.infoInterlocuteur[0].email,
              this.interlocuteur.fonction = this.infoInterlocuteur[0].fonction,
              this.interlocuteur.telephone = this.infoInterlocuteur[0].telephone,
              this.interlocuteur.clientId = this.infoInterlocuteur[0].clientId,
              this.interlocuteur.password = this.infoInterlocuteur[0].pass,
              this.interlocuteur.raisonSocial = this.raisonSocial

      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });

      // Read all clients
      Service.readClient()
      .then((result) => {
              this.clients = result.data.clients;
      })
      .catch((error) => {

              this.msg = error.message;
              console.error(`HTTP error: ${error.name} => ${error.message}`);
              throw "fail request at: GET /refreshtime";
      });


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
  padding:15px;


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
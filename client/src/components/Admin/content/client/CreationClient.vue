<template>
  <div class="creationClient">

    <h3><i class="fa-solid fa-person-circle-plus"></i> CRÉATION D'UN CLIENT</h3>

    <Traitement :msg="msgClient" v-if="traitement == true"/>


    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="nom">Raison sociale / Nom</label>
        <input type="text" v-model="client.raisonSocial">
      </div>

      <div>
        <label for="adresse">Adresse</label>
        <input type="text" v-model="client.adresse">
      </div>

      <div>
        <label for="ville">Ville</label>
        <input type="text" v-model="client.ville">
      </div>

      <div>
        <label for="codePostal">Code Postal</label>
        <input type="text" v-model="client.codePostal">
      </div>

      <div>
        <label for="pays">Pays</label>
        <input type="text" v-model="client.pays">
      </div>

      <div>
        <label for="nom">E-mail</label>
        <input type="text" v-model="client.email">
      </div>



      <div>
        <label for="nom">ICE</label>
        <input type="text" v-model="client.ice">
      </div>

      <div>
        <label for="nom">Référence client</label>
        <input type="text" disabled v-model="client.refClient">
      </div>

      <div>
        <label for="téléphone">Téléphone</label>
        <input type="text" v-model="client.telephone">
      </div>

      <div>
        <label for=""></label>
        <input type="hidden">
      </div>


      <div>
        <input type="submit" value="Créer un client" @click="create()">
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
      traitement : false,
      msgClient :null,
      client: {
              raisonSocial : null,
              adresse : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              refClient : null,
              telephone : null
      },
      echec: false,
      error : null,
    };
  },
 components: {
    Traitement
 },
  methods: {
//crete Client
    create() {
      Service.createClient(this.client)
      .then((response) => {
        
              var finish = false;
              this.msgClient = "Veuillez patienter quelques secondes pour enregistrer Le client";
              this.traitement = true;
              this.client.adresse = null;
              this.client.codePostal = null; 
              this.client.email = null;
              this.client.ice = null;
              this.client.pays = null;
              this.client.raisonSocial = null;
              this.client.refClient = null;
              this.client.telephone = null;
              this.client.ville = null;

              if(response) {
                setTimeout(() => { console.log("wait"); }, 5000);
                finish = true
              }

              if(finish) {
                setTimeout(() => {
                  this.msgClient = null;
                  this.traitement = false;
                }, 5000);
              }

      })
      .catch((error) => {
          this.echec = true;
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });


    },

    quitter() {
      return this.$router.go("/");
    }

  },

  created(){


      // get refernce last client
      Service.getRefClient()
      .then((result) => {

          var today = new Date();
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          console.log(result.data.clients)
        if(result.data.clients == 0)
        {
          const count = 0;
          this.client.refClient = 'C' + parseInt(count) + '|'+ mm + '|' + yyyy;

        } else {

          const count = result.data.clients[0].refClient.slice(
                      result.data.clients[0].refClient.indexOf('C') + 1,
                      result.data.clients[0].refClient.lastIndexOf('|'),
          );

            this.client.refClient = 'C' + (parseInt(count) + 1) + '|'+ mm + '|' + yyyy;
        }

      })
      .catch((error) => {
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
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
  margin-left:10px;
}

.formCreation div:nth-child(11) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(12) input {
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
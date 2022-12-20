<template>
  <div class="creationClient">

    <h3>CRÉATION SOUS-TRAITANCE</h3>

    <Traitement :msg="msgSousTraitance" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Raison Sociale de Fournisseur">Raison Sociale de Sous-Traitance</label>
        <input type="text" v-model="sousTraitance.raisonSocial">
      </div>

      <div>
        <label for="Forme juridique">Forme juridique</label>
        <input type="text" v-model="sousTraitance.formJuridique">
      </div>

      <div>
        <label for="Ville">Ville</label>
        <input type="text" v-model="sousTraitance.ville">
      </div>

      <div>
        <label for="Code Postal">Code Postal</label>
        <input type="text" v-model="sousTraitance.codePostal">
      </div>

      <div>
        <label for="Pays">Pays</label>
        <input type="text" v-model="sousTraitance.pays">
      </div>

      <div>
        <label for="Email">Email</label>
        <input type="text" v-model="sousTraitance.email">
      </div>

      <div>
        <label for="Email">ICE</label>
        <input type="email" v-model="sousTraitance.ice">
      </div>

      <div>
        <label for="Téléphone">Téléphone</label>
        <input type="text" v-model="sousTraitance.telephone">
      </div>

      <div>
        <label for="List des missions">Sélectionner le service sous traite</label>
        <select v-model="sousTraitance.service">
          <option v-for="index in services" :key="index.name" :value="index.name"> {{ index.name }}</option>
        </select>
      </div>


      <div>
        <label for="adresse"></label>
        <input type="hidden">
      </div>

      <div>
        <input type="submit" value="Créer un sous-traitance" @click="create()">
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

      countFormInspecteur : 1,
      prenomInspecteur : [],
      nomInspecteur : [],
      traitement : null,
      msgSousTraitance : null,
      sousTraitance: {
              formJuridique : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              telephone : null,
              service: null,
              },
      services : [
                  { name : "Contrôle Technique"},
                  { name : "Contrôle reglementaire" },
                  { name : "Risque aux travaille"},
                  { name : "Environment"},
                  { name : "Assistance"},
                  { name : "Formation"},
                  { name : "Autre"}
      ],
      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },

  methods: {

    quitter() {
          return this.$router.go("/");
    },
    // create Client
    create() {
      Service.createSousTraitance(this.sousTraitance)
      .then((response) => {
          this.traitement = true;
          this.msgSousTraitance = "Veuillez patienter quelques secondes pour enregister";
          if(response) {
              setTimeout(() => {
                  return this.$router.go(this.$router.currentRoute);
              }, 10000)
          }

      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });
    }

  },

  created() {
  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;
}
.formCreation div select {
  height: 40px;
}
#app > div > div > div.menu-content > div.content > div > div > div.formInspecteur {
  width: 100%;
}
#app > div > div > div.menu-content > div.content > div > div > div.formInspecteur div:last-child {
  border-bottom: 2px dashed rgb(255, 0, 0);
  margin-bottom: 10px;
}
#app > div > div > div.menu-content > div.content > div > div > div > .addinspec {
    background-color: rgb(161, 0, 80);
    color: white;
    border: 0;
    margin-top: 20px;
    padding:15px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: 0.4s;
}
#app > div > div > div.menu-content > div.content > div > div > div > .addinspec:hover {
    background-color: rgb(143, 93, 118);
}
#app > div > div > div.menu-content > div.content > div > div > div > .addinspec svg {
 margin-right: 10px;
 font-size: 16px;
}
.formCreation div select {
  height: 40px;
}
#app > div > div > div.menu-content > div.content > div > div > div:last-child > input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}
#app > div > div > div.menu-content > div.content > div > div > div > input[type=submit] {
    background-color: green;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}
.inspeclabel label{
  margin: 10px 0;
  color:rgb(63, 63, 63) !important;
  background-color: #e4e4e4;
  padding:5px;
}
#app > div > div > div.menu-content > div.content > div > h3 {
    padding: 15px;
}


</style>
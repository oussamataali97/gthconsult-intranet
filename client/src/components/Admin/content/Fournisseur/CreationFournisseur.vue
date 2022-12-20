<template>
  <div class="creationClient">

    <h3>CRÉATION UN FOURNISSEUR</h3>

    <Traitement :msg="msgFournisseur" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Raison Sociale de Fournisseur">Raison Sociale de Fournisseur</label>
        <input type="text" v-model="fournisseur.raisonSocial">
      </div>

      <div>
        <label for="Forme juridique">Forme juridique</label>
        <input type="text" v-model="fournisseur.formJuridique">
      </div>

      <div>
        <label for="Ville">Ville</label>
        <input type="text" v-model="fournisseur.ville">
      </div>

      <div>
        <label for="Code Postal">Code Postal</label>
        <input type="text" v-model="fournisseur.codePostal">
      </div>

      <div>
        <label for="Pays">Pays</label>
        <input type="text" v-model="fournisseur.pays">
      </div>

      <div>
        <label for="Email">Email</label>
        <input type="text" v-model="fournisseur.email">
      </div>

      <div>
        <label for="Email">ICE</label>
        <input type="email" v-model="fournisseur.ice">
      </div>

      <div>
        <label for="Téléphone">Téléphone</label>
        <input type="text" v-model="fournisseur.telephone">
      </div>

      <div>
            <label for="List des missions">Activités</label>
            <select v-model="fournisseur.activite"  @change="selectActivite(fournisseur.activite)">
                <option v-for="index in activites" :key="index.name" :value="index.name"> {{ index.name }}</option>
            </select>
      </div>

      <div v-if="flagActivite">
        <label for="Autre Fourniture">Autre Fourniture</label>
        <input type="text" v-model="fournisseur.activite">
      </div>


      <div v-if="flagActivite">
        <input type="hidden">
      </div>

      <div>
        <input type="hidden">
      </div>

      <div>
        <input type="submit" value="Créer un Fournisseur" @click="create()">
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
      flagActivite : false,
      traitement :false,
      msgFournisseur : null,
      fournisseur: {
              raisonSocial : null,
              formJuridique : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              telephone : null,
              activite: null,
      },
      activites : [
                  { name : "Fourniture de bureau" },
                  { name : "Fourniture des equipement bureautique" },
                  { name : "Fourniture des equipement et outils Informatique"},
                  { name : "Fourniture materiel electricité"},
                  { name : "Fourniture des equipement  mecanique"},
                  { name : "Fourniture des equipement de protection de securite L' eps ..."},
                  { name : "Autre Fourniture"}
      ],
      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },

  props : {
    sousTraitanceId : String
  },

  methods: {

    selectActivite(value) {
      if(value == "Autre Fourniture") {
          this.flagActivite = true
      } else {
        this.flagActivite = false
      }
    },

    quitter() {
          return this.$router.go("/");
    },
    // create Client
    create() {
      console.log(this.fournisseur);
      Service.createFournisseur(this.fournisseur)
      .then((response) => {
          this.traitement = true;
          this.msgFournisseur = "Veuillez patienter quelques secondes pour enregister";
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
      })
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
#app > div > div > div.menu-content > div.content > div > div > div > input[type=button] {
    background-color: rgb(3, 0, 161);
    color: white;
    border: 0;
    margin-top: 20px;
    cursor: pointer;
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
#app > div > div > div.menu-content > div.content > div > h3 {
    background-color: #ff0000d4;
    padding: 15px;
}
</style>
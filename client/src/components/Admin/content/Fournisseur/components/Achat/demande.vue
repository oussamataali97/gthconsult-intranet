<template>
  <div class="creationClient">

    <h3>DEMANDE UN ACHAT FOURNISSEUR </h3>

    <Traitement :msg="msgAchatFournisseur" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">


      <div>
        <label for="List des missions">Raison Sociale de Fournisseur</label>
        <select v-model="fournisseurId"  @change="selectFournisseur(fournisseurId)">
          <option v-for="index in fournisseurs" :key="index._id" :value="index._id"> {{ index.raisonSocial }}</option>
        </select>
      </div>

      <div v-if="flagFournisseur">
        <label for="Forme juridique">Forme juridique</label>
        <input type="text" v-model="fournisseur.formJuridique">
      </div>

      <div v-if="flagFournisseur">
        <label for="Ville">Ville</label>
        <input type="text" v-model="fournisseur.ville">
      </div>

      <div v-if="flagFournisseur">
        <label for="Code Postal">Code Postal</label>
        <input type="text" v-model="fournisseur.codePostal">
      </div>

      <div v-if="flagFournisseur">
        <label for="Pays">Pays</label>
        <input type="text" v-model="fournisseur.pays">
      </div>

      <div v-if="flagFournisseur">
        <label for="Email">Email</label>
        <input type="text" v-model="fournisseur.email">
      </div>

      <div v-if="flagFournisseur">
        <label for="Email">ICE</label>
        <input type="email" v-model="fournisseur.ice">
      </div>

      <div v-if="flagFournisseur">
        <label for="Téléphone">Téléphone</label>
        <input type="text" v-model="fournisseur.telephone">
      </div>

      <div v-if="flagFournisseur">
        <label for="Téléphone">Activités</label>
        <input type="text" v-model="fournisseur.activite">
      </div>

      <div v-if="flagFournisseur">
        <label for="Demandeur">Demandeur</label>
        <select v-model="demandeur"  @change="selectDemandeur(demandeur)">
          <option v-for="index in demandeurs" :key="index._id" :value="index._id"> {{ index.nom+" "+index.prenom }}</option>
        </select>
      </div>

      <div v-if="flagFournisseur">
        <label for="Demandeur">Locataire matériel</label>
        <select v-model="materiel"  @change="selectMateriel(materiel)">
          <option v-for="index in materiels" :key="index._id" :value="index._id"> {{ index }}</option>
        </select>
      </div>

      <div v-if="flagFournisseur">
        <label for=" "> </label>
        <input type="hidden">
      </div>


      <div v-if="flagFournisseur">
        <input type="submit" value="Créer un Demande" @click="create()">
      </div>

      <div v-if="flagFournisseur">
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>
import Service from "../../../../../../Service";
import Traitement from "../../../Affaire/Traitement.vue"

export default {
  data() {
    return {
      materiel : null,
      materiels: [],
      demandeur: null,
      demandeurs :[],
      flagFournisseur : false,
      fournisseurs : [],
      fournisseurId : null,
      fournisseur : {
            activite : null,
            codePostal : null,
            date : null,
            email : null,
            formJuridique : null,
            ice : null,
            pays: null,
            raisonSocial : null,
            telephone : null,
            ville : null
      },
      traitement :false,
      msgAchatFournisseur : null,
      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },


  methods: {

    selectDemandeur(value) {
      console.log(value)
    },

    selectFournisseur(value) {
      Service.selectFournisseur(value)
      .then((result) => {
         this.fournisseur = result.data.fournisseur;
         this.flagFournisseur = true;
      })
      .catch((error) => {
        console.log(error);
      });
    },

    quitter() {
          return this.$router.go("/");
    },
    // create Client
    create() {
      Service.createFournisseur(this.fournisseur)
      .then((response) => {
          this.traitement = true;
          this.msgAchatFournisseur = "Veuillez patienter quelques secondes pour enregister";
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
    Service.readFournisseur()
    .then((result) => {
      this.fournisseurs = result.data.fournisseurs;
    })
    .catch((error) => {
        console.log(error);
    });

    Service.readAdmin()
    .then((result) => {
        this.demandeurs = result.data.admins;
    })
    .catch((error) => {
        console.log(error);
    });
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
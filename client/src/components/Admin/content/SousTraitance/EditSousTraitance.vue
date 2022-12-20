<template>
  <div class="creationClient">

    <h3>EDIT SOUS-TRAITANCE</h3>

    <Traitement :msg="msgSousTraitance" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Raison Sociale de Fournisseur">Raison Sociale de Fournisseur</label>
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

      <div class="formInspecteur" v-for="(item, j) in countFormInspecteur" :key="item">

        <div >
          <label for="adresse" >Inspecteur {{ j + 1 }}</label>
        </div>

        <div >
          <label for="adresse" >Prénom de L'inspecteur {{ j + 1 }}</label>
          <input type="text" v-model="sousTraitance.inspecteurPrenom[j]" @change="handelPrenom(j)">
        </div>

        <div>
          <label for="adresse">Nom de L'inspecteur {{ j + 1 }}</label>
          <input type="text" v-model="sousTraitance.inspecteurNom[j]" @change="handelNom(j)">
        </div>

        <div>
          <label for="adresse">Téléphone de L'inspecteur {{ j + 1 }}</label>
          <input type="text" v-model="sousTraitance.inspecteurTelephone[j]" @change="handelTelephone(j)">
        </div>

        <div>
          <label for="adresse">Email de L'inspecteur {{ j + 1 }}</label>
          <input type="text" v-model="sousTraitance.inspecteurEmail[j]" @change="handelEmail(j)">
        </div>

        <div>
          <label for="adresse">Fonction de L'inspecteur {{ j + 1 }}</label>
          <input type="text" v-model="sousTraitance.inspecteurFonction[j]" @change="handelFonction(j)">
        </div>

      </div>

      <br>


      <div>
        <input type="button" value="Ajouter Un autre inspecteur +" @click="ajouterAutreInspecteur()">
      </div>

      <div>
        <input type="button" value="Supprimer Inspecteur -" @click="supprimerAutreInspecteur()">
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
        <input type="submit" value="Modifié un sous-traitance" @click="update()">
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

      countFormInspecteur : 0,
      prenomInspecteur : [],
      nomInspecteur : [],
      traitement : null,
      msgSousTraitance : null,
      sousTraitance: {
              raisonSocial : null,
              formJuridique : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              telephone : null,
              service: null,
              inspecteurPrenom: [],
              inspecteurNom: [],
              inspecteurTelephone: [],
              inspecteurEmail: [],
              inspecteurFonction: []

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

  props : {
    sousTraitanceId : String
  },

  methods: {

    handelPrenom(index) {
      console.log(this.inspecteurPrenom[index]);
    },

    handelNom(index) {
      console.log(this.inspecteurNom[index]);
    },

    handelFonction(index) {
      console.log(this.inspecteurFonction[index]);
    },

    handelTelephone(index) {
      console.log(this.inspecteurTelephone[index]);
    },

    handelEmail(index) {
      console.log(this.inspecteurEmail[index]);
    },

    ajouterAutreInspecteur() {
        this.countFormInspecteur++;
    },

    supprimerAutreInspecteur() {
        this.countFormInspecteur--;
    },

    quitter() {
          return this.$router.go("/");
    },
    // create Client
    update() {
      Service.updateSousTraitance(this.sousTraitance, this.sousTraitanceId)
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


      Service.selectSousTraitance(this.sousTraitanceId)
      .then((response) => {
          this.msgSousTraitance = "Veuillez patienter quelques secondes pour enregister";
            if(response) {
                this.countFormInspecteur = response.data.sousTraitance.inspecteurTelephone.length;
                this.sousTraitance.raisonSocial = response.data.sousTraitance.raisonSocial;
                this.sousTraitance.formJuridique = response.data.sousTraitance.formJuridique;
                this.sousTraitance.ville = response.data.sousTraitance.ville;
                this.sousTraitance.codePostal = response.data.sousTraitance.codePostal;
                this.sousTraitance.pays = response.data.sousTraitance.pays;
                this.sousTraitance.email = response.data.sousTraitance.email;
                this.sousTraitance.ice = response.data.sousTraitance.ice;
                this.sousTraitance.telephone = response.data.sousTraitance.telephone;
                this.sousTraitance.service = response.data.sousTraitance.service;
                this.sousTraitance.inspecteurPrenom = response.data.sousTraitance.inspecteurPrenom;
                this.sousTraitance.inspecteurNom = response.data.sousTraitance.inspecteurNom;
                this.sousTraitance.inspecteurTelephone = response.data.sousTraitance.inspecteurTelephone;
                this.sousTraitance.inspecteurEmail = response.data.sousTraitance.inspecteurEmail;
                this.sousTraitance.inspecteurFonction = response.data.sousTraitance.inspecteurFonction;
            }
      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
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
  padding: 15px;
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
#app > div > div > div.menu-content > div.content > div > div > div > div.formInspecteur {
  width: 100%;
}
#app > div > div > div.menu-content > div.content > div > div > div > div.formInspecteur > div {
  width: 48%;
}
#app > div > div > div.menu-content > div.content > div > div > div:last-child > input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}
#app > div > div > div.menu-content > div.content > div > div > div.formCreation > div > input[type=submit] {
    background-color: green;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}
#app > div > div > div.menu-content > div.content > div > div > div.formCreation > div:last-child > input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}
#app > div > div > div.menu-content > div.content > div > div > div.formCreation > div > input[type=button] {
    background-color: rgb(161, 0, 153);
    color: white;
    border: 0;
    margin-top: 20px;
    cursor: pointer;
    transition: 0.4s;
}

#app > div > div > div.menu-content > div.content > div > div > div.formCreation > div > input[type=button]:hover {
    background-color: rgb(99, 16, 95);

}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}
#app > div > div > div.menu-content > div.content > div > h3 {
    background-color: #ff0000d4;
    padding: 15px;
}
 .addinspec {
    background-color: rgb(161, 0, 80);
    color: white;
    border: 0;
    margin-top: 20px;
    padding:15px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: 0.4s;
}
 .addinspec:hover {
    background-color: rgb(143, 93, 118);
}

</style>
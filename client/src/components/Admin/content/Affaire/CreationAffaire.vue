<template>

  <div class="creationClient">

    <h3>CRÉATION D'UN OFFRE</h3>

    <h3 class="titre-client">Étape 1 Sélectionnez un client : </h3>


    <div class="formCreation">
      <div>
        <label for="Raison sociale">Liste des Clients</label>
        <select v-model="targetClient" @change="selectClientInterlocuteur">
          <option v-for="client in clients" :key="client._id" :value="client._id" > {{ client.raisonSocial }}</option>
        </select>
      </div>

      <div v-if="flagClient == true">
        <label for="adresse">Raison sociale / Nom</label>
        <input type="text" disabled v-model="client.raisonSocial">
      </div>

      <div v-if="flagClient == true">
        <label for="adresse">Adresse</label>
        <input type="text" disabled v-model="client.adresse">
      </div>

      <div v-if="flagClient == true">
        <label for="ville">Ville</label>
        <input type="text" disabled v-model="client.ville">
      </div>

      <div v-if="flagClient == true">
        <label for="codePostal">Code Postal</label>
        <input type="text" disabled v-model="client.codePostal">
      </div>

      <div v-if="flagClient == true">
        <label for="pays">Pays</label>
        <input type="text" disabled v-model="client.pays">
      </div>

      <div v-if="flagClient == true">
        <label for="nom">E-mail</label>
        <input type="text" disabled v-model="client.email">
      </div>

      <div v-if="flagClient == true">
        <label for="nom">ICE</label>
        <input type="text" disabled v-model="client.ice">
      </div>

      <div v-if="flagClient == true">
        <label for="nom">Référence client</label>
        <input type="text" disabled v-model="client.refClient">
      </div>
      <div v-if="flagClient == true">
        <label for="nom"></label>
        <input type="hidden" disabled v-model="client._id">
      </div>
    </div>

    <h3 class="titre-interlocuteur" v-if="flagClient == true"> Étape 2 Sélectionner un interlocuteur : </h3>


    <div class="formCreation">

        <div v-if="flagClient == true">
            <label for="Raison sociale">Liste des Interlocuteurs</label>
            <select v-model="targetInterlocuteur" @change="selectInterlocuteur">
            <option v-for="interlocuteur in interlocuteurs" :key="interlocuteur._id" :value="interlocuteur._id" > {{ interlocuteur.nom + " "+interlocuteur.prenom }}</option>
            </select>
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="nom">Nom</label>
            <input disabled type="text" v-model="interlocuteur.nom">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="adresse">Prénom </label>
            <input disabled type="text" v-model="interlocuteur.prenom">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="ville">E-mail</label>
            <input disabled type="text" v-model="interlocuteur.email">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="codePostal">Fonction</label>
            <input disabled type="text" v-model="interlocuteur.fonction">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="pays">Téléphone</label>
            <input disabled type="text" v-model="interlocuteur.telephone">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="_id"></label>
            <input disabled type="hidden" v-model="interlocuteur._id">
        </div>

        <div v-if="flagInterlocuteur == true">
            <label for="clientId"></label>
            <input disabled type="hidden" v-model="interlocuteur.clientId">
        </div>

    </div>


    <h3  class="titre-interlocuteur" v-if="flagMission == true"> Étape 3 Sélectionner une Mission : </h3>

    <div class="formCreation">

      <div v-if="flagMission == true">
        <label for="Numéro d'affaire">Numéro d'offre</label>
        <input type="text" disabled v-model="mission.numeroAffaire">
      </div>


      <div v-if="flagMission == true">
        <label for="Appareil et accessoir de levage" >Apporteur d'affaire</label>
        <select v-model="mission.apparteurAffaire" @change="handelapparteurAffaire()">
          <option value="jamal ETTARIQI" >Jamal ETTARIQI</option>
          <option value="tarik ADDAOUI" >Tarik ADDAOUI</option>
        </select>
      </div>

      <FormFacture v-for="value in countFacture" :key="value.index" :count="value.index" :clientId="targetClient" :interlocuteurId="targetInterlocuteur" :numAffaire="targetAffaire" @ajouteFacture="handelAjouteFacture(value)" @annuleFacture="handelAnnuleFacture(value)" @addCheckedMission="addCheckedMission" @deleteCheckedMission="deleteCheckedMission"/>


    </div>

    <h3  class="titre-interlocuteur" v-if="countChikedMission >= 1"> Importez Devis : </h3>

    <p v-if="flagEchecMessageAffaire" :class="{ echec: echec }">
      <i class="fa-solid fa-triangle-exclamation"></i> {{ msgAffaire }}
    </p>

    <Traitement :msg="msgAffaire" v-if="traitement == true"/>

    <div class="formCreation" v-if="countChikedMission >= 1">
        <div style="width :100%;">
          <label for="Enregistrer">Importez le fichier svp</label>
          <input  type="file" multiple="multiple" class="form-control" placeholder="Fichier PDF" ref="file" @change="previewFile"/>
          <div class="btns">
          <button @click="enregitreAffaire()" class="save"><i class="fa-solid fa-download" ></i> Enregistrer L'affaire</button>
          <button @click="annulerAffaire(targetAffaire)" class="anulate"><i class="fa-solid fa-rectangle-xmark"></i> Annuler L'affaire</button>
        </div>
        </div>
    </div>



  </div>
</template>

<script>

import Service from "../../../../Service";
import FormFacture from "./FormFacture";
import Traitement from "./Traitement.vue";

export default {
  data() {
    return {
    traitement :false,
    flagEchecMessageAffaire : false,
    msgAffaire : null,
    targetAffaire : null,
    targetClient : null,
    targetInterlocuteur: null,
    targetEquipement : null,
    client: {
              raisonSocial : null,
              adresse : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              refClient : null,
              _id : null
      },
      interlocuteur: {
              nom : null,
              prenom : null,
              email : null,
              codePostal : null,
              fonction : null,
              telephone : null,
              clientId : null,
              _id: null
      },
      mission: {
              codeMission : null,
              apparteurAffaire : null,
              typeMission : null,
              ht : null,
              tva : null,
              qte : null,
              prix : null,
              numeroAffaire : null,
      },
      affaire : {
          numeroAffaire : null,
          apporteurAffaire : null,
          bonCommande : null,
          renseignerIntervention: null,
          importRapport: null
      },
      countFacture: [],
      facture : {
        prestation : [],
        u : [],
        qte : [],
        prixHT : []
      },
      clients: [],
      interlocuteurs: [],
      succes: false,
      echec: false,
      error : null,
      flagClient : false,
      flagMission : false,
      flagInterlocuteur: false,
      countChikedMission : 0
    };
  },
 components: {
    FormFacture,
    Traitement
 },

methods: {

// preciew file
 previewFile() {
        this.file = this.$refs.file.files[0];
 },

// Delete all mission befor create affaire
 annulerAffaire(value) {
  Service.AnnulerAffaireAfterCreateMission(value)
  .then((result) => {
    if(result) {
        this.$router.go(this.$router.currentRoute);
    }
  })
  .catch((error) => {
      console.log(error);
  });

 },

// Enregistre Affaire
 enregitreAffaire() {
        // assign value Apporteur Affaire
        this.affaire.apporteurAffaire = this.mission.apparteurAffaire;
        Service.createAffaire(this.file, this.mission.numeroAffaire, this.affaire.apporteurAffaire, this.targetClient, this.targetInterlocuteur)
        .then(() => {
            this.msgAffaire = "Veuillez patienter quelques secondes pour terminer le processus"
            this.traitement = true;
            setTimeout(() => {
                  this.$router.go(this.$router.currentRoute);
            }, 20000);
        })
        .catch((error) => {
           this.flagEchecMessageAffaire = true;
            this.echec = true;
           this.msgAffaire = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
          });
},

// add checked count mission
addCheckedMission(value) {
      if(value == true) {
        this.countChikedMission++
      }
},


// delete checked count mission
deleteCheckedMission(value) {
      if(value == true) {
        this.countChikedMission--
      }
},

//Create Client
create() {
      Service.createClient(this.client)
      .then(() => {
          this.succes = true;
          setTimeout(() => {
              this.succes = false;
              return this.$router.go(this.$router.currentRoute)

          }, 5000)
      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
},

//Select Client Info plus Interlocuteurs client
selectClientInterlocuteur() {
            this.flagClient = true
            // get  one client
            Service.selectClientInterlocuteur(this.targetClient)
            .then((result) => {
               // Get Client
               this.client = result.data.client;
               // Get Interlocuteurs with client
               this.interlocuteurs = result.data.interlocuteurs;

               if(result) {

                     // get last Numero d' affaire

                      Service.getLastRefAffaireORLastRefRapport()
                      .then(async (result) => {

                          var today = new Date();
                          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                          var yyyy = today.getFullYear();


                        const count = result.data.lastRef[0].LastAffaire.slice(
                            result.data.lastRef[0].LastAffaire.indexOf('G') + 1,
                            result.data.lastRef[0].LastAffaire.lastIndexOf('|'),
                          );

                        this.mission.numeroAffaire = 'G'+ (parseInt(count) + 1) + '|' + mm + '|' + yyyy + '|'+ this.client.raisonSocial;
                        this.targetAffaire = this.mission.numeroAffaire;

                      })
                      .catch((error) => {
                            this.error = error.message;
                            console.error(`HTTP error: ${error.name} => ${error.message}`);
                            throw "fail request at: GET /refreshtime";
                      });
               }

            })
            .catch((error) => {
                this.error = error.message;
                console.error(`HTTP error: ${error.name} => ${error.message}`);
                throw "fail request at: GET /refreshtime";
            });

    },

selectInterlocuteur() {

            this.flagInterlocuteur =  true;
            this.flagMission = true;

            Service.getInterlocuteur(this.targetInterlocuteur)
            .then((result) => {
                this.interlocuteur = result.data.interlocuteur;
            })
            .catch((error) => {
                this.error = error.message;
                console.error(`HTTP error: ${error.name} => ${error.message}`);
                throw "fail request at: GET /refreshtime";
            });
    },

    handelapparteurAffaire() {
      if(this.countFacture.length == 0)
      {
          this.countFacture.push({ index: 0});
      }
    },


    handelAjouteFacture() {
        this.countFacture.push({ index: this.countFacture.length});
    },

    handelAnnuleFacture(value) {
        this.countFacture.splice(value, 1);
    }


  },

  created(){
    // get  all client
    Service.readClient()
    .then(async (result) => {
      this.clients = await result.data.clients;
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
  align-items: flex-start;
}

.creationClient h3:nth-child(1) {
  width: 100%;
  height: fit-content;
  padding: 5px;

  color: white;
  background-color: #243064;
  text-align: center;

}
.creationClient .titre-client {
    width: fit-content;
    height: fit-content;
    padding: 5px;
    color: white;
    background-color: #cf1f21;

}
.creationClient .titre-interlocuteur {
    width: fit-content;
    height: fit-content;
    padding: 5px;
    color: white;
    background-color: #cf1f21;

}
.succes {
  background-color: #69cd5b;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.echec {
  background-color: rgb(255, 91, 91);
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
  margin:10px 0;
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



.form-control {
    display: block;

    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.form-control::-webkit-file-upload-button {
    padding: 10px;
    margin: -.375rem -.75rem;
    -webkit-margin-end: .75rem;
    margin-inline-end: .75rem;
    color: rgb(58, 58, 58);
    font-weight: 600;
    background-color: #e9e9e9;
    pointer-events: none;
    border:0;

    -webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
}




.enregitreAffaire1 {
  background-color: green;
  width:50%;
  border:0 !important;
  cursor: pointer;
  color:white;

}

.enregitreAffaire2 {
  background-color: rgb(226, 17, 17);
  width:50%;
  border:0 !important;
  cursor: pointer;
  color:white;

}




#app > div > div > div.menu-content > div.content > div > div:nth-child(9) > div > input.enregitreAffaire {
  font-weight: bold;
  border: 0;
  border-radius: 10px;
  font-size: 18px;
}

#app > div > div > div.menu-content > div.content > div > h3:nth-child(1) {
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin:0;

    color: white;
    background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 25px;
}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}




.save{
  background-color: rgb(33, 146, 33);
  color: white;
  border: 0 !important;
  cursor: pointer;
  padding:15px;
  transition: 0.3s;
  font-size: 16px;
}

.save:hover{
  background-color: rgb(17, 94, 17);
  border-radius: 30px;
  letter-spacing: 2px;

}

.anulate:hover{
  background-color: rgb(110, 13, 13);
  border-radius: 30px;
  letter-spacing: 2px;

}
.anulate{
  background-color: rgb(201, 30, 30);
  color: white;
  border: 0 !important;
  cursor: pointer;
  padding:15px;
  transition: 0.3s;

  font-size: 16px;



}

.btns{
  width: 100% !important;
  display: grid !important;
  grid-template-columns: repeat(2,1fr);
  gap:10px;
  margin-top: 15px;
}



</style>
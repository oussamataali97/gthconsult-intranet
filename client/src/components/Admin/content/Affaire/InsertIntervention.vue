<template>
  <div class="creationClient">

    <h3><i class="fa-regular fa-file-lines"></i> CRÉATION UNE FICHE INTERVENTION</h3>

    <!-- <p v-if="succes" :class="{ succes: succes }">
        Le client a été enregistré avec succès, Veuillez patienter quelques secondes pour enregistrer le client.
    </p>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p> -->




    <h3 class="titre-client">Informations client : </h3>

    <div class="formCreation">

      <div>
        <label for="adresse">Raison sociale / Nom</label>
        <input type="text" disabled v-model="client.raisonSocial">
      </div>
      <div>
        <label for="adresse">Adresse</label>
        <input type="text" disabled v-model="client.adresse">
      </div>

      <div>
        <label for="ville">Ville</label>
        <input type="text" disabled v-model="client.ville">
      </div>

      <div>
        <label for="codePostal">Code Postal</label>
        <input type="text" disabled v-model="client.codePostal">
      </div>

      <div>
        <label for="pays">Pays</label>
        <input type="text" disabled v-model="client.pays">
      </div>


      <div>
        <label for="nom">Référence client</label>
        <input type="text" disabled v-model="client.refClient">
      </div>

    </div>


    <h3 class="titre-interlocuteur"> Informations d' affaire : </h3>

    <div class="formCreation">

        <div>
            <label for="nom">Numéro d'affaire</label>
            <input disabled type="text" v-model="affaire.numeroAffaire">
        </div>

    </div>

    <h3 class="titre-interlocuteur"> Informations des missions : </h3>

    <div class="formCreation">

        <div>
            <label for="nom">Liste des Missions</label>
            <input v-for="mission in missions" :key="mission._id" disabled type="text" v-model="mission.typeMission">
        </div>

    </div>


    <h3 class="titre-interlocuteur"> Informations de Interlocuteur : </h3>

    <div class="formCreation">

        <div>
            <label for="nom">Nom</label>
            <input disabled type="text" v-model="interlocuteur.nom">
        </div>

        <div>
            <label for="adresse">Prénom </label>
            <input disabled type="text" v-model="interlocuteur.prenom">
        </div>

        <div>
            <label for="pays">Téléphone</label>
            <input disabled type="text" v-model="interlocuteur.telephone">
        </div>

    </div>


    <h3 class="titre-interlocuteur"> Chargé d’affaire : </h3>

    <div class="formCreation">

        <div>
            <label for="nom">Prénom et Nom</label>
            <input disabled type="text" v-model="chargeAffaire">
        </div>
    </div>

    <h3 class="titre-interlocuteur"> Inspecteur(s) : </h3>

    <div class="formCreation">

        <div>
        <select v-model="inspecteur" @change="handelInspecteur()">
          <option value="jamal ETTARIQI" >Jamal ETTARIQI</option>
          <option value="tarik ADDAOUI" >Tarik ADDIOUI</option>
          <option value="houda SAMIH" >Houda SAMIH</option>
          <option value="hassan EL BAKKALI" >Hassan EL BAKKALI</option>
          <option value="Autre" placeholder="Autre">Autre</option>
        </select>
        </div>

        <div v-if="flagAutreInspecteur == true">
            <input type="text" v-model="inspecteur" placeholder="  Entrez ici votre nom et prénom Inspecteur S.V.P">
        </div>
    </div>
    <h3 class="titre-interlocuteur"> Les date(s) d'interventions : </h3>

    <div class="formCreation">
        <div>
            <label for="DE">DE</label>
            <input type="date" v-model="deDate">
        </div>
        <div>
            <label for="À">À</label>
            <input type="date" v-model="aDate">
        </div>
    </div>

    <h3 class="titre-interlocuteur"> Les commentaire(s) : </h3>

    <div class="formCreation">

        <div>
          <label for="À">Commentaire</label>
            <textarea v-model="commentaire" ></textarea>
        </div>
    </div>

    <Traitement :msg="msgIntervention" v-if="traitement == true"/>

    <div class="enregistre">
              <input type="submit" value="Enregistrer" @click="enregistreIntervention()">
    </div>


  </div>
</template>

<script>
import Service from "../../../../Service";
import Traitement from "./Traitement.vue";

export default {
    props: {
      affaireId: String,
    },
    data() {
        return {
            traitement : false,
            msgIntervention : null,
            flagAutreInspecteur : false,
            deDate: null,
            aDate: null,
            commentaire : null,
            inspecteur :null,
            chargeAffaire: null,
            missions: [],
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
            intervention :  {
                  nameInterlocuteur : null,
                  telephoneInterlocuteur : null,
                  raisonSocial : null,
                  adresseClient : null,
                  commentaire: null,
                  deDate: null,
                  aDate: null,
                  nameInspecteur: null,
                  chargeAffaire: null,
                  missions: null,
                  interlocuteurId: null,
                  clientId: null,
                  numeroAffaire : null
            }
    };
},

 components: {
    Traitement
 },

methods: {
  enregistreIntervention() {

                  this.intervention.affaireId = this.affaireId,
                  this.intervention.commentaire = this.commentaire,
                  this.intervention.refClient = this.client.refClient,
                  this.intervention.deDate =  this.deDate,
                  this.intervention.aDate =  this.aDate,
                  this.intervention.nameInspecteur =  this.inspecteur,
                  this.intervention.chargeAffaire =  this.chargeAffaire,
                  this.intervention.missions =  this.missions,
                  this.intervention.interlocuteurId =  this.interlocuteur._id,
                  this.intervention.clientId =  this.client._id,
                  this.intervention.numeroAffaire  =  this.affaire.numeroAffaire,
                  this.intervention.nameInterlocuteur  =  this.interlocuteur.nom + " "+ this.interlocuteur.prenom,
                  this.intervention.telephoneInterlocuteur  =  this.interlocuteur.telephone,
                  this.intervention.adresseClient  =  this.client.adresse +","+ this.client.ville +" "+ this.client.codePostal +" "+ this.client.pays,
                  this.intervention.raisonSocial  =  this.client.raisonSocial,

    Service.enregistreIntervention(this.intervention)
    .then(() => {

        this.msgIntervention = "Veuillez patienter quelques secondes pour terminer le processus.";
        this.traitement = true;
        setTimeout(()=> {
              this.$router.go(this.$router.currentRoute);
        },10000)
    })
    .catch((err) => {
      console.log(err);
    })

  },
    handelInspecteur() {
      if(this.inspecteur == "Autre")
      {
              this.inspecteur = ""
              this.flagAutreInspecteur = true;
      } else {
        this.flagAutreInspecteur = false;
      }
    }
},
created() {



    Service.getAffaireById(this.affaireId)
    .then((result) => {
        this.affaire = result.data.affaire;
        this.chargeAffaire = result.data.affaire.apporteurAffaire;
        Service.getMission(result.data.affaire.numeroAffaire)
        .then((result) => {
              result.data.missions.forEach(element => {
                this.missions.push(element);
              });

              Service.selectClient(result.data.missions[0].clientId)
              .then((result) => {
                this.client = result.data.client;
              })
              .catch((error) => {
                console.log(error.msg);
              });

              Service.getInterlocuteur(result.data.missions[0].interlocuteurId)
              .then((result) => {
                this.interlocuteur = result.data.interlocuteur;
              })
              .catch((error) => {
                console.log(error.msg);
              });
        })
        .catch((error) => {
             console.log(error.msg)
        })
    })
    .catch((error) => {
        console.log(error.msg)
    })
}

}
</script>

<style scoped>


.creationClient {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 3px;
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
    color: rgb(39, 39, 39);
    width: 100%;
    text-align: center;
    background-color: #d6d6d6;


}
.creationClient .titre-interlocuteur {
  width: fit-content;
    height: fit-content;
    padding: 5px;
    color: rgb(39, 39, 39);
    width: 100%;
    text-align: center;
    background-color: #dddddd;

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
  color :#383838;
}
.formCreation div input {
  height: 40px;
  margin-bottom: 5px;
  border: 1px solid #696969;
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


hr {
  width: 100%;
  background-color: black;
  height: 10px;
}
.enregitreAffaire {
  background-color: green;
  color: white;
  cursor: pointer;
}
.file {
  background-color: white;
  color: black;
  cursor: pointer;
}
.file button{
  background-color: white;
  color: black;
  cursor: pointer;
}

.enregistre {
width: 100%;
 display: flex;
 justify-content: center;
}



.enregistre input {
  height: 40px;
  width: 50%;
  margin:10px auto;
  background-color: green;
  color: white;
  border: 0;
  cursor: pointer;
}





#app > div > div > div.menu-content > div.content > div > div > h3:nth-child(1) {
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin:0;

    color: white;
    background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
    margin-bottom: 10px;
    padding: 15px;
    font-size: 25px;
}

textarea{
  padding:5px;
  font-size: 17px;
}

textarea:focus-within{
border:0;
outline:1px solid red;
}

</style>
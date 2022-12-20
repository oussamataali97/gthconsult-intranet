<template>
  <div class="creationClient">

    <h3><i class="fa-solid fa-receipt"></i> Création Facture</h3>

    <h3 class="titre-client">DATE BORDEREAU D'ENVOI : </h3>

    <div class="formCreation">
      <div>
        <input type="text" disabled v-model="facture.dateCreation">
      </div>
    </div>



    <h3 class="titre-client">REFERENCE AFFAIRE : </h3>

    <div class="formCreation">




      <div>
        <label for="adresse">Réf. Client</label>
        <input type="text" disabled v-model="facture.refClient">
      </div>

      <div>
        <label for="adresse">N°. Affaire</label>
        <input type="text" disabled v-model="facture.numeroAffaire">
      </div>


      <div>
        <label for="ville">Libellée – Mission</label>
        <input v-for="mission in facture.missions" :key="mission._id" disabled type="text" v-model="mission.codeMission">
      </div>

      <div>
        <label for="adresse"></label>
        <input type="hidden" disabled v-model="facture.affaireId">
      </div>

    </div>


    <h3 class="titre-interlocuteur"> FACTURE N°:  {{ facture.numeroFACTURE }}  </h3>

    <div class="formCreation">
        <div>
            <label for="nom">Facturation</label>
            <input  type="date" v-model="facture.facturation">
        </div>

        <div>
            <label for="nom">Echéance</label>
            <input  type="date" v-model="facture.echeance">
        </div>

    </div>

    <div class="formCreation">
        <div>
            <label for="nom">Nom & RaisonSociale</label>
            <input disabled type="text" v-model="facture.raisonSocial">
        </div>

        <div>
            <label for="nom">Adresse</label>
            <input disabled type="text" v-model="facture.adresse">
        </div>

        <div>
            <label for="nom">Téléphone</label>
            <input disabled type="text" v-model="facture.telephone">
        </div>

        <div>
            <label for="nom">Adresse d’Envoie</label>
            <input type="text" v-model="facture.adresseEnvoi">
        </div>

        <div>
            <label for="nom">N° du BC de Client :</label>
            <input disabled type="text" v-model="facture.numeroBC">
        </div>

        <div>
            <label for="nom">N° ICE</label>
            <input disabled type="text" v-model="facture.numeroICE">
        </div>

    </div>

    <h3 class="titre-interlocuteur"> Informations des missions : </h3>



 <table id="inspecteurs">
              <tr>
                <th>N°</th>
                <th>DESIGNATION</th>
                <th>UNITE</th>
                <th>QUANTITE</th>
                <th>PRIX UNITAIRE HT</th>
                <th>PRIX TOTAL TTC</th>
                <th>DEVIS</th>

              </tr>
              <tr v-for="(mission, index) in facture.missions" :key="mission._id">

                <td>
                  <ul>
                    <li>{{ index + 1 }}</li>
                    <li></li>
                  </ul>
                </td>

                <td>
                  <ul>
                    <li> {{ mission.typeMission }}</li>
                    <li v-for="(item, i) in mission.equipement" :key="i"> ----> {{ item.titre }}</li>
                  </ul>
                </td>

                <td>
                  <ul>
                    <li>1/Unite</li>
                    <li></li>
                  </ul>

                </td>

                <td>
                  <ul>
                    <li>ㅤ</li>
                    <li v-for="(item, i) in mission.equipement" :key="i">{{ item.quantite }}</li>
                  </ul>
                </td>

                <td>
                  <ul>
                    <li>{{ mission.prix }} </li>

                  </ul>

                </td>

                <td>
                  <ul>
                    <li>{{ mission.prix + (mission.prix * 20)/100 }} </li>
                    <li></li>
                  </ul>

                </td>

                <td>
                  <ul>
                    <li>{{ mission.devis }}</li>
                    <li></li>
                  </ul>
                </td>


              </tr>
            </table>

        <table id="inspecteurs" class="synthese">

              <tr>
                <th colspan="2">SYNTHESE</th>
              </tr>

              <tr>
                <td>
                    PRIX TOTAL HT
                </td>
                <td>
                    <input type="text" disabled v-model="facture.prixTotalHT">
                </td>
              </tr>

              <tr>
                <td>
                    TVA à 20%
                </td>
                <td>
                    <input type="text" disabled v-model="facture.tva">
                </td>
              </tr>

              <tr>
                <td>
                   PRIX TOTAL TTC
                </td>
                <td>
                    <input type="text" disabled v-model="facture.prixTotalTTC">
                </td>
              </tr>

              <tr>
                <td>
                   ARRETEE LA PRESENTE FACTURE A LA SOMME DE :
                </td>
                <td>
                    <input type="text" v-model="facture.prixLettre">
                </td>
              </tr>

            </table>

        <Traitement :msg="msgFacture" v-if="traitement == true"/>

    <div class="enregistre">
      <button @click="enregistreFACTURE()"><i class="fa-solid fa-download"></i> Enregistrer</button>
    </div>


  </div>
</template>

<script>
import Service from "../../../../Service";
import Traitement from "./Traitement.vue";

export default {
    props: {
      numeroAffaire: String,
    },

    components: {
        Traitement
    },

    data() {
        return {
            msgFacture : null,
            traitement  : false,
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
                importRapport: null,
                be :null,
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
            },

            facture : {
                numeroFACTURE: null,
                refClient : null,
                numeroAffaire : null,
                missions : [],
                facturation : null,
                echeance : null,
                raisonSocial : null,
                adresse : null,
                telephone : null,
                adresseEnvoi : null,
                numeroBC : null,
                numeroICE : null,
                dateCreation : null,
                affaireId : null,
                tva: 0,
                prixTotalHT: 0,
                prixTotalTTC: 0,
                prixLettre: null,
            }
    };
},

methods: {

    enregistreFACTURE() {
      this.traitement = !this.traitement;
      this.msgFacture = "Veuillez patienter quelques secondes pour terminer le processus, Facture a été enregistré avec succès";

      Service.enregistreFACTURE(this.facture)
      .then(() => {
            setTimeout(() => {
              this.$router.go(this.$router.currentRoute);
            }, 10000);

      })
      .catch((err) => {
        console.log(err)
      });
    }

},

created() {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      const numberFacture = 46
      this.facture.dateCreation = `Le ${dd}-${mm}-${yyyy}`;

    // Get last Numero BD
    Service.getLastFACTURE()
    .then((result) => {

        if(result.data.factures.length == 0) {
           this.facture.numeroFACTURE = `FA${numberFacture}|${mm}|${yyyy}`;

        } else {

          const count = result.data.factures[0].numeroFACTURE.slice(
                  result.data.factures[0].numeroFACTURE.indexOf('A') + 1,
                  result.data.factures[0].numeroFACTURE.lastIndexOf('|'),
          );

          this.facture.numeroFACTURE = 'FA' + (parseInt(count) + 1) +'|'+ mm + '|' + yyyy;

        }
    })
    .catch((err) => {
        console.log(err);
    });
    ///get Affaire specfique
    Service.getAffaireById(this.numeroAffaire)
    .then((result) => {

        // info affaire
        this.affaire = result.data.affaire;
        this.facture.numeroAffaire = result.data.affaire.numeroAffaire;
        this.facture.affaireId = result.data.affaire._id;
        this.facture.numeroBC = result.data.affaire.numeroBonCommande;
        this.chargeAffaire = result.data.affaire.apporteurAffaire;

        // info missions
        Service.getMission(result.data.affaire.numeroAffaire)
        .then((result) => {
              result.data.missions.forEach(element => {
                this.missions.push(element);
              });

              result.data.missions.forEach(element => {
                this.facture.missions.push(element);
                this.facture.prixTotalHT = this.facture.prixTotalHT + element.prix;
              });

              this.facture.prixTotalTTC = this.facture.prixTotalHT + ((this.facture.prixTotalHT * 20)/100);
              this.facture.tva = 20;

              Service.selectClient(result.data.missions[0].clientId)
              .then((result) => {

                // info client
                this.client = result.data.client;
                this.facture.refClient = result.data.client.refClient
                this.facture.raisonSocial = result.data.client.raisonSocial;
                this.facture.adresse = result.data.client.adresse + ", " + result.data.client.codePostal +"  "+ result.data.client.ville +"  "+ result.data.client.pays;
                this.facture.telephone = result.data.client.telephone;
                this.facture.adresseEnvoi = result.data.client.adresse + ", " + result.data.client.codePostal +"  "+ result.data.client.ville +"  "+ result.data.client.pays;
                this.facture.numeroICE = result.data.client.ice;

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
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.creationClient h3:nth-child(1) {
  width: 100%;

  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;
  padding: 15px;

}
.creationClient .titre-client {
    width: fit-content;
    height: fit-content;
    padding: 5px;
    margin: 10px 0;
    color: rgb(41, 41, 41);
    text-align: center;
    width: 100%;
    background-color: #dadada;

}
.creationClient .titre-interlocuteur {
  width: fit-content;
    height: fit-content;
    padding: 5px;
    margin: 10px 0;
    color: rgb(41, 41, 41);
    text-align: center;
    width: 100%;
    background-color: #dadada;


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
  border: 1px solid #a0a0a0;
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

.enregistre button {
  margin-top: 30px;
  background-color: rgb(2, 168, 24);
  width: 100%;
  border:0;
  padding:15px;
  color:white;
  cursor: pointer;
}

.enregistre {
width: 100%;
}


table  {
  width: 100%;
  border-collapse: collapse;
  margin:10px 0;
  font-weight: 500;
}
table tr  {
  width: 100%;
}
table tr th {
    background-color: #01a1d1;
    color: white;
    padding: 10px 5px;
    border-right: 1px solid white;
}

table input:focus-within{
  outline:0;
  border:1px solid red;
}

table tr td {
    background-color: rgb(255, 255, 255);
    color: black;
    border-bottom: 1px solid rgb(197, 197, 197);
    padding: 5px;
}
table tr td {
  cursor: pointer;
}

table tr td a {
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}


.synthese tr td {
    width: 50%;
}
.synthese tr td {
    height: 50px;
}
.synthese tr td input {
    width: 100%;

    padding:10px;
}



</style>
<template>
  <div class="creationClient">


    <h3><i class="fa-solid fa-receipt"></i> Création Bordereau d'envoi</h3>

    <h3 class="titre-client">DATE BORDEREAU D'ENVOI : </h3>

    <div class="formCreation">
      <div>
        <input type="text" disabled v-model="bd.dateCreation">
      </div>
    </div>



    <h3 class="titre-client">REFERENCE AFFAIRE : </h3>

    <div class="formCreation">




      <div>
        <label for="adresse">Réf. Client</label>
        <input type="text" disabled v-model="bd.refClient">
      </div>

      <div>
        <label for="adresse">N°. Affaire</label>
        <input type="text" disabled v-model="bd.numeroAffaire">
      </div>


      <div>
        <label for="ville">Libellée – Mission</label>
        <input v-for="mission in bd.missions" :key="mission._id" disabled type="text" v-model="mission.codeMission">
      </div>

      <div>
        <label for="adresse"></label>
        <input type="hidden" disabled v-model="bd.affaireId">
      </div>

    </div>


    <h3 class="titre-interlocuteur"> BORDEREAU D’ENVOI N°:  {{ bd.numeroBD }}  </h3>

    <div class="formCreation">
        <div>
            <label for="nom">Date d'envoi</label>
            <input  type="date" v-model="bd.dateEnvoi">
        </div>

        <div>
            <label for="nom">Date Reçu</label>
            <input  type="date" v-model="bd.dateRecu">
        </div>

    </div>

    <div class="formCreation">
        <div>
            <label for="nom">Nom & RaisonSociale</label>
            <input disabled type="text" v-model="bd.raisonSocial">
        </div>

        <div>
            <label for="nom">Adresse</label>
            <input disabled type="text" v-model="bd.adresse">
        </div>

        <div>
            <label for="nom">Téléphone</label>
            <input disabled type="text" v-model="bd.telephone">
        </div>

        <div>
            <label for="nom">Adresse d’Envoie</label>
            <input type="text" v-model="bd.adresseEnvoi">
        </div>

        <div>
            <label for="nom">N° du Bon Commande de Client :</label>
            <input disabled type="text" v-model="bd.numeroBC">
        </div>

        <div>
            <label for="nom">N° ICE</label>
            <input disabled type="text" v-model="bd.numeroICE">
        </div>

    </div>

    <h3 class="titre-interlocuteur"> Informations des missions : </h3>



 <table id="inspecteurs">
              <tr>
                <th>N°</th>
                <th>DESIGNATION</th>
                <th>Quantité</th>

              </tr>
              <tr v-for="(mission, index) in bd.missions" :key="mission._id">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                    <ul>
                        <li>
                            <p>{{ mission.typeMission }}</p>
                            <ul v-for="t in  mission.equipement" :key="t">
                                <li><i class="fa-solid fa-chevron-right"></i> {{ t.titre }}</li>
                            </ul>
                        </li>
                    </ul>
                </td>

                <td>
                    <ul>
                        <li>
                            <p>ㅤ</p>
                            <ul v-for="q in  mission.qte" :key="q">
                                <li> {{ q }}</li>
                            </ul>
                        </li>
                    </ul>
                </td>

              </tr>
            </table>

    <Traitement :msg="msgBD" v-if="traitement == true"/>
    <div class="enregistre">
        <button @click="enregistreBD()"><i class="fa-solid fa-download"></i> Enregistrer</button>

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
            traitement : false,
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

            bd : {

                numeroBD: null,
                refClient : null,
                numeroAffaire : null,
                missions : [],
                dateEnvoi : null,
                dateRecu : null,
                raisonSocial : null,
                adresse : null,
                telephone : null,
                adresseEnvoi : null,
                numeroBC : null,
                numeroICE : null,
                dateCreation : null,
                affaireId : null
            }
    };
},

methods: {
enregistreBD() {

    this.traitement = true;
    this.msgBD = "veuillez patienter quelques secondes pour terminer le processus.";

  Service.enregistreBD(this.bd)
  .then(() => {
      setTimeout(() => {
                this.$router.go(this.$router.currentRoute);
      }, 10000);
  })
  .catch((err) => {
    console.log(err)
  })
}

},

created() {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var numberBC = 211

      this.bd.dateCreation = `Le ${dd}-${mm}-${yyyy}`;

    // Get last Numero BD
    Service.getLastBD()
    .then((result) => {
        if(result.data.bordereaus.length == 0) {
           this.bd.numeroBD = `BE${numberBC}|${mm}|${yyyy}`;

        } else {

            // get count
            const count = result.data.bordereaus[0].numeroBD.slice(
                result.data.bordereaus[0].numeroBD.indexOf('E') + 1,
                result.data.bordereaus[0].numeroBD.lastIndexOf('|'),
            );

            this.bd.numeroBD = `BE${(parseInt(count) + 1)}|${mm}|${yyyy}`;
        }
    })
    .catch((err) => {
        console.log(err);
    });
    //////////////////////
    Service.getAffaireById(this.numeroAffaire)
    .then((result) => {
        this.affaire = result.data.affaire;


        this.bd.numeroAffaire = result.data.affaire.numeroAffaire;
        this.bd.affaireId = result.data.affaire._id;
        this.bd.numeroBC = result.data.affaire.numeroBonCommande;



        this.chargeAffaire = result.data.affaire.apporteurAffaire;
        Service.getMission(result.data.affaire.numeroAffaire)
        .then((result) => {
              result.data.missions.forEach(element => {
                this.missions.push(element);
              });

              result.data.missions.forEach(element => {
                this.bd.missions.push(element);
              });


              Service.selectClient(result.data.missions[0].clientId)
              .then((result) => {
                this.client = result.data.client;


                this.bd.refClient = result.data.client.refClient
                this.bd.raisonSocial = result.data.client.raisonSocial;
                this.bd.adresse = result.data.client.adresse + ", " + result.data.client.codePostal +"  "+ result.data.client.ville +"  "+ result.data.client.pays;
                this.bd.telephone = result.data.client.telephone;
                this.bd.adresseEnvoi = result.data.client.adresse + ", " + result.data.client.codePostal +"  "+ result.data.client.ville +"  "+ result.data.client.pays;
                this.bd.numeroICE = result.data.client.ice;

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
  padding: 10px;
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
  margin-left:10px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#272727;
}
.formCreation div input {
  height: 40px;
  margin-left:10px;
  margin-bottom: 5px;
  border: 1px solid #243064;
  padding:5px;
}.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}

svg{
  font-size: 14px;
}

.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}


.formCreation div select {
  height: 40px;
  margin-left:10px;
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

table{
  border-collapse: separate;
}

.enregistre {
  width: 100%;
  display: flex;
  justify-content: center;

}

.enregistre button {
  height: 40px;
  width: 500px;
  background-color: green;
  color: white;
  border: 0;
  cursor: pointer;
  margin: 20px 0;

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

table tr td {
    color: black;
    border-bottom: 1px solid rgb(184, 184, 184);
    padding:3px 0;

}

table tr:nth-child(even) {
  background-color: #f5f5f5;

}


table tr td {
  cursor: pointer;
}
td ul li ul li {
  padding: 2px;
}


td:not(:nth-child(3)) ul li ul li {
margin-left: 20px;
}

table tr td a {
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}



</style>
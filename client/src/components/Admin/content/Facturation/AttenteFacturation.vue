<template>
    <div class="gestionInspecteur"  >

      <h3 v-if="flagImportFacture == false">En Attente Facturation</h3>
      <div v-if="flagImportFacture == false" class="rechercher-table">


            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un affaire avec Facture Client">
            </div>

            <p v-if="flagMsgBonCommande & succes == true" :class="{ succes: succes }">
                {{ msgBonCommande }}
            </p>

              <p v-if="flagMsgBonCommande && echec == true" :class="{ echec: echec }">
                  {{ msgBonCommande }}
              </p>

            <div class="uplode" v-if="flagUplodeBonCammnade == true">
                <input type="file" multiple="multiple" class="file" placeholder="Fichier PDF" ref="file" @change="previewFile">
                <input type="submit" v-if="flagPreviewUplodeBonCammnade == true" value="Importer fichier" @click="enregitreBonCommande()">
            </div>

            <table id="inspecteurs">
              <tr>
                <th>  </th>
                <th>Date</th>
                <th>Numéro d'affaire</th>
                <th>Réf Client</th>
                <th>Raison sociale </th>
                <th>mission</th>
                <th>Actions</th>
                <th colspan="7">Status</th>

              </tr>
              <tr v-for="(affaire, i) in filterAffaires" :key="affaire._id">

                <td>
                  <input type="checkbox" :value="affaire._id" v-model="checkedClients" style="width: 20px;">
                </td>

                <td>{{  new Date(affaire.date).toLocaleDateString() }}</td>

                <td>{{ affaire.numeroAffaire }}</td>

                <td>
                    <p v-for="(client, index) in clients" :key="index">{{ affaire.numeroAffaire.substr(13) == client.raisonSocial  ? client.refClient : '' }}</p>
                </td>

                <td>
                     <p v-for="(client, index) in clients" :key="index">{{ affaire.numeroAffaire.substr(13) == client.raisonSocial  ? client.raisonSocial : '' }}</p>
                </td>

                <td v-if="affaire.numeroAffaire">
                    <p v-for="(mission, index) in missions" :key="index"> {{ mission.numeroAffaire == affaire.numeroAffaire  ? mission.codeMission : '' }}</p>
                </td>

                <td>
                  <a  v-if="affaire.facture != 'false'" @click="deleteFacture(affaire._id, i)"><i class="fa-solid fa-backward-step"></i></a>
                </td>

                <td v-if="affaire.nameFileAffaire != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="displayDEVIS(affaire.nameFileAffaire)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">P</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.nameFileAffaire == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="color: red; font-size:20px;">P</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>

                <td v-if="affaire.bonCommande != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="displayBC(affaire.bonCommande)"><p style="font-size:20px; color:green; font-wight: bold; font-weight: bold;">AP</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.bonCommande == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">AP</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>

                <td v-if="affaire.renseignerIntervention != 'false'"  @click="displayIntervention(affaire.renseignerIntervention)" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:green; font-wight: bold; font-weight: bold;">EP</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.renseignerIntervention == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">EP</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>


                <td v-if="affaire.importRapport != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">RE</p><i class="fa-solid fa-clock" style="color: white"></i><i class="fa-solid fa-clock" style="color: white"></i></td>
                <td v-if="affaire.importRapport == 'false'"  @click="displayImportRapports(affaire.numeroAffaire)" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">RE</p></td>

                <td v-if="affaire.be != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showBE(affaire.be)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">BE</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.be == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">BE</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>

                <td v-if="affaire.facture != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showFacture(affaire.facture)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">FA</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.facture == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="handelInsertFacture(affaire._id)"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">FA</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>

                <td v-show="affaire.emise != 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showEmise(affaire.emise)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">EN</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-show="affaire.emise == 'false'" style="background-color: white; margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">EN</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>


              </tr>
            </table>

            <div class="deleteAll" v-show="checkedClients.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteClients()">
            </div>
      </div>

    <ul class="pagination" v-if="flagImportFacture == false">
             <button><i class="fa-solid fa-backward"></i></button>

        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
    </ul>

    <!--  Start Info Client   -->
    <ImportFacture :numeroAffaire="numeroAffaire" v-if="flagImportFacture == true" />
    <!--  End Info Client   -->

  </div>

</template>

<script>

import Service from "../../../../Service";
import ImportFacture from "../Affaire/ImportFacture.vue";

export default {
  name: "gestionInterlocuteur",
  components: {
    ImportFacture
  },
  data() {
    return {
      pageIndex : 0,
      itemsPerPage : 10,
      numberPage: null,
      preAffaires: [],
      arrayNumAffairesCloud : [],
      arrayNumAffairesLocal : [],
      numeroAffaire : null,
      flagImportFacture :false,
      flagMsgBonCommande : false,
      msgBonCommande : null,
      flagPreviewUplodeBonCammnade : false,
      file: null,
      affaireId : null,
      flagUplodeBonCammnade: false,
      rechercher: null,
      affaires : [],
      missions : [],
      clients : [],
      checkedClients : [],
      msg : null,
      flagEditClient : false,
      flagInfoClient : false,
      infoClient : [],
      succes : null,
      echec: null
    };
  },
  methods: {

    selectPage(value) {

      const select = value - 1;
      this.affaires = [];
      for(let i = select * this.itemsPerPage; i < (select * this.itemsPerPage) + this.itemsPerPage; i++) {
          this.affaires.push(this.preAffaires[i]);
      }
    },

    downloadFile(response) {
        var newBlob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
        const data = window.URL.createObjectURL(newBlob);
        var link = document.createElement("a");
        link.href = data;
        link.download = "resume.docx";
        link.click();
        setTimeout(function() {
            window.URL.revokeObjectURL(data);
        }, 100);
    },

    showFacture(facture){
      Service.showFACTURE(facture)
      .then((response) => {
        this.downloadFile(response);
      })
      .catch((err) => {
        alert(err);
      })

    },

    // handel Inser Facture
    handelInsertFacture(affaireId) {
      this.flagImportFacture = true;
      this.numeroAffaire = affaireId;
    },

    showBE(be) {
      Service.showBE(be)
      .then((response) => {
         this.downloadFile(response);
      })
      .catch((err) => {
        console.log(err)
      })

    },
    // handel Import BE
    handelImportBE(affaireId) {
        this.flagImportBD = true;
        this.numeroAffaire = affaireId;
    },
    // display Bon Cammande
    displayIntervention(filename) {
      Service.displayIntervention(filename)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
        });
    },
  // display Bon Cammande
    displayBC(filename) {
      console.log(filename);
      Service.displayBC(filename)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
        });
    },
    // display DEVIS
    displayDEVIS(filename) {
      console.log(filename);
      Service.displayDEVIS(filename)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
        });
    },
// Enregistre Bon Cammande
enregitreBonCommande() {

        Service.enregitreBonCommande(this.file, this.affaireId)
        .then(() => {
            this.msgBonCommande = "Bon Cammande a été enregistré avec succès"
            this.flagMsgBonCommande = true;
            this.succes = true;
            this.echec = false;
            setTimeout(() => {
            this.msgBonCommande = ""
            this.flagMsgBonCommande = false;
            this.succes = null;
            this.echec = null;
            this.$router.go(this.$router.currentRoute);

            },5000)
        })
        .catch((error) => {

           this.msgBonCommande = error.message;
           this.flagMsgBonCommande = true;
           this.succes = false;
           this.echec = true;

            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
          });
},
// preciew file
 previewFile() {
        this.file = this.$refs.file.files[0];
        if(this.file) {
          this.flagPreviewUplodeBonCammnade = true;
        }
 },
// create bon cammnde
bonCommande(affaireId) {
    // prompt(message, defaultText, title, type, reverseButton)
    if(this.flagUplodeBonCammnade == true)
    {
      this.affaireId = null;
      this.flagUplodeBonCammnade = false

    } else {
      this.affaireId = affaireId;
      this.flagUplodeBonCammnade = true
    }
},
// delete more one client (clients)
    deleteClients() {
      const idClients = new Array();
      for(let i = 0; i < this.checkedClients.length; i++ )
      {
        idClients[i] = this.checkedClients[i];
        this.clients.splice(this.checkedClients[i], 1);

          Service.deleteClient(idClients[i])
          .then((result) => {
            this.msg = result.data.msg;
          })
          .catch((error) => {
              this.msg = error.message;
              console.error(`HTTP error: ${error.name} => ${error.message}`);
              throw "fail request at: GET /refreshtime";
          });
      }


    },
    // delete one client
    deleteClient(i) {
      const clientId = this.clients[i]._id;
      this.clients.splice(i, 1);
      Service.deleteClient(clientId)
      .then((result) => {

        this.msg = result.data.msg;
      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });
    },

    // edit one client
    editClient(i) {
      this.infoClient.push(this.clients[i])
      this.flagInfoClient = false;
      this.flagEditClient = true;
    },

    // edit one client
    informationClient(i) {
      this.infoClient.push(this.clients[i])
      this.flagEditClient = false;
      this.flagInfoClient = true;
    }
  },

 computed : {
      filterAffaires() {
            return this.affaires.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                const date = new Date(item.date).toLocaleDateString()
                return !date.indexOf(this.rechercher) || !item.numeroAffaire.toString().indexOf(this.rechercher.toString())
            })
      }
  },

  created() {


 // read all Affaires LOCAL
      Service.readAllAffaires()
      .then((result) => {

        result.data.result.forEach((element) => {
           if(element.renseignerIntervention != 'false')
           {
            this.preAffaires.push(element);
           }
        });

        this.numberPage = Math.ceil(this.preAffaires.length / this.itemsPerPage);

        for(let i = this.pageIndex * this.itemsPerPage; i < (this.pageIndex * this.itemsPerPage) + this.itemsPerPage; i++) {
             this.affaires.push(this.preAffaires[i]);
        }

      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });

      // Read all missions
      Service.readAllMissions()
      .then((result) => {
        this.missions = result.data.missions;
      })
      .catch((error) => {

              this.msg = error.message;
              console.error(`HTTP error: ${error.name} => ${error.message}`);
              throw "fail request at: GET /refreshtime";
      });


      // Read all clients and check rapport exist or no
      Service.readClient()
      .then((result) => {
        this.clients = result.data.clients;
             // check rapports exist and valide
              Service.checkRapports()
              .then((result) => {
                var objectsFound = [];
                // search db atlas cloud
                for(let objectNumber in result.clients){
                    var nomSociete = result.clients[objectNumber].nomSociete;
                    var idSociete = result.clients[objectNumber]._id;
                    //search db local
                    this.clients.forEach(element => {
                      if(element.raisonSocial == nomSociete)
                      {
                         // serach rappport with consition (confirmation & clientId)
                         result.rapports.forEach(element => {
                          if(element.confirmation == 1 && element.clientId == idSociete){
                            objectsFound.push(nomSociete);
                          }
                         })

                      }
                    });
                }

              })
              .catch((error) => {
                        console.log(error)
              });

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
.succes {
  background-color: green;
  color: white;
  padding: 10px;
  height: fit-content;
  width: 100%;
}
.echec {
  background-color: red;
  color: white;
  padding: 10px;
  height: fit-content;
  width: 100%;
}
.gestionInspecteur {
  width: 100%;
  height: 100%;
  padding:2px;
  margin: 0px;
  position: relative;
}
.gestionInspecteur h3 {
  width: 100%;
  height: fit-content;
  padding: 5px;
  margin: 0;
  color: white;
  background-color: #243064;
  text-align: center;
  margin-bottom: 10px;
}
pecteur .rechercher-table {
  width: 100%;
}
.gestionInspecteur .rechercher-table .rechercher {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}
.gestionInspecteur .rechercher-table .uplode {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
}
.gestionInspecteur .rechercher-table .uplode input {
  margin-bottom: 10px;
  height: 40px;
  width: 30%;
}
.gestionInspecteur .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  outline: 0;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
  color :#000000;
  padding: 5px;
}
.gestionInspecteur .rechercher-table table  {
  width: 100%;
}
.gestionInspecteur .rechercher-table table tr  {
  width: 100%;
}
.gestionInspecteur .rechercher-table table tr th {
    background-color: #243064;
    color: white;
    padding: 10px 2px;
    border-right: 1px solid white;
}
table{
  border-collapse: collapse;
}
.gestionInspecteur .rechercher-table table tr td {
    color: black;
    padding: 5px;
}
.gestionInspecteur .rechercher-table table tr:hover {
  background-color: #f5f5f5;
}
.gestionInspecteur .rechercher-table table tr td {
  cursor: pointer;
}
.gestionInspecteur .rechercher-table table tr td a {
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}
.fa-trash-can {
  color: red;
}
.fa-pen-to-square {
  color: blue;
}
.fa-circle-check {
  color: green;
}
.fa-download {
  color: black;
}
.gestionInspecteur .rechercher-table ul {
  width: 100%;
  height: fit-content;
  text-align: center;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.gestionInspecteur .rechercher-table ul li {
  color:black;
 margin-left: 5px;
 cursor: pointer;
 font-size: 20px;
}
.gestionInspecteur .rechercher-table ul li:hover {
  color:red;
 margin-left: 5px;
 transition: 0.3s;
}
.gestionInspecteur .rechercher-table .deleteAll {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.gestionInspecteur .rechercher-table .deleteAll input {
  width: 50%;
  height: 40px;
  background-color: red;
  color: white;
  border: 0;
}
#inspecteurs > tr > td:nth-child(7) > a:nth-child(1) > svg {
  font-size: 20px;
  color: red;
}
#inspecteurs > tr > td:nth-child(7) > a > svg {
  font-size: 20px;
  color: blue;
}
#inspecteurs > tr > td:nth-child(7) > a:nth-child(3) > svg {
  font-size: 20px;
  color: green;
}
#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}
#inspecteurs > tr > td {
  border-bottom: 1px solid #a0a0a0;
}
#app > div > div > div.menu-content > div.content > div > h3 {
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin:0;
    color: white;
    background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 20px;
}


.pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  margin:10px auto;
  width: fit-content;
  flex-wrap: wrap;
  padding:5px 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.pagination p{
  border:1px solid rgb(151, 151, 151);
  margin: 0 4px;
  padding:5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.pagination p:hover , button:hover{
background-color: #243064;
color:white;
}




.pagination button {
  border:0;
  padding:5px;
  border:1px solid rgb(170, 170, 170);
margin-left: 15px;
  color:gray;
cursor: pointer;
}

.pagination button:nth-child(1) {
margin-right: 15px;
margin-left: 0;

}



</style>
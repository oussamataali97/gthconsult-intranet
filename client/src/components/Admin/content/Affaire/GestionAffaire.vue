<template>
    <div class="gestionInspecteur"  >

      <h3 v-if="flagEditAffaire == false && flagInfoAffaire == false"><i class="fa-regular fa-file-lines"></i> LISTE DES OFFRES COMMERCIAUX</h3>
      <div class="rechercher-table" v-if="flagEditAffaire == false && flagInfoAffaire == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche par N° d'offre">
            </div>

              <Traitement :msg="msgBonCommande" v-if="traitement == true"/>

              <p v-if="flagMsgBonCommande && echec == true" :class="{ echec: echec }">
                  {{ msgBonCommande }}
              </p>

            <div class="gestionaffaire" v-if="flagUplodeBonCammnade == true">
                <h4>Information sur Le Bon Commande du Client</h4>
                <input type="text" v-model="numeroBonCammnade" placeholder="Remplir le numéro de Bon Commande de client">
                <input type="date" v-model="dateBonCammnade">
                <input type="file"  multiple="multiple" class="form-control" placeholder="Fichier PDF" ref="file" @change="previewFile">
                <input style="color :white; border: 0px;" class="bonCammande" type="submit" v-show="flagPreviewUplodeBonCammnade == true" value="Télécharger Le Bon du Commande" @click="enregitreBonCommande()">
                <input style="color :white; border: 0px;"  class="annuler" type="submit" value="Annuler" @click="annulerBonCommande()">
            </div>

            <table id="inspecteurs">
              <tr>
                <th>  </th>
                <th>Date</th>
                <th>Numéro d'offre</th>
                <th>Réf Client</th>
                <th>Raison sociale </th>
                <th>Mission</th>
                <th>Actions</th>
                <th colspan="7">Status</th>

              </tr>
              <tr v-for="(affaire, i) in filterAffaires" :key="affaire._id">
                <td>
                  <input type="checkbox" :value="affaire._id" v-model="checkedAffaires" style="width: 15px;">
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
                  <a @click="deleteAffaire(i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="informationAffaire(i)"><i class="fa-solid fa-magnifying-glass"></i></a>
                </td>

                <td v-if="affaire.nameFileAffaire != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="displayDEVIS(affaire.nameFileAffaire)"><p style="font-size:20px; color:green; font-weight: bold;font-weight: bold;">P</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.nameFileAffaire == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="color: red; font-size:20px;">P</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>

                <td v-if="affaire.bonCommande != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="displayBC(affaire.bonCommande)"><p v-if="affaire.bonCommande != 'false'" style="font-size:20px; color:green; font-wight: bold; font-weight: bold;">AP</p><i v-if="affaire.bonCommande != 'false'" class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.bonCommande == 'false'" @click="bonCommande(affaire._id, i)" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p v-if="affaire.bonCommande == 'false'" style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">AP</p><i v-if="affaire.bonCommande == 'false'" class="fa-solid fa-forward-step" style="font-size:20px; color:red;"></i></td>

                <td v-if="affaire.renseignerIntervention != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="displayIntervention(affaire.renseignerIntervention)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">EP</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.renseignerIntervention == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">EP</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>

                <td v-if="affaire.renseignerIntervention != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">RE</p><i class="fa-solid fa-download" style="font-size:20px; color:white;"></i></td>
                <td v-if="affaire.renseignerIntervention == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">RE</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>

                <td v-if="affaire.be != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showBE(affaire.be)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">BE</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.be == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">BE</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>

                <td v-if="affaire.facture != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showFacture(affaire.facture)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">FA</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-if="affaire.facture == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">FA</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>

                <td v-show="affaire.emise != 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;" @click="showEmise(affaire.emise)"><p style="font-size:20px; color:green; font-wight: bold;font-weight: bold;">EN</p><i class="fa-solid fa-download" style="font-size:20px; color:green;"></i></td>
                <td v-show="affaire.emise == 'false'" style=" margin : 0; padding: 0; padding-bottom: 5px; padding-left: 5px;"><p style="font-size:20px; color:red; font-wight: bold; font-weight: bold;">EN</p><i class="fa-solid fa-forward-step" style="font-size:20px; color:white;"></i></td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedAffaires.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteAffaires()">
            </div>


      </div>

          <ul class="pagination" v-if="flagEditAffaire == false">
            <button><i class="fa-solid fa-backward"></i></button>
        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
          </ul>

          <!--  Start Edit Client   -->
            <EditAffaire :infoAffaire="infoAffaire" v-if="flagEditAffaire == true" />
          <!--  End Edit Affaire   -->

          <!--  Start Info Affaire   -->
            <InfoAffaire :infoAffaire="infoAffaire" v-if="flagInfoAffaire == true" />
          <!--  End Info Affaire   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import Traitement from "./Traitement.vue";
import EditAffaire from "./EditAffaire.vue";
import InfoAffaire from "./InfoAffaire.vue";

// import InfoClient from "./InfoClient.vue";
export default {
  name: "gestionInterlocuteur",
  components: {
    Traitement,
    EditAffaire,
    InfoAffaire

  },
  data() {
    return {
      pageIndex : 0,
      itemsPerPage : 10,
      numberPage: null,
      traitement : false,
      numeroBonCammnade: null,
      dateBonCammnade : null,
      currentIndexBonCammande: null,
      flagMsgBonCommande : false,
      msgBonCommande : null,
      flagPreviewUplodeBonCammnade : false,
      file: null,
      affaireId : null,
      flagUplodeBonCammnade: false,
      rechercher: null,
      preAffaires: [],
      affaires : [],
      missions : [],
      clients : [],
      checkedClients : [],
      msg : null,
      flagEditClient : false,
      flagInfoClient : false,
      infoClient : [],
      echec: null,
      checkedAffaires : [],
      flagEditAffaire :false,
      flagInfoAffaire :false,
      infoAffaire : []

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

    // edit Affaire and info Affaire
    editAffaire(i) {
      this.infoAffaire.push(this.affaires[i])
      this.flagEditAffaire = true;
      this.flagInfoAffaire = false;
    },

    // edit one client
    informationAffaire(i) {
      this.infoAffaire.push(this.affaires[i])
      this.flagEditAffaire = false;
      this.flagInfoAffaire = true;
    },

  deleteAffaire(i){

      const affaireId = this.affaires[i]._id;
      this.affaires.splice(i, 1);
      Service.deleteAffaire(affaireId)
      .then((result) => {

        this.msg = result.data.msg;
      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });

  },

  // delete more one affaire (affaires)
    deleteAffaires() {

      for(let i = 0; i < this.checkedAffaires.length; i++) {
        this.affaires.splice(this.checkedAffaires[i], 1);
      }

      Service.deleteAffaire(this.checkedAffaires)
          .then((result) => {
            this.msg = result.data.msg;
          })
          .catch((error) => {
              this.msg = error.message;
              console.error(`HTTP error: ${error.name} => ${error.message}`);
              throw "fail request at: GET /refreshtime";
          });

    },

  annulerBonCommande() {
    this.flagUplodeBonCammnade = false;
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


    showBE(be) {
        Service.showBE(be)
        .then((response) => {
          this.downloadFile(response);
        })
        .catch((err) => {
          console.log(err)
        });
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
      Service.displayDEVIS(filename)
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
        });
    },
//handel insert Intervention
handelInsertIntervention(affaireId) {
  this.affaireId = affaireId
  this.flagInsertIntervention = true;
},
// Enregistre Bon Cammande
enregitreBonCommande() {

        Service.enregitreBonCommande(this.file, this.affaireId, this.dateBonCammnade, this.numeroBonCammnade)
        .then((response) => {

            var finish = false;
            this.flagUplodeBonCammnade = false;
            this.msgBonCommande = "Veuillez patienter quelques secondes pour terminer le processus";
            this.traitement = true;

            if(response) {
                setTimeout(() => { console.log("wait"); }, 5000);
                finish = true;
            }

            if(finish) {
                setTimeout(() => {
                  this.msgBonCommande = null;
                  this.traitement = false;
                  this.numeroBonCammnade = null;
                  this.dateBonCammnade = null;
                  this.affaires[this.currentIndexBonCammande].bonCommande = response.result;

                }, 5000);
            }

        })
        .catch((error) => {

           this.msgBonCommande = error.message;
           this.flagMsgBonCommande = true;
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
bonCommande(affaireId, index) {

    if(this.flagUplodeBonCammnade == true)
    {
      this.affaireId = null;
      this.flagUplodeBonCammnade = false;

    } else {
      this.currentIndexBonCammande = index;
      this.affaireId = affaireId;
      this.flagUplodeBonCammnade = true;
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
            if(result) {
                  this.checkedAffaires = [];
            }
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
            // empty arry checkedAffaires
            if(result) {
                  this.checkedAffaires = [];
            }
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
                return !item.numeroAffaire.indexOf(this.rechercher) || !date.indexOf(this.rechercher)
            })
      }
  },

  created() {
    // read all Affaires
      Service.readAllAffaires()
      .then((result) => {

        result.data.result.forEach(element => {
          this.preAffaires.push(element);
        });

        this.numberPage = Math.ceil(result.data.result.length / this.itemsPerPage);

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
  padding:3px;
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

h4 {

  padding: 5px;
  margin: 0;
  color: rgb(255, 0, 0);

  border-bottom: 2px solid rgb(29, 26, 241);
  margin-bottom: 10px;
}

.gestionInspecteur .rechercher-table {
  width: 100%;


}
.gestionInspecteur .rechercher-table .rechercher {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

}


.gestionInspecteur .rechercher-table .gestionaffaire {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 50px;


}
.gestionInspecteur .rechercher-table .gestionaffaire input {
  margin-bottom: 10px;
  height: 40px;
  width: 60%;
}

.gestionInspecteur .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  padding: 10px;border-radius: 15px;
  outline: 0;
  border: 1px solid #868686;
  font-size: 16px;

  color :#b8bdd1;
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
    padding: 10px 0;
    border-right: 1px solid white;
}

.gestionInspecteur .rechercher-table table tr td {
    color: black;
    padding: 5px 2px;
    text-transform: capitalize;
}

table{
  border-collapse: collapse;
}

.gestionInspecteur .rechercher-table table tr:hover {
background-color: #f5f5f5;
}
.gestionInspecteur .rechercher-table table tr td {
  cursor: pointer;
}

.gestionInspecteur .rechercher-table table tr td a {
  cursor: pointer;
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

svg{
  font-size: 20px !important;
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
 font-size: 18px;
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
  width: fit-content;
  height: 40px;
  padding: 10px;
  background-color: red;
  color: white;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
}




#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input[type=submit]:nth-child(5) {
    border: 1px solid #243064;
    outline: 0;
    color: black;
    font-size: 18px;
}

#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input[type=text]:nth-child(2) {
    border: 1px solid #b1b1b1;
    outline: 0;
    padding:5px;
    color: black;
    font-size: 17px;
}

#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input[type=date]:nth-child(3) {
  border: 1px solid #b1b1b1;
    outline: 0;
    padding:5px;
    color: black;
    font-size: 17px;
}

#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input.file {
  border: 1px solid #b1b1b1;
    outline: 0;
    padding:5px;
    color: black;
    font-size: 17px;

}

#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input[type=submit]:nth-child(6) {
  border: 1px solid #b1b1b1;
    outline: 0;
    padding:5px;
    color: black;
    font-size: 17px;
}



#inspecteurs > tr > td:nth-child(7) > a:nth-child(1) > svg {
  font-size:20px;
  color: red;
}

#inspecteurs > tr > td:nth-child(7) > a > svg {
  font-size:20px;
  color: blue;
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

#inspecteurs > tr > td {
 border-bottom: 1px solid #d1d1d1;
}




#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input.bonCammande {
  cursor: pointer;
  background-color: green;
}

#app > div > div > div.menu-content > div.content > div > div > div.gestionaffaire > input.annuler {
  cursor: pointer;

  background-color: #ff0000d4;
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
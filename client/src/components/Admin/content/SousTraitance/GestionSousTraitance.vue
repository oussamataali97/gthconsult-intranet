<template>

    <div class="gestionInspecteur">

      <h3  v-if="flagEditSousTraitance == false">FICHES DES SOUS-TRAITANCE</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditSousTraitance == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche une Sous-Traitance">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Raison Sociale</th>
                <th>Forme juridique</th>
                <th>Ville</th>
                <th>Code Postal</th>
                <th>Pays</th>
                <th>Email</th>
                <th>ICE</th>
                <th>Téléphone</th>
                <th>Service</th>
                <th>Actions</th>
              </tr>


              <tr v-for="(item, i) in filterSousTraitances" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedSousTraitances" style="width: 20px;"></td>
                <td>{{ item.raisonSocial }}</td>
                <td>{{ item.formJuridique }}</td>
                <td>{{ item.ville }}</td>
                <td>{{ item.codePostal }}</td>
                <td>{{ item.pays }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.ice }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.service }}</td>
                <td>
                  <a @click="deleteSousTraitance(i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editSousTraitance(i)"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedSousTraitances.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteSousTraitances()">
            </div>

      </div>



    <!--  Start Edit SousTraitance   -->
    <EditSousTraitance :sousTraitanceId="sousTraitanceId" v-if="flagEditSousTraitance == true" />
    <!--  End Edit SousTraitance   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditSousTraitance from "./EditSousTraitance.vue";
export default {
  name: "gestionInterlocuteur",
  components: {
    EditSousTraitance,
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      sousTraitances: [],
      flagEditSousTraitance: false,
      checkedSousTraitances : [],
      sousTraitanceId : null,
    };
  },

  computed : {
            filterSousTraitances() {
            return this.sousTraitances.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nomSousTraitance.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.interlocuteurPrenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.interlocuteurNom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.inspecteurPrenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.inspecteurPrenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.inspecteurNom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.typeMission.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.interlocuteurTelephone.toString().indexOf(this.rechercher.toString()) ||
                !item.interlocuteurEmail.toLowerCase().toString().indexOf(this.rechercher.toString())
            })
      }
  },
  methods: {

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
    },

    // delete more one Interlocuteur (interlocuteurs)
    deleteSousTraitances() {

           alert("Voulez-vous vraiment supprimer ?");
          // // Delete in Fron-end
          for(let i = 0; i < this.checkedSousTraitances.length; i++ ) {
            let indexClient = this.sousTraitances.indexOf(this.checkedSousTraitances[i]);
            //delete in front end
            this.sousTraitances.splice(indexClient, 1);
          }

          //    //  delete in db backend
          Service.deleteSousTraitance(this.checkedSousTraitances)
              .then((response) => {
                  console.log(response);
              })
              .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
              });

    },

    // delete one client
    deleteSousTraitance(i) {
      alert("Voulez-vous vraiment supprimer ?");
      this.sousTraitanceId = this.sousTraitances[i]._id;
      this.sousTraitances.splice(i, 1);
      Service.deleteSousTraitance(this.sousTraitanceId)
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
    async editSousTraitance(i) {
        this.flagEditSousTraitance = true;
        this.sousTraitanceId = this.sousTraitances[i]._id;
    },


    },
//clients
  created() {

      Service.readSousTraitance()
      .then((result) => {
        this.sousTraitances = result.data.sousTraitances;
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
  padding-top: 0px;
  padding-left: 0px;
  margin: 0px;
  padding:2px;
  position: relative;
}
.gestionInspecteur h3 {
  width: 100%;
  margin:auto;
  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;
  margin-bottom: 10px;
}
li{
  list-style: none;
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
.gestionInspecteur .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  outline: 0;
  padding:5px;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
  color :#030303;
}
.gestionInspecteur .rechercher-table .rechercher input:focus-within {
outline:1px solid red;
border:0;
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
    padding: 10px 3px;
    border-right: 1px solid white;
}
.gestionInspecteur .rechercher-table table tr td {
    color: black;
    padding: 5px;
}

.gestionInspecteur .rechercher-table table tr:nth-child(even) {
  background-color: #f8f8f8;
}
.gestionInspecteur .rechercher-table table tr td a {
  cursor: pointer;
  margin-right: 5px;
}
.fa-trash {
  color: red;
}
.fa-trash:hover {
  color: rgb(230, 88, 88);
}
.fa-pen-to-square {
  color: rgb(255, 136, 0);
}
.fa-circle-check {
  color: green;
}
.fa-download {
  color: black;
}
table{
  border-collapse: collapse;
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
  padding: 10px;
  height: 40px;
  background-color: red;
  color: white;
  border: 0;
  cursor: pointer;
}
#inspecteurs > tr > td:nth-child(10) > a:nth-child(1) > svg  {
  color: red;
  font-size: 20px;
}
#inspecteurs > tr > td:nth-child(10) > a:nth-child(2) > svg  {
  color: blue;
  font-size: 20px;
}
#inspecteurs > tr > td:nth-child(10) > a:nth-child(3) > svg  {
  color: green;
  font-size: 20px;
}
#app > div > div > div.menu-content > div.content > div > h3 {
    background-color: #ff0000d4;
    padding: 15px;
}
#app > div > div > div.menu-content > div.content {
  background-color: white;
}
#inspecteurs > tr > td {
    color: #000000;
    border-bottom: 1px solid #919191;
    text-transform: capitalize;
}
#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}


</style>
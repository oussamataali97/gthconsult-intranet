<template>
<!-- interlocuteurSousTraitanceId -->
    <div class="gestionInspecteur">

      <h3  v-if="flagInterlocuteurSousTraitance == false">FICHES DES INTERLOCUTEUR DE SOUS-TRAITANCE</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagInterlocuteurSousTraitance == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche une Interlocuteur de Sous-Traitance">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th>Fonction</th>
                <th>Téléphone</th>
                <th>Raison Sociale</th>
                <th>Actions</th>
              </tr>


              <tr v-for="(item, i) in filterInterlocuteurSousTraitances" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedInterlocuteurSousTraitances" style="width: 20px;"></td>
                <td>{{ item.nom }}</td>
                <td>{{ item.prenom }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.fonction }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.raisonSocial[0] }}</td>
                <td>
                  <a @click="deleteInterlocuteurSousTraitance(i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editInterlocuteurSousTraitance(i)"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedInterlocuteurSousTraitances.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteInterlocuteurSousTraitances()">
            </div>

      </div>



    <!--  Start Edit SousTraitance   -->
    <EditInterlocuteurSousTraitance :interlocuteurSousTraitanceId="interlocuteurSousTraitanceId" v-if="flagInterlocuteurSousTraitance == true" />
    <!--  End Edit SousTraitance   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditInterlocuteurSousTraitance from "./EditInterlocuteurSousTraitance.vue";
export default {
  name: "gestionInterlocuteur",
  components: {
    EditInterlocuteurSousTraitance,
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      interlocuteurSousTraitances: [],
      flagInterlocuteurSousTraitance: false,
      checkedInterlocuteurSousTraitances : [],
      interlocuteurSousTraitanceId : null,
    };
  },

  computed : {
            filterInterlocuteurSousTraitances() {
            return this.interlocuteurSousTraitances.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.prenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.email.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.fonction.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.telephone.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.raisonSocial[0].toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString())
            })
      }
  },
  methods: {

    update() {

      Service.updateSousTraitance(this.sousTraitance, this.interlocuteurSousTraitanceId)
      .then((response) => {
          this.traitement = true;
          this.msgInterlocuteurSousTraitance = "Veuillez patienter quelques secondes pour enregister";
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
    deleteInterlocuteurSousTraitances() {

           alert("Voulez-vous vraiment supprimer ?");
          // Delete in Fron-end
          for(let i = 0; i < this.checkedInterlocuteurSousTraitances.length; i++ ) {
            let indexClient = this.interlocuteurSousTraitances.indexOf(this.checkedInterlocuteurSousTraitances[i]);
            //delete in front end
            this.interlocuteurSousTraitances.splice(indexClient, 1);
          }

          // delete in db backend
          Service.deleteInterlocuteurSousTraitance(this.checkedInterlocuteurSousTraitances)
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
    deleteInterlocuteurSousTraitance(i) {
      alert("Voulez-vous vraiment supprimer ?");
        this.interlocuteurSousTraitanceId = this.interlocuteurSousTraitances[i]._id;
      this.interlocuteurSousTraitances.splice(i, 1);
      Service.deleteInterlocuteurSousTraitance(this.interlocuteurSousTraitanceId)
      .then((result) => {
        this.msg = result.data.msg;
      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });
    },

    // edit
    async editInterlocuteurSousTraitance(i) {
        this.flagInterlocuteurSousTraitance = true;
        this.interlocuteurSousTraitanceId = this.interlocuteurSousTraitances[i]._id;
    },

    },
//clients
  created() {

      Service.readInterlocuteurSousTraitance()
      .then((result) => {
        this.interlocuteurSousTraitances = result.data.interlocuteurSousTraitances;
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
  padding: 2px;
  position: relative;
}
.gestionInspecteur h3 {
  width: 100%;
  margin:auto;
  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;
  padding:15px;
  margin-bottom: 20px;
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
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
  padding: 5px;
  color :#243064;
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
    border-right: 1px solid white;
    padding: 10px 4px;
}
table{
  border-collapse: collapse;
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
  margin-left: 10px;
  margin-right: 10px;
}
.fa-trash {
  color: red;
}.fa-trash:hover {
  color: rgb(230, 88, 88);
}
.fa-pen-to-square {
  color: rgb(255, 187, 0);
}
.fa-circle-check {
  color: green;
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
    border-bottom: 1px solid #acacac;
  text-transform: capitalize;
}
#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}
#inspecteurs > tr > td:nth-child(8) > a:nth-child(1) > svg {
  color: red;
}
#inspecteurs > tr > td:nth-child(8) > a:nth-child(3) > svg {
  color: green;
}
#inspecteurs > tr > td:nth-child(8) > a:nth-child(4) > svg {
  color: red;
}
#inspecteurs > tr > td:nth-child(8) > a:nth-child(5) > svg {
  color: orange;
}

</style>
<template>

    <div class="gestionInspecteur">

      <h3 v-if="flagEditEtalonage == false" ><i class="fa-solid fa-file-lines"></i> FICHES DES ÉTALONNAGE</h3>

      <p v-if="succes && flagEditEtalonage == false" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec && flagEditEtalonage == false" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditEtalonage == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Interlocuteur">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Désignation</th>
                <th>Marque</th>
                <th>Identification</th>
                <th>Étalonnie Le</th>
                <th>Prochaine Étalonnage</th>
                <th>Certificats d'étalonnage </th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in filterEtalonnages" :key="item._id">
                <td><input type="checkbox" :value="item.filename" v-model="checkedEtalonnages" style="width: 20px;"></td>
                <td>{{ item.designation }}</td>
                <td>{{ item.marque }}</td>
                <td>{{ item.identification }}</td>
                <td>{{ new Date(item.etalonnieLe).toLocaleDateString() }}</td>
                <td v-if="new Date(new Date(item.prochaineEtalonnage).getFullYear(), new Date(item.prochaineEtalonnage).getMonth(), new Date(item.prochaineEtalonnage).getDate()-90).toLocaleDateString() >= new Date(item.prochaineEtalonnage).toLocaleDateString()" style="color: rgb(255, 117, 117); font-weight: 600;"><i class="fa-solid fa-circle-exclamation"></i> {{ new Date(item.prochaineEtalonnage).toLocaleDateString() }}</td>
                <td v-if="new Date(new Date(item.prochaineEtalonnage).getFullYear(), new Date(item.prochaineEtalonnage).getMonth(), new Date(item.prochaineEtalonnage).getDate()-90).toLocaleDateString() < new Date(item.prochaineEtalonnage).toLocaleDateString()">{{ new Date(item.prochaineEtalonnage).toLocaleDateString() }}</td>
                <td>{{ item.certificatsEtalonnage }}</td>
                <td>
                  <a @click="deleteEtalonnage(item.filename, i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editEtalonnage(item._id)"><i class="fa-solid fa-pen-to-square"></i></a>
                  <a @click="certficatEtalonnage(item.filename)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedEtalonnages.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteEtalonnages()">
            </div>

      </div>



    <!--  Start Edit Inspecteur   -->
    <EditEtalonnage :etalonnageId="etalonnageId" v-if="flagEditEtalonage == true" />
    <!--  End Edit Inspecteur   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditEtalonnage from "./EditEtalonnage.vue";
export default {
  name: "gestionEtalonage",
  components: {
    EditEtalonnage,
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      etalonnages: [],
      checkedEtalonnages : [],
      flagEditEtalonage : false,
      etalonnageId : null
    };
  },

  computed : {
            filterEtalonnages() {
            return this.etalonnages.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.designation.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.marque.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.identification.toString().indexOf(this.rechercher.toString()) ||
                !item.etalonnieLe.toLowerCase().toString().indexOf(this.rechercher.toString()) ||
                !item.prochaineEtalonnage.toString().toLowerCase().indexOf(this.rechercher.toString().toLowerCase()) ||
                !item.certificatsEtalonnage.toString().toLowerCase().indexOf(this.rechercher.toString().toLowerCase())
            })
      }
  },
  methods: {

    // display Certificate Etalonnage
    certficatEtalonnage(filename) {
          Service.displayEtalonnage(filename)
          .then((result) => {
              console.log(result);
          })
          .catch((error) => {
              console.log(error)
          });

    },

    // delete more one Interlocuteur (interlocuteurs)
    deleteEtalonnages() {

          // // Delete in Fron-end
          for(let i = 0; i < this.checkedEtalonnages.length; i++ ) {
            let indexEtalonnage = this.etalonnages.indexOf(this.checkedEtalonnages[i]);
            //delete in front end
            this.etalonnages.splice(indexEtalonnage, 1);
          }

          //    //  delete in db backend
          Service.deleteEtalonnage(this.checkedEtalonnages)
            .then((response) => {
                  console.log(response);
            })
            .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
            });

    },

    // delete one Etalonnage
    deleteEtalonnage(filename, i) {
      this.etalonnages.splice(i, 1);
      Service.deleteEtalonnage(filename)
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
    editEtalonnage (etalonnageId) {
      this.flagEditEtalonage = true;
      this.etalonnageId = etalonnageId;
    },

  },

  created() {
      Service.readEtalonnage()
      .then((result) => {
        this.etalonnages = result.data.etalonnages;
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

.gestionInspecteur .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  outline: 0;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
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
    padding: 10px 0;
}

.gestionInspecteur .rechercher-table table tr td {
    background-color: #ddd;
    color: black;
    padding: 5px;
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
  color: rgb(255, 147, 6);
}


.fa-file-pdf {
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

#app > div > div > div.menu-content > div.content {
  background-color: white;
}

#inspecteurs > tr > td {
    background-color: white;
    color: #000000;
    border-bottom: 1px solid #969696;
    text-transform: capitalize;
}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}

table{
  border-collapse: collapse;
}

#inspecteurs > tr > td:nth-child(8) > a:nth-child(1) > svg {
  color: red;
}

#inspecteurs > tr > td:nth-child(8) > a:nth-child(3) > svg {
  color: rgb(10, 27, 255);
  font-size: 20px;
}

#inspecteurs > tr > td:nth-child(8) > a:nth-child(4) > svg {
  color: red;
}

#inspecteurs > tr > td:nth-child(8) > a:nth-child(5) > svg {
  color: orange;
}

</style>
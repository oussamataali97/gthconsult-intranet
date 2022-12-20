<template>

    <div class="gestionInspecteur">

      <h3 v-if="flagEditFicheTechnique == false" ><i class="fa-solid fa-table-list"></i> GESTION DES FICHES TECHNIQUES MATÉRIEL</h3>

      <p v-if="succes && flagEditFicheTechnique == false" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec && flagEditFicheTechnique == false" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditFicheTechnique == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Interlocuteur">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Désignation</th>
                <th>Marque</th>
                <th>Identification</th>
                <th>Numéro Fiche Technique</th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in filterFicheTechniques" :key="item._id">
                <td><input type="checkbox" :value="item.filename" v-model="checkedFicheTechniques" style="width: 20px;"></td>
                <td>{{ item.designation }}</td>
                <td>{{ item.marque }}</td>
                <td>{{ item.identification }}</td>
                <td>{{ item.numFiche }}</td>
                <td>
                  <a @click="deleteFicheTechnique(item.filename, i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editFicheTechnique(item._id)"><i class="fa-solid fa-pen-to-square"></i></a>
                  <a @click="certficatFicheTechnique(item.filename)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedFicheTechniques.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteFicheTechniques()">
            </div>

      </div>



    <!--  Start Edit Inspecteur   -->
    <EditFicheTechnique :fichetechniqueId="fichetechniqueId" v-if="flagEditFicheTechnique == true" />
    <!--  End Edit Inspecteur   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditFicheTechnique from "./EditFicheTechnique.vue";
export default {
  name: "gestionEtalonage",
  components: {
    EditFicheTechnique,
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      fichetechniques: [],
      checkedFicheTechniques : [],
      flagEditFicheTechnique : false,
      fichetechniqueId : null
    };
  },

  computed : {
          filterFicheTechniques() {
            return this.fichetechniques.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.designation.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.marque.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.identification.toString().indexOf(this.rechercher.toString()) ||
                !item.numFiche.toLowerCase().toString().indexOf(this.rechercher.toString());
          })
      }
  },
  methods: {

    // display Certificate Fiche Technique
    certficatFicheTechnique(filename) {
          Service.displayFicheTechnique(filename)
          .then((result) => {
              console.log(result);
          })
          .catch((error) => {
              console.log(error)
          });

    },

    // delete more one Interlocuteur (interlocuteurs)
    deleteFicheTechniques() {

          // // Delete in Fron-end
          for(let i = 0; i < this.checkedFicheTechniques.length; i++ ) {
            let indexFicheTechniques = this.fichetechniques.indexOf(this.checkedFicheTechniques[i]);
            //delete in front end
            this.fichetechniques.splice(indexFicheTechniques, 1);
          }

          //    //  delete in db backend
          Service.deleteFicheTechnique(this.checkedFicheTechniques)
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
    deleteFicheTechnique(filename, i) {
      this.fichetechniques.splice(i, 1);
      Service.deleteFicheTechnique(filename)
      .then((result) => {
            this.msg = result.data.msg;
      })
      .catch((error) => {
            this.msg = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
      });
    },

    // edit one Fiche Technique
    editFicheTechnique (ficheTechniqueId) {
      this.flagEditFicheTechnique = true;
      this.fichetechniqueId = ficheTechniqueId;
    },

  },

  created() {
      Service.readFicheTechnique()
      .then((result) => {
        this.fichetechniques = result.data.ficheTechniques;
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
    padding: 10px 0;
    border-right:1px solid white;
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
.fa-trash {
  color: red;
  font-size: 19px;
}

.fa-pen-to-square {
  color: rgb(255, 136, 0);
  font-size: 20px;
}

.fa-file-pdf {
  color: rgb(238, 0, 206);
  font-size: 22px;
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
    border-bottom: 1px solid #888888;
    text-transform: capitalize;
}

table{
  border-collapse: collapse;
}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
  padding: 2px;
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
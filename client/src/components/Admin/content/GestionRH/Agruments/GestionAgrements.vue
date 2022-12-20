<template>

    <div class="gestionInspecteur">

      <h3 v-if="flagEditArgement == false" >LISTE DES AGRÉMENT</h3>

      <p v-if="succes && flagEditArgement == false" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec && flagEditArgement == false" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditArgement == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Agrément">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Agrément</th>
                <th>Ministre</th>
                <th>Date d'agrément</th>
                <th>Pupli/ Bulletin O/ N° A</th>
                <th>Status</th>
                <th>validité</th>
                <th>Date D'ex</th>
                <th>Date de Re</th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in filterArgements" :key="item._id">
                <td><input type="checkbox" :value="item.filename" v-model="checkedArgements" style="width: 20px;"></td>
                <td>{{ item.nomArgument  }}</td>
                <td>{{ item.nomMinistre }}</td>
                <td>{{  new Date(item.dateArgument).toLocaleDateString() }}</td>
                <td>{{ item.preuve }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.duree }}</td>
                <td>{{  new Date(item.dateExpiration).toLocaleDateString() }}</td>
                <td>{{  new Date(item.dateRenouvellement).toLocaleDateString() }}</td>
                <td>
                  <a @click="deleteArgement(item.filename, i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editAgrement(item._id)"><i class="fa-solid fa-pen-to-square"></i></a>
                  <a @click="certficatArgement(item.filename)"><i class="fa-solid fa-file-pdf"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedArgements.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteAgrements()">
            </div>

      </div>

    <EditAgrements :argementId="argementId" v-if="flagEditArgement == true" />
  </div>



</template>

<script>
import Service from "../../../../../Service";
import EditAgrements from "./EditAgrements.vue";
export default {
  name: "gestionEtalonage",
  components: {
    EditAgrements
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      checkedArgements : [],
      flagEditArgement : false,
      argementId : null,
      argements : []
    };
  },

  computed : {
            filterArgements() {
            return this.argements.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nomArgument.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.nomMinistre.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.metier.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.preuve.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.status.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.duree.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.dateArgument.indexOf(this.rechercher.toString()) ||
                !item.dateExpiration.indexOf(this.rechercher.toString()) ||
                !item.dateExpiration.indexOf(this.rechercher.toString()) ||
                !item.dateRenouvellement.toLowerCase().toString().indexOf(this.rechercher.toString())
            })
      }
  },

  methods: {

    // display Certificate Argement
    certficatArgement(filename) {
          Service.displayAgrement(filename)
          .then((result) => {
              console.log(result);
          })
          .catch((error) => {
              console.log(error)
          });

    },

    // delete more one Argement (Argement)
    deleteAgrements() {

          // // Delete in Fron-end
          for(let i = 0; i < this.checkedArgements.length; i++ ) {
            let indexEtalonnage = this.argements.indexOf(this.checkedArgements[i]);
            //delete in front end
            this.argements.splice(indexEtalonnage, 1);
          }

          //    //  delete in db backend
          Service.deleteArgement(this.checkedArgements)
            .then((response) => {
                  console.log(response);
            })
            .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
            });

    },

    // delete one Argement
    deleteArgement(filename, i) {
      this.argements.splice(i, 1);
      Service.deleteArgement(filename)
      .then((result) => {
            console.log(result.data.msg);
            this.msg = result.data.msg;
      })
      .catch((error) => {
            this.msg = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
      });
    },

    // edit one client
    editAgrement(argementId) {
      this.flagEditArgement = true;
      this.argementId = argementId;
    },

  },

  created() {
      Service.readAgrements()
      .then((result) => {
        this.argements = result.data.agrements;
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

.gestionInspecteur{
  width: 100%;
  padding:5px;
}
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
    padding: 5px;
}

.gestionInspecteur .rechercher-table table tr td {
    background-color: #ddd;
    color: black;
    padding: 5px;
}
.gestionInspecteur .rechercher-table table tr td a {
  cursor: pointer;

  margin-right: 5px;
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
  font-size: 18px;
}

#inspecteurs > tr > td:nth-child(10) > a:nth-child(2) > svg  {
  color: rgb(255, 166, 0);
  font-size: 18px;
}

#inspecteurs > tr > td:nth-child(10) > a:nth-child(3) > svg  {
  color: rgb(195, 0, 255);
  font-size: 22px;
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
    color: #243064;
    border-bottom: 1px solid #243064;
}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
  padding:2px;
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
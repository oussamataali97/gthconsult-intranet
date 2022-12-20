<template>

    <div class="gestionInspecteur">

      <h3 v-if="flagEditSalarie == false" ><i class="fa-solid fa-users"></i> GESTION DES FICHES COLLABORATEURS</h3>

      <p v-if="succes && flagEditSalarie == false" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec && flagEditSalarie == false" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditSalarie == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Interlocuteur">
            </div>

            <table id="inspecteurs">
              <thead>
              <tr>
                <th> </th>
                <th>Nom</th>
                <th>prénom</th>
                <th>CIN/PASSPORT</th>
                <th>Telephone</th>
                <th>Email</th>
                <th>CIN</th>
                <th>Diplôme</th>
                <th>Photo</th>
                <th>Documents, A</th>
                <th>D, Médical</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in filterSalaries" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedSalaries" style="width: 20px;"></td>
                <td>{{ item.nom }}</td>
                <td>{{ item.prenom }}</td>
                <td>{{ item.identite }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.email }}</td>
                <td>
                  <a @click="certficatSalarie(item.cin)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
                <td>
                  <a @click="certficatSalarie(item.diplome)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
                <td>
                  <a @click="certficatSalarie(item.photo)"><i class="fa-solid fa-image"></i></a>
                </td>
                <td>
                  <a @click="certficatSalarie(item.autres)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
                <td>
                  <a @click="certficatSalarie(item.medical)"><i class="fa-regular fa-file-pdf"></i></a>
                </td>
                <td>
                  <a @click="deleteSalarie(item.cin, item.diplome, item.photo, item.autres, item.medical, i, item._id)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editSalarie(item._id)"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
              </tr>
            </tbody>
            </table>

            <div class="deleteAll" v-show="checkedSalaries.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteSalaries()">
            </div>

      </div>



    <ul class="pagination" v-if="flagEditSalarie == false">
             <button><i class="fa-solid fa-backward"></i></button>

        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
    </ul>

    <!--  Start Edit Inspecteur   -->
    <EditSalarie :salarieId="salarieId" v-if="flagEditSalarie == true" />
    <!--  End Edit Inspecteur   -->

  </div>

</template>

<script>
import Service from "../../../../../Service";
import EditSalarie from "./EditSalarie.vue";
export default {
  name: "gestionEtalonage",
  components: {
    EditSalarie,
  },
  data() {
    return {
      pageIndex : 0,
      itemsPerPage : 10,
      numberPage: null,
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      preSalaries : [],
      salaries: [],
      checkedSalaries : [],
      flagEditSalarie : false,
      salarieId : null
    };
  },

  computed : {
          filterSalaries() {
            return this.salaries.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.prenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.cin.toLowerCase().toString().indexOf(this.rechercher.toString()) ||
                !item.telephone.toString().indexOf(this.rechercher.toString());
          })
      }
  },
  methods: {

    selectPage(value) {

      const select = value - 1;
      this.salaries = [];
      for(let i = select * this.itemsPerPage; i < (select * this.itemsPerPage) + this.itemsPerPage; i++) {
          this.salaries.push(this.preSalaries[i]);
      }
    },

    // display Certificate Fiche Salarie
    certficatSalarie(filename) {
          console.log(filename);
          Service.displaySalarie(filename)
          .then((result) => {
              console.log(result);
          })
          .catch((error) => {
              console.log(error)
          });

    },

    // delete more one Salaries (Salaries)
    deleteSalaries() {

          var salariesId = [];
          var cins = [];
          var diplomes = [];
          var photos = [];
          var autress = [];
          var medicals = []

          // Delete in Fron-end
          for(let i = 0; i < this.checkedSalaries.length; i++ ) {

            let indexSalaries = this.salaries.indexOf(this.checkedSalaries[i]);

            console.log(this.salaries[indexSalaries]._id)
            salariesId.push(this.salaries[indexSalaries]._id);
            cins.push(this.salaries[indexSalaries].cin);
            diplomes.push(this.salaries[indexSalaries].diplome);
            photos.push(this.salaries[indexSalaries].photo);
            autress.push(this.salaries[indexSalaries].autres);
            medicals.push(this.salaries[indexSalaries].medical);

          }

          // Delete in Fron-end
          for(let i = 0; i < this.checkedSalaries.length; i++ ) {
            let indexSalaries = this.salaries.indexOf(this.checkedSalaries[i]);
            //delete in front end "client"
            this.salaries.splice(indexSalaries, 1);
          }

          //  delete in db backend
          Service.deleteSalaries(cins, diplomes, photos, autress, medicals,  salariesId)
            .then((response) => {
                  console.log(response);
            })
            .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
            });

    },

    // delete one Salarie
    deleteSalarie(cin, diplome, photo, autres, medical, i, salarieId) {
      this.salaries.splice(i, 1);
      Service.deleteSalarie(cin, diplome, photo, autres, medical, salarieId)
      .then((result) => {
            this.msg = result.data.msg;
      })
      .catch((error) => {
            this.msg = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
      });
    },

    // edit one Fiche Salarie
    editSalarie (salarieId) {
      this.flagEditSalarie = true;
      this.salarieId = salarieId;
    },

  },

  created() {
      Service.readSalaries()
      .then((result) => {

            result.data.salaries.forEach((element) => {
                this.preSalaries.push(element);
            });

            this.numberPage = Math.ceil(this.preSalaries.length / this.itemsPerPage);

            for(let i = this.pageIndex * this.itemsPerPage; i < (this.pageIndex * this.itemsPerPage) + this.itemsPerPage; i++) {
                this.salaries.push(this.preSalaries[i]);
            }

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
    padding: 5px;
}

.gestionInspecteur .rechercher-table table tr td {

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
}

.fa-pen-to-square {
  color: rgb(233, 159, 0);
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

table tbody td {
    color: #000000;
    border-bottom: 1px solid #acacac;
  text-transform: capitalize !important;
}

table tbody tr:nth-child(odd) {
  background-color: rgb(247, 247, 247);

}

#app > div > div > div.menu-content > div.content > div {
  background-color: white;
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

.fa-file-pdf{
  font-size: 22px;
  color:rgb(187, 0, 194);
}

table{
  border-collapse: collapse;
}

.fa-image{
  font-size: 22px;
  color:rgb(8, 106, 136);
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
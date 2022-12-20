<template>

    <div class="gestionInspecteur">

      <h3 v-if="flagEditCompetence == false" >LISTE DES INFORAMTIONS TECHNIQUES QUALIFICATIONS</h3>

      <p v-if="succes && flagEditCompetence == false" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec && flagEditCompetence == false" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditCompetence == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Comptence">
            </div>

            <table id="inspecteurs">
              <thead>
              <tr>

                <th> </th>
                <th>Nom & Prénom</th>
                <th>Date Formation</th>
                <th>métiers</th>
                <th>Domaine ou Famille</th>
                <th>Modele de Foramtion</th>
                <th>Qualification</th>
                <th>Avis DT</th>
                <th>Telecharger P.J</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in competences" :key="item._id">
                <td><input type="checkbox" :value="item.filename" v-model="checkedCompetences" style="width: 20px;"></td>
                <td>{{ item.nom +" "+ item.prenom  }}</td>
                <td>{{  new Date(item.dateFormation).toLocaleDateString() }}</td>
                <td>{{ item.metier }}</td>
                <td>{{ item.domaineFamille }}</td>
                <td>{{ item.moduleFormation }}</td>
                <td>{{ item.qualification }}</td>
                <td> Avis DT </td>
                <td>
                  <a @click="deleteCompetence(item.filename, i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editCompetence(item._id)"><i class="fa-solid fa-pen-to-square"></i></a>
                  <a @click="certficatCompetence(item.filename)"><i class="fa-solid fa-file-pdf"></i></a>
                </td>
              </tr>
            </tbody>
            </table>

            <div class="deleteAll" v-show="checkedCompetences.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteCompetences()">
            </div>

      </div>

    <!--  Start Edit Competence   -->
    <EditCompetence :competenceId="competenceId" v-if="flagEditCompetence == true" />
    <!--  End Info Competence   -->
  </div>

</template>

<script>
import Service from "../../../../../Service";
import EditCompetence from "./EditCompetence.vue";
export default {
  name: "gestionEtalonage",
  components: {
    EditCompetence
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      etalonnages: [],
      checkedCompetences : [],
      flagEditCompetence : false,
      competencesId : null,
      competences : []
    };
  },

  computed : {
            filterCompetences() {
            return this.competences.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.prenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.metier.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.domaineFamille.toString().indexOf(this.rechercher.toString()) ||
                !item.moduleFormation.toLowerCase().toString().indexOf(this.rechercher.toString()) ||
                !item.qualification.toString().toLowerCase().indexOf(this.rechercher.toString().toLowerCase())
            })
      }
  },
  methods: {

    // display Certificate Competence
    certficatCompetence(filename) {
          Service.displayCompetence(filename)
          .then((result) => {
              console.log(result);
          })
          .catch((error) => {
              console.log(error)
          });

    },

    // delete more one Competence (Competence)
    deleteCompetences() {

          // // Delete in Fron-end
          for(let i = 0; i < this.checkedCompetences.length; i++ ) {
            let indexEtalonnage = this.competences.indexOf(this.checkedCompetences[i]);
            //delete in front end
            this.competences.splice(indexEtalonnage, 1);
          }

          //    //  delete in db backend
          Service.deleteCompetence(this.checkedCompetences)
            .then((response) => {
                  console.log(response);
            })
            .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
            });

    },

    // delete one Competence
    deleteCompetence(filename, i) {
      this.competences.splice(i, 1);
      Service.deleteCompetence(filename)
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
    editCompetence (competenceId) {
      this.flagEditCompetence = true;
      this.competenceId = competenceId;
    },

  },

  created() {
      Service.readCompetences()
      .then((result) => {
        this.competences = result.data.competences;
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

    color: black;
    padding: 5px;
    text-transform: capitalize;
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
  color: rgb(255, 196, 0);
}

.fa-circle-check {
  color: green;
}
.fa-file-pdf {
  color: rgb(18, 133, 168);
  font-size: 19px;
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

table{
  border-collapse: collapse;
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
    color: #000000;
    border-bottom: 1px solid #102170;
}

table tbody tr:nth-child(even) {
  background-color: rgb(240, 240, 240);
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
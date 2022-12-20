<template>

    <div class="gestionInspecteur">

      <h3  v-if="flagEditFournisseur == false">FICHES DES FOURNISSEUR</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditFournisseur == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un fournisseur">
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
                <th>Activité</th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in filterFournisseurs" :key="i">
                <td><input type="checkbox" :value="item._id" v-model="checkedFournisseurs" style="width: 20px;"></td>
                <td>{{ item.raisonSocial }}</td>
                <td>{{ item.formJuridique }}</td>
                <td>{{ item.ville }}</td>
                <td>{{ item.codePostal }}</td>
                <td>{{ item.pays }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.ice }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.activite }}</td>
                <td>
                  <a @click="deleteFournisseur(i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editFournisseur(i)"><i class="fa-solid fa-pen-to-square"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedFournisseurs.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteFournisseurs()">
            </div>

      </div>

      <ul class="pagination">
               <button><i class="fa-solid fa-backward"></i></button>

        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
      </ul>



    <!--  Start Edit SousTraitance   -->
    <EditFournisseur :fournisseurId="fournisseurId" v-if="flagEditFournisseur == true" />
    <!--  End Edit SousTraitance   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditFournisseur from "./EditFournisseur.vue";
export default {
  name: "gestionInterlocuteur",
  components: {
    EditFournisseur,
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
      preFournisseurs : [],
      fournisseurs: [],
      flagEditFournisseur: false,
      checkedFournisseurs : [],
      fournisseurId : null,
    };
  },

  computed : {
            filterFournisseurs() {
            return this.fournisseurs.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.raisonSocial.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.formJuridique.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.ville.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.codePostal.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.pays.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.email.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.ice.toString().indexOf(this.rechercher.toString()) ||
                !item.telephone.toString().indexOf(this.rechercher.toString()) ||
                !item.activite.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString())
            })
      }
  },
  methods: {

    selectPage(value) {

      const select = value - 1;
      this.fournisseurs = [];
      for(let i = select * this.itemsPerPage; i < (select * this.itemsPerPage) + this.itemsPerPage; i++) {
          this.fournisseurs.push(this.preFournisseurs[i]);
      }
    },

    update() {
      Service.updateFournisseur(this.fournisseur, this.fournisseurId)
      .then((response) => {
          this.traitement = true;
          this.msgFournisseur = "Veuillez patienter quelques secondes pour enregister";
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

    // delete more one Fournisseurs
    deleteFournisseurs() {
      alert("Voulez-vous vraiment supprimer ?");

          // // Delete in Fron-end
          for(let i = 0; i < this.checkedFournisseurs.length; i++ ) {
            let indexClient = this.fournisseurs.indexOf(this.checkedFournisseurs[i]);
            //delete in front end
            this.fournisseurs.splice(indexClient, 1);
          }

          //    //  delete in db backend
          Service.deleteFournisseur(this.checkedFournisseurs)
              .then((response) => {
                  console.log(response);
              })
              .catch((error) => {
                  this.msg = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
              });

    },

    // delete one Fournisseur
    deleteFournisseur(i) {
      alert("Voulez-vous vraiment supprimer ?");
      this.fournisseurId = this.fournisseurs[i]._id;
      this.fournisseurs.splice(i, 1);
      Service.deleteFournisseur(this.fournisseurId)
      .then((result) => {
        this.msg = result.data.msg;
      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });
    },

    // edit one Fournisseur
    async editFournisseur(i) {
        this.flagEditFournisseur = true;
        this.fournisseurId = this.fournisseurs[i]._id;
    },


    },
//clients
  created() {

      Service.readFournisseur()
      .then((result) => {

        result.data.fournisseurs.forEach(element => {
          this.preFournisseurs.push(element);
        });

        this.numberPage = Math.ceil(result.data.fournisseurs.length / this.itemsPerPage);

        for(let i = this.pageIndex * this.itemsPerPage; i < (this.pageIndex * this.itemsPerPage) + this.itemsPerPage; i++) {
             this.fournisseurs.push(this.preFournisseurs[i]);
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
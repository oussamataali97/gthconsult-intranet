<template>
<!-- interlocuteurSousTraitanceId -->
    <div class="gestionInspecteur">

      <h3>FICHE DEMANDE UN ACHAT FOURNISSEUR</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un achat de fournisseur">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Raison Sociale de Fournisseur</th>
                <th>Forme juridique</th>
                <th>Ville</th>
                <th>Code Postal</th>
                <th>Email</th>
                <th>ICE</th>
                <th>Téléphone</th>
                <th>Activités</th>
                <th>Demandeur</th>
                <th>Locataire matériel</th>
                <th>Actions</th>
              </tr>


              <tr v-for="(item, i) in filterFournisseurs" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedFournisseurs" style="width: 20px;"></td>
                <td>{{ item.raisonSocial }}</td>
                <td>{{ item.formJuridique }}</td>
                <td>{{ item.ville }}</td>
                <td>{{ item.codePostal }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.ice }}</td>
                <td>{{ item.telephone }}</td>
                <td>{{ item.activite }}</td>
                <td>{{ item.demandeur }}</td>
                <td>{{ item.locataireMateriel }}</td>
                <td>
                  <a @click="deleteAchatFournisseur(i)"><i class="fa-solid fa-trash"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedFournisseurs.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteAchatFournisseurs()">
            </div>

      </div>



  </div>

</template>

<script>
import Service from "../../../../../../Service";
export default {
  name: "gestionInterlocuteur",
  components: {
  },
  data() {
    return {
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      fournisseurs: [],
      checkedFournisseurs : [],
      fournisseursId : null,
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
                !item.email.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.codePostal.indexOf(this.rechercher) ||
                !item.ice.indexOf(this.rechercher) ||
                !item.telephone.indexOf(this.rechercher) ||
                !item.activite.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.demandeur.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.locataireMateriel.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString())
            })
      }
  },
  methods: {

    // delete more one Interlocuteur (interlocuteurs)
    deleteAchatFournisseurs() {

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
    deleteAchatFournisseur(i) {
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

    //   Service.readInterlocuteurSousTraitance()
    //   .then((result) => {
    //     this.fournisseurs = result.data.fournisseurs;
    //   })
    //   .catch((error) => {
    //       this.msg = error.message;
    //       console.error(`HTTP error: ${error.name} => ${error.message}`);
    //       throw "fail request at: GET /refreshtime";
    //   });

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
  padding-top: 10px;
  padding-left: 10px;
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
    background-color: white;
    color: #243064;
    border-bottom: 1px solid #243064;
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
<template>

    <div class="gestionInspecteur">

      <h3  v-if="flagEditInterlocuteur == false">FICHES DES INTERLOCUTEURS</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table" v-if="flagEditInterlocuteur == false">

            <div class="rechercher">
                <input type="text" v-model="rechercher" placeholder="Recherche un Interlocuteur">
            </div>

            <table id="inspecteurs">
              <tr>
                <th> </th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>E-mail</th>
                <th>Fonction</th>
                <th>Téléphone</th>
                <th>Raison Social</th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in filterInterlocuteurs" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedInterlocuteurs" style="width: 20px;"></td>
                <td>{{ item.nom }}</td>
                <td>{{ item.prenom }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.fonction }}</td>
                <td>{{ item.telephone }}</td>
                <td>
                     <p v-for="(client, index) in clients" :key="index">{{ item.clientId == client._id  ? client.raisonSocial : '' }}</p>
                </td>
                <td>
                  <a @click="deleteInterlocuteur(i)"><i class="fa-solid fa-trash"></i></a>
                  <a @click="editInterlocuteur(i)"><i class="fa-solid fa-pen-to-square"></i></a>
                  <a v-show="item.status == false" @click="valideInterlocuteur(item._id, i)"><i class="fa-solid fa-check"></i></a>
                  <a v-show="item.status == true" @click="invalideInterlocuteur(item._id, i)"><i class="fa-solid fa-xmark"></i></a>
                  <a v-show="item.send == false" @click="sendEmailInterlocuteur(item._id , i)"><i class="fa-solid fa-envelope"></i></a>
                  <a v-show="item.send == true" @click="sendEmailInterlocuteur(item._id , i)"><i class="fa-solid fa-rotate-left"></i></a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedInterlocuteurs.length > 1">
              <input type="submit" value="Supprimer tout" @click="deleteInterlocuteurs()">
            </div>

      </div>

      <ul class="pagination" v-if="flagEditInterlocuteur == false">
        <button><i class="fa-solid fa-backward"></i></button>
        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
      </ul>


    <!--  Start Edit Inspecteur   -->
    <EditInterlocuteur :infoInterlocuteur="infoInterlocuteur" :raisonSocial="raisonSocial" v-if="flagEditInterlocuteur == true" />
    <!--  End Edit Inspecteur   -->

  </div>

</template>

<script>
import Service from "../../../../Service";
import EditInterlocuteur from "./EditInterlocuteur.vue";
export default {
  name: "gestionInterlocuteur",
  components: {
    EditInterlocuteur,
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
      infoInterlocuteur: [],
      preInterlocuteurs : [],
      interlocuteurs: [],
      flagEditInterlocuteur: false,
      checkedInterlocuteurs : [],
      raisonSocial : null,
      clients : [],
      clientId : null
    };
  },

  computed : {
            filterInterlocuteurs() {
            return this.interlocuteurs.filter((item) => {
              if(!this.rechercher)
              {
                return item
              }
                return !item.nom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.prenom.toLowerCase().toString().indexOf(this.rechercher.toLowerCase().toString()) ||
                !item.telephone.toString().indexOf(this.rechercher.toString()) ||
                !item.email.toLowerCase().toString().indexOf(this.rechercher.toString()) ||
                !item.fonction.toString().toLowerCase().indexOf(this.rechercher.toString().toLowerCase())
            })
      }
  },
  methods: {

    selectPage(value) {

      const select = value - 1;
      this.interlocuteurs = [];
      for(let i = select * this.itemsPerPage; i < (select * this.itemsPerPage) + this.itemsPerPage; i++) {
          this.interlocuteurs.push(this.preInterlocuteurs[i]);
      }
    },

    sendEmailInterlocuteur(interlocuteurId, index) {
      alert("Voulez-vous vraiment Envoyer Mail à l'interlocuteur ?");
        Service.SendEmailInterlocuteur(interlocuteurId)
        .then(() => {
          this.interlocuteurs[index].send = true;
        })
        .catch((error) => {
            console.log(error);
        });

    },


    valideInterlocuteur(interlocuteurId, index) {
        Service.ValideInterlocuteur(interlocuteurId)
        .then((result) => {
            if(result) {
              this.interlocuteurs[index].status = true;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    },

    // delete more one Interlocuteur (interlocuteurs)
    deleteInterlocuteurs() {
      alert("Voulez-vous vraiment supprimer ?");
          // // Delete in Fron-end
          for(let i = 0; i < this.checkedInterlocuteurs.length; i++ ) {
            let indexClient = this.interlocuteurs.indexOf(this.checkedInterlocuteurs[i]);
            //delete in front end
            this.interlocuteurs.splice(indexClient, 1);
          }

          //    //  delete in db backend
          Service.deleteInterlocuteur(this.checkedInterlocuteurs)
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
    deleteInterlocuteur(i) {
      alert("Voulez-vous vraiment supprimer ?");
      const idInterlocuteur = this.interlocuteurs[i]._id;
      this.interlocuteurs.splice(i, 1);
      Service.deleteInterlocuteur(idInterlocuteur)
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
    async editInterlocuteur (i) {
      this.clientId = await this.interlocuteurs[i].clientId;
      Service.selectClient(this.clientId)
        .then(async (result) => {
          this.raisonSocial = await result.data.client.raisonSocial;
          this.infoInterlocuteur.push(this.interlocuteurs[i])
          this.flagEditInterlocuteur = true;
        })
        .catch((error) => {
            this.msg = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
        });

    },

    // edit one client
    invalideInterlocuteur(interlocuteurId, index) {

      Service.InvalideInterlocuteur(interlocuteurId)
        .then((result) => {
            if(result) {
              this.interlocuteurs[index].status = false;
            }
        })
        .catch((error) => {
            console.log(error);
        });
    },


    },

  created() {

      Service.readInterlocuteur()
      .then((result) => {

        result.data.interlocuteurs.forEach(element => {
          this.preInterlocuteurs.push(element);
        });

        this.numberPage = Math.ceil(result.data.interlocuteurs.length / this.itemsPerPage);

        for(let i = this.pageIndex * this.itemsPerPage; i < (this.pageIndex * this.itemsPerPage) + this.itemsPerPage; i++) {
             this.interlocuteurs.push(this.preInterlocuteurs[i]);
        }

      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });

      // Read all clients
      Service.readClient()
      .then((result) => {
        this.clients = result.data.clients;
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
    padding: 10px 2px;
    border-right: 1px solid white;
}
table{
  border-collapse: collapse;
}
.gestionInspecteur .rechercher-table table tr td {
    color: black;
    padding: 5px;
}


.gestionInspecteur .rechercher-table table tr:nth-child(even) {
  background-color: #f5f5f5;
}
.gestionInspecteur .rechercher-table table tr td a {
  cursor: pointer;
  margin-right: 5px;
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
    border-bottom: 1px solid #888888;
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
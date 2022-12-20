<template>
  <div class="admin">

    <div class="header">
      <Nav />
    </div>


    <div class="container">

      <div class="menu-content">
        <div class="menu">
        </div>
        <div class="content">

          <h3>Gestion des Notes de Frais</h3>


          <div class="rechercher">
            <input type="text" v-model="rechercher" placeholder="Recherche un note de frais de l'inspecteur">
          </div>

          <div class="list">
            <table class="content-table">
              <thead>
                <tr>
                  <th>Période déplacement </th>
                  <th>Date D'édition</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Justificatifs</th>
                  <th>Prix Total</th>
                  <th>Processus de Validation</th>
                  <th>Etat de Paiment</th>
                  <th>Date de Paiment</th>
                  <th>Actions</th>
                  <th>Notification</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="(index, i) in filterFrais" :key="index._id">
                  <td>{{ index.mois + '/' + index.annee }}</td>
                  <td> {{ new Date(index.date).toLocaleDateString() }}</td>
                  <td>{{ index.nom }}</td>
                  <td>{{ index.prenom }}</td>
                  <td>
                    <li @click="generateWord(index._id, index.nom, index.prenom)"><i class="fa-solid fa-file-word"></i></li>
                    <li @click="generatexslx(index._id)"><i class="fa-solid fa-file-excel"></i></li>
                  </td>
                  <td>{{ index.totalGeneral }} DH</td>
                  <td>
                    <button type="submit" :class="index.valideRH ? 'succesButton' : 'echecButton'" @click="validerh(index._id, i)">Validation par DT - RH </button>
                    <button type="submit" v-if="index.valideRH" :class="index.valideDIR ? 'succesButton' : 'echecButton'" @click="validedir(index._id, i)">Validation Administration</button>
                  </td>

                  <td>
                    <select v-model="frais[i].typePaiment" v-if="frais[i].valideDIR == true" :disabled="index.etatPaiment">
                      <option v-for="name in categoryPaiment" :key="name" :value="name"> {{ name }} </option>
                    </select>
                    <input type="text" v-model="frais[i].refTransaction" v-if="frais[i].valideDIR == true" :disabled="index.etatPaiment">
                    <button class="confirmer" v-if="frais[i].valideDIR == true && frais[i].etatPaiment == false" type="button" value="valider" @click="paiment(index._id, i)"><i class="fa-solid fa-circle-check"></i></button>
                    <button class="supprimer" v-if="frais[i].etatPaiment == true" type="button" value="supprimer" @click="supprimerPaiment(index._id)"><i class="fa-solid fa-trash"></i></button>
                  </td>

                  <td>
                    <input type="date" v-model="frais[i].datePaiment" v-if="index.valideDIR == true && index.validerDatePaiment == false" :disabled="index.validerDatePaiment">
                    <span v-if="index.validerDatePaiment == true">{{ new Date(frais[i].datePaiment).toLocaleDateString() }}</span>
                    <button class="confirmer" v-if="index.valideDIR == true && index.validerDatePaiment == false" type="button" value="confirmer" @click="paimentDate(index._id, i)"><i class="fa-solid fa-circle-check"></i></button>
                  </td>

                  <td>
                    <button type="submit" @click="supprimerFrais(index._id, index.mois, index.annee, index.matricule, i)"><i class="fa-solid fa-trash-can"></i></button>
                  </td>

                  <td>
                    <li v-if="index.notification" @click="DeleteCheckNotificationFrais(index._id, i)"><i class="fa-solid fa-eye action"></i></li>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>


        </div>
      </div>

      <ul class="pagination">
              <button><i class="fa-solid fa-backward"></i></button>

        <li v-for="n in numberPage" :key="n" @click="selectPage(n)"><p>{{ n }}</p></li>
        <button><i class="fa-solid fa-forward"></i></button>
      </ul>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Admin/Nav.vue";
import Service from "../Service";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");



export default {
  name: "admin",
  data() {
    return {
      pageIndex : 0,
      itemsPerPage : 10,
      numberPage: null,
      preFrais : [],
      frais: [],
      rechercher: null,
      etatPaiment: [],
      refTransaction: [],
      datePaiment: [],
      categoryPaiment: ["espèce", "virement", "chèque", "envoi"],
      nom: null,
      prenom: null,
      matricule: null
    };
  },
  components: {
    Nav
  },


  computed: {
    filterFrais() {
      return this.frais.filter((item) => {
        if (!this.rechercher) {
          return item;
        }
        let date = item.datePaiment.toLocaleDateString();
        return !item.nom.toLowerCase().indexOf(this.rechercher.toLowerCase()) || !item.prenom.toLowerCase().indexOf(this.rechercher.toLowerCase()) || !date.indexOf(this.rechercher);
      })
    }
  },


  methods: {

    selectPage(value) {

      const select = value - 1;
      this.frais = [];
      for(let i = select * this.itemsPerPage; i < (select * this.itemsPerPage) + this.itemsPerPage; i++) {
          this.frais.push(this.preFrais[i]);
      }
    },

    DeleteCheckNotificationFrais(id, i) {

      Service.deleteCheckNotificationFrais(id, this.matricule)
        .then((result) => {
          if (result) {
            this.frais[i].notification = false;
          }
        })
        .catch((error) => {
          console.log(error)
        });

    },

    formtDate(value) {
      return value.toLocaleDateString();
    },

    supprimerFrais(fraiId, mois, annee, matricule, i) {

      Service.SupprimerFrais(fraiId, mois, annee, matricule)
        .then((res) => {
          if (res) {
            this.frais.splice(i, 1);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    validerh(fraiId, i) {

      Service.validRH(fraiId, i)
        .then((res) => {
          if (res) {
            this.frais[i].valideRH = true;
            this.frais[i].etatPaiment = false;
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
    },

    validedir(fraiId, i) {

      Service.validDIR(fraiId)
        .then((res) => {
          if (res) {
            this.frais[i].valideDIR = true;
          }

        })
        .catch((error) => {
          console.log(error.message);
        })
    },

    paiment(fraiId, i) {

      Service.Paiment(fraiId, this.frais[i].typePaiment, this.frais[i].refTransaction)
        .then((res) => {
          if (res) {
            this.$router.go("/gestionfrais");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    supprimerPaiment(fraiId) {

      Service.SupprimerPaiment(fraiId)
        .then((res) => {
          if (res) {
            this.$router.go("/gestionfrais");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    paimentDate(fraiId, i) {
      Service.PaimentDate(fraiId, this.frais[i].datePaiment)
        .then((res) => {
          if (res) {
            this.$router.go("/gestionfrais");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    downloadFileExcel(response) {
      var newBlob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = data;
      link.download = "resume.xlsx";
      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    },

    downloadFileWord(response) {
      var newBlob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement("a");
      link.href = data;
      link.download = "resume.docx";
      link.click();
      setTimeout(function () {
        window.URL.revokeObjectURL(data);
      }, 100);
    },

    generatexslx(fraiId) {

      Service.GenerateXSLX(fraiId)
        .then((response) => {
          this.downloadFileExcel(response);
        })
        .catch((error) => {
          console.log(error.message)
        })

    },

    generateWord(fraiId, nom, prenom) {

      Service.generateWORD(fraiId, nom, prenom)
        .then((response) => {
          this.downloadFileWord(response);
        })
        .catch((error) => {
          console.log(error.message)
        })

    },
  },


  created() {

    if (!sessionStorage.getItem("token")) {
      this.$router.push("/")
    } else {

      // info account current
      this.nom = sessionStorage.getItem("nom");
      this.prenom = sessionStorage.getItem("prenom");
      this.matricule = sessionStorage.getItem("id");

      Service.Read()
        .then((response) => {

                response.data.result.forEach((element) => {
                  if(element.renseignerIntervention != 'false')
                  {
                    this.preFrais.push(element);
                  }
                });

                this.numberPage = Math.ceil(this.preFrais.length / this.itemsPerPage);

                for(let i = this.pageIndex * this.itemsPerPage; i < (this.pageIndex * this.itemsPerPage) + this.itemsPerPage; i++) {
                    this.frais.push(this.preFrais[i]);
                }

        })
        .catch((error) => {
          console.log(error.message);
        });

      // Stream for get Online users
      Service.Online(this.matricule)
        .then((result) => {
          if (result) {
            // Socket admins
            socket.on("admins", (msg) => {
              this.admins = msg;
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

  },

  destory() {
    // reject online
    Service.rejectOnline(sessionStorage.getItem("id"))
      .then((result) => {
        console.log(result.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }



};
</script>

<style scoped>
.admin {
  min-width: max-content;

}


.admin .container .header {
  width: 100%;

  padding: 0px;
  margin: 0px;
}


.admin .container .menu-content .content {
  width:100%;
  height: 100%;

}

.admin .container .menu-content .content .list {
  width: 100%;

}

.admin .container .menu-content .content .list .content-table {
  overflow-y: auto;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  width: 100%;


}

#app>div>div>div.menu-content>div.content>div.rechercher {

  display: flex;

  justify-content: center;
  margin: 20px auto;

}

.confirmer {
  border: 0;
  color: #096900;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
}

.confirmer:hover {

  color: #3e8538;

}

.supprimer{
  border: 0;
  color: #ff0000;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
}

.supprimer:hover{

  color: #bd3a3a;

}

button {
  border: 0;

}

#app>div>div>div.menu-content>div.content>div.rechercher>input[type=text] {
  border: 1px solid #56c945;
  height: 40px;

  width: 400px;
  background-color: #bdf3061a;
  font-size: 15px;
  outline: 0px;
  padding: 10px;
  border-radius: 20px;
}


.admin .container .menu-content .content .list .content-table thead tr {

  background-color: red;
  color: white;
  font-weight: bold;

  text-align: left;

}

.admin .container .menu-content .content .list .content-table{
  min-width: max-content;
  overflow-y: scroll;
}

.admin .container .menu-content .content .list .content-table thead tr th {
  position: sticky;
  top: 0;
  background-color: #243064;
  z-index: 1000;
  color: white;
  padding: 10px 5px;
  border-right: 1px solid rgb(255, 255, 255);


}

.admin .container .menu-content .content .list .content-table tbody tr td {

  padding: 5px 5px;
  font-weight: 500;
  border-right: 1px solid rgb(199, 199, 199);

}





.admin .container .menu-content .content .list .content-table tbody tr:nth-child(odd) {
  background-color: rgb(240, 240, 240);
}










#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td>li {
  list-style: none;
  display: inline;
  margin-left: 10px;
}

#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td>li:nth-child(1)>svg {

  color: #1e6cfb;
  font-size: 20px;
  margin: auto;
  cursor: pointer;
}

#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td>li:nth-child(2)>svg {

  color: green;
  font-size: 20px;
  margin: auto;
  cursor: pointer;
}






#app>div>div>div.menu-content>div.content>div.list>table>thead>tr>th:nth-child(7) {
  text-align: center;
}




#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td:nth-child(8)>select {
  padding: 5px;
  border-radius: 20px;
  margin-right: 2px;
}

#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td:nth-child(8)>input[type=text] {
  padding: 5px;
  margin-right: 5px;
  width: 80px;

}





#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td:nth-child(9)>input[type=date] {

  padding: 5px;
  margin: 5px;
  width: 70%;


}



#app>div>div>div.menu-content>div.content>div.list>table>tbody>tr>td:nth-child(10)>button {
  border: 0;
  color: #ff0000;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  text-align: center;
}

.succesButton {

  background-color: #218514;
  padding: 5px 5px;
  border: 0px;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  margin: 2px;

}

.echecButton {

  background-color: #e42424;
  padding: 5px 5px;
  border: 0px;
  color: white;
  border-radius: 10px;
  cursor: pointer;

}


h3 {
width: 100%;

  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207, 31, 33, 1) 0%, rgba(24, 86, 161, 1) 100%);
  text-align: center;
  text-align: center;
  padding: 10px;
  font-size: 25px;
}

.fa-eye{
  color:rgb(255, 196, 0) !important;
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
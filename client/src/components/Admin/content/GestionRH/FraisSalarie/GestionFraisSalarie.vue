<template>
  <div class="admin">
    <div class="container">
      <div class="menu-content">
        <div class="content">

                <h3> SITUATION NOTE DE FRAIS</h3>

                <div class="info">

                    <div class="searchBox">
                        <!-- Label Annee -->
                        <label for="nom">Année: </label>
                        <select v-model="annee" @change="selectAnnee">
                            <option v-for="index in annee" :key="index" :value="index" > {{ index }} </option>
                        </select>
                        <label for="Nom">Nom et Prénom </label>
                        <select v-model="inspecteur" @change="selectInspecteur">
                            <option v-for="index in inspecteurs" :key="index._id" :value="index._id" > {{ index.nom+" "+index.prenom }} </option>
                        </select>
                        <button @click="telecharger(inspecteur, annee)">Télécharger Document</button>

                    </div>

                </div>


                <!-- Start liste -->
                <div class="list">
                  <div class="rechercher-table">

                  <table class="content-table">
                    <thead>
                      <tr>
                        <th>MOIS</th>
                        <th>AVANCE</th>
                        <th>FRAIS DE DÉPOSE</th>
                        <th>DOTATION</th>
                        <th>MODE</th>
                        <th>DATE</th>
                        <th>REFERENCE</th>
                        <th>RESTE AVANCE</th>
                        <th>RESTE A PAYER</th>
                        <th>TOTAL A PAYER</th>

                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(index, i) in listFrais" :key="i">
                            <td>
                              {{ index[0].mois }}
                            </td>
                            <td>
                              <input type="number" v-model="index[0].avance" @keyup="avance(i)" :disabled = index[0].disabled>
                            </td>
                            <td>
                              <input type="number" v-model="index[0].fraisDepose" disabled>
                            </td>
                            <td>
                              <input type="number" v-model="index[0].fraisPayer" @keyup="fraispayer(i)" :disabled = index[0].disabled>
                            </td>
                            <td>
                              <input type="text" v-model="index[0].mode" disabled>
                            </td>
                            <td>
                              <input type="text" v-model="index[0].datePayer" disabled>
                            </td>
                            <td>
                              <input type="text" v-model="index[0].reference" :disabled = index[0].disabled>
                            </td>
                            <td>
                              <input type="number" v-model="index[0].resteAvance" disabled>
                            </td>
                            <td>
                              <input type="number" v-model="index[0].restePayer" disabled>
                            </td>

                            <td>
                              <input type="number" v-model="index[0].totalPayer" disabled>
                            </td>


                            <td>
                              <div class="buttoncontrol">
                                <p @click="sauvegarder(index[0]._id, i)"><i class="fa-solid fa-check"></i></p>
                                <p @click="supprimer(index[0]._id, i)"><i class="fa-solid fa-trash"></i></p>
                                <p @click="modifier(index[0]._id, i)"><i class="fa-solid fa-pen"></i></p>
                              </div>
                            </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
                <!-- End liste -->


          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Service from "../../../../../Service";

export default {
  name: "admin",
  data() {
    return {
      inspecteurs : [],
      listFrais : [],
      inspecteur : null,
      annee : null
    };
  },

  components: {

  },

  computed : {

  },

  methods: {

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
        setTimeout(function() {
            window.URL.revokeObjectURL(data);
        }, 100);
    },


        telecharger(inspecteur, annee) {
          Service.TelechargerSituationFrais(inspecteur, annee)
          .then((response) => {
              this.downloadFileExcel(response);
          })
          .catch((error) => {
            console.log(error.message)
          });
        },

        fraispayer(index) {

          this.listFrais[index][0].resteAvance = this.listFrais[index][0].avance - (this.listFrais[index][0].fraisDepose - this.listFrais[index][0].fraisPayer);
          this.listFrais[index + 1][0].avance = this.listFrais[index][0].resteAvance;

          this.listFrais[index][0].restePayer = this.listFrais[index][0].fraisDepose - this.listFrais[index][0].fraisPayer;


        },

        avance(index) {

          this.listFrais[index][0].resteAvance = this.listFrais[index][0].avance - (this.listFrais[index][0].fraisDepose - this.listFrais[index][0].fraisPayer);
          this.listFrais[index + 1][0].avance = this.listFrais[index][0].resteAvance;

          this.listFrais[index][0].restePayer = this.listFrais[index][0].fraisDepose - this.listFrais[index][0].fraisPayer;


        },

        sauvegarder(id, i) {
            Service.createFraisSalarie(id, i, this.annee, this.inspecteur, this.listFrais[i][0], this.listFrais[i + 1][0])
            .then((result) => {
              if(result) {
                  this.listFrais[i][0].disabled = true;
              }
            }).catch((error) => {
              console.log(error);
            });
        },

        supprimer(id, i) {
          Service.deleteFraisSalarie(id, i, this.annee, this.inspecteur, this.listFrais[i][0], this.listFrais[i + 1][0])
            .then((result) => {
              if(result) {

                  for(let j = i; j < 12; j++) {

                      this.listFrais[j][0].index = j;
                      this.listFrais[j][0].avance = 0;
                      this.listFrais[j][0].restePayer = 0;
                      this.listFrais[j][0].fraisDepose = 0;
                      this.listFrais[j][0].fraisPayer = 0;
                      this.listFrais[j][0].resteAvance = 0;
                      this.listFrais[j][0].totalPayer = 0;
                      this.listFrais[j][0].reference = "";
                      this.listFrais[j][0].disabled = false;
                  }

              }
            }).catch((error) => {
              console.log(error);
            });
        },

        modifier(id, i) {
                  this.listFrais[i][0].disabled = false;
        },

        telechargerAgendaWord() {
            console.log("Telecharger");
        },

        selectAnnee() {
            Service.getFraisSalarieYear(this.inspecteur, this.annee)
              .then((result) => {

                  if(result.data.situation != null) {
                    result.data.situation.liste.forEach((el, index) => {
                      this.listFrais[index][0].avance = el.avance;
                      this.listFrais[index][0].restePayer = el.restePayer;
                      this.listFrais[index][0].fraisPayer = el.fraisPayer;
                      this.listFrais[index][0].resteAvance = el.resteAvance;
                      this.listFrais[index][0].totalPayer = el.totalPayer;
                      this.listFrais[index][0].reference = el.reference;
                      this.listFrais[index][0].disabled = el.disabled;
                    });
                  }

                  var sommeFraisDepose = 0;
                  result.data.frais.forEach((element) => {
                      this.listFrais[element.mois - 1][0].fraisDepose = element.totalGeneral;
                      this.listFrais[element.mois - 1][0].datePayer = new Date(element.datePaiment).toISOString().slice(0, 10);
                      this.listFrais[element.mois - 1][0].mode = element.typePaiment;
                      sommeFraisDepose = sommeFraisDepose + element.totalGeneral;
                      this.listFrais[element.mois - 1][0].totalPayer = sommeFraisDepose;
                  });

              })
              .catch((error) => {
                console.log(error);
              });
        },

        selectInspecteur() {
            Service.getFraisSalarieYear(this.inspecteur, this.annee)
              .then((result) => {

                  if(result.data.situation != null) {
                    result.data.situation.liste.forEach((el, index) => {
                      this.listFrais[index][0].avance = el.avance;
                      this.listFrais[index][0].restePayer = el.restePayer;
                      this.listFrais[index][0].fraisPayer = el.fraisPayer;
                      this.listFrais[index][0].resteAvance = el.resteAvance;
                      this.listFrais[index][0].totalPayer = el.totalPayer;
                      this.listFrais[index][0].reference = el.reference;
                      this.listFrais[index][0].disabled = el.disabled;
                    });
                  }

                  var sommeFraisDepose = 0;
                  result.data.frais.forEach((element) => {
                      this.listFrais[element.mois - 1][0].fraisDepose = element.totalGeneral;
                      this.listFrais[element.mois - 1][0].datePayer = new Date(element.datePaiment).toISOString().slice(0, 10);
                      this.listFrais[element.mois - 1][0].mode = element.typePaiment;
                      sommeFraisDepose = sommeFraisDepose + element.totalGeneral;
                      this.listFrais[element.mois - 1][0].totalPayer = sommeFraisDepose;
                  });

              })
              .catch((error) => {
                console.log(error);
              });
        }
},

  created() {

      if(!sessionStorage.getItem("token"))
      {

        this.$router.push("/");

      } else {

          // info account current
          this.nom = sessionStorage.getItem("nom");
          this.prenom = sessionStorage.getItem("prenom");
          this.matricule = sessionStorage.getItem("id");
          this.status = sessionStorage.getItem("status");

          // Get all inspecteur and admin for caledrier
          Service.readAdmin()
          .then((response) => {
         // this.inspecteurs = response.data.admins;
            this.inspecteurs = response.data.admins.filter(el =>  el.status != "sousTraitance");
          })
          .catch((error) => {
            console.log(error.message);
          });

        // get date cuerrent
          var today = new Date();
          this.jour= String(today.getDate()).padStart(2, '0');
          this.mois = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          this.annee = today.getFullYear();


          for(let i = 0; i < 12; i++) {
            const date = new Date(this.annee, i, 1);
            this.listFrais.push([
                {
                        index : i,
                        mois : date.toLocaleString('fr-FR', {month: 'long'}),
                        avance: 0,
                        restePayer: 0,
                        fraisDepose: 0,
                        fraisPayer: 0,
                        resteAvance: 0,
                        totalPayer: 0,
                        mode: "",
                        reference: "",
                        datePayer: "",
                        disabled: false
              }
            ]);
          }
      }



},


};
</script>

<style scoped>
 .rechercher-table {
  width: 100%;

  color:black;
  overflow: auto;
}
 .rechercher-table .rechercher {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

}

 .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  outline: 0;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
  color :#243064;
}

 .rechercher-table table  {
  width: 100%;
}



.rechercher-table table thead tr th {
    background-color: #243064;
    color: white;
    border-right: 1px solid white;
    padding: 5px;

}

.rechercher-table table tbody tr:nth-child(odd) {

background-color: #f3f3f3;

}


.rechercher-table table tbody tr td {

    padding: 10px 5px;
    border-bottom: 1px solid rgb(131, 131, 131);


}

.rechercher-table table tbody tr td:first-child {

background-color: #243064;
color:white;
font-weight: 500;
text-transform: capitalize;
text-align: center;
border-right: 1px solid white;


}

table{
  border-collapse: collapse;
}

h3 {
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 25px;
}

input{
  width:100% ;
  max-width: 105px;
  padding:5px;
  border:1px solid rgb(187, 187, 187);
  border-radius: 5px;
}

.buttoncontrol{
  display: flex;
  justify-content: space-between;
}


input[disabled]{
border-radius: 20px;
}

.buttoncontrol p{
cursor: pointer;
font-size: 20px;
}

.buttoncontrol p:nth-child(1){
color:green;
}

.buttoncontrol p:nth-child(2){
color:red;
}

.buttoncontrol p:nth-child(3){
color:orange;
}

.searchBox{
  margin:10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchBox label {
  font-size: larger;
  margin-left: 10px;
  margin-right: 10px;
}

.searchBox button {
  margin-left: 10px;
  margin-right: 10px;
  background-color: #8ddfb78f;
  padding: 0.3rem 2rem;
  border: 0px;
  color: #0e6e01;
  border-radius: 5px;
  cursor: pointer;
  border-radius: 20px;
  height: 40px;
}

.searchBox select {
border-radius: 10px;
padding:10px;
  width: fit-content;
  border: 1px solid #bae8d2;
}


</style>
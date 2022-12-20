<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
        </div>
        <div class="content">

                <h3>Notes des Frais</h3>

                <div class="info">


                    <div>
                          <label for="nom">Mois: </label>
                          <select v-model="mois" @change="selectMois">
                            <option v-for="index in 12" :key="index" :value="index" > {{ index }} </option>
                          </select>
                        <label for="nom">Annee: </label>
                          <select v-model="annee" @change="selectMois">
                          <option v-for="index in (new Date().getFullYear())" :key="index" :value="index" > {{ index }} </option>
                          </select>
                    </div>

                </div>
                <p> {{ error }}</p>
                <div class="list">
                    <table class="content-table">
                      <thead>
                            <tr>
                                <th>J</th>
                                <th>D</th>
                                <th>Client</th>
                                <th>Lieu</th>
                                <th>Objet</th>
                                <th>Gasoil</th>
                                <th>Autoroute</th>
                                <th>Taxi</th>
                                <th>Train/Tram</th>
                                <th>Hôtel</th>
                                <th>Repas</th>
                                <th>Autre</th>
                                <th>Action</th>
                                <th>Référence</th>
                            </tr>
                      </thead>
                      <tbody>
                            <tr v-for="index in listDays" :key="index.number">
                                <td>{{ index.jour.charAt(0).toUpperCase()+index.jour.slice(1, 8) }}</td>
                                <td>{{ index.number + 1 }}</td>
                                <td><input type="text" v-model="index.client" :disabled="index.disabled"></td>
                                <td><input type="text" v-model="index.lieu" :disabled="index.disabled"></td>
                                <td><input type="text" v-model="index.objet" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.gasoil" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.autoroute" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.taxi" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.train" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.hotel" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.repas" :disabled="index.disabled"></td>
                                <td><input type="number" v-model="index.autre" :disabled="index.disabled"></td>
                                <td>
                                  <input type="button" value="Sauvegarder" v-if="index.disabled == 0" @click="sauvgarder(index.number)">
                                  <input type="button" value="Changer" v-if="index.flagSauvgarder" @click="changer(index.number)">
                                </td>
                                <td v-if="index._id">{{ index._id.substr(-6) }}</td>
                            </tr>
                            <tr>
                                <td colspan="5"> TOTAL GENERAL : {{ totalGeneral }} </td>
                                <td> {{ sommeGasoil }}</td>
                                <td> {{ sommeAutoroute }}</td>
                                <td> {{ sommeTaxi }}</td>
                                <td> {{ someTrain }} </td>
                                <td> {{ sommeHotel }} </td>
                                <td> {{ sommeRepas }} </td>
                                <td> {{ sommeAutre }} </td>
                            </tr>
                      </tbody>
                    </table>
                </div>


                <Traitement :msg="msgNoteFrais" v-if="traitement == true"/>
                <div class="validerBtn">
                <input  class="valider" id="valider" type="button" value="Valider" v-if="CheckMoisValiderorNO && buttonOk == false " @click="valider()">
                <input  class="valider" id="valider" type="button" value="Ok" v-if="buttonOk" @click="() => { this.$router.go(this.$router.currentRoute) }">
              </div>

          </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Admin/Nav.vue";
import Traitement from "@/components/Admin/content/Affaire/Traitement.vue";
import Service from "../Service";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");
export default {
  name: "admin",
  data() {
    return {
         jour: null,
         mois : null,
         annee : null,
         daysInCurrentMonth : null,
         nom: null,
         prenom: null,
         matricule: null,
         listDays : [],
         client :[],
         lieu: [],
         objet : [],
         gasoil: [],
         autoroute: [],
         taxi : [],
         train : [],
         hotel : [],
         repas :[],
         autre: [],
         disabled: [],
         flagSauvgarder: [],
         beneficiare : null,
         valideListDays: false,
         valideMounths: [],
         valideAnnee : [],
         idListDays : null,
         CheckMoisValiderorNO: false,
         traitement: false,
         msgNoteFrais: null,
         buttonOk: false,
         error : null
    };
  },

  components: {
    Nav,
    Traitement
  },

  computed : {



      sommeGasoil() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.gasoil);
        });
        return Somme;
      },

      sommeAutoroute() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.autoroute);
        });
        return Somme;
      },

      sommeTaxi() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.taxi);
        });
        return Somme;
      },

      someTrain() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.train);
        });
        return Somme;
      },

      sommeHotel() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.hotel);
        });
        return Somme;
      },

      sommeRepas() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.repas);
        });
        return Somme;
      },

      sommeAutre() {

        var Somme = 0;
        this.listDays.forEach(element => {
           Somme = Somme + parseFloat(element.autre);
        });
        return Somme;
      },

      totalGeneral() {
        var Somme = 0;
        Somme = this.sommeGasoil + this.sommeAutoroute + this.sommeTaxi + this.someTrain + this.sommeHotel + this.sommeRepas + this.sommeAutre;
        return Somme;
      },
  },


  methods: {


        valider() {
          // check date is validate or no after in bd

          if(this.valideMounths.includes(this.mois) && this.valideAnnee.includes(this.annee))
            {
              this.error = "Cette date a déjà été enregistrée précédemment, merci de contacter l'administration";

            } else {

                    this.valideListDays = true;
                    Service.Valider(this.nom, this.prenom, this.matricule, this.mois, this.annee, this.listDays, this.totalGeneral, this.valideListDays)
                    .then((response) => {

                          this.traitement = true;
                          this.msgNoteFrais = `la fiche des notes de frais a été envoyé à l'administration avec succès et ce Référence: "${response.data.result._id}" doit être envoyé à form object avec les justificatifs à l'adresse email de l'administration: direction@gthconsult.ma, Cliquez Ok pour accepter `;
                          this.buttonOk = true;
                          setTimeout(() => {
                              this.$router.go("/notefrais");
                          },8000000)
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            }



        },

        selectMois() {

          // epmty dta for create new data
          this.listDays = [];

          this.daysInCurrentMonth = new Date(this.annee, this.mois, 0).getDate();

          // set date with name date (chaque jour)
          for(let i = 0; i < this.daysInCurrentMonth; i++)
          {

            this.listDays.push({
                      _id: null,
                      number : i,
                      jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                      client:  null,
                      lieu: null,
                      objet : null,
                      gasoil: 0,
                      autoroute: 0,
                      taxi : 0,
                      train : 0,
                      hotel : 0,
                      repas :0,
                      autre: 0,
                      disabled : false,
                      flagSauvgarder : 0
            })
          }


          Service.SelectMois(this.matricule, this.mois, this.annee)
          .then((result) => {


                for(let i = 0; i < result.data.result.length; i++)
                {
                  this.listDays[result.data.result[i].number]._id = result.data.result[i]._id;
                  this.listDays[result.data.result[i].number].client = result.data.result[i].client;
                  this.listDays[result.data.result[i].number].lieu = result.data.result[i].lieu;
                  this.listDays[result.data.result[i].number].objet = result.data.result[i].objet;
                  this.listDays[result.data.result[i].number].gasoil = result.data.result[i].gasoil;
                  this.listDays[result.data.result[i].number].autoroute = result.data.result[i].autoroute;
                  this.listDays[result.data.result[i].number].taxi = result.data.result[i].taxi;
                  this.listDays[result.data.result[i].number].train = result.data.result[i].train;
                  this.listDays[result.data.result[i].number].hotel = result.data.result[i].hotel;
                  this.listDays[result.data.result[i].number].repas = result.data.result[i].repas;
                  this.listDays[result.data.result[i].number].autre = result.data.result[i].autre;
                  this.listDays[result.data.result[i].number].disabled = result.data.result[i].disabled;
                  this.listDays[result.data.result[i].number].flagSauvgarder = result.data.result[i].flagSauvgarder;
                }
          })
          .catch((error) => {
              console.log(error.message);
          });



          // check mounth is valide or no for handel button valider
            if(this.valideMounths.includes(this.mois) && this.valideAnnee.includes(this.annee))
            {
              this.CheckMoisValiderorNO = false;
            } else {
              this.CheckMoisValiderorNO = true;
            }


        },



        changer(index) {

          this.listDays[index].disabled = false;
          this.listDays[index].flagSauvgarder = 0;
          this.listDays[index]._id = null;

          Service.Changer(index, this.matricule)
          .then(() => {

          })
          .catch(error => {
              console.log(error.msg)
          });
        },



        sauvgarder(index) {

          this.listDays[index].disabled = true;
          this.listDays[index].flagSauvgarder = 1;

          Service.Sauvgarder(this.listDays[index], index, this.matricule, this.mois, this.annee)
          .then((response) => {
                this.listDays[index]._id = response.data.data._id
          })
          .catch(error => {
              console.log(error.msg)
          })
        }

  },

created() {

      if(!sessionStorage.getItem("token"))
      {
        this.$router.push("/")
      } else {

          this.nom = sessionStorage.getItem("nom");
          this.prenom = sessionStorage.getItem("prenom");
          this.matricule = sessionStorage.getItem("id");
          this.beneficiare = `${this.nom} ${this.prenom}`;

        // get date cuerrent
          var today = new Date();
          this.jour= String(today.getDate()).padStart(2, '0');
          this.mois = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          this.annee = today.getFullYear();

          // count Days Mounths
          this.daysInCurrentMonth = new Date(this.annee, this.mois, 0).getDate();

          // set date with name date (chaque jour)
          for(let i = 0; i < this.daysInCurrentMonth; i++) {

            this.listDays.push({
                      _id: null,
                      number : i,
                      jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                      mois : this.mois,
                      annee : this.annee,
                      client:  null,
                      lieu: null,
                      objet : null,
                      gasoil: 0,
                      autoroute: 0,
                      taxi : 0,
                      train : 0,
                      hotel : 0,
                      repas :0,
                      autre: 0,
                      disabled : false,
                      flagSauvgarder : 0,
            })
          }

        
          // Check mois valide pour Button Valider
          Service.CheckMoisValider(this.matricule)
            .then((result) => {

              for(let i = 0; i < result.data.result.length; i++) {
                    this.valideMounths[i] = result.data.result[i].mois;
                    this.valideAnnee[i] = result.data.result[i].annee;
              }
                // check mounth is valide or no for handel button valider
                if(this.valideMounths.includes(parseInt(this.mois)) && this.valideAnnee.includes(parseInt(this.annee))) {
                  this.CheckMoisValiderorNO = false;
                } else {
                  this.CheckMoisValiderorNO = true;
                }
            })
            .catch((error) => {
              console.log(error);
            });


          Service.SelectMois(this.matricule, this.mois, this.annee)
          .then((result) => {


                for(let i = 0; i < result.data.result.length; i++)
                {
                  this.listDays[result.data.result[i].number]._id = result.data.result[i]._id;
                  this.listDays[result.data.result[i].number].client = result.data.result[i].client;
                  this.listDays[result.data.result[i].number].lieu = result.data.result[i].lieu;
                  this.listDays[result.data.result[i].number].objet = result.data.result[i].objet;
                  this.listDays[result.data.result[i].number].gasoil = result.data.result[i].gasoil;
                  this.listDays[result.data.result[i].number].autoroute = result.data.result[i].autoroute;
                  this.listDays[result.data.result[i].number].taxi = result.data.result[i].taxi;
                  this.listDays[result.data.result[i].number].train = result.data.result[i].train;
                  this.listDays[result.data.result[i].number].hotel = result.data.result[i].hotel;
                  this.listDays[result.data.result[i].number].repas = result.data.result[i].repas;
                  this.listDays[result.data.result[i].number].autre = result.data.result[i].autre;
                  this.listDays[result.data.result[i].number].disabled = result.data.result[i].disabled;
                  this.listDays[result.data.result[i].number].flagSauvgarder = result.data.result[i].flagSauvgarder;
                }
          })
          .catch((error) => {
              console.log(error.message);
          });

          // Stream for get Online users
          Service.Online(sessionStorage.getItem("id"))
          .then((result) => {
            if(result) {
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

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.admin .container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.admin .container .header {
  width: 100%;

}
.admin .container .menu-content {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.admin .container .menu-content .content {
  width: 100%;
  height: 100%;
}




#app > div > div > div.menu-content > div.content > div.info > div {
    height: 40px;

    display: flex;
    flex-direction: row;
    margin:10px 0;
    font-weight: 500;
    justify-content: center;
    align-items: center;
}

#app > div > div > div.menu-content > div.content > div.info > div > button {
    margin-left: 10px;
    margin-right: 10px;
    background-color: #9ddf8d8f;
    padding: 0.3rem 2rem;
    border: 0px;
    color: #0e6e01;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
}

#app > div > div > div.menu-content > div.content > div.info > div > label {
    font-size: larger;
    margin-left: 10px;
    margin-right: 10px;
}

#app > div > div > div.menu-content > div.content > div.info > div > select {
    height: 40px;
    padding:0 10px;
    border: 1px solid #bae8d2;
    border-radius: 10px;
}


.admin .container .menu-content .content .list .content-table {

  border-collapse: collapse;
  margin: 0;
  font-size: 0.9em;
  min-width: 400px;
  padding: 0px;

}

#app > div > div > div.menu-content > div.content > div.list > table > thead > tr > th {

    height:20px;
    padding: 5px;
    margin: 0;
    border: 1px solid rgb(231, 231, 231);
    color :white;
    background-color: #cf1f21 ;
    text-align: left;
    position:sticky;
    top:0;
    right: 0;
    left:0;

}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td{
  border-bottom:2px solid rgb(238, 238, 238);
}


#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(1) {
  height:20px;
  padding: 9px;
  margin: 0;
  width: fit-content;
  color :white;
  background-color: #243064;
  color: white;
  font-weight: 700;
  text-align: center;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(2):not(:last-child) {

  color :white;
  background-color: #243064;
  font-weight: bold;
  padding:10px;
  text-align: center;
}




#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td > input[type=text] {
  margin: auto;
  height: 30px;
  width: 65px;
  background-color: rgb(240, 240, 240);
  border:1px solid rgb(192, 192, 192);
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td{
  padding:5px;
}


#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td >input[type=number] {
  margin: auto;
  height: 30px;
  width: 100%;
  border:1px solid rgb(192, 192, 192);
  border-radius: 5px;
  padding:5px;

}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td >input[type=number]:focus {
  outline:1px solid rgb(248, 112, 112);
  border:0 !important;


}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(3) > input[type=text] {
    width: 130px;
    padding:5px;

}

input[type=text]:focus-within{
outline:1px solid rgb(248, 112, 112);
border:0 !important;

}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(4) > input[type=text] {
    width: 100px;
    padding:5px;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(5 ) > input[type=text] {
    width: 200px;
    padding:5px;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > td:nth-child(13) > input[type=button] {


  background-color: green;

  border: 0px;
  color: white;
  border-radius: 20px;
  padding:10px;
  cursor: pointer;

}


#valider {
    padding:10px 30px;
    margin:20px;
    font-size: 20PX;
    border: 0px;
    border-radius: 20px;
    background: radial-gradient(circle, rgba(40,185,44,1) 0%, rgba(7,131,5,1) 100%);
    color: white;
    width: 40%;
    cursor: pointer;
}

#valider:hover{
  background: radial-gradient(circle, rgb(80, 218, 26) 0%, rgba(37,207,31,1) 100%);
  letter-spacing: 1px;
}

.validerBtn{
  display: flex;
  justify-content: center;
  align-items: center;
  color:red;
}

h3 {
    width: 100%;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    margin: 0;
    color: white;
    background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);
        text-align: center;
    text-align: center;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 25px;
}

</style>
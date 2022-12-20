<template>
  <div class="admin">

    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">

        <div class="content">

                <h3> Gestions Calendrier - Programmes</h3>

                <div class="info">

                    <div class="moisAnnee">
                        <label for="nom">Mois: </label>
                        <select v-model="mois" @change="selectMois">
                            <option v-for="index in 12" :key="index" :value="index" > {{ index }} </option>
                        </select>

                        <label for="nom">Année: </label>
                        <select v-model="annee" @change="selectMois">
                            <option v-for="index in (new Date().getFullYear()+10)" :key="index" :value="index" > {{ index }} </option>
                        </select>
                    </div>

                </div>


                <!-- Start liste -->
                <div class="list">

                  <table class="table content-table">
                    <thead>
                      <tr>
                        <th>JOUR</th>
                        <th>DATE</th>
                        <th>TITRE</th>
                        <th>CLIENT</th>
                        <th>LIEU</th>
                        <th>HORAIRE</th>
                        <th>INSPECTEUR</th>
                        <th>ACTIONS</th>
                        <th>+/-</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(index, i) in list" :key="i">
                          <th>{{ index[0].jour.charAt(0).toUpperCase()+index[0].jour.slice(1, 8) }}</th>
                          <th> {{ i + 1 }}</th>
                          <th>
                            <input type="text" v-for="(val, j) in index" :key="j" v-model="val.titre" :disabled="val.disabled">
                          </th>
                          <th>
                            <input type="text" v-for="(val, j) in index" :key="j" v-model="val.client" :disabled="val.disabled">
                          </th>
                          <th>
                            <input type="text" v-for="(val, j) in index" :key="j" v-model="val.lieu" :disabled="val.disabled">
                          </th>
                          <th>
                            <div v-for="(val, j) in index" :key="j">
                                  <input type="time" v-for="(time, k) in val.horaire" :key="k" v-model="time.start" :disabled="val.disabled">
                                  <input type="time" v-for="(time, k) in val.horaire" :key="'A'+ k" v-model="time.fin" :disabled="val.disabled">
                            </div>
                          </th>
                          <th>
                            <div v-for="(val, j) in index" :key="j">
                                  <select v-for="(value, s) in val.inspecteur" :key="s" v-model="value.name" :disabled="val.disabled">
                                    <option v-for="ins in inspecteurs" :key="ins._id" :value="ins._id" > {{ ins.nom+" "+ins.prenom }} </option>
                                  </select>
                            </div>
                          </th>

                          <th>

                            <div v-for="(val, j) in index" :key="j">
                              <input type="button" value="Sauvegarder" v-show="val.disabled == false && val.valider == false" @click="sauvegarder(i, j)">
                              <input type="button" value="Supprimer" v-show="val.disabled == true && val.valider == false" @click="changer(val, i, j, index)">
                              <input type="button" value="Mission accordée" v-show="val.valider == true" disabled>
                            </div>

                          </th>

                          <th>
                            <div>
                              <li class="add" @click="add(i)" ><i class="fa-solid fa-plus"></i></li>
                              <li class="remove" v-if="index.length > 1" @click="remove(i)"><i class="fa-solid fa-minus"></i></li>
                            </div>
                          </th>

                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- End liste -->


          </div>
      </div>
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
        inspecteurs : [],
        inspecteur: null,
        validateur: null,
        maxMounths :[],
        jour : null,
        mois : null, //January is 0!
        annee : null,
        listDays: [],
        horaire :[
          {
            start : null, fin: null
          }
        ],
        titre: [],
        client: [],
        lieu: [],
        inspecteurTab: []

    };
  },

  components: {
    Nav
  },

  computed : {


    list() {
      return this.listDays;
    }
  },


  methods: {

    selectMois() {

          // epmty dta for create new data
          this.listDays = [];

          // count Days Mounths
          this.daysInCurrentMonth = new Date(this.annee, this.mois, 0).getDate();

          // set date with name date (chaque jour)
          for(let i = 0; i < this.daysInCurrentMonth; i++) {
            this.listDays.push([
                {
                        _id : null,
                        number : i,
                        jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                        annee:  this.annee,
                        titre: null,
                        client : null,
                        lieu : null,
                        horaire: [
                          {
                            start: null,
                            fin: null
                          }
                        ],
                        inspecteur:  [
                          {
                            name: null,
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false
              }
            ]);
          }

          Service.SelectMoisCalendrier(this.annee, this.mois)
          .then((response) => {
            response.data.forEach((element) => {
                this.listDays[element.number].pop();
                element.listCalendrier.forEach((val) => {
                    this.listDays[element.number].push(val);
                });
            });
          })
          .catch((error) => {
              console.log(error.message);
          });
    },

    sauvegarder(i, j) {

            this.listDays[i][j].disabled = true;
            this.listDays[i][j].flagSauvgarder = 1;
            this.listDays[i][j].valider = false;

            Service.SauvegarderCalendrier(this.listDays[i][j],  this.mois, this.matricule, this.listDays[i][0].jour, this.listDays[i][0].number, this.listDays[i][0].annee)
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error.message);
            });
    },

    changer(val, i, j, index) {

            Service.DeleteCalendrier(val, i, j, index)
            .then((result) => {
                if(result) {
                    if(j == 0) {
                        this.listDays[i][j].titre = null;
                        this.listDays[i][j].client = null;
                        this.listDays[i][j].lieu = null;
                        this.listDays[i][j].horaire[0].start = null;
                        this.listDays[i][j].horaire[0].fin = null;
                        this.listDays[i][j].inspecteur[0].name = null;
                        this.listDays[i][j].disabled = false;
                        this.listDays[i][j].flagSauvgarder = 0;
                        this.listDays[i][j].countInput = 1;
                        this.listDays[i][j].valider = false;
                    } else {
                        this.listDays[i].splice(j, 1);
                    }
                }
            })
            .catch((error) => {
              console.log(error.message);
            });
    },

    add(i)
    {
      this.listDays[i].push({
                        number : i,
                        jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                        annee:  this.annee,
                        titre: null,
                        client : null,
                        lieu : null,
                        horaire: [
                          {
                            start: null,
                            fin: null
                          }
                        ],
                        inspecteur:  [
                          {
                            name: null,
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false
      });
    },

    remove(i)
    {
      this.listDays[i].pop();
    }


  },

created() {

      if(!sessionStorage.getItem("token"))
      {
        this.$router.push("/")
      } else {
          // info account current
          this.nom = sessionStorage.getItem("nom");
          this.prenom = sessionStorage.getItem("prenom");
          this.matricule = sessionStorage.getItem("id");

          // Get all inspecteur and admin for caledrier
          Service.readAdmin()
          .then((response) => {
                this.inspecteurs = response.data.admins;
          })
          .catch((error) => {
            console.log(error.message);
          });


        // get date cuerrent
          var today = new Date();
          this.jour= String(today.getDate()).padStart(2, '0');
          this.mois = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          this.annee = today.getFullYear();

          // set array mounts
          for(let i = 1; i <= this.mois; i++ )
          {
              this.maxMounths.push(i);
          }

          // count Days Mounths
          this.daysInCurrentMonth = new Date(this.annee, this.mois, 0).getDate();

          // set date with name date (chaque jour)
          for(let i = 0; i < this.daysInCurrentMonth; i++) {
            this.listDays.push([
                {
                        number : i,
                        jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                        annee:  this.annee,
                        titre: null,
                        client : null,
                        lieu : null,
                        horaire: [
                          {
                            start: null,
                            fin: null
                          }
                        ],
                        inspecteur:  [
                          {
                            name: null,
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false
              }
            ]);
          }

          Service.SelectMoisCalendrier(this.annee, this.mois)
          .then((response) => {
            response.data.forEach((element) => {
                this.listDays[element.number].pop();
                element.listCalendrier.forEach((val) => {
                    this.listDays[element.number].push(val);
                });
            });
          })
          .catch((error) => {
              console.log(error.message);
          });

          // Stream for get Online users
          Service.Online(this.matricule)
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











#app > div > div > div.menu-content > div.content > div.info > div {

    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: bold;
    color:rgb(83, 83, 83);
    align-items: center;
}

#app > div > div > div.menu-content > div.content > div.info > div > select {

    height: 40px;


    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    border: 1px solid #b9b9b9;

}








.admin .container .menu-content .content .list .content-table {

  border-collapse: collapse;

  font-size: 0.9em;


  border: 1px solid #ddd;
  background-color: white;
  position: relative;
  width: 100%;

}

#app > div > div > div.menu-content > div.content > div.list > table > thead > tr > th {
    background-color: #cf1f21;
    padding:10px 7px;
    z-index: 1000;
    position: sticky;
    top:0;
    left: 0;
    right: 0;
    border: 1px solid #ddd;
    right: 0;
    width: 100%;
    color: white;
    text-align: center;
    font-weight: bold;
}


#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr {
    border-bottom: 2px solid rgb(177, 177, 177);
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th {
    background-color: white;
    padding: 0px;
    margin: 0px;
}



#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(1) {
    color: #302a60;
    font-size: medium;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(2) {
    color: #302a60;
    font-size: medium;
}




#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th > input[type=text] {
    padding: 0 2px;
    margin: 10px;

    height: 40px;
   background-color: #ffffff;
    border: 1px solid #2430643d;
    outline: 0px;
    color: black;
    font-size: medium;
}

input[type="text"]:disabled {
  background: rgba(245, 245, 245, 0.637) !important;
  border-radius: 20px;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(6) > div {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(6) > div > input[type=time] {
  padding: 2px;
    margin: 10px;

    height: 40px;
    border: 0px;
    border: 1px solid #24306433;
    outline: 0px;
    border-radius: 5px;
    color: black;
    font-size: medium;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(7) > div > select {
    padding: 2px;
    margin: 10px;
    width: -webkit-fill-available;
    height: 40px;
    border: 0px;
    border: 1px solid #24306433;
    outline: 0px;
    color: black;
    font-size: medium;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(8) > div > input[type=button]:nth-child(1) {
    padding: 10px 13px;
    margin:10px;
    border-radius: 20px;
    border: 0px;
    border-bottom: 1px solid #24306433;
    outline: 0px;
    color: white;
    background-color: #54b82d;
    cursor: pointer;
    font-size: small;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(8) > div > input[type=button]:nth-child(2) {
  padding: 10px 13px;
    margin:10px;
    border-radius: 20px;
    border: 0px;
    border-bottom: 1px solid #24306433;
    outline: 0px;
    color: white;
    background-color: red;
    cursor: pointer;
    font-size: small;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(8) > div > input[type=button]:nth-child(3) {
  padding: 10px 0px;
    margin:10px;

    border: 0px;
    border-bottom: 1px solid #24306433;
    outline: 0px;
    color: green;

    cursor: pointer;
    font-size: small;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(9) > div > li:nth-child(1) > svg {
    color: rgb(1, 116, 35);
    padding: 10px 13px;
    cursor: pointer;
    margin:10px;

}



#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(9) > div > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    margin-top: 5px;
}

#app > div > div > div.menu-content > div.content > div.list > table > tbody > tr > th:nth-child(9) > div > li:nth-child(2) > svg {
    color: red;
    padding: 10px 13px;
    cursor: pointer;
    margin:10px;
}



h3 {
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



</style>
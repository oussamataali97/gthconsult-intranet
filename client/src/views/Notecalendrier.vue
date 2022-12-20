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

          <h3><i class="fa-solid fa-calendar-days"></i> Calendrier - Programmes</h3>

          <div class="info">
            <div class="searchBox">

              <label for="nom">Mois: </label>
              <select v-model="mois" @change="selectMois">
                <option v-for="index in 12" :key="index" :value="index"> {{ index }} </option>
              </select>
              <label for="nom">Année: </label>
              <select v-model="annee" @change="selectAnnee">
                <option v-for="index in maxYears" :key="index" :value="index"> {{ index }} </option>
              </select>

              <label for="Nom" v-if="status != 'inspecteur'">Nom et Prénom </label>
              <select v-model="inspecteur" @change="selectInspecteur" v-if="status != 'inspecteur'">
                <option v-for="index in inspecteurs" :key="index._id" :value="index._id"> {{ index.nom + " " + index.prenom
                }} </option>
              </select>
              <button @click="telechargerAgendaWord()"><i class="fa-solid fa-download"></i> Telcherger Agenda Word</button>


            </div>

          </div>
          <div class="calendarfull">
          <div class="listdays">
            <div>Lundi</div>
            <div>Mardi</div>
            <div>Mercredi</div>
            <div>Jeudi</div>
            <div>Vendredi</div>
            <div>Samedi</div>
            <div>Dimanche</div>
          </div>


          <!-- Start calendrier Simple -->

          <div class="list" v-if="flagListeSimple">

            <!-- Start clac Schema -->
            <div v-for="(item) in schemaCalendrier" :key="item + 10000"></div>
            <!-- End clac Schema -->

            <!-- Start liste days with info -->
            <div class="item" v-for="(index, i) in list" :key="i">

              <div class="info" v-if="index[0].jour == 'samedi' || index[0].jour == 'dimanche'"
                style="background-color: rgb(236, 236, 236); border: 1px solid white;">

                <div class="dayJour">
                  <p> {{ i + 1 }}</p>
                </div>

                <div class="infoMission" v-for="(val, j) in index" :key="j">

                  <div>

                      <div class="mission" v-if="val.titre">
                        <p  @click="showModalTout(list[i][j])" style="background-color : rgb(193 39 160);" v-if="val.inspecteur[0].name != '6308b78d86790b5f9dceacb8' &&  val.inspecteur[0].name != '6308913c99361b9200902dd5' &&  val.inspecteur[0].name != '630dfee353aa81f85f0b374e' &&  val.inspecteur[0].name != '630e000a53aa81f85f0b3750' &&  val.inspecteur[0].name != '6308b5da88fcc1dbc103dbaf' && val.inspecteur[0].name != '6308b5ec88fcc1dbc103dbb0'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : blue;" v-if="val.inspecteur[0].name == '6308b78d86790b5f9dceacb8'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : green;" v-if="val.inspecteur[0].name == '6308913c99361b9200902dd5'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : black;" v-if="val.inspecteur[0].name == '630dfee353aa81f85f0b374e'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : #ff5200;" v-if="val.inspecteur[0].name == '630e000a53aa81f85f0b3750'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : rgb(243 236 1);" v-if="val.inspecteur[0].name == '6308b5da88fcc1dbc103dbaf'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <p  @click="showModalTout(list[i][j])" style="background-color : red" v-if="val.inspecteur[0].name == '6308b5ec88fcc1dbc103dbb0'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                        <span v-if="(val.valider == false && matricule == val.inspecteur[0].name) || (val.valider == false && val.inspecteur[0].name == '6308b5da88fcc1dbc103dbaf')" @click="valider(val, i, j, val.inspecteur[0].name)"><i class="fa-sharp fa-solid fa-circle-check"></i></span>
                        <span v-if="val.valider == true"><i class="fa-solid fa-file-circle-check"></i></span>
                      </div>

                      <div class="infoInspecteur" v-if="val.titre != null">
                        <div>
                          <ModalTout v-show="isModalVisibleTout" @closeTout="closeModalTout()" :missionSelect="missionSelect"/>
                        </div>
                      </div>

                  </div>

                </div>

              </div>



              <div class="info" v-if="index[0].jour != 'samedi' && index[0].jour != 'dimanche'">

                <div class="dayJour">
                  <p>{{ i + 1 }}</p>
                </div>

                <div class="infoMission" v-for="(val, j) in index" :key="j">

                  <div>

                        <div class="mission" v-if="val.titre != null">
                          <p  @click="showModalTout(list[i][j])" style="background-color : rgb(193 39 160);" v-if="val.inspecteur[0].name != '6308b78d86790b5f9dceacb8' &&  val.inspecteur[0].name != '6308913c99361b9200902dd5' &&  val.inspecteur[0].name != '630dfee353aa81f85f0b374e' &&  val.inspecteur[0].name != '630e000a53aa81f85f0b3750' &&  val.inspecteur[0].name != '6308b5da88fcc1dbc103dbaf' && val.inspecteur[0].name != '6308b5ec88fcc1dbc103dbb0'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : blue;" v-if="val.inspecteur[0].name == '6308b78d86790b5f9dceacb8'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : green;" v-if="val.inspecteur[0].name == '6308913c99361b9200902dd5'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : black;" v-if="val.inspecteur[0].name == '630dfee353aa81f85f0b374e'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : #ff5200;" v-if="val.inspecteur[0].name == '630e000a53aa81f85f0b3750'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : rgb(243 236 1);" v-if="val.inspecteur[0].name == '6308b5da88fcc1dbc103dbaf'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <p  @click="showModalTout(list[i][j])" style="background-color : red;" v-if="val.inspecteur[0].name == '6308b5ec88fcc1dbc103dbb0'"> Mission n°: {{ j + 1 }} <i class="fa-solid fa-eye"></i></p>
                          <span v-if="(val.valider == false && matricule == val.inspecteur[0].name) || (val.valider == false && val.inspecteur[0].name == '6308b5da88fcc1dbc103dbaf')" @click="valider(val, i, j, val.inspecteur[0].name)"><i class="fa-sharp fa-solid fa-circle-check"></i></span>
                          <span v-if="val.valider == true"><i class="fa-solid fa-file-circle-check"></i></span>
                        </div>

                      <div class="infoInspecteur" v-if="val.titre != null">
                        <div>
                          <ModalTout v-show="isModalVisibleTout" @closeTout="closeModalTout()" :missionSelect="missionSelect"/>
                        </div>
                      </div>

                  </div>

                </div>

              </div>
            </div>
            <!-- End liste days with info -->
          </div>
        </div>

          <!-- End calendrier Simple -->



          <!-- Start calendrier Inspecteur -->
          <div class="list" v-if="flagListeInspecteur">

            <!-- Start clac Schema -->
            <div v-for="(item) in schemaCalendrierInspecteur" :key="item + 2000"></div>
            <!-- End clac Schema -->

            <!-- Start liste days with info -->
            <div class="item" v-for="(index, i) in listDaysInspecteur" :key="i">

              <div class="info" v-if="index[0].jour == 'samedi' || index[0].jour == 'dimanche'"
                style="background-color :#ddd; border: 1px solid white;">

                <div class="dayJour">
                  <p > {{ i + 1 }} </p>
                </div>

                <div class="infoInspecteur" v-for="(val, j) in index" :key="j">
                  <div v-for="(item, ind) in index" :key="ind">
                    <div v-for="(value, j) in item.names" :key="j">
                      <p style="background-color : rgb(193 39 160);" v-if="item.inspecteur[j] != '6308b78d86790b5f9dceacb8' &&  item.inspecteur[j] != '6308913c99361b9200902dd5' &&  item.inspecteur[j] != '630dfee353aa81f85f0b374e' &&  item.inspecteur[j] != '630e000a53aa81f85f0b3750' &&  item.inspecteur[j] != '6308b5da88fcc1dbc103dbaf' && item.inspecteur[j] != '6308b5ec88fcc1dbc103dbb0'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : blue;" v-if="item.inspecteur[j] == '6308b78d86790b5f9dceacb8'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : green;" v-if="item.inspecteur[j] == '6308913c99361b9200902dd5'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : black;" v-if="item.inspecteur[j] == '630dfee353aa81f85f0b374e'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : #ff5200;" v-if="item.inspecteur[j] == '630e000a53aa81f85f0b3750'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : rgb(243 236 1);" v-if="item.inspecteur[j] == '6308b5da88fcc1dbc103dbaf'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : red;" v-if="item.inspecteur[j] == '6308b5ec88fcc1dbc103dbb0'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <Modal v-show="isModalVisible" @close="closeModal()" :calendriers="calendriers" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="info" v-if="index[0].jour != 'samedi' && index[0].jour != 'dimanche'">

                <div class="dayJour">
                  <p > {{ i + 1 }} </p>
                </div>

                <div class="infoInspecteur" v-for="(val, j) in index" :key="j">
                  <div v-for="(item, index) in index" :key="index">
                    <div v-for="(value, j) in item.names" :key="j">
                      <p style="background-color : rgb(193 39 160);" v-if="item.inspecteur[j] != '6308b78d86790b5f9dceacb8' &&  item.inspecteur[j] != '6308913c99361b9200902dd5' &&  item.inspecteur[j] != '630dfee353aa81f85f0b374e' &&  item.inspecteur[j] != '630e000a53aa81f85f0b3750' &&  item.inspecteur[j] != '6308b5da88fcc1dbc103dbaf' && item.inspecteur[j] != '6308b5ec88fcc1dbc103dbb0'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : blue;" v-if="item.inspecteur[j] == '6308b78d86790b5f9dceacb8'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : green;" v-if="item.inspecteur[j] == '6308913c99361b9200902dd5'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : black;" v-if="item.inspecteur[j] == '630dfee353aa81f85f0b374e'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : #ff5200;" v-if="item.inspecteur[j] == '630e000a53aa81f85f0b3750'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : rgb(243 236 1);" v-if="item.inspecteur[j] == '6308b5da88fcc1dbc103dbaf'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <p style="background-color : red;" v-if="item.inspecteur[j] == '6308b5ec88fcc1dbc103dbb0'" @click="showModal(item.annee, item.mois, item.number, item.inspecteur[j])"> {{ value }} <i class="fa-solid fa-eye"></i></p>
                      <Modal v-show="isModalVisible" @close="closeModal()" :calendriers="calendriers" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <!-- End liste days with info -->
          </div>
          <!-- End calendrier Inspecteur -->


        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Modal from "./components/Modal.vue";
import ModalTout from "./components/ModalTout.vue";
import Nav from "@/components/Admin/Nav.vue";
import Service from "../Service";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");

export default {
  name: "admin",
  data() {

    return {

        isTarik: true,
        isJamal: true,
        error: null,
        flagListeSimple : true,
        schemaCalendrier : 0,
        flagListeInspecteur : false,
        schemaCalendrierInspecteur : 0,
        inspecteurs : [],
        inspecteur: null,
        validateur: null,
        maxYears :null,
        jour : null,
        mois : null, //January is 0!
        annee : null,
        listDays: [],
        listDaysInspecteurs: [],
        status: null,
        matricule: null,
        isModalVisible: false,
        isModalVisibleTout: false,
        calendriers : [],
        missionSelect: null

    };

  },

  components: {
    Nav,
    Modal,
    ModalTout
  },

  computed : {


    classObject() {
      return {
        active: this.isActive && !this.error,
        'background-color': 'blue'
      }
    },

    list() {
        return this.listDays;
    },

    listDaysInspecteur() {
        return this.listDaysInspecteurs;
    },

  },


  methods: {

    showModalTout(value) {
      this.missionSelect = value;
      this.isModalVisibleTout = true;
    },

    closeModalTout() {
      this.missionSelect = [];
      this.isModalVisibleTout = false;
    },

    showModal(annee, mois, number, inspecteur) {

        this.calendriers = [];
        this.isModalVisible = true;
        Service.SelectMoisDaysAnneeCalendrierInspecteur(annee, mois, number, inspecteur)
        .then((result) => {
           this.calendriers = result.data.calendriers;
        })
        .catch((error) => {
           console.log(error.message);
        });

    },

    closeModal() {
        this.calendriers = [];
        this.isModalVisible = false;
    },

    downloadFileDocx(response) {
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
            setTimeout(function() {
                window.URL.revokeObjectURL(data);
            }, 100);
       },


    telechargerAgendaWord() {
                  Service.TelechargerAgenda(this.listDays, this.mois, this.annee, this.inspecteur)
                  .then((response) => {
                      this.downloadFileDocx(response);
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
      },


    searchInspecteur(value, i, j) {
        if(value) {
          const arr = this.inspecteurs;
          const index = arr.findIndex(object => {
            return object._id == value;
          });
          const nom = this.inspecteurs[index].nom
          const prenom = this.inspecteurs[index].prenom
          this.listDays[i][j].matricule = `${prenom.substr(0, 1)},${nom}`
          return `${nom} ${prenom}`; // 👉️ 1
        }
    },

    valider(val, i, j, inspecteurId) {

        this.listDays[i][j].valider = true;

        Service.ValiderCalendrier(val._id, val.annee, val.mois, i, j, inspecteurId)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectAnnee() {

      if(this.inspecteur == null)
      {
        this.inspecteur = this.matricule;
      }

          // hide calendrier simple
          this.flagListeSimple = true;
          // hide calendrier Inspecteur
          this.flagListeInspecteur = false;

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
                            id : null
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false,
                        matricule :null
              }
            ]);
          }

          // calc schema calendrier for best schema
          if(this.listDays[0][0].jour == "lundi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 0;
          }
          if(this.listDays[0][0].jour == "mardi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 1;
          }
          if(this.listDays[0][0].jour == "mercredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 2;
          }
          if(this.listDays[0][0].jour == "jeudi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 3;
          }
          if(this.listDays[0][0].jour == "vendredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 4;
          }
          if(this.listDays[0][0].jour == "samedi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 5;
          }
          if(this.listDays[0][0].jour == "dimanche" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 6;
          }


          // get data calendrier

          Service.SelectMoisCalendrierInspecteur(this.annee, this.mois, this.inspecteur)
          .then((response) => {
                // set index for pop inn array after set data
                var setIndex = new Array();
                response.data.forEach((element, index) => {
                  setIndex[index] = element.number;
                });
                // delte duplicate
                var uniq = [ ...new Set(setIndex) ];

                uniq.forEach((val) => {
                  this.listDays[val].pop();
                  response.data.forEach((element) => {
                    if(element.number == val) {
                        this.listDays[val].push(element);
                    }
                  });
                })


          })
          .catch((error) => {
              console.log(error.message);
          });
    },

    selectMois() {

      if(this.inspecteur == null)
      {
        this.inspecteur = this.matricule;
      }


        // hide calendrier simple
        this.flagListeSimple = true;
        // hide calendrier Inspecteur
        this.flagListeInspecteur = false;

        // epmty dta for create new data
          this.listDays = [];
        // get date cuerrent
          var today = new Date();
          this.annee = today.getFullYear();

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
                            id : null
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false,
                        matricule :null
              }
            ]);
          }

          // calc schema calendrier for best schema
          if(this.listDays[0][0].jour == "lundi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 0;
          }
          if(this.listDays[0][0].jour == "mardi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 1;
          }
          if(this.listDays[0][0].jour == "mercredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 2;
          }
          if(this.listDays[0][0].jour == "jeudi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 3;
          }
          if(this.listDays[0][0].jour == "vendredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 4;
          }
          if(this.listDays[0][0].jour == "samedi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 5;
          }
          if(this.listDays[0][0].jour == "dimanche" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 6;
          }


          // get data calendrier

          Service.SelectMoisCalendrierInspecteur(this.annee, this.mois, this.inspecteur)
          .then((response) => {
                // set index for pop inn array after set data
                var setIndex = new Array();
                response.data.forEach((element, index) => {
                  setIndex[index] = element.number;
                });
                // delte duplicate
                var uniq = [ ...new Set(setIndex) ];

                uniq.forEach((val) => {
                  this.listDays[val].pop();
                  response.data.forEach((element) => {
                    if(element.number == val) {
                        this.listDays[val].push(element);
                    }
                  });
                })





          })
          .catch((error) => {
              console.log(error.message);
          });
    },

    selectInspecteur() {


      if(this.inspecteur == null)
      {
        this.inspecteur = this.matricule;
      }


          if(this.inspecteur == "000000") {

            // hide calendrier simple
            this.flagListeSimple = false;
            // hide calendrier Inspecteur
            this.flagListeInspecteur = true;

            // epmty dta for create new data
              this.listDaysInspecteurs = [];
            // get date cuerrent
              var to = new Date();
              this.annee = to.getFullYear();

            // count Days Mounths
              this.daysInCurrentMonth = new Date(this.annee, this.mois, 0).getDate();

            // set date with name date (chaque jour)
              for(let i = 0; i < this.daysInCurrentMonth; i++) {
                this.listDaysInspecteurs.push([
                    {
                            _id : null,
                            number : i,
                            mois : parseInt(this.mois),
                            jour:  new Date(new Date(this.annee, this.mois - 1, i + 1)).toLocaleString('fr', {weekday:'long'}),
                            annee:  this.annee,
                            inspecteur:  [],
                            names:  [],
                            show : false
                    }
                ]);
             }

               // calc schema calendrier for best schema
              if(this.listDaysInspecteurs[0][0].jour == "lundi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 0;
              }
              if(this.listDaysInspecteurs[0][0].jour == "mardi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 1;
              }
              if(this.listDaysInspecteurs[0][0].jour == "mercredi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 2;
              }
              if(this.listDaysInspecteurs[0][0].jour == "jeudi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 3;
              }
              if(this.listDaysInspecteurs[0][0].jour == "vendredi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 4;
              }
              if(this.listDaysInspecteurs[0][0].jour == "samedi" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 5;
              }
              if(this.listDaysInspecteurs[0][0].jour == "dimanche" && this.listDaysInspecteurs[0][0].number == 0) {
                  this.schemaCalendrierInspecteur = 6;
              }

            Service.SelectMoisCalendrier(this.annee, this.mois)
              .then((response) => {
                response.data.forEach((element) => {
                    element.listCalendrier.forEach((el) => {
                      if(this.listDaysInspecteurs[element.number][0].inspecteur.includes(el.inspecteur[0].name) == false) {

                          Service.getAdmin(el.inspecteur[0].name)
                          .then((result) => {
                            this.listDaysInspecteurs[element.number][0].names.push(result.data.admin.nom+" , "+result.data.admin.prenom);
                          })
                          .catch((error) => {
                            console.log(error);
                          });

                          this.listDaysInspecteurs[element.number][0].inspecteur.push(el.inspecteur[0].name);
                          this.listDaysInspecteurs[element.number][0]._id = el._id;
                      }
                    });
                });

              })
              .catch((error) => {
                  console.log(error.message);
              });

          } else {

            // hide calendrier simple
            this.flagListeSimple = true;
            // hide calendrier Inspecteur
            this.flagListeInspecteur = false;

            // epmty dta for create new data
              this.listDays = [];
            // get date cuerrent
              var today = new Date();
              this.annee = today.getFullYear();

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
                                id : null
                              }
                            ],
                            disabled : false,
                            flagSauvgarder : 0,
                            countInput: 1,
                            valider : false,
                            matricule :null

                  }
                ]);
              }

              // calc schema calendrier for best schema
              if(this.listDays[0][0].jour == "lundi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 0;
              }
              if(this.listDays[0][0].jour == "mardi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 1;
              }
              if(this.listDays[0][0].jour == "mercredi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 2;
              }
              if(this.listDays[0][0].jour == "jeudi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 3;
              }
              if(this.listDays[0][0].jour == "vendredi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 4;
              }
              if(this.listDays[0][0].jour == "samedi" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 5;
              }
              if(this.listDays[0][0].jour == "dimanche" && this.listDays[0][0].number == 0) {
                  this.schemaCalendrier = 6;
              }


              // get data calendrier
              Service.SelectMoisCalendrierInspecteur(this.annee, this.mois, this.inspecteur)
              .then((response) => {
                    // set index for pop inn array after set data
                    var setIndex = new Array();
                    response.data.forEach((element, index) => {
                      setIndex[index] = element.number;
                    });
                    // delte duplicate
                    var uniq = [ ...new Set(setIndex) ];

                    uniq.forEach((val) => {
                      this.listDays[val].pop();
                      response.data.forEach((element) => {
                        if(element.number == val) {
                            this.listDays[val].push(element);
                        }
                      });
                    })
              })
              .catch((error) => {
                  console.log(error.message);
              });
        }
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
                this.inspecteurs = response.data.admins;
                this.inspecteurs.push({ nom: "Tout", prenom: "", _id: "000000"});
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
          this.maxYears = this.annee;
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
                            id : null
                          }
                        ],
                        disabled : false,
                        flagSauvgarder : 0,
                        countInput: 1,
                        valider : false,
                        matricule :null
              }
            ]);
          }

          // calc schema calendrier for best schema
          if(this.listDays[0][0].jour == "lundi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 0;
          }
          if(this.listDays[0][0].jour == "mardi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 1;
          }
          if(this.listDays[0][0].jour == "mercredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 2;
          }
          if(this.listDays[0][0].jour == "jeudi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 3;
          }
          if(this.listDays[0][0].jour == "vendredi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 4;
          }
          if(this.listDays[0][0].jour == "samedi" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 5;
          }
          if(this.listDays[0][0].jour == "dimanche" && this.listDays[0][0].number == 0) {
              this.schemaCalendrier = 6;
          }

          // get data calendrier
          Service.SelectMoisCalendrierInspecteur(this.annee, this.mois, this.matricule)
              .then((response) => {
                    // set index for pop inn array after set data
                    var setIndex = new Array();
                    response.data.forEach((element, index) => {
                      setIndex[index] = element.number;
                    });
                    // delte duplicate
                    var uniq = [ ...new Set(setIndex) ];

                    uniq.forEach((val) => {
                      this.listDays[val].pop();
                      response.data.forEach((element) => {
                        if(element.number == val) {
                            this.listDays[val].push(element);
                        }
                      });
                    })
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
}



.admin .container .header {
  width: 100%;
}


.admin .container .menu-content .content {
  width: 100%;
  height: 100%;
}

.admin .container .menu-content .content .info {
  width: 100%;


  overflow: auto;
  max-height: 150px;
}



#app>div>div>div.menu-content>div.content>div.info>div>button {
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

#app>div>div>div.menu-content>div.content>div.info>div>label {
  font-size: larger;
  margin-left: 10px;
  margin-right: 10px;
}

#app>div>div>div.menu-content>div.content>div.info>div>select {
border-radius: 10px;
padding:10px;
  width: fit-content;
  border: 1px solid #bae8d2;
}

.listdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;

}

.listdays>div {
  background-color: #243064;
  color: rgb(255, 255, 255);
  display: flex;
  border-right: 1px solid white;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: x-large;
  font-weight: bold;


}

.listdays>div:nth-child(6) {
  background-color: #cf1f21;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  border-right: 1px solid white;
  font-size: x-large;
  font-weight: bold;

}

.listdays>div:nth-child(7) {
  background-color: #cf1f21;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-size: x-large;
  font-weight: bold;

}

.list {
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  flex-wrap: nowrap;
  width: 100%;

  padding: 0;
  margin: 0;
  border: 0;
}

.list>div.item {
  min-height: 150px;
  width: 100%;
  padding: 0px;
  margin: 0px;
  border: 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.list>div.item>div.info {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: white;
  width: 100%;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.list>div.item>div.info>div.dayJour {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
}

.list>div.item>div>div.dayJour>p {
  margin-left: 5px;
  margin-top:5px;
  font-weight: 500;
  background-color: #cacaca;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.list>div.item>div.info>div.infoMission {
  width: 100%;
}

.list>div.item>div.info>div.infoMission>div {
padding:0 5px;



}

.list>div.item>div.info>div.infoMission>div>div.mission>p {
  background-color: rgb(16, 172, 10);
  margin:3px 0;
  color:white;
  cursor: pointer;
  padding:4px 10px;
  border-radius: 20px;
  width: 100%;
  text-align: center;
  font-weight: 700;
}

.list>div.item>div.info>div.infoMission>div>div.mission {
  display: flex;
  flex-direction: row;
  width: 100%;
  flex-wrap: nowrap;
}

.list>div.item>div.info>div.infoMission>div>div.mission>span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 3px;

}

.list>div.item>div.info>div.infoMission>div>div.mission>span>svg {
  font-size: 20px;
  color: #1ea70c;
  cursor: pointer;
  transition: 0.3s ease;
}

.list>div.item>div.info>div.infoMission>div>div.mission>span>svg:hover {

  color: #79fd68;
  cursor: pointer;
}

.list>div.item>div.info>div.infoMission>div>div.mission>input {
  border: 0px;
  color: #0e6e01;
}

.list>div.item>div.info>div.infoMission>div>div.client {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: nowrap;
}

.list>div.item>div.info>div.infoMission>div>div.client>li {
  list-style: none;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-left: 0px;
  color: #18762c;

  font-weight: 400;
}



.list>div.item>div.info>div.infoMission>div>div.horaire {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}

.list>div.item>div.info>div.infoMission>div>div.horaire p {
  color: red;

}

.list>div.item>div.info>div.infoMission>div>div.verfication {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.list>div.item>div.info>div.infoMission>div>div.verfication>p {
  margin-top: 5px;
  margin-bottom: 5px;
  color: rgb(0 0 0 / 61%);
}

.list>div.item>div.info>div.infoMission>div>div.verfication>p:nth-child(2) {
  color: green;
}

.list>div>div>div.infoInspecteur>div>div {
  text-align: center;


}

.list>div>div>div.infoInspecteur {
width: 100%;


}

.list>div>div>div.infoInspecteur>div {

padding:0 5px;

}


.list>div>div>div.infoInspecteur>div>div>p {
  cursor: pointer;
  color: rgb(255, 255, 255);
  margin:3px 0;
background-color: rgb(174, 0, 255);
  cursor: pointer;
  padding:4px 10px;
  text-transform: capitalize;
  border-radius: 20px;
  width: 100%;
  text-align: center;
  font-weight: 700;

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

.searchBox{
  margin:10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parag {
  color:rgb(182, 41, 65) !important;
  word-break: break-all;
  white-space: normal;
}

.fa-file-circle-check{
  color:rgb(255, 153, 0) !important;
  cursor:help !important;
}


.fa-circle-check:hover{
 transform: scale(1.1);
}

</style>
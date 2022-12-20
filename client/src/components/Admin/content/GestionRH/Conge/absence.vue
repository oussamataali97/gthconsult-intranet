<template>
  <div class="creationClient">

    <h3>DEMANDE ABSENCE</h3>

    <!-- <Traitement :msg="msgFicheTechnique" v-if="traitement == true"/> -->

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">
      <div>
        <label for="Date de demande Congé">Date de demande Congé</label>
        <input type="text" v-model="absence.date" disabled>
      </div>
      <div class="p" style="width:100%; margin:10px 0;text-align:center;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Personnelles </div>

      <div>
        <label for="Nom">Nom</label>
        <input type="text" v-model="absence.nom" disabled>
      </div>

      <div>
        <label for="Prénom">Prénom</label>
        <input type="text" v-model="absence.prenom" disabled>
      </div>
      <div class="p" style="width:100%; margin:10px 0;text-align:center;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Techniques </div>

      <div>
        <label for="Département">Département</label>
          <select v-model="absence.departement">
            <option v-for="(item, index) in absence.listDepartement" :key="index" :value="item" > {{ item  }}</option>
        </select>
      </div>

      <div>
        <label for="Fonction">Fonction</label>
        <input type="text" v-model="absence.fonction">
      </div>
      <div class="p" style="width:100%; margin:10px 0;text-align:center;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Abscence </div>

      <div>
        <label for="Type d'absence">Type d'absence</label>
        <select v-model="absence.typeAbsence" @change="selectTypeConge">
            <option v-for="(item, index) in absence.listTypeAbsence" :key="index" :value="[item.name, item.duree]"> {{ item.name }}</option>
        </select>
      </div>

      <div>
        <label for="Motif">Motif</label>
        <textarea type="text" v-model="absence.motif"></textarea>
      </div>

      <div>
        <label for="Document preuve">Document preuve</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger Document Preuve" ref="file" @change="previewFile">
      </div>

      <div>
        <label for="Du">Du</label>
        <input type="date" v-model="absence.duree.start">
      </div>

      <div>
        <label for="Au">Au</label>
        <input type="date" v-model="absence.duree.fin" @change="selectAU">
      </div>

      <div v-if="absence.nomberJoursOuvrables != null">
        <p class="warningjrs" v-if="absence.nomberJoursOuvrables < absence.nomberJours"><i class="fa-solid fa-triangle-exclamation"></i> Veuillez corriger svp les jours autorisés : {{ absence.nomberJoursOuvrables }} jours</p>
        <label for="Nomber de Jours">Nomber de Jours</label>
        <input type="text" v-model="absence.nomberJours" disabled>
      </div>

      <div v-if="absence.nomberJoursOuvrables == null">
        <label for="Nomber de Jours">Nomber de Jours</label>
        <input type="text" v-model="absence.nomberJours" disabled>
      </div>

      <div>
        <label for="Nomber de Jours ouvrables">Nomber de Jours Ouvrables</label>
        <input type="text" v-model="absence.nomberJoursOuvrables" disabled>
      </div>


      <div>
        <input type="submit" value="Demander" @click="create()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>


    </div>


    <!-- <div class="parent"  v-if="flagDaysConge">
          <div class="years">
            <ul>
              <li @click="selectYearMoins()">
                <i class="fa-solid fa-angle-left"></i>
              </li>

              <li>{{ year }}</li>

              <li @click="selectYearPlus()">
                  <i class="fa-solid fa-angle-right"></i>
              </li>
            </ul>
          </div>

          <div v-if="flagDaysConge" class="mounths">
              <div v-for="item in mois" :key="item.i" @click="selectMois(item.i)"> {{ item.nom }} </div>
          </div>

          <div v-if="flagDaysConge" class="days">
            <div v-for="item in this.filterDays" :key="item.index" @click="selectDay(item.index , item.jour)">

              <ul v-if="item.flagIndex == true" :style="styleTrue">
                <li style="color :white;"> {{ item.index }}</li>
                <li style="color :white;"> {{ item.jour }}</li>
              </ul>

              <ul v-if="item.flagIndex == false" :style="styleFalse">
                <li> {{ item.index }}</li>
                <li> {{ item.jour }}</li>
              </ul>

            </div>
          </div>

          <div v-if="flagDaysConge" class="demander">
            <button @click="demander()">Demander</button>
          </div>

    </div> -->

  </div>
</template>

<script>
import Service from '../../../../../Service';
export default {
  data() {
    return {
      absence : {
          date : null,
          nom : null,
          prenom : null,
          departement : null,
          fonction : null,
          typeAbsence : null,
          motif: null,
          pj: null,
          nomberJours : null,
          duree : {
            start : null,
            fin : null
          },
          nomberJoursOuvrables : null,
          decision : [
            "Accordé",
            "Non Accordé"
          ],
          preciseDates : null,
          motifRefuse: null,
          listTypeAbsence : [
            { name : "Congé annuel", duree : null },
            { name : "Congé mariage", duree : 4 },
            { name : "Congé mariage d'un enfant", duree : 2 },
            { name : "Décès d'un conjoint, d'un enfant, d'un petit enfant", duree : 3 },
            { name : "Décès d'un conjoint, d'un enfant, d'un petit enfant", duree : 3 },
            { name : "Décès d'un des parents, grand-père ou grand-mère", duree : 3 },
            { name : "Décèsd d'un frère, d'une sœur", duree : 2 },
            { name : "Décès d'un proche", duree : 1 },
            { name : "Circoncision", duree : 2 },
            { name : "Convocation Tribunal", duree : 1 },
            { name : "Opération chirurgicale du conjoint ou d'un enfant à charge", duree : 2 },
            { name : "Accompagner un patient au cabinet du médecin", duree : 1 },
            { name : "Congé maternité", duree : 98 },
            { name : "Maladie", duree: null },
            { name : "Récupération", duree: null },
            { name : "Examen ou Formation", duree : null },
            { name : "Autres", duree : null }
          ],

          listDepartement : [
            "PRODUCTION",
            "ADMINISTRATIVE",
            "TECHNIQUE",
            "QUALITÉ"
          ],

          dateAccorder : null
      },
       flagDaysConge : false,
       flagDemandeConge : false,
        mois : [
                { i : 1, nom : "Janvier"},
                { i : 2, nom : "Février"},
                { i : 3, nom : "Mars"},
                { i : 4, nom : "Avril"},
                { i : 5, nom : "Mai"},
                { i : 6, nom : "Juin"},
                { i : 7, nom : "Juillet"},
                { i : 8, nom : "Août"},
                { i : 9, nom : "Septembre"},
                { i : 10, nom : "Octobre"},
                { i : 11, nom : "Novembre"},
                { i : 12, nom : "Décembre"}
      ],
      succes: false,
      echec: false,
      error : null,
      year : null,
      moisSelect : null,
      days : [],
      countDaysSelect : 0,
      styleTrue: {
        backgroundColor : '#4908f7'
      },
      styleFalse: {
        backgroundColor : 'white'
      }
    };
  },

  components : {
  },

  computed : {
    filterDays() {
      return this.days.filter((item) => {
         return item;
      });
    }
  },

  methods: {

    create() {
        Service.createConge(this.absence, this.file, this.matricule)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    selectAU() {
        const dateDu = new Date(this.absence.duree.start);
        const dateAu = new Date(this.absence.duree.fin);
        let difference = dateAu.getTime() - dateDu.getTime();
        this.absence.nomberJours = Math.ceil(difference / (1000 * 3600 * 24)) + 1;
    },


    previewFile() {
        this.file = this.$refs.file.files[0];
    },

    selectTypeConge() {

      if(this.absence.typeAbsence[0] == "Congé annuel") {
              // read Conge
              Service.selectCongeAdmin(this.matricule)
              .then((result) => {

                console.log(result.data.conges)

                if(result.data.reset) {
                     this.absence.nomberJoursOuvrables = (new Date().getMonth() - new Date(result.data.conges).getMonth() + (12 * (new Date().getFullYear() - new Date(result.data.conges).getFullYear()))) * 1.5 + result.data.reset;
                } else {
                     this.absence.nomberJoursOuvrables = (new Date().getMonth() - new Date(result.data.conges).getMonth() + (12 * (new Date().getFullYear() - new Date(result.data.conges).getFullYear()))) * 1.5;
                }

              })
              .catch((error) => {
                console.log(error.message);
              });

      } else if(this.absence.typeAbsence[0] == "Maladie" || this.absence.typeAbsence[0] == "Récupération" || this.absence.typeAbsence[0] == "Examen ou Formation" || this.absence.typeAbsence[0] == "Autres") {
        this.absence.nomberJoursOuvrables = null;
      }
      else {
        this.absence.nomberJoursOuvrables = this.absence.typeAbsence[1];
      }

    },


    // selectDay(i) {

    //   if(this.days[i-1].flagIndex == false) {
    //           this.days[i-1].flagIndex = true;
    //           this.countDaysSelect++;
    //   } else {
    //           this.days[i-1].flagIndex = false;
    //           this.countDaysSelect--;
    //   }
    // },

    // selectMois(value) {
    //   this.days = [];
    //   this.moisSelect = value
    //   const countDays = new Date(this.year, this.moisSelect, 0).getDate();
    //   for(let i = 1; i <= countDays; i++) {
    //         const dateStr = `${this.year}-${this.moisSelect}-${i}`;
    //         this.days.push({
    //           index : i,
    //           jour:  new Date(dateStr).toLocaleDateString('fr', {weekday: 'long'}),
    //           flagIndex: false
    //         });
    //   }
    // },

    // selectYearMoins() {
    //   this.days = [];
    //   this.year--;
    //   const countDays = new Date(this.year, this.moisSelect, 0).getDate();
    //   for(let i = 1; i <= countDays; i++) {
    //         const dateStr = `${this.year}-${this.moisSelect}-${i}`;
    //         this.days.push({
    //           index : i,
    //           jour:  new Date(dateStr).toLocaleDateString('fr', {weekday: 'long'}),
    //           flagIndex: false
    //         });
    //   }
    // },

    // selectYearPlus() {
    //   this.days = [];
    //   this.year++;
    //   const countDays = new Date(this.year, this.moisSelect, 0).getDate();
    //   for(let i = 1; i <= countDays; i++) {
    //         const dateStr = `${this.year}-${this.moisSelect}-${i}`;
    //         this.days.push({
    //           index : i,
    //           jour:  new Date(dateStr).toLocaleDateString('fr', {weekday: 'long'}),
    //           flagIndex: false
    //         });
    //   }
    // }

  },

  created() {

      if(!sessionStorage.getItem("token"))
      {
        this.$router.push("/");
      } else {

      // get info User
      this.absence.nom = sessionStorage.getItem("nom");
      this.absence.prenom = sessionStorage.getItem("prenom");
      this.matricule = sessionStorage.getItem("id");

      // get date demande
      this.absence.date = new Date().toLocaleString()
      // // year and mounth
      // this.year = new Date().getFullYear();
      // this.moisSelect = new Date().getMonth() + 1;
      // // days number
      // const countDays = new Date(this.year, this.moisSelect, 0).getDate();

      //   for(let i = 1; i <= countDays; i++) {
      //       const dateStr = `${this.year}-${this.moisSelect}-${i}`;
      //       this.days.push({
      //         index : i,
      //         jour:  new Date(dateStr).toLocaleDateString('fr', {weekday: 'long'}),
      //         flagIndex: false
      //       });
      //   }



    }

  }

}
</script>

<style scoped>


.creationClient {
  width: 100%;
  padding:5px;

}

.creationClient h3 {
  width: 100%;
  margin:auto;
  color: white;
  background: linear-gradient(346deg, rgba(207,31,33,1) 0%, rgba(24,86,161,1) 100%);    text-align: center;
  text-align: center;


}
.succes {
  background-color: #69cd5b;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.echec {
  background-color: RED;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.formCreation {
  padding:20px 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(1,1fr);
  justify-items: center;
  align-items: center;


}

.formCreation div {
  display: flex;
  flex-direction: column;
  width: 60%;
}
.formCreation div label {
  margin-left:10px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#494949;
}
.formCreation div input,textarea {
  height: 40px;
  margin-left:10px;
  margin-bottom: 5px;
  border: 1px solid #243064;

}

.formCreation div select {
  height: 40px;
  margin-left:10px;
}

.formCreation div:nth-child(16) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(17) input {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}



#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}

#app > div > div > div.menu-content > div.content > div > h3 {
    padding: 15px;
}

#app > div > div > div.menu-content > div.content > div > div > div > label {
  font-size: 15px;
}


.form-control {
    display: block;

    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.form-control::-webkit-file-upload-button {
    padding: 10px;
    margin: -.375rem -.75rem;
    -webkit-margin-end: .75rem;
    margin-inline-end: .75rem;
    color: rgb(58, 58, 58);
    font-weight: 600;
    background-color: #e9e9e9;
    pointer-events: none;
    border:0;

    -webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
}
.warningjrs{
  background-color: #ffc6c6;
  width: 100%;
  margin:10px 9px;
  padding:10px;
  border-radius: 10px;
  display: flex;
  color:red;
  align-items: center;
  font-weight: 600;
}

.warningjrs svg{
  margin-right: 5px;
}
</style>


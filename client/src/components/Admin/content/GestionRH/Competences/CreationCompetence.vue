<template>
  <div class="creationClient">

    <h3>COMPETENCIES & QUALIFICATIONS</h3>

    <Traitement :msg="msgCompetence" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">
      <div class="p" style="width:100%; margin:0 0 10px 0;text-align:center;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Personnelles </div>

      <div>
        <label for="nom">Nom</label>
        <input type="text" v-model="competence.nom">
      </div>

      <div>
        <label for="nom">Prénom</label>
        <input type="text" v-model="competence.prenom">
      </div>
      <div class="p" style="width:100%; margin:10px 0;text-align:center;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Techniques </div>

      <div>
        <label for="adresse">Date de Formation</label>
        <input type="date" v-model="competence.dateFormation">
      </div>

      <div>
        <label for="Appareil et accessoir de levage">Choisir un métier</label>
        <select v-model="competence.metier" @change="selectMetier(competence.metier)">
          <option v-for="item in metierList" :key="item" :value="item"> {{ item }}</option>
        </select>
      </div>

      <div>
        <label for="Appareil et accessoir de levage">Choisir Domaine Famille</label>
        <select v-model="competence.domaineFamille" @change="selectDomaine(competence.domaineFamille)">
          <option v-for="(item,j) in domaineList" :key="j" :value="item"> {{ item }}</option>
        </select>
      </div>

      <div>
        <label for="Choisir Qualification" >Choisir Qualification</label>
        <select v-model="competence.qualification">
          <option v-for="(item,i) in qualificationList" :key="i" :value="item"> {{ item }}</option>
        </select>
      </div>

      <div>
        <label for="Choisir les connaissance theorique et pratique">Choisir les connaissance theorique et pratique</label>
        <select v-model="competence.connaissance">
          <option value="Abandonner">Abandonner</option>
          <option value="Adevelopper">Adevelopper</option>
          <option value="En cœur d acquisition">En cœur d acquisition</option>
          <option value="À quiser">À quiser</option>
          <option value="Bonnes">Bonnes</option>
          <option value="Grand expérience">Grand expérience</option>
        </select>
      </div>

      <div>
        <label for="Module Formation">Module Formation</label>
        <textarea v-model="competence.moduleFormation">
        </textarea>
      </div>


      <div>
        <label for="pays">Télécharger P.J</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger Certificat" ref="file" @change="previewFile">
      </div>

      <div>
        <label for=""></label>
        <input type="hidden">
      </div>


      <div>
        <input type="submit" value="Créer" @click="create()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>
</template>

<script>
import Service from "../../../../../Service";
import Traitement from "../../Affaire/Traitement.vue"
export default {
  data() {
    return {
      file : null,
      traitement : null,
      msgCompetence : null,
      competence: {
              nom : null,
              prenom : null,
              dateFormation : null,
              metier : null,
              domaineFamille : null,
              qualification : null,
              connaissance : null,
              moduleFormation : null
      },
      succes: false,
      echec: false,
      error : null,
      metierList : [
        "Electricité",
        "Levage",
        "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants",
        "Incendie",
        "Machine",
        "Technique",
        "Pression",
        "Autre",
        "Environnement"
      ],
      domaineList : [],
      qualificationList : [],
      liste: [
        { metiers : "Electricité", domaine : "ELEC-HT", qualification : "ELEC1-HT", },
        { metiers : "Electricité", domaine : "ELEC-HT", qualification : "ELEC2-HT" },
        { metiers : "Electricité", domaine : "ELEC-BT", qualification : "ELEC1-BT" },
        { metiers : "Electricité", domaine : "ELEC-BT", qualification : "ELEC2-BT" },
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC1-BT/HT"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC2-BT/HT"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC3-CLR"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC4-CTH"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC5-CTHQ19"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC6-CAR"},
        { metiers : "Electricité", domaine : "ELEC-BT/HT", qualification : "ELEC7-DIAG"},
        { metiers : "Levage", domaine : "Famille 1", qualification : "LEV1-MRS"},
        { metiers : "Levage", domaine : "Famille 1", qualification : "LEV1-VGP"},
        { metiers : "Levage", domaine : "Famille 2", qualification : "LEV2-MRS"},
        { metiers : "Levage", domaine : "Famille 2", qualification : "LEV2-VGP"},
        { metiers : "Levage", domaine : "Famille 3", qualification : "LEV3-MRS"},
        { metiers : "Levage", domaine : "Famille 3", qualification : "LEV3-VGP"},
        { metiers : "Levage", domaine : "Famille 4", qualification : "LEV4-MRS"},
        { metiers : "Levage", domaine : "Famille 4", qualification : "LEV4-VGP"},
        { metiers : "Levage", domaine : "Famille 5", qualification : "LEV5-CLR"},
        { metiers : "Levage", domaine : "Famille 6", qualification : "LEV6-DIAG"},
        { metiers : "Levage", domaine : "Famille 7", qualification : "LEV7-AST"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC- CDT"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC- STI"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC-MRS"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC- VGP"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC- DIAG"},
        { metiers : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", domaine : "Ascenseurs - Escaliers Mécaniques – Trottoirs Roulants", qualification : "ASC- AST"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- CTSSI"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- CPSSI"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- CDEF"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- CMSS"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- CGC"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- AUD"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- DIAG"},
        { metiers : "Incendie", domaine : "INC", qualification : "INC- AST"},
        { metiers : "Machine", domaine : "MAC", qualification : "MAC-VGP"},
        { metiers : "Machine", domaine : "ENG", qualification : "ENG-VGP"},
        { metiers : "Formation", domaine : "", qualification : ""},
        { metiers : "Technique", domaine : "", qualification : ""},
        { metiers : "Pression", domaine : "PRS", qualification : "PRS- CMS"},
        { metiers : "Pression", domaine : "PRS", qualification : "PRS- CVE"},
        { metiers : "Pression", domaine : "PRS", qualification : "PRE- CVI"},
        { metiers : "Pression", domaine : "PRS", qualification : "PRE- DIAG"},
        { metiers : "Pression", domaine : "PRS", qualification : "PRS- AST"},
        { metiers : "Autre", domaine : "", qualification : ""},
        { metiers : "Environnement", domaine : "ENVIR", qualification : "ENVIR-ARL"},
        { metiers : "Environnement", domaine : "ENVIR", qualification : "ENVIR-ARG"},
        { metiers : "Environnement", domaine : "ENVIR", qualification : "ENVIR-MNS"},
        { metiers : "Environnement", domaine : "ENVIR", qualification : "ENVIR-AQA"},
      ]
    };
  },

  components : {
    Traitement
  },

  methods: {
     selectMetier(value) {

        var deleteDuplcateDomaineListe = [];
        this.liste.forEach((element) => {
              if(element.metiers == value) {
                  deleteDuplcateDomaineListe.push(element.domaine);
              }
        });

        this.domaineList= [...new Set(deleteDuplcateDomaineListe)];
     },

     selectDomaine(value) {

        var deleteDuplcateQualificationListe = [];
        this.liste.forEach((element) => {
              if(element.domaine == value) {
                  deleteDuplcateQualificationListe.push(element.qualification);
              }
        });

        this.qualificationList= [...new Set(deleteDuplcateQualificationListe)];
     },

     // preciew file
      previewFile() {
              this.file = this.$refs.file.files[0];
      },

    // create Etalonnage
    create() {

        Service.createCompetence(this.competence, this.file)
        .then(() => {
            this.traitement = true;
            this.msgCompetence = "Veuillez patienter quelques secondes pour enregister voter demande";
                setTimeout(() => {
                    return this.$router.go(this.$router.currentRoute);
                }, 10000);
        })
        .catch((error) => {
            this.error = error.message;
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
        });

    }


  }


};
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
  padding:15px;


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


}

.formCreation div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
}
.formCreation div label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#494949;
}

.formCreation div textarea {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#494949;
}
.formCreation div input {
  height: 40px;
  margin-bottom: 5px;
  border: 1px solid #243064;
  padding:5px;
}.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}

.formCreation div select {
  height: 40px;
}

.formCreation div:nth-child(13) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(14) input {
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


</style>
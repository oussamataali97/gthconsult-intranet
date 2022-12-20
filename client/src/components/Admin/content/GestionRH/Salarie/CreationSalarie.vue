<template>
  <div class="creationClient">

    <h3><i class="fa-solid fa-person-circle-plus"></i> CRÉER FICHE COLLABORATEUR</h3>

    <Traitement :msg="msgFicheSalarie" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">
      <div class="p" style="width:100%; margin:10px 0;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Personnelles </div>
      <div>
        <label for="Nom">Nom</label>
        <input type="text" v-model="salarie.nom">
      </div>

      <div>
        <label for="prénom">Prénom</label>
        <input type="text" v-model="salarie.prenom">
      </div>

      <div>
        <label for="Téléphone">Téléphone</label>
        <input type="text" v-model="salarie.telephone">
      </div>

      <div>
        <label for="E-mail">E-mail personnelle</label>
        <input type="text" v-model="salarie.email">
      </div>



      <div>
        <label for="Adresse">Adresse</label>
        <input type="text" v-model="salarie.adresse">
      </div>

      <div>
        <label for="ville">Ville</label>
        <input type="text" v-model="salarie.ville">
      </div>

      <div>
        <label for="Pays">Pays</label>
        <input type="text" v-model="salarie.pays">
      </div>

      <div>
        <label for="Numéro CIN ou PASSPORT">Numéro CIN ou PASSPORT</label>
        <input type="text" v-model="salarie.identite">
      </div>


      <div class="p" style="width:100%; margin:10px 0;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Bank </div>

      <div>
        <label for="Banque">Banque</label>
        <input type="text" v-model="salarie.banque">
      </div>

      <div>
        <label for="RIB">RIB</label>
        <input type="text" v-model="salarie.rip">
      </div>
      <div class="p" style="width:100%; margin:10px 0;font-weight: bold; color:black;background-color: #e9e9e9; ;padding:7px;">Informations Technique & Documents </div>

      <div>
        <label for="Matricule">Matricule</label>
        <input type="text" v-model="salarie.matricule">
      </div>

      <div>
        <label for="Poste">Poste</label>
        <input type="text" v-model="salarie.poste">
      </div>


      <div>
        <label for="Raison sociale">Type de Contrat</label>
        <select v-model="salarie.typeContart">
              <option v-for="item in typeContart" :key="item" :value="item" > {{ item }}</option>
        </select>
      </div>

      <div>
        <label for="Numéro CNSS">Numéro CNSS</label>
        <input type="text" v-model="salarie.cnss">
      </div>
      <div>
        <label for="Niveau d étude">Niveau d étude</label>
        <select v-model="salarie.niveauEtude">
              <option v-for="item in typeDiplome" :key="item" :value="item" > {{ item }}</option>
        </select>
      </div>

      <div>
        <label for="Diplôme">Diplôme</label>
        <input class="form-control" type="file"  multiple="multiple" placeholder="Télécharger Certificat" ref="diplome" @change="previewDIPLOME">
      </div>



      <div>
        <label for="Date Embauche">Date Embauche</label>
        <input type="date" v-model="salarie.dateEmbauche">
      </div>

      <div>
        <label for="Date de Quitter">Date de Quitter</label>
        <input type="date" v-model="salarie.dateQuitter">
      </div>

      <div>
        <label for="Type de Quitter">Type de Quitter</label>
        <select v-model="salarie.typeQuitter">
              <option v-for="item in typeQuitter" :key="item" :value="item" > {{ item  }}</option>
        </select>
      </div>

      <div>
        <label for="CIN">CIN</label>
        <input type="file" class="form-control" multiple="multiple" placeholder="Télécharger CIN" ref="cin" @change="previewCIN">
      </div>



      <div>
        <label for="Photo salarié">Photo salarié</label>
        <input type="file" class="form-control" multiple="multiple" placeholder="Télécharger CIN" ref="photo" @change="previewPHOTO">
      </div>

      <div>
        <label for="Documents Médical">Documents Médical</label>
        <input type="file" class="form-control" multiple="multiple" placeholder="Télécharger CIN" ref="medical" @change="previewMEDICAL">
      </div>

      <div>
        <label for="Autres Documents">Autres Documents</label>
        <input type="file" class="form-control" multiple="multiple" placeholder="Télécharger CIN" ref="autres" @change="previewAUTRES">
      </div>
      <div>
        <label for="Autres Documents"></label>
        <input type="hidden">
      </div>

      <div>
        <input type="submit" value="Créer un Nouveau Collaborateur" @click="create()">
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
      cin : null,
      diplome : null,
      photo : null,
      autres : null,
      traitement : null,
      msgFicheSalarié : null,
      salarie: {
              matricule : null,
              nom : null,
              prenom : null,
              telephone : null,
              poste : null,
              typeContart : null,
              cnss : null,
              banque : null,
              rip : null,
              niveauEtude : null,
              dateEmbauche : null,
              dateQuitter : null,
              typeQuitter : null,
              identite : null,
              email : null,
              adresse : null,
              pays : null,
              ville : null
      },
      typeContart : ["CDI", "CDD", "ANAPEC", "Intérim", "Autre"],
      typeQuitter : [" ","Contrat d'intérim", "Démission", "Rupture", "Autre"],
      typeDiplome : [
        "DT : Diplôme de Technicien",
        "DQ : Diplôme de Qualification",
        "DS : Diplôme de Spécialisation",
        "F : FORMATION",
        "CAP : Certificat d'aptitude professionnelle",
        "BEP : Brevet d'études professionnelles",
        "Niveau BAC : Niveau Baccalauréat",
        "Bac : Baccalauréat",
        "Bac +1 / L1 : Baccalauréat +1",
        "Bac +2 / L2 : Baccalauréat +1",
        "DTS : Diplôme de Technicien Spécialisé",
        "BTS : Brevet de Technicien Supérieur",
        "DUT : Diplôme universitaire de Technologie",
        "DEUST : Diplôme d’Etudes Universitaires Scientifiques et Techniques",
        "DEUG : Diplôme d'études universitaires générales",
        "DEUP : Diplôme d'études universitaires professionnelles",
        "CPGE: Classes Préparatoires aux Grandes Ecoles",
        "Bac +3 / L3 : Baccalauréat +3",
        "LF : Licence Fondamentale",
        "LP : Licence Professionnelle",
        "LST : Licence Sciences et Techniques",
        "Bachelor : Bachelor",
        "Bac +4 / M1 : Baccalauréat +4",
        "Bac +5 / M2 : Baccalauréat +5",
        "DESS : Diplôme d'études supérieures spécialisées",
        "MR : Master Recherche",
        "MS : Master Spécialisé",
        "MST : Master Sciences et Techniques",
        "MBA : Master of Business Administration",
        "Maîtrise : Baccalauréat +5 ou  Baccalauréat +6",
        "IE : Ingénieur d'Etat",
        "I : Ingénieur",
        "Doctorat : Doctorat",
        "Post-Doctorat : Chercheur postdoctoral",
        "Autre : Diplôme pas dans la liste",
      ],

      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },

  methods: {
     // preciew file
      previewCIN() {
              this.cin = this.$refs.cin.files[0];
      },

      previewDIPLOME() {
              this.diplome = this.$refs.diplome.files[0];
      },

      previewPHOTO() {
              this.photo = this.$refs.photo.files[0];
      },

      previewAUTRES() {
              this.autres = this.$refs.autres.files[0];
      },

      previewMEDICAL() {
              this.medical = this.$refs.medical.files[0];
      },


    // create Etalonnage
    create() {

      const flag = this.cin != null && this.diplome != null && this.photo != null && this.autres != null && this.medical != undefined;

      if(flag == false) {
        alert("Veuillez remplir le champ");
      } else {

            this.traitement = true;
            this.msgFicheSalarie = "Veuillez patienter quelques secondes pour enregister la fiche Collaborateur";

            Service.createFicheSalarie(this.salarie, this.cin, this.diplome, this.photo, this.autres, this.medical)
              .then((response) => {
                  this.traitement = true;
                  if(response) {
                      this.msgFicheSalarie = "Succes";
                      setTimeout(() => {
                          return this.$router.go(this.$router.currentRoute);
                      }, 8000);
                  }
              })
              .catch((error) => {
                  this.error = error.message;
                  console.error(`HTTP error: ${error.name} => ${error.message}`);
                  throw "fail request at: GET /refreshtime";
              });
      }

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


}
.succes {
  background-color: #69cd5b;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.echec {
  background-color: rgb(248, 51, 51);
  color: white;
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  height: fit-content;
}

.formCreation {

  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  flex-wrap: wrap;

}

.formCreation div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48%;
}
.formCreation div label {
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

.formCreation div:nth-child(28) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(29) input {
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
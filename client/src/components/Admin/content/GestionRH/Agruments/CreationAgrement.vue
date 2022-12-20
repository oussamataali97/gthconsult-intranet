<template>
  <div class="creationClient">

    <h3><i class="fa-solid fa-handshake-simple"></i> AJOUTER UN NOUVELLE AGRÉMENT</h3>

    <Traitement :msg="msgArgement" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Nom Agrément">Nom Agrément</label>
        <select v-model="argement.nomArgument">
          <option value="Contrôle des installations électriques">Contrôle des installations électriques</option>
          <option value="Contrôle des appareils et Accessoire de levage">Contrôle des appareils et Accessoire de levage</option>
          <option value="Contrôle des ascenseurs et monte-charge">Contrôle des ascenseurs et monte-charge</option>
          <option value="Vérification générale périodique des Appareils ou machine">Vérification générale périodique des Appareils ou machine</option>
          <option value="Contrôle des appareils à pression">Contrôle des appareils à pression</option>
        </select>
      </div>

      <div>
        <label for="Nom de Ministre">Nom de Ministre</label>
        <select v-model="argement.nomMinistre">
          <option value="Ministre de l'emploi">Ministère de l'emploi</option>
          <option value="Ministère de l'Equipement et des Transports">Ministère de l'Equipement et des Transports</option>
          <option value="Ministère de l'Energie, des Mines">Ministère de l'Energie, des Mines</option>
        </select>
      </div>

      <div>
        <label for="ville">Date d'agrément</label>
        <input type="date" v-model="argement.dateArgument">
      </div>

      <div>
        <label for="ville">Puplication/ Bulletin officiel/ N° Agrément</label>
        <input type="text" v-model="argement.preuve">
      </div>


      <div>
        <label for="Status d'agrément" >Status d'agrément</label>
        <select v-model="argement.status">
          <option value="En cour">En cour</option>
          <option value="Validé">Validé</option>
        </select>
      </div>

      <div>
        <label for="Status d'agrément" >La durée de validité d'agrément</label>
        <select v-model="argement.duree">
          <option value="5 mois">5 mois</option>
          <option value="5 ans">5 ans</option>
        </select>
      </div>

      <div>
        <label for="ville">Date D'expiration</label>
        <input type="date" v-model="argement.dateExpiration">
      </div>

      <div>
        <label for="ville">Date de Renouvellement</label>
        <input type="date" v-model="argement.dateRenouvellement">
      </div>


      <div>
        <label for="pays">Télécharger Document</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger Certificat" ref="file" @change="previewFile">
      </div>

      <div>
        <label for="pays">   </label>
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
      msgArgement : null,
      argement: {
              nomArgument : null,
              nomMinistre : null,
              dateArgument : null,
              preuve : null,
              status : null,
              duree : null,
              dateExpiration : null,
              dateRenouvellement : null
      },
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
      previewFile() {
              this.file = this.$refs.file.files[0];
      },

    // create Agrement
    create() {
      Service.createAgrement(this.argement, this.file)
      .then((response) => {
          this.traitement = true;
          this.msgArgement = "Veuillez patienter quelques secondes pour enregister";
          if(response) {
              setTimeout(() => {
                  return this.$router.go(this.$router.currentRoute);
              }, 10000);
          }
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
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;



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

.formCreation div:nth-child(11) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(12) input {
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

<template>
  <div class="creationClient">

    <h3>CRÉER ÉTALONNAGE</h3>

    <Traitement :msg="msgEtalonnage" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">
      <div>
        <label for="nom">Désignation</label>
        <input type="text" v-model="etalonnage.designation">
      </div>

      <div>
        <label for="adresse">Marque</label>
        <input type="text" v-model="etalonnage.marque">
      </div>

      <div>
        <label for="ville">Identification</label>
        <input type="text" v-model="etalonnage.identification">
      </div>

      <div>
        <label for="codePostal">Étalonnie Le</label>
        <input type="date" v-model="etalonnage.etalonnieLe">
      </div>

      <div>
        <label for="codePostal">Prochaine Étalonnage</label>
        <input type="date" v-model="etalonnage.prochaineEtalonnage">
      </div>

      <div>
        <label for="pays">Numéro Certificats d'étalonnage</label>
        <input type="text" v-model="etalonnage.certificatsEtalonnage">
      </div>

      <div>
        <label for="pays">Télécharger Certificat</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger Certificat" ref="file" @change="previewFile">
      </div>

      <div>
        <label for="pays">   </label>
        <input type="hidden">
      </div>

      <div>
        <input type="submit" value="Créer un étalonnage" @click="create()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>
</template>

<script>
import Service from "../../../../Service";
import Traitement from "../Affaire/Traitement.vue"

export default {
  data() {
    return {
      file : null,
      traitement : null,
      msgEtalonnage : null,
      etalonnage: {
              designation : null,
              marque : null,
              identification : null,
              etalonnieLe : null,
              prochaineEtalonnage : null,
              certificatsEtalonnage : null,
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
              console.log(this.file);
      },

    // create Etalonnage
    create() {

      Service.createEtalonnage(this.etalonnage, this.file)
      .then((response) => {
          this.traitement = true;
          this.msgEtalonnage = "Veuillez patienter quelques secondes pour enregistre L' Étalonnage";
          if(response) {
              setTimeout(() => {
                  return this.$router.go(this.$router.currentRoute);
              }, 10000)
          }

      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
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
  margin-left:10px;
}

.formCreation div:nth-child(9) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(10) input {
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
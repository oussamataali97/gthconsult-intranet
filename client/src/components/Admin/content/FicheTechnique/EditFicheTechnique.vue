<template>
  <div class="creationClient">

 <h3><i class="fa-solid fa-file-pen"></i> MODIFIER FICHE TECHNIQUE MATÉRIEL</h3>

    <Traitement :msg="msgFicheTechnique" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">
      <div>
        <label for="nom">Désignation</label>
        <input type="text" v-model="ficheTechnique.designation">
      </div>

      <div>
        <label for="adresse">Marque</label>
        <input type="text" v-model="ficheTechnique.marque">
      </div>

      <div>
        <label for="ville">Identification</label>
        <input type="text" v-model="ficheTechnique.identification">
      </div>

      <div>
        <label for="ville">Numéro Fiche Technique</label>
        <input type="text" v-model="ficheTechnique.numFiche">
      </div>

      <div>
        <label for="pays">Télécharger Certificat</label>
        <input type="file" class="form-control" multiple="multiple" placeholder="Télécharger Certificat" ref="file" @change="previewFile">
      </div>

      <div>
        <label for="pays">   </label>
        <input type="hidden">
      </div>


      <div>
        <input type="submit" value="Changé un fiche Technique" @click="update()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>
import Service from "../../../../Service";

export default {
  data() {
    return {
      file : null,
      traitement : null,
      msgFicheTechnique : null,
      ficheTechnique: {
              designation : null,
              marque : null,
              identification : null,
              numFiche : null
      },
      succes: false,
      echec: false,
      error : null
    };
  },
  props : {
    fichetechniqueId : String,
  },
  methods: {
    // preciew file
    previewFile() {
              this.file = this.$refs.file.files[0];
    },

    // Update Interlocuteurs
    update() {
      Service.updateFicheTechnique(this.fichetechniqueId, this.ficheTechnique, this.file)
      .then(() => {

          this.succes = true;
          setTimeout(() => {
              this.succes = false;
              return this.$router.go(this.$router.currentRoute)
          }, 5000);

      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
    }
  },

  created() {

    // get clients (raison Social)
    Service.selectFicheTechnique(this.fichetechniqueId)
      .then((result) => {
         this.ficheTechnique = result.data.ficheTechnique;
      })
      .catch((error) => {
          this.msg = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      });


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
  padding: 15px;



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

.formCreation div:nth-child(7) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(8) input {
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
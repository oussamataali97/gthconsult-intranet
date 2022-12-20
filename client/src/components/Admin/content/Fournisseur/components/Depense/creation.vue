<template>
  <div class="creationClient">

    <h3>CRÉATION DÉPENSE</h3>

    <Traitement :msg="msgDepense" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Type Dépense">Type Dépense</label>
        <select v-model="depense.type" @change="selectTypeDepence(depense.type)">
         <option v-for="index in types" :key="index" :value="index"> {{ index }}</option>
        </select>
      </div>

      <div v-if="flagAutreDepence">
        <label for="Autre Dépense">Autre Dépense</label>
        <input type="text" v-model="depense.autreDepense">
      </div>

      <div>
        <label for="Numéro Facture, reçu">Numéro Facture, Reçu</label>
        <input type="text" v-model="depense.numeroFacture">
      </div>


      <div>
            <label for="Nom Société, Fournisseur">Nom Société, Fournisseur</label>
            <select v-model="depense.nomSociete">
                <option v-for="index in fournisseurs" :key="index._id" :value="[index._id, index.raisonSocial]"> {{ index.raisonSocial }}</option>
            </select>
      </div>

      <div>
        <label for="Date Facture & Reçu">Date Facture & Reçu</label>
        <input type="date" v-model="depense.dateFacture">
      </div>

      <div>
        <label for="Pièce jointe">Pièce jointe</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger Pièce jointe" ref="file" @change="previewFile">
      </div>

      <div>
        <label for="Montant HT">Montant HT</label>
        <input type="number" v-model="depense.montantHT" @keyup="calculMontantHTT()">
      </div>

      <div>
        <label for="Taux TVA %">Taux TVA %</label>
        <input type="number" v-model="depense.tauxTVA" @keyup="calculMontantHTT()">
      </div>

      <div>
        <label for="Montant HTT">Montant HTT</label>
        <input type="number" v-model="depense.montantHTT" disabled>
      </div>

      <div v-if="flagAutreDepence">
        <label for=" ">  </label>
        <input type="hidden">
      </div>

      <div>
        <input type="submit" value="Créer La Dépense" @click="create()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>
import Service from '../../../../../../Service';
import Traitement from "../../../Affaire/Traitement.vue"

export default {
  data() {
    return {
      file : null,
      traitement :false,
      msgDepense : null,
      fournisseurs : [],
      flagAutreDepence : false,
      depense: {
              type : null,
              numeroFacture : null,
              nomSociete : [],
              dateFacture : null,
              montantHT : null,
              tauxTVA : null,
              montantHTT : null,
              autreDepense : null
      },
      types : ["Facture reçue", "Rembourser", "Avance", "Autre"],
      succes: false,
      echec: false,
      error : null
    };
  },

  components : {
    Traitement
  },

  methods: {

    selectTypeDepence(value) {
        if(value == "Autre") {
          this.flagAutreDepence = true;
        } else {
          this.flagAutreDepence = false;
        }
    },


     // preciew file
      previewFile() {
              this.file = this.$refs.file.files[0];
              console.log(this.file);
      },

    quitter() {
          return this.$router.go("/");
    },
    // create Depence
    create() {

      if(this.depense.type == "Autre") {
        this.depense.type = this.depense.autreDepense
      }

      this.traitement = true;
      this.msgDepense = "Veuillez patienter quelques secondes pour enregister";

      Service.createDepense(this.depense, this.file)
        .then((result) => {
            if(result) {
                setTimeout(() => {
                    return this.$router.go(this.$router.currentRoute);
                }, 10000)
            }
        })
        .catch((error) => {
          console.log(error.message);
        });

    },

    calculMontantHTT() {
      this.depense.montantHTT = parseFloat((this.depense.montantHT / 100) * this.depense.tauxTVA) + parseFloat(this.depense.montantHT);
    }

  },

  created() {

    Service.readFournisseur()
    .then((result) => {
        console.log(result);
        this.fournisseurs = result.data.fournisseurs;
    })
    .catch((error) => {
        console.log(error)
    });

  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;
}
.formCreation div select {
  height: 40px;
}
#app > div > div > div.menu-content > div.content > div > div > div:last-child > input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
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

#app > div > div > div.menu-content > div.content > div > div > div > input[type=submit] {
    background-color: green;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}



#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}

#app > div > div > div.menu-content > div.content > div > h3 {
    background-color: #ff0000d4;
    padding: 15px;
}

</style>
<template>
  <div class="creationClient">

    <h3>MODIFIÉ UN CHARGE EN EXPLOITATION</h3>

    <Traitement :msg="msgCharge" v-if="traitement == true"/>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="Type Charge D'exploitaton">Type Charge D'exploitaton</label>
        <select v-model="charge.type" @change="selectChargeExploitation(charge.type)">
         <option v-for="index in types" :key="index" :value="index">{{ index }}</option>
        </select>
      </div>

      <div>
        <label for="Catégorie">Catégorie</label>
        <select v-model="charge.categorie" @change="selectCategorieChargeExploitation(charge.categorie)">
         <option v-for="index in listCategories" :key="index.categorie" :value="index.categorie"> {{ index.categorie }}</option>
        </select>
      </div>

      <div>
        <label for="Catégorie">Article</label>
        <select v-model="charge.article">
         <option v-for="index in listArticles" :key="index.article" :value="index.article"> {{ index.article }}</option>
        </select>
      </div>

      <div>
        <label for="État de paiement">État de paiement</label>
        <select v-model="charge.paiement">
           <option v-for="index in paiements" :key="index" :value="index"> {{ index }}</option>
        </select>
      </div>


      <div>
            <label for="Nom Société, Fournisseur">Nom Société, Fournisseur</label>
            <select v-model="charge.nomFournisseur">
                <option v-for="index in fournisseurs" :key="index._id" :value="[index._id, index.raisonSocial]"> {{ index.raisonSocial }}</option>
            </select>
      </div>

      <div>
        <label for="Nº Facture">Numéro Facture</label>
        <input type="text" v-model="charge.numeroFacture">
      </div>

      <div>
        <label for="Date Facture">Date Facture</label>
        <input type="date" v-model="charge.dateFacture">
      </div>

      <div>
        <label for="Télécharger facture">Télécharger facture</label>
        <input class="form-control" type="file" multiple="multiple" placeholder="Télécharger facture" ref="file" @change="previewFile">
      </div>

      <div>
        <label for=">Montant d'achat HT">Montant d'achat HT</label>
        <input type="number" v-model="charge.montantHT" @keyup="calculMontantHTT()">
      </div>

      <div>
        <label for="Taux TVA %">Taux TVA %</label>
        <input type="number" v-model="charge.tauxTVA" @keyup="calculMontantHTT()">
      </div>

      <div>
        <label for="Montant HTT">Montant HTT</label>
        <input type="number" v-model="charge.montantHTT">
      </div>

      <div>
        <label for="Date d'échéance">Date d'échéance</label>
        <input type="date" v-model="charge.dateEcheance">
      </div>

      <div>
            <label for=" "> </label>
            <select v-model="charge.modePaiement">
                <option v-for="index in modePaiements" :key="index" :value="index"> {{ index }}</option>
            </select>
      </div>

      <div>
        <label for=" "></label>
        <input type="hidden">
      </div>


      <div>
        <input type="submit" value="Modifié une chrge d'exploitation" @click="update(charge.filename)">
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
      msgCharge : null,
      fournisseurs : [],
      charge: {
              type : null,
              categorie : null,
              article : null,
              paiement : null,
              nomFournisseur : null,
              numeroFacture : null,
              dateFacture : null,
              tauxTVA : null,
              montantHT : null,
              modePaiement : null,
              montantHTT : null,
              dateEcheance : null
      },
      types : ["Charge bureau", "Charge logistique", "Charge équipement et investissement"],
      paiements : ["Payé", "Reste à payer", "Bloquer"],
      modePaiements : ["Chèque", "Virement", "Espèce"],
      categories : [
        { type : "Charge bureau", categorie : "BUREAUTIQUE/ INFORMATIQUE" },
        { type : "Charge bureau", categorie : "FRAIS BUREAU" },
        { type : "Charge bureau", categorie : "ASSURANCE" },
        { type : "Charge bureau", categorie : "COMPTABLE" },
        { type : "Charge logistique", categorie : "VÉHICULES" },
        { type : "Charge logistique", categorie : "FRAIS DÉPLACEMENT" },
        { type : "Charge équipement et investissement", categorie : "MATERIEL" },
        { type : "Charge équipement et investissement", categorie : "PREVISIONS" }
      ],
      listCategories : [],
      articles : [
        { categorie : "BUREAUTIQUE/ INFORMATIQUE", article : "Informatique" },
        { categorie : "BUREAUTIQUE/ INFORMATIQUE", article : "Fourrniture de bureau" },
        { categorie : "FRAIS BUREAU", article : "Loyer" },
        { categorie : "FRAIS BUREAU", article : "Internet/Fixe" },
        { categorie : "FRAIS BUREAU", article : "EAU/ELEC" },
        { categorie : "FRAIS BUREAU", article : "Caisse" },
        { categorie : "FRAIS BUREAU", article : "Menage" },
        { categorie : "ASSURANCE", article : "Assurance AT (AXA)" },
        { categorie : "ASSURANCE", article : "Assurance RC (ALLIANCE)" },
        { categorie : "COMPTABLE", article : "BILAN" },
        { categorie : "COMPTABLE", article : "DECLARATION TVA" },
        { categorie : "VÉHICULES", article : "LOCATION" },
        { categorie : "FRAIS DÉPLACEMENT", article : "TA" },
        { categorie : "FRAIS DÉPLACEMENT", article : "JE" },
        { categorie : "FRAIS DÉPLACEMENT", article : "EE" },
        { categorie : "FRAIS DÉPLACEMENT", article : "SB" },
        { categorie : "MATERIEL", article : "Calibration" },
        { categorie : "MATERIEL", article : "Extincteurs" },
        { categorie : "MATERIEL", article : "Gas detecteur" },
        { categorie : "previsions", article : "Investissement" }
      ],
      listArticles : [],
      succes: false,
      echec: false,
      error : null
    };
  },

  props : {
    chargeId : String
  },

  components : {
    Traitement
  },

  methods: {

    // preciew file
    previewFile() {
        this.file = this.$refs.file.files[0];
    },

    selectChargeExploitation(value) {
        this.listCategories = this.categories.filter((el) => el.type == value);
    },

    selectCategorieChargeExploitation(value) {
        this.listArticles = this.articles.filter((el) => el.categorie == value);
    },

    quitter() {
          return this.$router.go("/");
    },
    // update Depence

    update(filename) {


      this.traitement = true;
      this.msgCharge = "Veuillez patienter quelques secondes pour modifier";

      Service.updateChargeExploitation(this.charge, this.file, this.chargeId, filename)
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
      this.charge.montantHTT = parseFloat((this.charge.montantHT / 100) * this.charge.tauxTVA) + parseFloat(this.charge.montantHT);
    }

  },

  created() {

    Service.readFournisseur()
    .then((result) => {
        this.fournisseurs = result.data.fournisseurs;
    })
    .catch((error) => {
        console.log(error)
    });


    Service.selectChargeExploitation(this.chargeId)
    .then((result) => {
        this.charge = result.data.charge;
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
#app > div > div > div.menu-content > div.content > div > div > div.formInspecteur {
  width: 100%;
}
#app > div > div > div.menu-content > div.content > div > div > div > input[type=button] {
    background-color: rgb(3, 0, 161);
    color: white;
    border: 0;
    margin-top: 20px;
    cursor: pointer;
}
.formCreation div select {
  height: 40px;
}

 div:last-child > input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 50px;
    cursor: pointer;
}
 div > input[type=submit] {
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
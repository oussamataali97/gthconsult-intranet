<template>
  <div class="indicateur">
    <div class="titre">
      <h2>LES INDICATEURS DES FACTURES</h2>
    </div>

    <div class="text">

      <span><i class="fa-regular fa-lightbulb"></i>Note :</span>
      Elle permet de gérer les factures, et de suivre de progrès de la gestion des règlements, relance des clients
      avec une vue centralisée et des fonctionnalités d’alertes gérer cas modalistes de paiements de nos clients.

    </div>


    <div class="filter">
      <label for="nom"><i class="fa-solid fa-magnifying-glass" style="font-size: 20px;"></i> Rechercher par des années: </label>
      <select v-model="annee" @change="indicateur">
        <option v-for="item in years" :key="item" :value="item"> {{ item }} </option>
      </select>
    </div>


    <div class="statstique">
      <div>
        <p>Janvier</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureJanvier }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente:</span> {{ facture.attenteJanvier }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise:</span> {{ facture.emiseJanvier }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementJanvier }} </p>
      </div>

      <div>
        <p>Février</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureFevrier }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteFevrier }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseFevrier }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementFevrier }} </p>
      </div>

      <div>
        <p>Mars</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureMars }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteMars }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseMars }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée : </span>{{ facture.paiementMars }} </p>
      </div>

      <div>
        <p>Avril</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureAvril }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente:</span> {{ facture.attenteAvril }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseAvril }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementAvril }} </p>
      </div>

      <div>
        <p>Mai</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureMai }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteMai }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseMai }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementMai }} </p>
      </div>

      <div>
        <p>Juin</p>
        <p><span> <i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureJuin }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente:</span> {{ facture.attenteJuin }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseJuin }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementJuin }} </p>
      </div>

      <div>
        <p>Juillet</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureJuillet }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteJuillet }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseJuillet }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée : </span>{{ facture.paiementJuillet }} </p>
      </div>

      <div>
        <p>Août</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture: </span>{{ facture.factureAout }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteAout }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise:</span> {{ facture.emiseAout }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementAout }} </p>
      </div>

      <div>
        <p>Septembre</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture: </span>{{ facture.factureSeptembre }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteSeptembre }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseSeptembre }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementSeptembre }} </p>
      </div>

      <div>
        <p>Octobre</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture:</span> {{ facture.factureOctober }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente: </span>{{ facture.attenteOctober }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise:</span> {{ facture.emiseOctober }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée : </span>{{ facture.paiementOctober }} </p>
      </div>

      <div>
        <p>Novembre</p>
        <p><span><i class="fa-solid fa-file-invoice"></i> Total Facture: </span>{{ facture.factureNovembre }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente:</span> {{ facture.attenteNovembre }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseNovembre }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée : </span>{{ facture.paiementNovembre }} </p>
      </div>

      <div>
        <p>Décembre</p>
        <p><span> Facture: </span>{{ facture.factureDecembre }} </p>
        <p><span><i class="fa-solid fa-file-invoice-dollar"></i> En attente:</span> {{ facture.attenteDecembre }}</p>
        <p><span> <i class="fa-solid fa-hand-holding-dollar"></i> Émise: </span>{{ facture.emiseDecembre }}</p>
        <p><span><i class="fa-solid fa-cash-register"></i> En caissée :</span> {{ facture.paiementDecembre }} </p>
      </div>

    </div>
  </div>
</template>

<script>
import Service from "../../../../Service";
export default {
  name: "indicateur",
  data() {
    return {
      mounths: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      years: [],
      annee: null,
      facture: {
        factureJanvier: null,
        factureFevrier: null,
        factureMars: null,
        factureAvril: null,
        factureMai: null,
        factureJuin: null,
        factureJuillet: null,
        factureAout: null,
        factureSeptembre: null,
        factureOctober: null,
        factureNovembre: null,
        factureDecembre: null,
        paimentJanvier: null,
        paimentFevrier: null,
        paimentMars: null,
        paimentAvril: null,
        paimentMai: null,
        paimentJuin: null,
        paimentJuillet: null,
        paimentAout: null,
        paimentSeptembre: null,
        paimentOctober: null,
        paimentNovembre: null,
        paimentDecembre: null,
        attenteJanvier: null,
        attenteFevrier: null,
        attenteMars: null,
        attenteAvril: null,
        attenteMai: null,
        attenteJuin: null,
        attenteJuillet: null,
        attenteAout: null,
        attenteSeptembre: null,
        attenteOctober: null,
        attenteNovembre: null,
        attenteDecembre: null,
        emiseJanvier: null,
        emiseFevrier: null,
        emiseMars: null,
        emiseAvril: null,
        emiseMai: null,
        emiseJuin: null,
        emiseJuillet: null,
        emiseAout: null,
        emiseSeptembre: null,
        emiseOctober: null,
        emiseNovembre: null,
        emiseDecembre: null
      }
    }
  },

  methods: {

    indicateur() {
      Service.IndicteurFacture(this.annee)
        .then((result) => {
          this.facture = result.data;
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  },

  created() {

    // get year anee current
    const today = new Date();
    this.selectAnnee = today.getUTCFullYear();

    for (let i = this.selectAnnee; i >= 1970; i--) {
      this.years.push(i);
    }
    //factureJanvier
    // get info Indicateur by current
    Service.IndicteurFacture(this.selectAnnee)
      .then((result) => {
        this.facture = result.data;
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

}
</script>

<style scoped>
.indicateur {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.indicateur>.text {
  background-color: #fff27a;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.text span {
  font-weight: bold;
}

.titre h2 {
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207, 31, 33, 1) 0%, rgba(24, 86, 161, 1) 100%);
  text-align: center;
  padding: 10px;
  font-size: 25px;
}


.indicateur>.filter {

  background-color: rgb(238, 238, 238);
  display: flex;
  margin: 0 10px;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}



.indicateur>.filter>select {

  padding: 10px;
  margin-left: 10px;
  border: 1px solid #bebebe;
  border-radius: 20px;
}

.indicateur>.statstique {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
  padding: 10px;
  margin: 0 5px 0px 5px;
  border-radius: 10px;


}

.indicateur>.statstique div {
  background-color: #f3f3f3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  transition: 0.3s ease-in;
  line-height: 30px;

}

.indicateur>.statstique div:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;

}

.indicateur>.statstique div p:nth-child(2),
p:nth-child(3),
p:nth-child(4),
p:nth-child(5) {
  padding: 5px;
  color:#e6272a;
  font-weight: 500;
}






legend {
  font-weight: bold;
  color: #243064;
}


.indicateur>.statstique>div>p:nth-child(1) {
  font-size: 20px;
  border-bottom: 1px solid gray;
  padding: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  text-align: center;
  background-color: #243064;
  font-weight: 700;
  transition: 0.3s ease-out;
}

.indicateur>.statstique>div:hover p:nth-child(1){
  background-color: #cf1f21;

}

.indicateur>.statstique div:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.74);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

div p span {
  font-weight: bold;
  color:#243064;
}








.fa-check {
  font-size: 10px;
}

svg {
  color: #243064;
}

</style>
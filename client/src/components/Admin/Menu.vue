<template>
  <div id="menuBanner">

  <ul class="list-menu">
    <li @click="accueille()" style="background:white;  box-shadow: 0px 0px 5px rgb(173, 173, 173);"><img src="./../../assets/logo.png" style="width: 157px; margin:0 50px;cursor: pointer;" alt=""></li>
    <li v-if="flagRouterAdmin == true">


      <ul>
        <li><i class="fa-solid fa-user"></i></li>
        <li>CLIENT</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationClient')"><i class="fa-solid fa-square-plus"></i>Création un client</li>
        <li @click="$emit('gestionClient')"><i class="fa-solid fa-list"></i>liste Des Clients</li>
      </ul>

    </li>

    <li v-if="flagRouterAdmin == true">

      <ul>
        <li><i class="fa-solid fa-user-group"></i></li>
        <li>INTERLOCUTEUR</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationInterlocuteur')"><i class="fa-solid fa-square-plus"></i>Création un Interlocuteur</li>
        <li @click="$emit('gestionInterlocuteur')"><i class="fa-solid fa-list"></i>Liste Des Interlocuteurs</li>
      </ul>

    </li>

    <li v-if="flagRouterSousTritance == true">
        <ul>
          <li><i class="fa-solid fa-boxes-packing"></i></li>
          <li>FOURNISSEURS</li>
        </ul>

        <ul class="hoverlist">
          <li @click="$emit('creationFournisseur')"><i class="fa-solid fa-square-plus"></i>Nouveau Fournisseur</li>
          <li @click="$emit('gestionFournisseur')"><i class="fa-solid fa-list"></i>Liste Des Fournisseurs</li>
        </ul>
    </li>

    <li v-if="flagRouterSousTritance == true">
        <ul>
          <li><i class="fa-solid fa-briefcase"></i></li>
          <li>SOUS-TRAITANCE</li>
        </ul>

        <ul class="hoverlist">
          <li @click="$emit('creationSousTraitance')"><i class="fa-solid fa-square-plus"></i>Nouveau sous-traitance</li>
          <li @click="$emit('gestionSousTraitance')"><i class="fa-solid fa-list"></i>Liste Des sous-traitances</li>
        </ul>
    </li>

    <li v-if="flagRouterSousTritance == true">
        <ul>
          <li><i class="fa-solid fa-users"></i></li>
          <li>INTERLOCUTEURS</li>
        </ul>

        <ul class="hoverlist">
          <li @click="$emit('creationInterlocuteurSousTraitance')"><i class="fa-solid fa-square-plus"></i>Nouveau Interlocuteur</li>
          <li @click="$emit('gestionInterlocuteurSousTraitance')"><i class="fa-solid fa-list"></i>Liste Des Interlocuteurs</li>
        </ul>
    </li>

    <li v-if="flagRouterSousTritance == true">
      <ul>
        <li><i class="fa-solid fa-person-walking"></i></li>
        <li>CHARGES EN EXPLOITATION</li>
      </ul>
      <ul>
        <li @click="$emit('creationChargeExploitation')"><i class="fa-solid fa-square-plus"></i>Création Charge Exploitation</li>
        <li @click="$emit('gestionChargeExploitation')"><i class="fa-solid fa-clipboard-list"></i>Liste Charges Exploitation</li>
      </ul>
    </li>

    <li v-if="flagRouterSousTritance == true">
      <ul>
        <li><i class="fa-solid fa-landmark"></i></li>
        <li>ACHAT FOURNISSEUR</li>
      </ul>
      <ul>
        <li @click="$emit('demandeAchatFournisseur')"><i class="fa-solid fa-square-plus"></i>Demande</li>
        <li @click="$emit('encoursAchatFournisseur')"><i class="fa-solid fa-spinner"></i>En cours</li>
        <li @click="$emit('termineAchatFournisseur')"><i class="fa-solid fa-clipboard-check"></i>Terminé</li>
      </ul>
    </li>

    <li v-if="flagRouterSousTritance == true">
      <ul>
        <li><i class="fa-solid fa-sack-dollar"></i></li>
        <li>ACHAT SOUS-TRAITANCE</li>
      </ul>
      <ul>
        <li @click="$emit('demandeAchatSousTraitance')"><i class="fa-solid fa-file-circle-plus"></i>Demande</li>
        <li @click="$emit('encoursAchatSousTraitance')"><i class="fa-solid fa-spinner"></i>En cours</li>
        <li @click="$emit('termineAchatSousTraitance')"><i class="fa-solid fa-clipboard-check"></i>Terminé</li>
      </ul>
    </li>


    <li v-if="flagRouterSousTritance == true">
      <ul>
        <li><i class="fa-solid fa-money-bill-wheat"></i></li>
        <li>AUTRE DÉPENSE</li>
      </ul>
      <ul>
        <li @click="$emit('creationDepense')"><i class="fa-solid fa-square-plus"></i>Création  Dépense</li>
        <li @click="$emit('gestionDepense')"><i class="fa-solid fa-table-list"></i>Liste Dépenses</li>
      </ul>
    </li>




    <li v-if="flagRouterAdmin == true">

      <ul>
        <li><i class="fa-solid fa-business-time"></i></li>
        <li>LES OFFRES COMMERCIAUX</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationAffaire')"><i class="fa-solid fa-square-plus"></i>Création d'une offre</li>
        <li @click="$emit('gestionAffaire')"><i class="fa-solid fa-list"></i>Liste Des Offres Commerciaux</li>
      </ul>

    </li>

    <li v-if="flagRouterProduction == true">
      <ul>
        <li><i class="fa-brands fa-product-hunt"></i></li>
        <li>PRODUCTION</li>
      </ul>
      <ul class="hoverlist">
        <li @click="$emit('attenteProduction')"><i class="fa-solid fa-circle-pause"></i>En attente production</li>
        <li @click="$emit('coursProduction')"><i class="fa-solid fa-play"></i>En cours production</li>
        <li @click="$emit('realiseProduction')"><i class="fa-solid fa-check"></i>Réalisé</li>
      </ul>
    </li>

    <li v-if="flagRouterProduction == true">

      <ul>
        <li><i class="fa-solid fa-clipboard"></i></li>
        <li>BORDEREAU D'ENVOI</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationBD')"><i class="fa-solid fa-square-plus"></i>Création Bordereau d'envoi</li>
        <li @click="$emit('listBD')"><i class="fa-solid fa-list"></i>List Bordereau d'envoi</li>
      </ul>
    </li>

    <li v-if="flagRouterFacture == true">

      <ul>
        <li><i class="fa-solid fa-file-lines"></i></li>
        <li>FACTURATION</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('attenteFacturation')"><i class="fa-solid fa-file-invoice"></i>En attente facturation</li>
        <li @click="$emit('emiseFacture')"><i class="fa-solid fa-file-invoice-dollar"></i>Facture émise</li>
        <li @click="$emit('caisseFacture')"><i class="fa-solid fa-sack-dollar"></i>Facture caisse</li>
      </ul>
    </li>

    <li v-if="flagRouterEtalonnage == true">

      <ul>
        <li><i class="fa-solid fa-user-group"></i></li>
        <li>ÉTALONNAGE</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationEtalonnage')"><i class="fa-solid fa-square-plus"></i>Crée Étalonnage</li>
        <li @click="$emit('gestionEtalonnage')"><i class="fa-solid fa-list"></i>Liste Des Étalonnage</li>
      </ul>

    </li>

    <li v-if="flagTechniqueMateriel == true">

      <ul>
        <li><i class="fa-solid fa-file-lines"></i></li>
        <li>FICHE TECHNIQUE MATÉRIEL</li>
      </ul>

      <ul class="hoverlist">
        <li @click="$emit('creationFicheTechnique')"><i class="fa-solid fa-square-plus"></i>Crée fiche technique matériel</li>
        <li @click="$emit('gestionFicheTechnique')"><i class="fa-solid fa-list"></i>Liste Des fiches techniques matériels</li>
      </ul>

    </li>

    <li v-if="flagSalarie == true">
      <ul>
        <li><i class="fa-solid fa-user-group"></i></li>
        <li>FICHES COLLABORATEURS</li>
      </ul>
      <ul class="hoverlist">
        <li @click="$emit('creationSalarie')"><i class="fa-solid fa-square-plus"></i>Nouveau Collaborateur</li>
        <li @click="$emit('gestionSalarie')"><i class="fa-solid fa-list"></i>Liste Des Collaborateurs</li>
      </ul>

    </li>

    <li v-if="flagSalarie == true">
      <ul>
        <li><i class="fa-solid fa-person-circle-xmark"></i></li>
        <li>LES CONGÉS & LES ABSENCES</li>
      </ul>
      <ul class="hoverlist">
        <li @click="$emit('demandeAbsence')"><i class="fa-solid fa-square-plus"></i>Demande Absence</li>
        <li @click="$emit('listeDemandeAbsence')"><i class="fa-solid fa-list"></i>Liste Demande Absence</li>
      </ul>
    </li>

    <li v-if="flagSalarie == true">
      <ul>
        <li><i class="fa-solid fa-person-circle-check"></i></li>
        <li>COMPETENCIES & QUALIFICATIONS</li>
      </ul>
      <ul class="hoverlist">
        <li @click="$emit('nouveauCompetences')"><i class="fa-solid fa-square-plus"></i>Nouveau compétences & qualifications</li>
        <li @click="$emit('listeCompetences')"><i class="fa-solid fa-list"></i>Liste des Info Techniques Qualifications</li>
      </ul>
    </li>

    <li v-if="flagAgrement == true">
      <ul>
        <li><i class="fa-solid fa-handshake"></i></li>
        <li>LES AGRÉMENTS</li>
      </ul>
      <ul class="hoverlist">
        <li @click="$emit('nouveauAgrement')"><i class="fa-solid fa-square-plus"></i>Ajouter un nouvelle agrément</li>
        <li @click="$emit('listeAgrements')"><i class="fa-solid fa-list"></i>Liste des agréments ministériel</li>
      </ul>
    </li>


    <li v-if="flagSalarie == true">
      <ul>
        <li><i class="fa-solid fa-user-group"></i></li>
        <li>LES FRAIS DES SALARIÉS </li>
      </ul>
      <ul>
        <li @click="$emit('gestionFraisSalaries')"><i class="fa-solid fa-square-plus"></i>Gestion les frais des salariés</li>
      </ul>
    </li>






  </ul>

</div>
</template>

<script>
export default {
  data() {
    return {
      flagClients: true,
      flagIntelocuteur: true,
      flagAffaire: true,
      flagProduction : true,
      flagBD : true,
      flagFacturation : false,
      flagRouterFacture : false,
      flagRouterProduction : false,
      flagRouterAdmin : false,
      flagRouterEtalonnage : false,
      flagTechniqueMateriel : false,
      flagSalarie : false,
      flagConge : false,
      flagRouterSousTritance : false,
      flagAgrement : false,
      flagAchat : false,
      flagDepense : false,
      flagCharge : false

    };
  },

  methods: {
    accueille() {
      return this.$router.push("/interface");
    },
  },

  created() {

    console.log(this.$route.name);


    if(this.$route.name == "Facture") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = true;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Production") {

      this.flagRouterProduction = true;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }


    if(this.$route.name == "Admin") {
      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = true;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Etalonnage") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = true;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
      }

    if(this.$route.name == "FicheTechnique") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = true;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
      }

    if(this.$route.name == "GestionRH") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = true;
      this.flagConge = false
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Conge") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = true;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Fournisseur") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = true;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Agrement") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = true;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Achat") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = true;
      this.flagDepense = false;
      this.flagCharge = false;
    }

    if(this.$route.name == "Depense") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = true;
      this.flagCharge = false;
    }

    if(this.$route.name == "ChargeExploitaton") {

      this.flagRouterProduction = false;
      this.flagRouterFacture = false;
      this.flagRouterAdmin = false;
      this.flagRouterEtalonnage = false;
      this.flagTechniqueMateriel = false;
      this.flagSalarie = false;
      this.flagConge = false;
      this.flagRouterSousTritance = false;
      this.flagAgrement = false;
      this.flagAchat = false;
      this.flagDepense = false;
      this.flagCharge = true;
    }

  },

  computed: { }

};
</script>

<style scoped>

#menuBanner{
  background:rgb(245, 245, 245);
  width: 20%;
  height: 100vh;
  position: fixed;
  top:0;
  border-right: 1px solid rgb(223, 223, 223);
  left:0;
  overflow-y: auto;
}

.list-menu li ul:nth-child(1) {
    display: flex;
    flex-direction: row;
    padding: 10px;
    background: #1943ff;
    cursor: pointer;
}

.list-menu li ul:nth-child(1) li:nth-child(1) svg {
  font-size: 20px;
  color: white;
}

.list-menu li ul:nth-child(1) li:nth-child(2) {
  font-size: 19px;
  font-weight: 700;

  color: white;
}

/* /////////////////////////////////////// */

.list-menu li ul:not(:nth-child(1)) {

    padding: 5px;
    font-weight: 500;
}



.list-menu li ul:not(:nth-child(1)) li:nth-child(1) svg {
  font-size: 15px;
  color: white;
}

.list-menu li ul:not(:nth-child(1)) li:nth-child(1) {
  font-size: 15px;
  margin-left: 5px;
  color: white;
  background-color: #ff4043 ;
  padding: 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}



.list-menu li ul:not(:nth-child(1)) li:nth-child(2) svg {
  font-size: 15px;
  color: white;
}

.list-menu li ul:not(:nth-child(1)) li:nth-child(2) {
  font-size: 15px;
  margin-left: 5px;
  color: white;
  background-color: #ff4043 ;
  padding: 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}





.list-menu li ul:not(:nth-child(1)) li:nth-child(3) svg {
  font-size: 15px;
  color: white;

}

.hoverlist li:hover{
  background-color:rgb(202, 29, 29) !important ;
}

.list-menu li ul:not(:nth-child(1)) li:nth-child(3) {
  font-size: 15px;
  margin-left: 5px;
  color: white;
  background-color :#ff4043;
  padding: 5px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 5px;
}

svg{
  margin-right: 5px;
}



</style>
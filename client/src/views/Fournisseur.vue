<template>
  <div class="admin">
    <div class="container">

      <div class="header">
        <Nav />
      </div>

      <div class="menu-content">
        <div class="menu">
          <Menu
            @creationSousTraitance="handelCreationSousTraitance()"
            @gestionSousTraitance="handelGestionSousTraitance()"

            @creationFournisseur="handeCreationlFournisseur()"
            @gestionFournisseur="handelGestionFournisseur()"

            @creationInterlocuteurSousTraitance="handelCreationInterlocuteurSousTraitance()"
            @gestionInterlocuteurSousTraitance="handelGestionInterlocuteurSousTraitance()"

            @demandeAchatFournisseur="handelDemandeAchatFournisseur()"
            @encoursAchatFournisseur="handelEncourAchatFournisseur()"
            @termineAchatFournisseur="handelTermineAchatFournisseur()"

            @demandeAchatSousTraitance="handelDemandeAchatSousTraitance()"
            @encoursAchatSousTraitance="handelEncourAchatSousTraitance()"
            @termineAchatSousTraitance="handelTermineAchatSousTraitance()"

            @creationDepense="handelCreationDepense()"
            @gestionDepense="handelGestionDepense()"

            @creationChargeExploitation="handelCreationChargeExploitation()"
            @gestionChargeExploitation="handelGestionChargeExploitation()"
          />
        </div>
        <div class="content">

          <!-- start content Sous Traitance -->
          <CreationSousTraitance v-if="flagCreationSousTraitance" />
          <GestionSousTraitance v-if="flagGestionSousTraitance" />
          <!-- end content Sous Traitance -->

          <!-- start content Fournisseur -->
          <IndicateurFournisseur v-if="flagIndicateurFournisseur" />
          <CreationFournisseur v-if="flagCreationFournisseur" />
          <GestionFournisseur v-if="flagGestionFournisseur" />
          <!-- end content Fournisseur -->

          <!-- start content Interlocuteur SousTraitance -->
          <CreationInterlocuteurSousTraitance v-if="flagCreationInterlocuteurSousTraitance" />
          <GestionInterlocuteurSousTraitance v-if="falgGestionInterlocuteurSousTraitance" />
          <!-- end content Interlocuteur SousTraitance -->

          <!-- start content Achat Fournisseur -->
          <DemandeAchatFournisseur v-if="flagDemandeAchatFournisseur" />
          <EncoursAchatFournisseur v-if="flagEncoursAchatFournisseur" />
          <TermineAchatFournisseur v-if="flagTermineAchatFournisseur" />
          <!-- end content Achat Fournisseur -->

          <!-- start content Sous Traitance -->
          <DemandeSousTraitance v-if="flagDemandeSousTraitance" />
          <EncoursSousTraitance v-if="flagEncoursSousTraitance" />
          <TermineSousTraitance v-if="flagTermineSousTraitance" />
          <!-- end content Sous Traitance -->

          <!-- start content Creation Depense -->
          <CreationDepense v-if="flagCreationDepense" />
          <GestionDepense v-if="flagGestionDepense" />
          <!-- end content Gestion Depense -->

          <!-- start content Charge -->
          <CreationCharge v-if="flagCreationCharge" />
          <GestionCharge v-if="flagGestionCharge" />
          <!-- end content Charge -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import IndicateurFournisseur from "@/components/Admin/content/Fournisseur/IndicateurFournisseur";

import CreationSousTraitance from "@/components/Admin/content/SousTraitance/CreationSousTraitance";
import GestionSousTraitance from "@/components/Admin/content/SousTraitance/GestionSousTraitance";

import CreationFournisseur from "@/components/Admin/content/Fournisseur/CreationFournisseur";
import GestionFournisseur from "@/components/Admin/content/Fournisseur/GestionFournisseur";

import CreationInterlocuteurSousTraitance from "@/components/Admin/content/InterlocuteurSousTraitance/CreationInterlocuteurSousTraitance";
import GestionInterlocuteurSousTraitance from "@/components/Admin/content/InterlocuteurSousTraitance/GestionInterlocuteurSousTraitance";

import DemandeAchatFournisseur from "@/components/Admin/content/Fournisseur/components/Achat/demande.vue";
import EncoursAchatFournisseur from "@/components/Admin/content/Fournisseur/components/Achat/encours.vue";
import TermineAchatFournisseur from "@/components/Admin/content/Fournisseur/components/Achat/termine.vue";

import DemandeSousTraitance from "@/components/Admin/content/Fournisseur/components/SousTraitance/demande.vue";
import EncoursSousTraitance from "@/components/Admin/content/Fournisseur/components/SousTraitance/encours.vue";
import TermineSousTraitance from "@/components/Admin/content/Fournisseur/components/SousTraitance/termine.vue";

import CreationDepense from "@/components/Admin/content/Fournisseur/components/Depense/creation.vue";
import GestionDepense from "@/components/Admin/content/Fournisseur/components/Depense/gestion.vue";

import CreationCharge from "@/components/Admin/content/Fournisseur/components/Charge/creation.vue";
import GestionCharge from "@/components/Admin/content/Fournisseur/components/Charge/gestion.vue";

export default {
  name: "admin",
  data() {
    return {
      flagCreationSousTraitance : false,
      flagGestionSousTraitance : false,
      flagIndicateurFournisseur : true,
      flagCreationFournisseur : false,
      flagGestionFournisseur : false,
      flagCreationInterlocuteurSousTraitance : false,
      falgGestionInterlocuteurSousTraitance : false,
      flagDemandeAchatFournisseur : false,
      flagEncoursAchatFournisseur : false,
      flagTermineAchatFournisseur : false,
      flagDemandeSousTraitance : false,
      flagEncoursSousTraitance : false,
      flagTermineSousTraitance : false,
      flagCreationDepense : false,
      flagGestionDepense : false,
      flagCreationCharge : false,
      flagGestionCharge : false
    };
  },
  components: {
    Menu,
    Nav,
    CreationSousTraitance,
    GestionSousTraitance,
    IndicateurFournisseur,
    CreationFournisseur,
    GestionFournisseur,
    CreationInterlocuteurSousTraitance,
    GestionInterlocuteurSousTraitance,
    DemandeAchatFournisseur,
    EncoursAchatFournisseur,
    TermineAchatFournisseur,
    DemandeSousTraitance,
    EncoursSousTraitance,
    TermineSousTraitance,
    CreationDepense,
    GestionDepense,
    CreationCharge,
    GestionCharge
  },

  methods: {

    handelGestionSousTraitance() {
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = true,
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelCreationSousTraitance() {
      this.flagCreationSousTraitance = true,
      this.flagGestionSousTraitance = false,
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handeCreationlFournisseur() {
      this.flagCreationFournisseur = true,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false
      this.flagIndicateurFournisseur = false;
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelGestionFournisseur() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = true,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelCreationInterlocuteurSousTraitance() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = true,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelGestionInterlocuteurSousTraitance() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = true,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelDemandeAchatFournisseur() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = true;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelEncourAchatFournisseur() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = true;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelTermineAchatFournisseur() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = true;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelDemandeAchatSousTraitance() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = true;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelEncourAchatSousTraitance() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = true;
      this.flagTermineSousTraitance = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelTermineAchatSousTraitance() {
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = true;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelCreationDepense() {
      this.flagCreationDepense = true;
      this.flagGestionDepense = false;
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelGestionDepense() {
      this.flagCreationDepense = false;
      this.flagGestionDepense = true;
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
      this.flagCreationCharge = false;
      this.flagGestionCharge = false;
    },

    handelCreationChargeExploitation() {
      this.flagCreationCharge = true;
      this.flagGestionCharge = false;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
    },

    handelGestionChargeExploitation() {
      this.flagCreationCharge = false;
      this.flagGestionCharge = true;
      this.flagCreationDepense = false;
      this.flagGestionDepense = false;
      this.flagCreationFournisseur = false,
      this.flagGestionFournisseur = false,
      this.flagCreationSousTraitance = false,
      this.flagGestionSousTraitance = false,
      this.flagCreationInterlocuteurSousTraitance = false,
      this.falgGestionInterlocuteurSousTraitance = false,
      this.flagIndicateurFournisseur = false;
      this.flagDemandeAchatFournisseur = false;
      this.flagEncoursAchatFournisseur = false;
      this.flagTermineAchatFournisseur = false;
      this.flagDemandeSousTraitance = false;
      this.flagEncoursSousTraitance = false;
      this.flagTermineSousTraitance = false;
    }

  },


created() {

  if(!sessionStorage.getItem("token")) {
        this.$router.push("/")
  }

}



};
</script>

<style scoped>
.admin .container .header {
  width: 100%;
  height: 80px;
  padding: 0px;
  margin: 0px;
}

.admin .container .menu-content{
display: grid;
grid-template-columns: 20% 80%;
}


.admin .container .menu-content menu {
width: 20%;

}
.admin .container .menu-content .content {
  width: 100%;


}
</style>
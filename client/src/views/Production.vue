<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
          <Menu
            @creationClient="handelCreationClient()"
            @gestionClient="handelGestionClient()"

            @creationInterlocuteur="handelCreationInterlocuteur()"
            @gestionInterlocuteur="handelGestionInterlocuteur()"


            @creationMission="handelCreationMission()"
            @gestionMission="handelGestionMission()"

            @creationAffaire="handelCreationAffaire()"
            @gestionAffaire="handelGestionAffaire()"

            @attenteProduction="handelAttenteProduction()"
            @coursProduction="handelCoursProduction()"
            @realiseProduction="handelRealiseProduction()"

            @creationBD="handelCreationBD()"
            @listBD="handelListBD()"

            @attenteFacturation="handelAttenteFacturation()"
            @emiseFacture="handelEmiseFacture()"
            @caisseFacture="handelCaisseFacture()"

          />
        </div>
        <div class="content">

          <IndicateurProduction v-if="flagIndicateurProduction" />

          <!-- start content client -->
          <CreationClient v-if="flagCreationClient" />
          <GestionClient v-if="flagGestionClient" />
          <!-- end content client -->

          <!-- start content client -->
          <CreationInterlocuteur v-if="flagCreationInterlocuteur" />
          <GestionInterlocuteur v-if="flagGestionInterlocuteur" />
          <!-- end content client -->

          <!-- start content mission -->
          <CreationMission v-if="flagCreationMission" />
          <GestionMission v-if="flagGestionMission" />
          <!-- end content mission -->

          <!-- start content Affaire -->
          <CreationAffaire v-if="flagCreationAffaire" />
          <GestionAffaire v-if="flagGestionAffaire" />
          <!-- end content Affaire -->

          <!-- start content Production -->
          <AttenteProduction v-if="flagAttenteProduction" />
          <CoursProduction v-if="flagCoursProduction" />
          <RealiseProduction v-if="flagRealiseProduction" />
          <!-- end content Production -->

          <!-- start content BORDEREAU D'ENVOI -->
          <CreationBD v-if="flagCreationBD" />
          <ListBD v-if="flagListBD" />
          <!-- end content BORDEREAU D'ENVOI -->

          <!-- start content FACTURATION -->
          <AttenteFacturation v-if="flagAttenteFacturation" />
          <CaisseFacture v-if="flagCaisseFacture" />
          <EmiseFacture v-if="flagEmiseFacture" />
          <!-- end content FACTURATION -->


        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import IndicateurProduction from "@/components/Admin/content/Production/IndicateurProduction.vue";

import CreationClient from "@/components/Admin/content/client/CreationClient.vue";
import GestionClient from "@/components/Admin/content/client/GestionClient.vue";

import CreationInterlocuteur from "@/components/Admin/content/intelocuteur/CreationInterlocuteur.vue";
import GestionInterlocuteur from "@/components/Admin/content/intelocuteur/GestionInterlocuteur.vue";


 import CreationMission from "../components/Admin/content/mission/CreationMission.vue";
 import GestionMission from "../components/Admin/content/mission/GestionMission.vue";

 import CreationAffaire from "../components/Admin/content/Affaire/CreationAffaire.vue";
 import GestionAffaire from "../components/Admin/content/Affaire/GestionAffaire.vue";

 import AttenteProduction from "../components/Admin/content/Production/AttenteProduction.vue";
 import CoursProduction from "../components/Admin/content/Production/CoursProduction.vue";
 import RealiseProduction from "../components/Admin/content/Production/RealiseAffaire.vue";

 import CreationBD from "../components/Admin/content/Bd/CreationBD.vue";
 import ListBD from "../components/Admin/content/Bd/ListBD.vue";

 import AttenteFacturation from "../components/Admin/content/Facturation/AttenteFacturation.vue";
 import CaisseFacture from "../components/Admin/content/Facturation/CaisseFacture.vue";
 import EmiseFacture from "../components/Admin/content/Facturation/EmiseFacture.vue";


export default {
  name: "admin",
  data() {
    return {

      flagIndicateurProduction : true,

      flagGestionClient: false,
      flagCreationClient: false,

      flagCreationInterlocuteur : false,
      flagGestionInterlocuteur : false,

      flagGestionMission : false,
      flagCreationMission : false,

      flagCreationAffaire :false,
      flagGestionAffaire : false,

      flagAttenteProduction :false,
      flagCoursProduction : false,
      flagRealiseProduction : false,

      flagCreationBD : false,
      flagListBD : false,

      flagAttenteFacturation : false,
      flagCaisseFacture :false,
      flagEmiseFacture: false,


    };
  },
  components: {
    Menu,
    Nav,
    CreationClient,
    GestionClient,
    CreationInterlocuteur,
    GestionInterlocuteur,
    CreationMission,
    GestionMission,
    CreationAffaire,
    GestionAffaire,
    AttenteProduction,
    CoursProduction,
    RealiseProduction,
    CreationBD,
    ListBD,
    AttenteFacturation,
    CaisseFacture,
    EmiseFacture,
    IndicateurProduction
  },

  methods: {

    handelCreationClient() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = true,
      this.flagGestionInterlocuteur = false,
      this.flagCreationInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelGestionClient() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = true,
      this.flagCreationClient = false,
      this.flagGestionInterlocuteur = false,
      this.flagCreationInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelCreationInterlocuteur() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false,
      this.flagGestionInterlocuteur = false,
      this.flagCreationInterlocuteur = true
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelGestionInterlocuteur() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = true
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

   handelCreationMission() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false,
      this.flagGestionInterlocuteur = false,
      this.flagCreationInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = true
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelGestionMission() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = true,
      this.flagCreationMission = false,
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelCreationAffaire() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = true,
      this.flagGestionAffaire =  false
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelGestionAffaire() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  true,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelAttenteProduction() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =true,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelCoursProduction() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = true,
      this.flagRealiseProduction = false
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelRealiseProduction() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = true
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelCreationBD() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  true,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelListBD() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  true,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelAttenteFacturation() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  true,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  false
    },

    handelEmiseFacture() {
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = false,
      this.flagEmiseFacture=  true
    },

    handelCaisseFacture(){
      this.flagIndicateurProduction = false,
      this.flagGestionClient = false,
      this.flagCreationClient = false
      this.flagCreationInterlocuteur = false,
      this.flagGestionInterlocuteur = false
      this.flagGestionMission = false,
      this.flagCreationMission = false
      this.flagCreationAffaire = false,
      this.flagGestionAffaire =  false,
      this.flagAttenteProduction =false,
      this.flagCoursProduction = false,
      this.flagRealiseProduction = false,
      this.flagCreationBD =  false,
      this.flagListBD =  false,
      this.flagAttenteFacturation =  false,
      this.flagCaisseFacture = true,
      this.flagEmiseFacture=  false
    }




  },


created() {

      if(!sessionStorage.getItem("token"))
      {
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
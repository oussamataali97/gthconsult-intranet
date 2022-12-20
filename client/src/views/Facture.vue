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


          <!-- start content FACTURATION -->
          <IndicateurFacture v-if="flagIndicateurFacture" />
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

import IndicateurFacture from "@/components/Admin/content/Facturation/IndicateurFacture.vue";
import AttenteFacturation from "../components/Admin/content/Facturation/AttenteFacturation.vue";
import CaisseFacture from "../components/Admin/content/Facturation/CaisseFacture.vue";
import EmiseFacture from "../components/Admin/content/Facturation/EmiseFacture.vue";


export default {
  name: "admin",
  data() {
    return {

      flagIndicateurFacture : true,
      flagAttenteFacturation : false,
      flagCaisseFacture :false,
      flagEmiseFacture: false,

    };
  },
  components: {
    Menu,
    Nav,
    AttenteFacturation,
    CaisseFacture,
    EmiseFacture,
    IndicateurFacture
  },

  methods: {

    handelCreationClient() {
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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
      this.flagIndicateurFacture = false,
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

      if(!sessionStorage.getItem("token")) {

        this.$router.push("/");

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
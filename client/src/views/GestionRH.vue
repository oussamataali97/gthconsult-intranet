<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
          <Menu

            @creationSalarie="handelCreationSalarie()"
            @gestionSalarie="handelGestionSalarie()"
            @editSalarie="handelEditSalarie()"

            @demandeAbsence="handelDemandeAbsence()"
            @listeDemandeAbsence="handelDemandeGestionAbsence()"

            @nouveauCompetences="handelNouveauCompetences()"
            @listeCompetences="handelListeCompetences()"

            @nouveauAgrement="handelNouveauAgrement()"
            @listeAgrements="handelListeAgrements()"

            @gestionFraisSalaries="handelGestionFraisSalaries()"

          />
        </div>
        <div class="content">

          <!-- Start content Salarie -->
          <CreationSalarie v-if="flagCreationSalarie" />
          <GestionSalarie v-if="flagGestionSalarie" />
          <EditSalarie v-if="flagEditSalarie" />
          <!-- End content Salarie -->

          <!-- Start content Absence -->
          <DemandeAbsence v-if="flagDemandeAbsence" />
          <GestionAbsence v-if="flagGestionDemandeAbsence" />
          <!-- Fin content Absence -->

          <!-- Start content competence -->
          <CreationCompetence v-if="flagCreationCompetence" />
          <GestionCompetences v-if="flagGestionCompetences" />
          <!-- End content Competence -->

          <!-- Start content Agrement -->
          <CreationAgrement v-if="flagCreationAgrement" />
          <GestionAgrements v-if="flagGestionAgrements" />
          <!-- End content Agrement -->


          <!-- Start content Gestion Frais Salarie -->
          <GestionFraisSalarie v-if="flagGestionFraisSalarie" />
          <!-- End content Gestion Frais Salarie -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import CreationSalarie from "../components/Admin/content/GestionRH/Salarie/CreationSalarie.vue";
import GestionSalarie from "../components/Admin/content/GestionRH/Salarie/GestionSalarie.vue";
import EditSalarie from "../components/Admin/content/GestionRH/Salarie/EditSalarie.vue";
import DemandeAbsence from "../components/Admin/content/GestionRH/Conge/absence.vue";
import GestionAbsence from "../components/Admin/content/GestionRH/Conge/GestionAbsence.vue";
import CreationAgrement from "../components/Admin/content/GestionRH/Agruments/CreationAgrement.vue";
import GestionAgrements from "../components/Admin/content/GestionRH/Agruments/GestionAgrements.vue";
import CreationCompetence from "../components/Admin/content/GestionRH/Competences/CreationCompetence.vue";
import GestionCompetences from "../components/Admin/content/GestionRH/Competences/GestionCompetences.vue";
import GestionFraisSalarie from "../components/Admin/content/GestionRH/FraisSalarie/GestionFraisSalarie.vue";



export default {
  name: "admin",
  data() {

    return {
      flagCreationSalarie: false,
      flagGestionSalarie: false,
      flagEditSalarie: false,
      flagDemandeAbsence : false,
      flagGestionDemandeAbsence : false,
      flagCreationCompetence : false,
      flagGestionCompetences : false,
      flagCreationAgrement : false,
      flagGestionAgrements : false,
      flagGestionFraisSalarie : false
    };

  },
  components: {
    Menu,
    Nav,
    CreationSalarie,
    GestionSalarie,
    EditSalarie,
    DemandeAbsence,
    GestionAbsence,
    CreationAgrement,
    GestionAgrements,
    CreationCompetence,
    GestionCompetences,
    GestionFraisSalarie
  },

  methods: {

    handelGestionFraisSalaries() {
      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = true;
    },

    handelNouveauCompetences() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = true,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelListeCompetences() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = true,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false,
      this.flagGestionFraisSalarie = false;
    },

    handelCreationSalarie() {

      this.flagCreationSalarie = true,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelGestionSalarie() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = true,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelEditSalarie() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = true,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelDemandeAbsence() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = true,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelDemandeGestionAbsence() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = true,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelNouveauAgrement() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = true,
      this.flagGestionAgrements  = false
      this.flagGestionFraisSalarie = false;
    },

    handelListeAgrements() {

      this.flagCreationSalarie = false,
      this.flagGestionSalarie = false,
      this.flagEditSalarie = false,
      this.flagDemandeAbsence  = false,
      this.flagGestionDemandeAbsence  = false,
      this.flagCreationCompetence  = false,
      this.flagGestionCompetences  = false,
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = true
      this.flagGestionFraisSalarie = false;
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
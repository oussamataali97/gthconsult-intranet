<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
          <Menu
            @creationFicheTechnique="handelCreationFicheTechnique()"
            @gestionFicheTechnique="handelGestionFicheTechnique()"
            @editFicheTechnique="handelEditFicheTechnique()"
          />
        </div>
        <div class="content">
          <!-- Start content FicheTechnique -->
          <CreationFicheTechnique v-if="flagCreationFicheTechnique" />
          <GestionFicheTechnique v-if="flagGestionFicheTechnique" />
          <EditFicheTechnique v-if="flagEditFicheTechnique" />
          <!-- End content FicheTechnique -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import CreationFicheTechnique from "../components/Admin/content/FicheTechnique/CreationFicheTechnique.vue";
import GestionFicheTechnique from "../components/Admin/content/FicheTechnique/GestionFicheTechnique.vue";
import EditFicheTechnique from "../components/Admin/content/FicheTechnique/EditFicheTechnique.vue";



export default {
  name: "admin",
  data() {
    return {
      flagCreationFicheTechnique: false,
      flagGestionFicheTechnique: false,
      flagEditFicheTechnique: false,
    };
  },
  components: {
    Menu,
    Nav,
    CreationFicheTechnique,
    GestionFicheTechnique,
    EditFicheTechnique
  },

  methods: {

    handelCreationFicheTechnique() {
      this.flagCreationFicheTechnique = true,
      this.flagGestionFicheTechnique = false,
      this.flagEditFicheTechnique = false
    },

    handelGestionFicheTechnique() {
      this.flagCreationFicheTechnique = false,
      this.flagGestionFicheTechnique = true,
      this.flagEditFicheTechnique = false
    },

    handelEditFicheTechnique() {
      this.flagCreationFicheTechnique = false,
      this.flagGestionFicheTechnique = false,
      this.flagEditFicheTechnique = true
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
  background:rgb(231, 107, 107);
}

</style>
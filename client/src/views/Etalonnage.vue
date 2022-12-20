<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
          <Menu
            @creationEtalonnage="handelCreationEtalonnage()"
            @gestionEtalonnage="handelGestionEtalonnage()"
            @editEtalonnage="handelEditEtalonnage()"
          />
        </div>
        <div class="content">
          <!-- Start content Etalonnage -->
          <CreationEtalonnage v-if="flagCreationEtalonnage" />
          <GestionEtalonnage v-if="flagGestionEtalonnage" />
          <EditEtalonnage v-if="flagEditEtalonnage" />
          <!-- End content Etalonnage -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import CreationEtalonnage from "../components/Admin/content/Etalonnage/CreationEtalonnage.vue";
import GestionEtalonnage from "../components/Admin/content/Etalonnage/GestionEtalonnage.vue";
import EditEtalonnage from "../components/Admin/content/Etalonnage/EditEtalonnage.vue";



export default {
  name: "admin",
  data() {
    return {
      flagCreationEtalonnage: false,
      flagGestionEtalonnage: false,
      flagEditEtalonnage: false,
    };
  },
  components: {
    Menu,
    Nav,
    CreationEtalonnage,
    GestionEtalonnage,
    EditEtalonnage
  },

  methods: {

    handelCreationEtalonnage() {
      this.flagCreationEtalonnage = true,
      this.flagGestionEtalonnage = false,
      this.flagEditEtalonnage = false
    },

    handelGestionEtalonnage() {
      this.flagCreationEtalonnage = false,
      this.flagGestionEtalonnage = true,
      this.flagEditEtalonnage = false
    },

    handelEditEtalonnage() {
      this.flagCreationEtalonnage = false,
      this.flagGestionEtalonnage = false,
      this.flagEditEtalonnage = true
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
}

</style>
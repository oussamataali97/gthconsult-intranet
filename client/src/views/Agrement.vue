<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
          <Menu
            @nouveauAgrement="handelNouveauAgrement()"
            @listeAgrements="handelListeAgrements()"
          />
        </div>
        <div class="content">

          <!-- Start content Agrement -->
          <CreationAgrement v-if="flagCreationAgrement" />
          <GestionAgrements v-if="flagGestionAgrements" />
          <!-- End content Agrement -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Admin/Menu.vue";
import Nav from "@/components/Admin/Nav.vue";

import CreationAgrement from "../components/Admin/content/GestionRH/Agruments/CreationAgrement.vue";
import GestionAgrements from "../components/Admin/content/GestionRH/Agruments/GestionAgrements.vue";




export default {
  name: "admin",
  data() {

    return {
      flagCreationAgrement : false,
      flagGestionAgrements : false,
    };

  },
  components: {
    Menu,
    Nav,
    CreationAgrement,
    GestionAgrements

  },

  methods: {

    handelNouveauAgrement() {
      this.flagCreationAgrement  = true,
      this.flagGestionAgrements  = false    
    },

    handelListeAgrements() {
      this.flagCreationAgrement  = false,
      this.flagGestionAgrements  = true
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
  background:rgb(238, 238, 238);


}


</style>
<template>
  <div class="creationClient">

    <h3><i class="fa-solid fa-user-pen"></i> MODIFICATION D'UN CLIENT</h3>

    <p v-if="succes" :class="{ succes: succes }">
        Le client a été modifié avec succès, Veuillez patienter quelques secondes pour modifier le client.
    </p>

    <p v-if="echec" :class="{ echec: echec }">
        {{ error }}
    </p>

    <div class="formCreation">

      <div>
        <label for="nom">Raison sociale / Nom</label>
        <input type="text" v-model="client.raisonSocial">
      </div>

      <div>
        <label for="adresse">Adresse</label>
        <input type="text" v-model="client.adresse">
      </div>

      <div>
        <label for="ville">Ville</label>
        <input type="text" v-model="client.ville">
      </div>

      <div>
        <label for="codePostal">Code Postal</label>
        <input type="text" v-model="client.codePostal">
      </div>

      <div>
        <label for="pays">Pays</label>
        <input type="text" v-model="client.pays">
      </div>

      <div>
        <label for="nom">E-mail</label>
        <input type="text" v-model="client.email">
      </div>

      <div>
        <label for="nom">Téléphone</label>
        <input type="text" v-model="client.telephone">
      </div>

      <div>
        <label for="nom">ICE</label>
        <input type="text" v-model="client.ice">
      </div>

      <div>
        <label for="nom">Référence client</label>
        <input type="text" disabled v-model="client.refClient">
      </div>

      <div>
        <label for="nom"></label>
        <input type="hidden" disabled>
      </div>

      <div>
        <input type="submit" value="Modifier" @click="update()">
      </div>

      <div>
        <input type="submit" value="Quitter" @click="quitter()">
      </div>

    </div>

  </div>

</template>

<script>

import Service from "../../../../Service";

export default {
  data() {
    return {
      client: {
              raisonSocial : null,
              adresse : null,
              ville : null,
              codePostal : null,
              pays : null,
              email : null,
              ice : null,
              refClient : null,
              id: null,
              telephone : null
      },
      succes: false,
      echec: false,
      error : null,
    };
  },
  props : {
    infoClient : Array,
  },
  methods: {
  // Quitter Client
  quitter() {
      return this.$router.go(this.$router.currentRoute);
  },

//Update Client
    update() {
      Service.updateClient(this.client)
      .then(() => {
          this.succes = true;
          setTimeout(() => {
              this.succes = false;
              return this.$router.go(this.$router.currentRoute)

          }, 5000);
      })
      .catch((error) => {
          this.error = error.message;
          console.error(`HTTP error: ${error.name} => ${error.message}`);
          throw "fail request at: GET /refreshtime";
      })
    }
  },

  created(){

              this.client.raisonSocial = this.infoClient[0].raisonSocial;
              this.client.adresse = this.infoClient[0].adresse;
              this.client.ville = this.infoClient[0].ville;
              this.client.codePostal = this.infoClient[0].codePostal;
              this.client.pays = this.infoClient[0].pays;
              this.client.email = this.infoClient[0].email;
              this.client.ice = this.infoClient[0].ice;
              this.client.refClient = this.infoClient[0].refClient;
              this.client.id = this.infoClient[0]._id;
              this.client.telephone = this.infoClient[0].telephone;
  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
  padding:5px;
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
  margin-left:10px;
}

.formCreation div:nth-child(11) input{
    background-color: green;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}
.formCreation div:nth-child(12) input {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
}



#app > div > div > div.menu-content > div.content > div {
  background-color: white;
}



#app > div > div > div.menu-content > div.content > div > div > div > label {
  font-size: 15px;
}



</style>
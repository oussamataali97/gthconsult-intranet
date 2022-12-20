<template>
  <div class="Intranet">


    <div class="logo">

        <div >
          <li v-for="(item, index) in filterOnline" :key="index"> <i class="fa-solid fa-user"></i>{{ item.nom }} {{ item.prenom }}</li>
        </div>

        <img src="../assets/logo.png" alt="Logo GTHCONSULT" />
        <ul>
          <li>Nom : {{ nom }}</li>
          <li>Prenom : {{ prenom }}</li>
          <li>Date : {{ new Date().toLocaleDateString() }}</li>
          <li>Heure : {{ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() }}</li>
        </ul>
        <input  class="deconnexion"  type="button" value="Déconnexion" @click="deconnexion()">

    </div>

    <div class="titre">
        <i class="fa-solid fa-globe"></i>
        <h1>INTRANET GTHCONSULT</h1>
    </div>


    <div class="parent">

          <div @click="gestionAdministrative()" v-if="status != 'inspecteur'">
            <div>
              <i class="fa-solid fa-user-gear"></i>
              <p>Gestion Administrative</p>
            </div>
          </div>

          <div @click="gestionProduction()" v-if="status != 'inspecteur'">
            <div>
              <i class="fa-brands fa-product-hunt"></i>
              <p>Gestion Production</p>
            </div>
          </div>

          <div @click="comptabliteFacturation()" v-if="status != 'inspecteur'">
              <div>
                <i class="fa-solid fa-file-invoice-dollar"></i>
                <p>Comptablite Facturation</p>
            </div>
          </div>

          <div @click="gestionRH()">
            <div>
                <i class="fa-solid fa-file-signature"></i>
                <p>Gestion RH</p>
            </div>
          </div>

          <div @click="noteFrais()">
            <div>
                  <i class="fa-solid fa-calculator"></i>
                  <p>Note de Frais</p>
            </div>
          </div>

          <div @click="gestionFrais()" v-if="status != 'inspecteur'">
            <div>
                  <i class="fa-solid fa-hand-holding-dollar"></i>
                  <p>Gestion de Frais</p>
            </div>
          </div>

          <div @click="noteCalendrier()">
            <div>
                  <i class="fa-solid fa-calendar"></i>
                  <p>Note Calendrier</p>
            </div>
          </div>

          <div @click="gestionCalendrier()" v-if="status != 'inspecteur'">
            <div>
                  <i class="fa-solid fa-calendar-check"></i>
                  <p>Gestion Calendrier</p>
            </div>
          </div>

          <div @click="supportsTechniques()">
            <div>
                  <i class="fa-solid fa-question"></i>
                  <p>Supports Techniques</p>
            </div>
          </div>

          <div @click="gestionFournisseur()" v-if="status != 'inspecteur'">
            <div>
                  <i class="fa-solid fa-boxes-packing"></i>
                  <p>Gestion Fournisseur</p>
            </div>
          </div>

          <div @click="analyseStatistique()" v-if="status != 'inspecteur'">
            <div>
                  <i class="fa-solid fa-chart-line"></i>
                  <p>Analyse Statistique</p>
            </div>
          </div>

    </div>

    <div class="copyright">
      <p>© 2022 GTHCONSULT BUREAU DE CONTRÔLE AGRÉÉ PAR L'ETAT</p>
    </div>



  </div>
</template>

<script>
import Service from '../Service';
import io from 'socket.io-client'
const socket = io("http://localhost:5000");
// @ is an alias to /src

export default {

  name: "Intranet",
  data() {
    return {
      status: null,
      admins : [],
      matricule : null
    }
  },
  components: {

  },

  methods : {

    noteFrais() {
      return this.$router.push("/notefrais");
    },

    gestionFrais() {

      return this.$router.push("/gestionfrais");

    },

    noteCalendrier() {

      Service.deleteCheckNotificationCalendrier(this.matricule)
      .then((result) => {
          console.log(result);
      }).catch((error) => {
          console.log(error)
      });

      return this.$router.push("/notecalendrier");

    },
    gestionCalendrier() {
      return this.$router.push("/gestioncalendrier");
    },

    gestionAdministrative() {
      return this.$router.push("/admin");
    },

    supportsTechniques() {
      return this.$router.push("/supportstechniques");
    },

    comptabliteFacturation() {
      return this.$router.push("/facture");
    },

    gestionProduction() {
      return this.$router.push("/production");
    },

    analyseStatistique() {
      return this.$router.push("/analyse");
    },

    deconnexion() {

      // reject online
      Service.rejectOnline(sessionStorage.getItem("id"))
      .then((result) => {
            console.log(result.data.response);
      })
      .catch((error) => {
            console.log(error);
      });


      sessionStorage.removeItem("token");
      sessionStorage.removeItem("nom");
      sessionStorage.removeItem("prenom");
      sessionStorage.removeItem("status");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("id");
      return this.$router.push("/");
    }
  },

  computed : {
      filterOnline() {
            return this.admins.filter((item) => {
              if(item.connected == true)
              {
                return item;
              }
            })
      }
  },

  created() {

    if(!sessionStorage.getItem("token")){
        this.$router.push("/");
    } else {

          this.nom = sessionStorage.getItem("nom");
          this.prenom = sessionStorage.getItem("prenom");
          this.matricule = sessionStorage.getItem("id");
          this.status = sessionStorage.getItem("status");

          // Stream for get Online users
          Service.Online(this.matricule)
          .then((result) => {
            if(result) {
                // Socket admins
                socket.on("admins", (msg) => {
                  this.admins = msg;
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });

          // check is exist notification Frais
          Service.checkNotificationFrais(this.matricule)
          .then((result) => {
            if(result) {
              // counter Notfication
              console.log("frais")
              console.log(result.data.response);
            }
          })
          .catch((error) => {
            console.log(error);
          });

          // check is exist notification Frais
          Service.checkNotificationCalendrier(this.matricule)
          .then((result) => {
            if(result) {
              // counter Notfication
              console.log("calendrier")
              console.log(result.data.response);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  },


};
</script>

<style scoped>

.Intranet {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.Intranet .user {
  width: 100%;
  height: 40px;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.Intranet .logo  {

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  }


.Intranet .logo img {
  width: 200px;
  padding: 10px;
  margin-left: 600px;
}

.Intranet .logo ul {
 margin-left: 100px;
}

.Intranet .logo input {

    margin-right: 10px;
    background-color: #8ddfb78f;
    padding: 0.3rem 2rem;
    border: 0px;
    color: #0e6e01;
    border-radius: 5px;
    cursor: pointer;
    height: 40px;
    margin-left: 300px;
}

.Intranet .logo ul li  {
    color: #243064;
    font-weight: bold;
    padding: 3px;
}

.Intranet .titre  {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap:10px;
  background-color:white;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding:0 80px;

}


/* start div 1 */
.parent div{
  display: flex;
  justify-content: start;
  align-items: center;
  min-height: 170px;
  flex-direction: column;
  font-size: 20px;
  width: 100%;
  font-weight: 700;
  cursor: pointer;
  transition: all .4s ease-in-out;
color:white;
}



/* start div 1 */
.parent div:nth-child(1) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(1) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/adminstration.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(1) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #24306466;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(1):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(1) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(1) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 1 */


/* start div 2 */
.parent div:nth-child(2) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(2) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/production.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(2) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #24642866;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(2):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(2) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(2) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 2 */


/* start div 3 */
.parent div:nth-child(3) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(3) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/invoice.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(3) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #24306466;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(3):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(3) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(3) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 3 */



/* start div 4 */
.parent div:nth-child(4) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(4) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/rh.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(4) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #64242866;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(4):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(4) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(4) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 4 */




/* start div 5 */
.parent div:nth-child(5) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(5) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/expense.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(5) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #64242866;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(5):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(5) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(5) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 5 */


/* start div 6 */
.parent div:nth-child(6) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(6) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/acounting.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(6) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #d7284c66;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(6):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(6) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(6) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 6 */


/* start div 7 */
.parent div:nth-child(7) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(7) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/calendar.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(7) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #00000066;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(7):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(7) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(7) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 7 */



/* start div 8 */
.parent div:nth-child(8) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(8) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/gestioncalendar.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(8) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #f70d0d66;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(8):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(8) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(8) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 8 */


/* start div 9 */
.parent div:nth-child(9) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(9) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/info.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(9) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #2e82c566;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(9):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(9) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(9) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 9 */


/* start div 10 */
.parent div:nth-child(10) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(10) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/supplier.jpg");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(10) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #2e82c566;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(10):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(10) div svg {
  color: white;
  font-size: 50px;
  z-index: 10;
}

.parent div:nth-child(10) div p {
    color: white;
    font-size: 18px;
    z-index: 10;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 10 */


/* start div 11 */
.parent div:nth-child(11) {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: pointer;
}

.parent div:nth-child(11) div {
  height: 100%;
  width: 100%;
  background-image: url("../assets/analyse.png");
  background-size: cover;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.parent div:nth-child(11) div::before {
  content: "";
  height: 100%;
  width: 100%;
  background-color: #3b15e687;
  position: absolute;
  left: 0;
  top: 0;
}

.parent div:nth-child(11):hover div {
  transform: scaleY(1.1);
  transform: scaleX(1.1);
  transition: 0.5s;
}


.parent div:nth-child(11) div svg {
  color: white;
  font-size: 50px;
  z-index: 11;
}

.parent div:nth-child(11) div p {
    color: white;
    font-size: 18px;
    z-index: 11;
    /* font-weight: bold; */
    font-weight: bold;
}

/* End div 11 */


#app > div > div.copyright > p {
    font-weight: bolder;
    color: red;
}

#app > div > div.logo > ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#app > div > div.logo > div > li {
  color: green;
  text-decoration: none;
  list-style: none;
}


</style>

<template>
  <div class="Intranet">

    <header style=" display: flex; justify-content:space-between; align-items:center; padding:0 20px; ">
      <div class="logo" @click="accueille()">
        <img src="./../assets/logo.png" alt="" style="width: 150px; cursor: pointer;">
      </div>

      <div class="button " style="display:flex; align-items:center;">
        <ul
          style="display: flex ;gap: 10px; align-items: center ;border-radius: 5px ;margin-right: 10px ; ;list-style: none; padding:10px">
          <div class="left"
            style="display: flex ;align-items:center; gap: 5px; padding:0px 10px;border-right: 2px solid rgb(202, 202, 202);">
            <div class="image">
              <img src="./../assets/person.png" alt="" width="40px">
            </div>
            <div class="info">
              <li style="font-weight: 700;">Prénom & Nom: <span style="font-weight: 500; color:gray;">{{ prenom }} {{ nom
              }} </span></li>
              <li style="font-weight: 700;">Matricule : <span style="font-weight: 500;color:gray;">{{ matricule
              }}</span></li>
            </div>
          </div>
          <li style="display: flex; align-items:center"><span style="font-weight: bold;"> <img
                src="./../assets/time.png" width="50px" alt=""> </span> {{ new Date().toLocaleDateString() }} | {{ new
                    Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds()
                }}</li>

        </ul>


        <button class="btnHome" @click="accueille()"> <i class="fa-solid fa-house"></i> Page D'acceuil</button>
        <button class="btnLogout" @click="deconnexion()"> <i class="fa-solid fa-right-from-bracket"></i>
          Deconexion</button>
      </div>


    </header>

    <div class="title" v-if="this.status == 'admin'">
      <p><i class="fa-solid fa-headset"></i> DEPARTEMENT <span class="spn">TECHNIQUE</span> </p>
    </div>


    <div class="parent">

      <div @click="supportsTechniques()">
        <a href="#" class="card human-resources">
          <div class="overlay"></div>
          <div class="circle">

            <img src="./../assets/dt/support.svg" alt="">

          </div>
          <p>Support Technique</p>
        </a>

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
      admins: [],
      matricule: null
    }
  },
  components: {

  },

  methods: {


    supportsTechniques() {
      return this.$router.push("/supportstechniques");
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
    },
    accueille() {
      return this.$router.push("/interface");
    },

  },

  computed: {
    filterOnline() {
      return this.admins.filter((item) => {
        if (item.connected == true) {
          return item;
        }
      })
    }
  },

  created() {

    if (!sessionStorage.getItem("token")) {
      this.$router.push("/");
    } else {

      this.nom = sessionStorage.getItem("nom");
      this.prenom = sessionStorage.getItem("prenom");
      this.matricule = sessionStorage.getItem("id");
      this.status = sessionStorage.getItem("status");

      // Stream for get Online users
      Service.Online(this.matricule)
        .then((result) => {
          if (result) {
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
          if (result) {
            // counter Notfication
            console.log(result.data.response);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // check is exist notification Frais
      Service.checkNotificationCalendrier(this.matricule)
        .then((result) => {
          if (result) {
            // counter Notfication
            console.log(result.data.response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },

  destory() {

    // reject online
    Service.rejectOnline(sessionStorage.getItem("id"))
      .then((result) => {
        console.log(result.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

};
</script>

<style scoped>
header {
  box-shadow: 0px 0px 5px rgb(173, 173, 173);
  background-color: white;
  widows: 100%;
}

.btnHome {
  padding: 10px 20px;
  background-color: white;
  border: 0;
  border-radius: 20px;
  color: rgb(228, 44, 44);
  font-weight: bold;
  outline: 2px solid #243064;
  cursor: pointer;
  margin: 5px;
  transition: .3s ease-in;
}

.btnLogout {
  padding: 10px 20px;
  background-color: rgb(228, 44, 44);
  border: 0;
  color: white;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  margin: 5px;
  transition: .3s ease-in;
}

.btnLogout:hover {
  background-color: #243064;
}

.btnHome:hover {
  background-color: #cf1f21;
  color: white;
  outline: 0;
}

.stats {
  font-size: 30px;
}

.stats i {
  margin-right: 10px;
  cursor: pointer;
  color: #243064;
  position: relative;
}

.stats i:hover {
  color: #cf1f21;
}

.stats i::after {
  content: '1';
  font-size: 10px;
  position: absolute;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  top: -10px;
  right: -10px;
  background-color: red;
  padding: 5px;
  border-radius: 100%;

}

/* end Header style  */

.Intranet .titre {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 30px;
  margin: auto;
  max-width: 1000px;
  position: relative;
  justify-items: center;

}


/* start div 1 */
.human-resources {
  --bg-color: #243064;
  --bg-color-light: #f1f7ff;
  --text-color-hover: #f1f7ff;
  --box-shadow-color: #faa2a291;
}

.card {
  width: 220px;
  height: 321px;
  background: #eeeeee;
  border-top-right-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease-out;
  text-decoration: none;
}

.card:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
    0 24px 46px var(--box-shadow-color);
}

.card:hover {
  transform: translateY(-5px) scale(1.005) translateZ(0);
  box-shadow: 0 24px 36px rgba(0, 0, 0, 0.11),
    0 24px 46px var(--box-shadow-color);
}

.card:hover .overlay {
  transform: scale(6) translateZ(0);
}

.card:hover .circle {
  border-color: var(--bg-color-light);
  background: var(--bg-color);
}

.card:hover .circle:after {
  background: var(--bg-color-light);
}

.card:hover p {
  color: var(--text-color-hover);
}

.card:active {
  transform: scale(1) translateZ(0);
  box-shadow: 0 15px 24px rgba(0, 0, 0, 0.11),
    0 15px 24px var(--box-shadow-color);
}

.card p {
  font-size: 21px;
  text-align: center;
  color: #243064;
  font-weight: bold;
  z-index: 1000;
  transition: color 0.3s ease-out;
}

.circle {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-top: 20px;
  transition: all 0.3s ease-out;
}


.circle img {
  z-index: 20000;
  width: 100px;
  height: 100px;
  position: absolute;
  transform: translateZ(0);
}


.overlay {
  width: 118px;
  position: absolute;
  height: 118px;
  border-radius: 50%;
  background: var(--bg-color);
  top: 59px;
  left: 50px;
  z-index: 0;
  transition: transform 0.3s ease-out;
}


/* start div 1 */



/* start div 1 */

/* End div 1 */




#app>div>div.logo>ul {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

#app>div>div.logo>div>li {
  color: green;
  text-decoration: none;
  list-style: none;
}

.title p {
  text-align: center;
  color: #cf1f21;
  font-size: 30px;
  font-weight: 700;
  margin: 10px;

}



.spn {
  color: #243064;
  animation: typing 1s steps(10) infinite;
  overflow: hidden;
}

.fa-headset {
  font-size: 39px;
}

@keyframes typing {

  0%,
  90%,
  100% {
    opacity: 0;
  }

  30%,
  60% {
    opacity: 1;
  }
}
.copyright p{
  text-align: center;
  font-weight: 700;
  color:rgb(48, 48, 48);
  padding:40px 0;

}
</style>

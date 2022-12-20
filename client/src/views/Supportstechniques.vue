<template>
  <div class="admin">
    <div class="container">
      <div class="header">
        <Nav />
      </div>
      <div class="menu-content">
        <div class="menu">
        </div>
        <div class="content">

          <h3><i class="fa-solid fa-book-bookmark"></i> Supports Techniques (Bibliothèque des Documents)</h3>
          <div class="text">

            <span><i class="fa-regular fa-lightbulb"></i>Astuce :</span>
            Bienvenue dans votre bibliothèque de documents en un clic accédez à l' ensemble de vos documents , via
            le mouteur de recherche ou listes de dossiers partagés

          </div>

          <div class="text2">

            <span><i class="fa-solid fa-circle-exclamation"></i>Important :</span>
            Propriété de GTHCONSULT toute divulgation externe, sauf autorisation, est interdite

          </div>



              <div class="rechercher">
                <i class="fa-solid fa-magnifying-glass icon"></i>
                <input type="text" v-model="search" placeholder="chercher le fichier que vous voullez ...">
              </div>

              <ul class="searchList" v-for="index in filterFile" :key="index._id">
                <li @click="handelPdf(`${index.name}`)"> {{ index.name }}</li>
              </ul>

              <div class="booklist">
                <div class="electricite" >
                  <img src="./../assets/Books/12984879_5115935.png" alt="electricite" @click="elec = !elec">
                  <p>Electricite</p>
                </div>
                <div class="electricite">
                  <img src="./../assets/Books/levage.png" alt="levage" @click="levage = !levage">
                  <p>Levage</p>
                </div>
                <div class="electricite">
                  <img src="./../assets/Books/incendie.png" alt="incendie" @click="incendie = !incendie">
                  <p>Incendie</p>
                </div>
                <div class="electricite">
                  <img src="./../assets/Books/machine.png" alt="machine" @click="machine = !machine">
                  <p>Machine</p>
                </div>
              </div>




          <ul class="list">

            <ul class="pagee" v-if="elec">
              <p class="title-book">Electicite</p>
              <li @click="flagZero = !flagZero"><i class="fa-regular fa-bookmark mark"></i> chap 00- sommaire</li>
              <ul v-if="flagZero">
                <li @click="handelPdf(`chap OO - sommaire`)">chap OO - sommaire</li>
              </ul>


              <li @click="flagOne = !flagOne"><i class="fa-regular fa-bookmark mark"></i> chap 01- intégrations</li>
              <ul v-if="flagOne">
                <li @click="handelPdf(`chap 01- intégrations`)">chap 01- intégrations</li>
              </ul>


              <li @click="flagTow = !flagTow"><i class="fa-regular fa-bookmark"></i> chap 02- présentation réglementation</li>
              <ul v-if="flagTow">
                <li @click="handelPdf(`Arrêté 28 juin 1938`)">Arrêté 28 juin 1938</li>
                <li @click="handelPdf(`Buletin OFF Arrête MAROCAIN - ELEC`)">Buletin OFF Arrête MAROCAIN - ELEC</li>
                <li @click="handelPdf(`chap 02-Presentation réglementation FR`)">chap 02-Presentation réglementation FR
                </li>
              </ul>


              <li @click="flagTree = !flagTree"> <i class="fa-regular fa-bookmark"></i> chap 03- textes réglementaires FR</li>
              <ul v-if="flagTree">
                <li @click="flagTreeOne = !flagTreeOne">Normes électricité BT- HT -- Français</li>
                <ul v-if="flagTreeOne">
                  <li @click="handelPdf(`>NFC 13 100`)">NFC 13 100</li>
                  <li @click="handelPdf(`NFC13-200F1Mai2011`)">NFC 13-200F1 Mai 2011</li>
                  <li @click="handelPdf(`NFC15-100_11-2008`)">NFC 15-100_11-2008</li>
                </ul>
                <li @click="handelPdf(`01_Decret_2010-1016_du_30_aout_2010_version_initiale_FP`)">
                  01_Decret_2010-1016_du_30_aout_2010_version_initiale_FP</li>
                <li @click="handelPdf(`02_Decret_2010-1017_du_30_aout_2010_version_initiale_FP`)">
                  02_Decret_2010-1017_du_30_aout_2010_version_initiale_FP</li>
                <li @click="handelPdf(`03_Decret_2010-1018_du_30_aout_2010_version_initiale_FP`)">
                  03_Decret_2010-1018_du_30_aout_2010_version_initiale_FP</li>
                <li @click="handelPdf(`04_Decret_2010-1118_Elec_Habilitation`)">04_Decret_2010-1118_Elec_Habilitation
                </li>
                <li @click="handelPdf(`05_Arrete_2011-12-14_Ecl-Secu`)">05_Arrete_2011-12-14_Ecl-Secu</li>
                <li @click="handelPdf(`06_Arrete_2011-12-15_Elec-Galvano`)">06_Arrete_2011-12-15_Elec-Galvano</li>
                <li @click="handelPdf(`07_Arrete_2011-12-16_Elec-Labo`)">07_Arrete_2011-12-16_Elec-Labo</li>
                <li @click="handelPdf(`08_Arrete_2011-12-19_Elec-Soudage`)">08_Arrete_2011-12-19_Elec-Soudage</li>
                <li @click="handelPdf(`09_Arrete_2011-12-20_Elec-Amovible`)">09_Arrete_2011-12-20_Elec-Amovible</li>
                <li @click="handelPdf(`10_Arrete_2011-12-21_Elec-Accred`)">10_Arrete_2011-12-21_Elec-Accred</li>
                <li @click="handelPdf(`11_Arrete_2011-12-22_Elec-Competences`)">11_Arrete_2011-12-22_Elec-Competences
                </li>
                <li @click="handelPdf(`12_Arrete_2011-12-23_Elec-Machines`)">12_Arrete_2011-12-23_Elec-Machines</li>
                <li @click="handelPdf(`13_Arrete_2011-12-26_Verif-Elec`)">13_Arrete_2011-12-26_Verif-Elec</li>
                <li @click="handelPdf(`>14_Arrete_2012-04-19 normes`)">14_Arrete_2012-04-19 normes</li>
                <li @click="handelPdf(`15_Arrete_2012-04-20 dossier technique`)">15_Arrete_2012-04-20 dossier technique
                </li>
                <li @click="handelPdf(`16_Arrete_2012-04-26 norme voisinage`)">16_Arrete_2012-04-26 norme voisinage</li>
                <li @click="handelPdf(`17_Arrete_2012-04-30_Correctif-Elec`)">17_Arrete_2012-04-30_Correctif-Elec</li>
                <li @click="handelPdf(`>18_circulaire DGT du 9 oct 2012`)">18_circulaire DGT du 9 oct 2012</li>
                <li @click="handelPdf(`19.UTE-15-103-mars-04`)">19.UTE-15-103-mars-04</li>
                <li @click="handelPdf(`UTE C 15-106 (12-2003) Section des conducteurs de protection`)">UTE C 15-106
                  (12-2003) Section des conducteurs de protection</li>
                <li @click="handelPdf(`UTE-15-105-juil-03`)">UTE-15-105-juil-03</li>
              </ul>



              <li @click="flagFour = !flagFour"><i class="fa-regular fa-bookmark"></i> chap 04- DTE ELEC</li>
              <ul v-if="flagFour">
                <li @click="handelPdf(`DTE-2019-ELEC 01_COURT-CIRCUIT`)">DTE-2019-ELEC 01_COURT-CIRCUIT</li>
                <li @click="handelPdf(`DTE-2019-ELEC 02_SURCHARGES`)">DTE-2019-ELEC 02_SURCHARGES</li>
                <li @click="handelPdf(`DTE-2019-ELEC 03_CHUTE-TENSION`)">DTE-2019-ELEC 03_CHUTE-TENSION</li>
                <li @click="handelPdf(`DTE-2019-ELEC 04_SURTENSIONS`)">DTE-2019-ELEC 04_SURTENSIONS</li>
                <li @click="handelPdf(`DTE-2019-ELEC 05_CONTACTS-DIRECTS`)">DTE-2019-ELEC 05_CONTACTS-DIRECTS</li>
                <li @click="handelPdf(`DTE-2019-ELEC 06_CONTACTS-INDIRECTS`)">DTE-2019-ELEC 06_CONTACTS-INDIRECTS</li>
                <li @click="handelPdf(`DTE-2019-ELEC 07_ESSAIS-MESURAGES`)">DTE-2019-ELEC 07_ESSAIS-MESURAGES</li>
                <li @click="handelPdf(`DTE-2019-ELEC PV_MISE A LA TERRE DES PANNEAUX PV`)">DTE-2019-ELEC PV_MISE A LA
                  TERRE DES PANNEAUX PV</li>
              </ul>


              <li @click="flagFive = !flagFive"><i class="fa-regular fa-bookmark"></i> chap 05 - Réglementation marocaine</li>
              <ul v-if="flagFive">
                <li @click="flagFiveOne = !flagFiveOne">Normes NM IMANOR</li>
                <ul v-if="flagFiveOne">
                  <li @click="handelPdf(`06.1.012`)">06.1.012</li>
                  <li @click="handelPdf(`06.1.100`)">06.1.100</li>
                  <li @click="handelPdf(`06.1.101`)">06.1.101</li>
                  <li @click="handelPdf(`06.1.102`)">06.1.102</li>
                  <li @click="handelPdf(`06.1.103`)">06.1.103</li>
                  <li @click="handelPdf(`06.1.104`)">06.1.104</li>
                  <li @click="handelPdf(`06.1.105`)">06.1.105</li>
                  <li @click="handelPdf(`06.1.106`)">06.1.106</li>
                </ul>
                <li @click="handelPdf(`Arrêté 28 juin 1938`)">Arrêté 28 juin 1938</li>
                <li @click="handelPdf(`Buletin OFF Arrête MAROCAIN - ELEC`)">Buletin OFF Arrête MAROCAIN - ELEC</li>
              </ul>

              <li @click="flagSix = !flagSix"><i class="fa-regular fa-bookmark"></i> chap 06 - Norme C18510 HAB</li>
              <ul v-if="flagSix">
                <li @click="handelPdf(`GTH_Habilitation Electrique UTE C18-510`)">GTH_Habilitation Electrique UTE
                  C18-510</li>
              </ul>


              <li @click="flagSeven = !flagSeven"><i class="fa-regular fa-bookmark"></i> chap 07 - ELECTROTECH - Conception ELEC</li>
              <ul v-if="flagSeven">
                <li @click="handelPdf(`GTH-Support dimmensionnent ELEC_Version 1`)">GTH-Support dimmensionnent
                  ELEC_Version 1</li>
              </ul>




              <li @click="flagEight = !flagEight"><i class="fa-regular fa-bookmark"></i> chap 08 - PGS Procédure pour réaliser une inspection sans danger</li>
              <ul v-if="flagEight">
                <li @click="handelPdf(`PGS ELEC - Procédure Général de sécurité - Version Janvier 2022`)">PGS ELEC -
                  Procédure Général de sécurité - Version Janvier 2022</li>
              </ul>
            </ul>
            <li  class="books" @click="levage = !levage">
            </li>
            <li class="books" @click="incendie = !incendie">
            </li>
            <li class="books" @click="machine = !machine">
            </li>
          </ul>



        </div>
      </div>
    </div>
    <!-- <Pdf v-if="flagPdf == true" :filepath="filename"></Pdf> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from "@/components/Admin/Nav.vue";
import Service from "../Service";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");
export default {
  name: "admin",
  data() {
    return {
      nom: null,
      prenom: null,
      matricule: null,
      elec: false,
      incendie: false,
      levage: false,
      machine: false,
      flagZero: false,
      flagOne: false,
      flagTow: false,
      flagTree: false,
      flagTreeOne: false,
      flagFour: false,
      flagFive: false,
      flagFiveOne: false,
      flagSix: false,
      flagSeven: false,
      flagEight: false,
      search: null,
      files: [],
    };
  },

  components: {
    Nav,

  },


  computed: {
    filterFile() {
      return this.files.filter((item) => {
        if (!this.search) {
          return null;
        }
        return !item.name.toLowerCase().indexOf(this.search.toLowerCase());
      })
    }
  },


  methods: {

    // handel Pdf Supports Techniques
    handelPdf(filename) {
      this.$router.push({ path: '/showpdf', query: { name: filename } });
    }

  },

  created() {

    if (!sessionStorage.getItem("token")) {
      this.$router.push("/")
    } else {

      this.nom = sessionStorage.getItem("nom");
      this.prenom = sessionStorage.getItem("prenom");
      this.matricule = sessionStorage.getItem("id");

      const arr = [
        "chap OO - sommaire",
        "chap 01- intégrations",
        "Arrêté 28 juin 1938",
        "Buletin OFF Arrête MAROCAIN - ELEC",
        "chap 02-Presentation réglementation FR",
        "NFC 13 100",
        "NFC 13-200F1 Mai 2011",
        "NFC 15-100_11-2008",
        "01_Decret_2010-1016_du_30_aout_2010_version_initiale_FP",
        "02_Decret_2010-1017_du_30_aout_2010_version_initiale_FP",
        "03_Decret_2010-1018_du_30_aout_2010_version_initiale_FP",
        "04_Decret_2010-1118_Elec_Habilitation",
        "05_Arrete_2011-12-14_Ecl-Secu",
        "06_Arrete_2011-12-15_Elec-Galvano",
        "07_Arrete_2011-12-16_Elec-Labo",
        "08_Arrete_2011-12-19_Elec-Soudage",
        "09_Arrete_2011-12-20_Elec-Amovible",
        "10_Arrete_2011-12-21_Elec-Accred",
        "11_Arrete_2011-12-22_Elec-Competences",
        "12_Arrete_2011-12-23_Elec-Machines",
        "13_Arrete_2011-12-26_Verif-Elec",
        "14_Arrete_2012-04-19 normes",
        "15_Arrete_2012-04-20 dossier technique",
        "16_Arrete_2012-04-26 norme voisinage",
        "17_Arrete_2012-04-30_Correctif-Elec",
        "18_circulaire DGT du 9 oct 2012",
        "19.UTE-15-103-mars-04",
        "UTE C 15-106 (12-2003) Section des conducteurs de protection",
        "UTE-15-105-juil-03",
        "DTE-2019-ELEC 01_COURT-CIRCUIT",
        "DTE-2019-ELEC 02_SURCHARGES",
        "DTE-2019-ELEC 03_CHUTE-TENSION",
        "DTE-2019-ELEC 04_SURTENSIONS",
        "DTE-2019-ELEC 05_CONTACTS-DIRECTS",
        "DTE-2019-ELEC 06_CONTACTS-INDIRECTS",
        "DTE-2019-ELEC 07_ESSAIS-MESURAGES",
        "DTE-2019-ELEC PV_MISE A LA TERRE DES PANNEAUX PV",
        "06.1.012",
        "06.1.100",
        "06.1.101",
        "06.1.102",
        "06.1.103",
        "06.1.104",
        "06.1.105",
        "06.1.106",
        "Arrêté 28 juin 1938",
        "Buletin OFF Arrête MAROCAIN - ELEC",
        "GTH_Habilitation Electrique  UTE C18-510",
        "GTH-Support dimmensionnent ELEC_Version 1",
        "PGS ELEC - Procédure Général de sécurité - Version  Janvier 2022"
      ];



      for (let i = 0; i < arr.length; i++) {
        this.files.push({
          id: i,
          name: arr[i]
        });
      }

      // Stream for get Online users
      Service.Online(sessionStorage.getItem("id"))
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

.admin{
  width: 100%;
  overflow-x: hidden;
}
.admin .container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.admin .container .header {
  width: 100%;

}

.admin .container .menu-content {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.admin .container .menu-content .content {
width: 100%;
background-color:
#FAFAFA;

}

.admin .container .menu-content .content .info {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-image: url("../assets/libary.jpg");
  background-size: cover;
  height: 800px;
}


.admin .container .menu-content .content .info .front {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.fa-lightbulb,.fa-circle-exclamation{
  transform: rotate(0deg);
}

.fa-circle-exclamation{
  color:red !important;
}

.admin .container .menu-content .content .info .front h2 {
  text-align: center;
  font-size: 50px;
  margin: 0;
  margin-top: 20px;
  border-bottom: 5px solid #243064;
  border-top: 5px solid #243064;
  border-left: 5px solid #243064;
  width: fit-content;
  padding: 30px;
  background-color: white;
  color: #243064;
}




#app>div>div>div.menu-content>div.content>div>div>p:nth-child(3) {
  color: red;
  background-color: white;
  padding: 20px;
}

#app>div>div>div.menu-content>div.content>div>div>div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

 input {
  width: 100%;
  height: 70px;
  border: 0;
  color: black;
  background-color: red;
  outline: 0;
  font-size: 18px;
}

#app>div>div>div.menu-content>div.content>div>div>ul {
  height: 100%;
  width: 50%;
  background-color: #ffffffb8;
  color: #243064;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
  z-index: 10;
}





#app>div>div>div.menu-content>div.content>ul li {
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

#app>div>div>div.menu-content>div.content>ul li:hover svg {

  transition: 0.5s;
}



#app>div>div>div.menu-content>div.content>ul li p {

  font-size: 30px;
}




#app>div>div>div.menu-content>div.content>ul>ul li {

  width: fit-content;
  cursor: pointer;
  font-size: 20px;
  color: #243064;
  margin-bottom: 10px;
  font-weight: 600;

}

#app>div>div>div.menu-content>div.content>ul>ul>ul>ul>li {

  width: fit-content;
  cursor: pointer;
  font-size: 18px;
  color: rgb(77, 77, 77);
  margin-bottom: 10px;
  margin-left: 100px;
  font-weight: 400;

}




#app>div>div>div.menu-content>div.content>ul>ul>ul>li {

  cursor: pointer;
  font-size: 20px;
  color: #cf1f21;
  margin-bottom: 10px;
  margin-left: 50px;
  font-weight: 500;

}






h3 svg{

  color: white !important;

  font-size: 25px !important;
  transform: rotate(0deg) !important;

}

h3 {
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207, 31, 33, 1) 0%, rgba(24, 86, 161, 1) 100%);
  text-align: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 25px;
}

.text {
  background-color: #fdff88;
  padding: 10px;
  margin: 0 10px;
  border-radius: 10px;
}

.text2 {
  padding: 10px;
  color:RED;
  background-color: white;
  margin: 0 10px;
  font-weight: 500;
  border-radius: 10px;
}

.text span,.text2 span {
  font-weight: bold;
}

.rechercher  {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;


}

.searchList{
width: 50% !important;
margin:auto;
background-color: #ffffff;
padding:10px;
border-bottom: 1px solid rgb(134, 134, 134);
}





.rechercher input  {
  width: 50%;
  height: 40px;
  outline: 0;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;

  padding:10px;
}

.electricite img{

  object-fit: cover;
  box-shadow: rgba(121, 121, 121, 0.514) 0px 3px 8px;
  cursor: pointer;
  transition: 0.6s ease;

}

.electricite img:hover{

transform: scale(1.1);
box-shadow: rgba(199, 20, 20, 0.24) 0px 3px 8px;


}



.booklist{
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(4,1fr);
  justify-items: center;
  text-align: center;



}

.electricite p {
  font-weight: 700;
  margin-top:5px;
  color:#313131;
  font-size: 20px;
}

.list{
  width: 100%;

  margin:10px auto;
  max-width: 900px;
  overflow: hidden;
  margin-top: 20px;
}

.list .pagee{
  background-color: white;
  padding:0 20px;
  max-height: 700px;
  line-height: 45px;
  overflow: auto;
  border-radius: 10px;
    margin:10px 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
}

.title-book{
  text-align: center;
  color:#ff9b9b;

  font-weight: 700;
  font-size: 30px;
  text-transform: uppercase;
  margin-bottom: 30px;
  margin-top: 10px;
}
svg{
  transform: rotate(90deg);
  color:rgb(112, 112, 112) !important;
  font-size: 14px !important;
  margin-right: 5px;
  margin-top: 5px;
}

.rechercher svg{
  position: absolute;
  top:9px;
  right: 25%;

}

.text , .text2{
  max-width: 1200px;
  margin:10px auto;

}
</style>
<template>
<div class="page">
    <header style=" display: flex; justify-content:space-between; align-items:center; padding:0 10px; ">
        <div id="stat">
            <p @click="noteCalendrier()"><i class="fa-solid fa-calendar-days fa-lg"></i> <span>{{ countCal }}</span> </p>
            <p @click="noteFrais()"><i class="fa-solid fa-comment-dollar fa-lg"></i> <span>{{ countFrais }}</span></p>
            <p @click="chatGthconsult()"><i class="fa-sharp fa-solid fa-headphones fa-lg"> <span></span></i></p>


        </div>
       <div class="logo">
            <img src="../assets/logo.png" alt="" style="width: 150px;">
        </div>

        <div class="button " style="display:flex; align-items:center;">
            <ul style="display: flex ;gap: 10px; align-items: center ;border-radius: 5px ;margin-right: 10px ; ;list-style: none; padding:10px">
               <div class="left" style="display: flex ;align-items:center; gap: 5px; padding:0px 10px;border-right: 2px solid rgb(202, 202, 202);">
                <div class="image">
                    <img src="../assets/person.png" alt="" width="40px">
                </div>
                <div class="info" >
                    <li style="font-weight: 700;">Prénom & Nom: <span  style="font-weight: 500; color:gray;">{{ prenom }} {{ nom }} </span></li>
                    <li style="font-weight: 700;">Matricule : <span  style="font-weight: 500;color:gray;">{{ matricule }}</span></li>


                </div>
               </div>





                <li style="display: flex; align-items:center"><span style="font-weight: bold;"> <img src="../assets/time.png" width="50px" alt=""> </span> {{ new Date().toLocaleDateString() }} | {{ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() }}</li>

            </ul>


            <button class="btnLogout" @click="deconnexion()"> <i class="fa-solid fa-right-from-bracket"></i> Deconexion</button>
        </div>


    </header>


    <div class="Intranet">


    <div class="title" v-if="this.status == 'admin'">
        <p> <i class="fa-solid fa-globe"></i> INTRANET <span class="spn">GTHCONSULT</span> </p>
    </div>


    <div class="parent">

          <div class="box" style="position:relative; overflow: hidden;" @click="da()" v-if="this.status == 'admin'">
            <div  >
              <img src="./../assets/adm.jpg" class="imgDep" style="position: absolute; top:-50px;
              left:0;right:0; padding:0; overflow: hidden; opacity:0.3;z-index: 1;" alt="">
              <i class="fa-solid fa-user-tie"></i>
              <p>DÉPARTEMENT ADMINISTRATIVE</p>
            </div>
          </div>

          <div class="box"  style="position:relative; overflow: hidden;"  @click="dp()" v-if="this.status == 'admin'">
            <div>
              <img src="./../assets/ep.jpeg" style="position: absolute; top:-50px;
              left:0;right:0; padding:0; overflow: hidden; opacity:0.3;z-index: 1;" alt="">
          <i class="fa-solid fa-recycle"></i>
              <p>DÉPARTEMENT PRODUCTION</p>
            </div>
          </div>

          <div class="box" style="position:relative; overflow: hidden;"  @click="dt()">
              <div>
                <img src="./../assets/technico.jpg" style="position: absolute; top:-120px;
              left:-700px;right:0; padding:0; overflow: hidden; opacity:0.3;z-index: 1;" alt="">
                <i class="fa-solid fa-microchip"></i>
                <p>DÉPARTEMENT TECHNIQUE</p>
               </div>
          </div>

          <div  class="box" style="position:relative; overflow: hidden;" @click="dq()" v-if="this.status == 'admin'">
              <div>
                <img src="./../assets/qualitee.jpg" style="position: absolute; top:-270px;
              left:0;right:0; padding:0; overflow: hidden; opacity:0.3; z-index: 1;" alt="">
              <i class="fa-sharp fa-solid fa-circle-check"></i>
                <p>DÉPARTEMENT QUALITÉ</p>
               </div>
          </div>

    </div>

    <div class="copyright" v-if="this.status == 'admin'">
      <p>© 2022 GTHCONSULT BUREAU DE CONTRÔLE AGRÉÉ PAR L'ETAT</p>
    </div>



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
      matricule : null,
      countCal : 0,
      countFrais : 0
    }
  },
  components: {

  },

  methods : {

    da() {
        this.$router.push("/da");
    },

    dp() {
        this.$router.push("/dp");
    },

    dt() {
        this.$router.push("/dt");
    },

    dq() {
        this.$router.push("/dq");
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

    chatGthconsult() {
      return this.$router.push("/chatgthconsult");
    },

    noteFrais() {
      return this.$router.push("/notefrais");
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
              this.countFrais = result.data.response;
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
              this.countCal = result.data.response
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



header{
    box-shadow: 0px 0px 5px rgb(173, 173, 173);
    background-color: white;
    width: 100%;
}

.btnHome{
    padding:10px 20px;
    background-color: white;
    border:0;
    border-radius: 20px;
    color: rgb(228, 44, 44);
    font-weight: bold;
    outline:2px solid #243064;
    cursor: pointer;
    margin: 5px;
}
.btnLogout{
    padding:10px 20px;
    background-color: rgb(228, 44, 44);
    border:0;
    color:white;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    margin: 5px;
}
.btnLogout:hover{

    background-color:#243064;

}

header #stat {
    color:#243064;
    display: flex;
}
header #stat p:hover {

  color:#cf1f21;
}

header #stat p {

   position: relative;
   margin-right: 10px;
    cursor: pointer;
    color:#243064;
    position: relative;
 }

 header #stat p span {

  font-size: 15px;
  position: absolute;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  top:-10px;
  right: -10px;
  background-color: #ee272a;
  padding: 2px;
  border-radius: 100%;
 }




#stat .fa-solid:hover {
color:#cf1f21;
}



.fa-lg{
  font-size: 29px;
}







.parent  {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap:10px;
    margin:  auto;
    max-width: 1000px;
    position: relative;

}




.parent div{

  display: flex;
  justify-content: start;
  align-items: center;

  flex-direction: column;
  font-size: 20px;
  width: 100%;
  font-weight: 700;
  cursor: pointer;
  transition: all .4s ease-in-out;
color:white;
}

.parent .box:hover img{
  transform: scale(1.1) rotate(1deg);
  transition: all .4s ease-in-out;

}

.parent .box{
  min-height:240px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent>div:nth-child(2){
  background-color: #cf1f21 ;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;


}
.parent>div:nth-child(1){
  background: #243064;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;

}

.parent>div:nth-child(3){
  background: #cf1f21 ;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}

.parent>div:nth-child(4){
  background: #243064;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}



.parent .fa-user-tie,.fa-recycle,.fa-microchip,.fa-circle-check{
font-size: 80px !important;
color:#bae6fd;
z-index: 77;
}

.parent p {
  z-index: 77;
  font-size: 25px;
  font-weight: 700;
  color:white;

}


/* start div 1 */


.title p{
    text-align: center;
    color:#cf1f21;
    font-size: 30px;
    font-weight: 700;
    margin:10px;

}



.spn{
   color:#243064;
   animation: typing 2s steps(10) infinite;
   overflow: hidden;
}

.fa-globe{
  font-size: 39px;
}

@keyframes typing
{

   0%,90%,100%{
       opacity: 0;
   }
   30%,60%{
       opacity: 1;
   }
}

.copyright{
  text-align: center;
  font-weight: 700;
  color:rgb(54, 54, 54);

}

/* End div 4 */



#stat svg{
  margin-left:10px;
}





</style>

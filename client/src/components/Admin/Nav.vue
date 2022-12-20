<template>
    <header style=" display: flex; justify-content:space-between; align-items:center; padding:0 20px; ">
    <div class="logo" @click="accueille()">
            <img src="./../../assets/logo.png" alt="" style="width: 150px; cursor: pointer;">
        </div>

        <div class="button " style="display:flex; align-items:center;">
            <ul style="display: flex ;gap: 10px; align-items: center ;border-radius: 5px ;margin-right: 10px ; ;list-style: none; padding:10px">
               <div class="left" style="display: flex ;align-items:center; gap: 5px; padding:0px 10px;border-right: 2px solid rgb(202, 202, 202);">
                <div class="image">
                    <img src="./../../assets/person.png" alt="" width="40px">
                </div>
                <div class="info" >
                    <li style="font-weight: 700;">Prénom & Nom: <span  style="font-weight: 500; color:gray; text-transform: capitalize;">{{ prenom }} {{ nom }} </span></li>
                    <li style="font-weight: 700;">Matricule : <span  style="font-weight: 500;color:gray;">{{ matricule }}</span></li>
                </div>
               </div>
                <li style="display: flex; align-items:center"><span style="font-weight: bold;"> <img src="./../../assets/time.png" width="50px" alt=""> </span> {{ new Date().toLocaleDateString() }} | {{ new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() }}</li>

            </ul>


            <button class="btnHome" @click="accueille()"> <i class="fa-solid fa-house"></i> Page D'acceuil</button>
            <button class="btnLogout" @click="deconnexion()"> <i class="fa-solid fa-right-from-bracket"></i> Deconexion</button>
        </div>


    </header>

</template>

<script>
import Service from "../../Service";
export default {
  data() {
    return {
      nom: null,
      prenom: null,
      matricule: null
    };
  },
  methods: {

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
      sessionStorage.removeItem("us");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("id");

      return this.$router.push("/");
    },

    accueille() {
      return this.$router.push("/interface");
    },
  },

  created() {

          this.nom = sessionStorage.getItem("nom");
          this.prenom = sessionStorage.getItem("prenom");
          this.matricule = sessionStorage.getItem("id");
  }

};
</script>

<style scoped>
header{
    box-shadow: 0px 0px 5px rgb(173, 173, 173);
    background-color: white;
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
    transition: .3s ease-in;
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
    transition: .3s ease-in;
}
.btnLogout:hover{
    background-color:#243064;
}

.btnHome:hover{
background-color: #cf1f21;
color:white;
outline:0;
}

.s {
    font-size: 30px;
}

.s i {
    margin-right: 10px;
    cursor: pointer;
    color:#243064;
    position: relative;
}

.s i:hover {
color:#cf1f21;
}

.s i::after {
  content:'1';
  font-size: 10px;
  position: absolute;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  top:-10px;
  right: -10px;
  background-color: red;
  padding: 5px;
  border-radius: 100%;

}



</style>

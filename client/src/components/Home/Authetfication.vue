<template>
 <div class="containerr">

<div class="banner">
    <img src="./../../assets/company.jpg" class="picture" alt="">
    <img src="./../../assets/logogth.png" class="logo" alt="">
    <p class="title">Bienvenue à GTHCONSULT Maroc</p>
    <p class="body">Bienvenue, nous vous informer que ce logiciel privée pour à la société GTHCONSULT , et chaque utilisation illégale peut conduire à un problème juridique </p>
</div>
<div class="login">

    <div class="text">
      <p class="log">Bienvenue </p>
    <p class="log2">Entrez Vos Informations :</p>
    </div>

    <div class="input-group">
      <label for="fname">Email</label>

      <div class="mail">
        <i class="fa-solid fa-envelope"></i>
        <input type="text" v-model="auth.email">
      </div>
      <label for="lname">Password</label>
      <div class="pass">
        <i class="fa-solid fa-lock"></i>

        <input type="password" v-model="auth.password">
      </div>
        <button  type="submit" @click="authetfication()"> Se Connecter <i class="fa-solid fa-right-to-bracket"></i></button>

    </div>

</div>
</div>
</template>

<script>
 import Service from "../../Service";
export default {
  name: "auth",
  data() {
    return {
      auth: {
        email: null,
        password: null,
      },
    };
  },
  methods: {

    authetfication() {


     //Auth inspecteur with MangoDB
     Service.loginAdmin(this.auth.email, this.auth.password)
       .then((result) => {


         if(result.data.msg == true) {

               sessionStorage.setItem("token", result.data.token);
               sessionStorage.setItem("nom", result.data.res[0].nom);
               sessionStorage.setItem("prenom", result.data.res[0].prenom);
               sessionStorage.setItem("email", result.data.res[0].email);
               sessionStorage.setItem("status", result.data.res[0].status);
               sessionStorage.setItem("id",result.data.res[0]._id);

               return this.$router.push("/interface");
         }

       })
       .catch((error) => {
         console.error(`HTTP error: ${error.name} => ${error.message}`);
         throw "fail request at: GET /refreshtime";
       });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.containerr {
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
}



.picture{
  object-fit: cover;
  position: absolute;
  z-index: 200;
  height: 100%;
  opacity: 0.3;


  background-size: contain;

}
.banner {
  width: 50%;
  position: relative;
  overflow: hidden;
background: linear-gradient(346deg, rgba(123,67,151,1) 0%, rgb(190, 20, 32) 100%);
  display: flex;

  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;

}

.banner .bann {
width: 100%;
height: 100%;

flex: none;
}

.banner .logo {
  width: 300px;
  z-index: 2000;
}

.banner p {
  text-align: center;
}

.banner .title {
  font-size: 30px;
  color:rgb(255, 255, 255);
  font-weight: bold;
  z-index: 2000;
  margin-bottom: 10px;
}
.banner .body {
  font-size: 20px;
  color:rgb(238, 238, 238);
  font-weight: normal;
  z-index: 2000;
  margin-bottom: 10px;
}

.login{
  width: 50%;
  display: flex;

  justify-content: center;
  font-size: 20px;
  align-items: center;
  padding: 0 10px;
  flex-direction: column;
}

.login input[type=text],input[type=password] {
  width: 100%;
  padding: 12px 10px;
  margin:10px 0;
  border:1px solid rgb(196, 196, 196);
  padding-left: 45px;
  font-size: 18px;
  transition: ease 0.3s ;
}

.login input[type=text]:focus-within, input[type=password]:focus-within {
outline:1px solid #cf1f21;
padding-left: 50px;

}


.login button[type=submit] {
  width: 100%;
  padding: 12px 20px;
  font-size: 18px;
  font-weight: 500;
  border-radius:10px;
  margin-top: 30px;
  transition: .3s ease-in;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;


  background: #243064;
  border:0;
  color:white;
}

.mail{
  position: relative;

}

.pass{
  position: relative;
}

.fa-envelope,.fa-lock{

position: absolute;
top:23px;
left: 10px ;
color:#cf1f21;
font-size: 20px;
}

p{
  padding: 0 !important;
}

.login button[type=submit]:hover {

  background: #cf1f21;

  outline: 1px solid rgb(202, 202, 202);
}
.login .input-group {
  padding:20px;
  width: 90%;

}

.text{
  text-align: center;
}
.log{
  padding:0 20px;
  font-weight: bold;
  font-size: 40px;
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #243064, #cf1f21);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  margin:0;
}


.log2{
  padding:0 20px;
  font-weight: 300;
  font-size: 23px;

  margin: 0;
color:gray;
}



</style>

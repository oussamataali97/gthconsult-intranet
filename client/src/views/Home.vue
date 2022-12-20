<template>
  <div class="home">
    <div class="container" v-if="cookieMAC">
      <Authetfication />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Authetfication from "@/components/Home/Authetfication.vue";
import Service from "../Service"

export default {
  name: "Home",
  data() {
      return {
        macAddresse : null,
        cookieMAC : false
      };
  },
  components: {
    Authetfication,
  },

  created() {

      function setCookie(name,value,days) {
      var expires = "";
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
      }

      function getCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1,c.length);
              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
      }

    if(getCookie("macAddresse")) {

        this.cookieMAC = true;

        if(sessionStorage.getItem("token")) {
           this.$router.push("/interface");
        }

    } else {

      this.macAddresse = prompt('Please enter your Auth Adresse:', '');

      if(this.macAddresse == '') {
         window.location.replace("https://www.google.com/");
      } else {
                  setCookie('macAddresse',"00-00-00-00-00-00",365);
                  this.cookieMAC = true;


            Service.CheckMacAddress(this.macAddresse)
              .then((result) => {

                if(result.data.res == false) {
                    window.location.replace("https://www.google.com/");
                }

                if(result.data.res == true) {

                  setCookie('macAddresse',this.macAddresse,365);
                  this.cookieMAC = true;
                }

              })
              .catch((error) => {
                  console.log(error);
              });

      }

    }

  }
};
</script>

<style scoped>


</style>

<template>
  <div class="showpdf">
       <object :data="path" type="application/pdf" width="100%" height="100%" title="pdf book"> </object>
  </div>
</template>



<script>
import Service from "../Service";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");

export default {

    data() {
        return {
            path : null,
        };
    },

 methods: {

        handelPdf() {
            const filename = this.$route.query.name;
                Service.handelPdfSupports(filename)
                .then((response) => {
                    this.path = `${response}#toolbar=0`;
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }
  },

  created() {
              // Stream for get Online users
          Service.Online(sessionStorage.getItem("id"))
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

         this.handelPdf();

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

}
</script>


<style scoped>
.showpdf {
    height: 1500px;
}
.showpdf > embed {
    display: none;
}

</style>
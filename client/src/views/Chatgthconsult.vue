<template>
  <div class="admin">
    <div class="header">
      <Nav />
    </div>
    <div class="container">

      <div class="menu-content">

        <div class="menu">
        </div>

        <div class="content">
          <!-- start chat -->
          <div class="chat">
            <div class="users">

              <div class="front">
                Contacts

              </div>
              <div class="back">
                <ul v-for="item in filterAdmins" :key="item._id">
                  <li @click="chatContact(item._id)" class="user-auth">
                    <div class="pictures">
                      <img src="./../assets/userr.svg" class="onlinee" v-if="item.connected == true" alt="" >
                      <img src="./../assets/userr.svg" class="oflinee" v-if="item.connected == false" alt="" style="filter: saturate(0);">

                       <p>{{ item.nom + " " + item.prenom }}</p>
                    </div>


                      <div class="online" v-if="item.connected == true">

                      </div>
                      <div class="offline" v-if="item.connected == false">

                      </div>
                      </li>

                </ul>
              </div>
            </div>

            <div class="content-message">
              <h3><i class="fa-regular fa-comments"></i> CHAT GTHCONSULT</h3>

              <div class="content">
                <div v-for="(item, i) in filterChatContent" :key="i">
                  <ul v-for="(element, j) in item.content" :key="j">
                    <div class="msguser">
                      <li class="userMsg"><img src="./../assets/userr.svg" class="onlinee" width="30px" alt="" style="margin-right:5px" > {{ element.name }} </li>
                      <li>{{ element.message }} </li>
                    </div>
                    <div>
                      <li>{{ new Date(element.date).toLocaleString() }} </li>
                      <li v-if="element.vu"><i class="fa-solid fa-check"><i class="fa-solid fa-check"></i></i></li>
                    </div>
                  </ul>

                </div>
              </div>
              <div class="message">
                <textarea v-model="message" id="" placeholder="Type here ..."></textarea>
                <button>
                  <i class="fa-solid fa-paperclip"></i>


                  <input type="file" value="Envoyer" />
                </button>
                <button type="button" class="btn-send" value="Envoyer" @click="envoyerMessage()"> <i
                    class="fa-solid fa-envelope"></i></button>
              </div>
            </div>
          </div>
          <!-- End chat -->



        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Service from "../Service";
import Nav from "@/components/Admin/Nav.vue";
import io from 'socket.io-client'
const socket = io("http://localhost:5000");
export default {
  name: "admin",
  data() {
    return {
      currentRoom: null,
      message: null,
      admins: [],
      chatcontent: [],
      currentContact: null,
      nom: null,
      prenom: null,
      matricule: null,
      beneficiare: null
    };
  },

  components: {
    Nav,
  },

  computed: {

    filterAdmins() {
      return this.admins.filter((item) => {
        {
          // delete my user
          if (item._id != this.matricule) {
            return item
          }
        }
      })
    },

    filterChatContent() {
      return this.chatcontent.filter((item) => {
        {
          if (item.chatId == this.currentRoom) {
            return item
          }

        }
      })
    }
  },


  methods: {

    envoyerMessage() {
      Service.EnvoyerMessage(this.currentRoom, this.message, this.matricule)
        .then((result) => {
          console.log(result);
          this.message = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // create room chat
    chatContact(conatactId) {
      this.messages = [];
      this.currentContact = conatactId;
      Service.ChatContact(this.currentContact, this.matricule)
        .then((result) => {
          this.currentRoom = result.msg;
        })
        .catch((error) => {
          console.log(error);
        });
    }

  },

  created() {

    if (!sessionStorage.getItem("token")) {
      this.$router.push("/")
    } else {

      this.nom = sessionStorage.getItem("nom");
      this.prenom = sessionStorage.getItem("prenom");
      this.matricule = sessionStorage.getItem("id");
      this.beneficiare = `${this.nom} ${this.prenom}`;

      // get date cuerrent
      var today = new Date();
      this.jour = String(today.getDate()).padStart(2, '0');
      this.mois = String(today.getMonth() + 1).padStart(2, '0');
      this.annee = today.getFullYear();

      // Socket admins
      socket.on("admins", (msg) => {
        this.admins = [];
        this.admins = msg;
      });

      // Socket admins
      socket.on("chatcontent", (msg) => {
        this.chatcontent = [];
        this.chatcontent = msg;
      });

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
.admin {
  width: 100%;
  overflow: hidden;
}
.content>div>ul{
  border-bottom: 1px solid rgb(230, 230, 230);

}

.admin .container .menu-content .content .chat {
display: grid;
grid-template-columns: 30% 70%;

}





#app>div>div>div.menu-content>div.content>div.chat>div.users>div.front {
color:rgb(66, 66, 66);
  text-align: center;
  text-transform: uppercase;
  padding: 10px;
    font-size: 25px;

  font-weight: 500;
  border-bottom: 1px solid #ddd;
}

#app>div>div>div.menu-content>div.content>div.chat>div.users>div.back {
  overflow-y: auto;
  max-height: calc(100vh - 128px);

}





#app>div>div>div.menu-content>div.content>div.chat>div.content-message {
  z-index: 10;
  width: 100%;
  display: flex;
  height: calc(100vh - 74px);
  flex-direction: column;
justify-content: space-between;

}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message .content {
  overflow: auto;
  background-color: rgb(255, 255, 255);
  z-index: 2000;
  width: 100%;
  border-left: 2px solid #dadada;
  flex:1;


}


#app>div>div>div.menu-content>div.content>div.chat>div.content-message .message {
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  padding: 16px;
  align-items: center;
  background-color: #f0f0f0;
  text-align: center;
  position: relative;
  justify-content: flex-end;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message .message textarea {
  width: 100%;
  overflow-y: auto;
  border: 0;
  margin-right: 10px;
  border-radius: 10px;
  padding: 5px 70px 5px 20px;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message .message textarea:focus-within {
  outline: none;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.message>button>input[type=file] {
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);
  cursor: pointer;
  opacity: 0;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.message>:nth-child(2) {
  background: #636363;
  padding: 10px;
  margin-right: 10px;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: .3s ease-in;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.message>:nth-child(2):hover {

  background: #243064;
}


.btn-send {

  background: #243064;
  padding: 10px;

  border: 0;
  border-radius: 50%;
  transition: .3s ease-in;
  cursor: pointer;

}


.btn-send:hover {

  background: #cf1f21;


}

.msguser{
  display: flex;
  align-items: center;


}

.fa-paperclip,
.fa-envelope {
  font-size: 20px;
  color: white;
  cursor: pointer;
}

.user-auth{
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: space-between;
  color:rgb(43, 43, 43);
  font-size: 20px;
  text-transform: capitalize;

}



.pictures{
  display: flex;
}

.userMsg{

  text-transform: capitalize;
  display: flex;
  align-items: center;
}

.back ul li {
border-bottom: 1px solid rgb(190, 190, 190);
  padding:5px 10px;

    width: 100%;
    cursor: pointer;
    margin: 0 auto;
    transition: 0.3s ease-in-out;
}

.back ul li:hover {
background-color: #243064;
color:white;
}

.back ul:nth-child(odd) {
background-color: rgb(245, 245, 245);
}

.user-auth img{
  margin-right:20px;
  width: 50px;
}

.offline{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgb(212, 59, 59);
}

.online{
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: rgb(53, 196, 53);
}


#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.message>input[type=button]:nth-child(3) {
  background-color: #3085d6;
  color: white;
  font-size: 18px;
  border: 0px;
  cursor: pointer;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
  margin-left: 10px;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div>li:last-child {
margin-left:9px;
color:rgb(54, 54, 54);
}




#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div:nth-child(1)>li:nth-child(1) {
  color: #243064;
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div:nth-child(1)>li:nth-child(2) {
  font-size: 16px;


}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div:nth-child(1)>li:nth-child(2) {
  color:rgb(53, 53, 53);
  margin-left: 10px;
  word-break:break-all;
  flex: 1;
  padding:0 10px 0 0;

}

#app>div>div>div.menu-content>div.content>div.chat>div.content-message>div.content>div>ul>div:nth-child(2)>li:nth-child(1) {
  color: #575764ab;

}


h3{
  width: 100%;
  background-image: linear-gradient(45deg, #243064, #cf1f21);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-color: rgb(241, 241, 241);
  border-bottom: 2px solid #ffa4a4;
  border-left: 1px solid #dfdfdf;

  text-align: center;
  padding: 10px;
    font-size: 25px;

}
</style>
<template>
  <div class="creationClient">

      <h3>INFORMATION DE CLIENT</h3>

      <ul class="info-client">

          <li> Client </li>
          <li><i class="fa-solid fa-building"></i> Raison sociale / Nom : {{ client.raisonSocial }}</li>
          <li><i class="fa-solid fa-location-dot"></i> Adresse : {{ client.adresse }}</li>
          <li><i class="fa-solid fa-city"></i> Ville : {{ client.ville }}</li>
          <li><i class="fa-solid fa-signs-post"></i> Code Postal: {{ client.codePostal }}</li>
          <li><i class="fa-solid fa-globe"></i> Pays: {{ client.pays }}</li>
          <li><i class="fa-solid fa-envelope"></i> Email: {{ client.email }}</li>
          <li><i class="fa-solid fa-phone"></i> Téléphone : {{ client.telephone }}  </li>
          <li><i class="fa-solid fa-i"></i> ICE: {{ client.ice }}</li>
          <li><i class="fa-solid fa-id-card"></i>Référence client: {{ client.refClient }}</li>
          <li><i class="fa-solid fa-person"></i>Les Interlocuteurs</li>
          <table>
              <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>E-mail</th>
                  <th>Fonction</th>
                  <th>Téléphone</th>
              </tr>
              <tr v-for="interlocuteur in interlocuteurs" :key="interlocuteur._id">
                  <td>{{ interlocuteur.nom }}</td>
                  <td>{{ interlocuteur.prenom }}</td>
                  <td>{{ interlocuteur.email }}</td>
                  <td>{{ interlocuteur.fonction }}</td>
                  <td>{{ interlocuteur.telephone }}</td>
              </tr>
          </table>
      </ul>


    <div>
        <input type="submit" value="Quitter" @click="quitter()">
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
              telephone: null
      },
      interlocuteurs : []
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

  },

  created(){

              this.client.raisonSocial = this.infoClient[0].raisonSocial;
              this.client.adresse = this.infoClient[0].adresse;
              this.client.ville = this.infoClient[0].ville;
              this.client.codePostal = this.infoClient[0].codePostal;
              this.client.pays = this.infoClient[0].pays;
              this.client.email = this.infoClient[0].email;
              this.client.telephone = this.infoClient[0].telephone;
              this.client.ice = this.infoClient[0].ice;
              this.client.refClient = this.infoClient[0].refClient;
              this.client.id = this.infoClient[0]._id;


            Service.selectInterlocuteurs(this.client.id)
                .then((result) => {

                  if(result.data.interlocuteurs) {
                      result.data.interlocuteurs.forEach((element) => {
                            this.interlocuteurs.push(element);
                      });
                  }

                })
                .catch((error) => {
                    this.msg = error.message;
                    console.error(`HTTP error: ${error.name} => ${error.message}`);
                    throw "fail request at: GET /refreshtime";
                })


  }

};
</script>

<style scoped>
.creationClient {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.creationClient h3 {
  width: 100%;
  height: fit-content;
  padding: 5px;
  color: white;
  background-color: #243064;
  text-align: center;

}

.creationClient .info-client li {
    background-color: #243064;
    color: white;
    padding: 10px;
    border: 1px solid #ddd;
    font-size: 18px;
}
.creationClient .info-client li:nth-child(10) table tr th {
    padding: 10px;
    background-color: #ddd;
    font-size: 18px;
    border: 1px solid black;
}
.creationClient div input[type=submit] {
    background-color: red;
    color: white;
    border: 0;
    margin-top: 30px;
    cursor: pointer;
    font-size: 18px;
    border: 0px;
    outline: 0px;
    padding: 10px;
}

#app > div > div > div.menu-content > div.content > div > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

#app > div > div > div.menu-content > div.content > div > div > ul{
  width: 1000px;
}

#app > div > div > div.menu-content > div.content > div > div > ul > li {
  padding-top: 20px;
  padding-bottom: 20px;
}

#app > div > div > div.menu-content > div.content > div > div > ul > li > svg {
  font-size: 25px;
}


#app > div > div > div.menu-content > div.content > div > div > div > input[type=submit] {
  width: 200px;
  padding: 15px;
  border-radius: 15px;
}

#app > div > div > div.menu-content > div.content > div > div > ul > li:nth-child(1) {
    background-color: red;
    text-align: center;
    margin-top: 30px;
}

#app > div > div > div.menu-content > div.content > div > div > ul > li:nth-child(11) {
    background-color: red;
    text-align: center;
    margin-top: 30px;
}

</style>
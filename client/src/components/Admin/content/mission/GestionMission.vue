<template>
    <div class="gestionInspecteur">

      <h3>Fiches des Clients</h3>

      <p v-if="succes" :class="{ succes: succes }">
        {{ msg }}
      </p>

      <p v-if="echec" :class="{ echec: echec }">
        {{ msg }}
      </p>

      <div class="rechercher-table">

            <div class="rechercher">
                <input type="text" v-model="rechercher"  @keypress.prevent="rechercherInspecteur()">
            </div>

            <table id="inspecteurs">
              <tr>
                <th>   </th>
                <th>Identité</th>
                <th>Métier</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Actions</th>
              </tr>
              <tr v-for="(item, i) in inspecteurs" :key="item._id">
                <td><input type="checkbox" :value="item._id" v-model="checkedInspecteurs" style="width: 20px;"></td>
                <td>{{ item.identite }}</td>
                <td>{{ item.metier }}</td>
                <td>{{ item.nom }}</td>
                <td>{{ item.prenom }}</td>
                <td>
                  <a v-show="stautsUser && item.validate == true" @click="deleteInspecteur(item._id, item._rev, item._id, i)">
                    <i class="fa-solid fa-trash-can"></i
                  ></a>
                  <a v-show="item.validate == false" @click="deleteInspecteurOffline(item._id, item._rev, i)">
                    <i class="fa-solid fa-trash-can"></i
                  ></a>
                  <a v-show="stautsUser && item.validate == true" @click="editInspecteur(item._id)">
                    <i class="fa-solid fa-pen-to-square"></i
                  ></a>
                  <a v-show="stautsUser && item.validate == false" @click="validateInspecteur(item._id)">
                    <i class="fa-solid fa-circle-check"></i>
                  </a>
                  <a v-show="item.validate == true" @click="getRapportInspecteur(item.identite)">
                    <i class="fa-solid fa-download"></i>
                  </a>
                </td>
              </tr>
            </table>

            <div class="deleteAll" v-show="checkedInspecteurs.length > 0">
              <input type="submit" value="Supprimer tout" @click="deleteAll()">
            </div>

            <ul>
                <li v-for="number in numberPage" :key="number" @click="pagination(number)">
                  {{ number }}
                </li>
            </ul>


      </div>



    <!--  Start Edit Inspecteur   -->
    <EditClient v-if="flagEditClient == true" />
    <!--  End Edit Inspecteur   -->

  </div>

</template>

<script>
export default {
  name: "gestionInspecteur",
  components: {
  },

  data() {
    return {
      stautsUser:  null,
      succes: false,
      echec: false,
      msg: null,
      rechercher: null,
      countInspecteurs: 0,
      numberPage: null,
      numberLigne: 4,
      inspecteurs: [],
      flagEditClient: false,
      inspecteur: {
        _id: null,
        _rev: null,
        email: null,
        password: null,
        passwordRepate: null,
        nom: null,
        prenom: null,
        telephone: null,
        codePostal: null,
        ville: null,
        pays: null,
        adresse: null,
        date: null,
        metier: null,
        identite: null,
        validate: true,
      },
      checkedInspecteurs : []
    };
  },
  methods: {

  }
};
</script>

<style scoped>
.succes {
  background-color: green;
  color: white;
  padding: 10px;
  height: fit-content;
  width: 100%;
}

.echec {
  background-color: red;
  color: white;
  padding: 10px;
  height: fit-content;
  width: 100%;
}

.gestionInspecteur {
  width: 100%;
  height: 100%;
  padding-top: 0px;
  padding-left: 0px;
  margin: 0px;
  position: relative;
}
.gestionInspecteur h3 {
  width: 100%;
  height: fit-content;
  padding: 5px;
  margin: 0;
  color: white;
  background-color: #243064;
  text-align: center;
  margin-bottom: 10px;
}

pecteur .rechercher-table {
  width: 100%;
}
.gestionInspecteur .rechercher-table .rechercher {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

}

.gestionInspecteur .rechercher-table .rechercher input {
  width: 50%;
  height: 40px;
  outline: 0;
  border: 1px solid #243064;
  font-size: 16px;
  background-color: white;
  color :#243064;
}

.gestionInspecteur .rechercher-table table tr th {
    background-color: #243064;
    color: white;
    padding: 5px;
}

.gestionInspecteur .rechercher-table table tr td {
    background-color: #ddd;
    color: black;
    padding: 5px;
}
.fa-trash-can {
  color: red;
}

.fa-pen-to-square {
  color: blue;
}

.fa-circle-check {
  color: green;
}
.fa-download {
  color: black;
}


.gestionInspecteur .rechercher-table ul {
  width: 100%;
  height: fit-content;
  text-align: center;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.gestionInspecteur .rechercher-table ul li {
  color:black;
 margin-left: 5px;
 cursor: pointer;
 font-size: 18px;
}
.gestionInspecteur .rechercher-table ul li:hover {
  color:red;
 margin-left: 5px;
 transition: 0.3s;
}


.gestionInspecteur .rechercher-table .deleteAll {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.gestionInspecteur .rechercher-table .deleteAll input {
  width: 50%;
  height: 40px;
  background-color: red;
  color: white;
  border: 0;
}

</style>
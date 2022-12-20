<template>
  <div class="creationClient">

    <h3>Création d'un mission</h3>

    <p v-if="succes" :class="{ succes: succes }">
        La mission a été enregistré avec succès, Veuillez patienter quelques secondes pour enregistrer la maission.
    </p>

    <p v-if="echec" :class="{ echec: echec }">
        La mission non enregistré
    </p>

    <div class="formCreation">

      <div>
        <label for="pays">Numéro d'affaire</label>
        <input type="text" v-model="mission.numeroAffaire">
      </div>


      <div>
        <label for="Raison sociale">Apporteur d'affaire</label>
        <select v-model="mission.apparteurAffaire">
          <option value="CRP-LEV">Appareil et accessoir de levage</option>
          <option value="jamal ETTARIQ" >jamal ETTARIQ</option>
        </select>
      </div>

      <div>
        <label for="Type de mission">Type de mission</label>
        <select v-model="mission.typeMission" @click="handelTypeMission()">
          <option value="CRP-LEV">CRP-LEV</option>
          <option value="CMS-LEV">CMS-LEV</option>
          <option value="CRP-ASC">CRP-ASC</option>
          <option value="CMS-ASC">CMS-ASC</option>
        </select>
      </div>

      <div class="mission" v-if="flagCRP">
        <hr>
        <h1>CRP-LEV</h1><br>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {

    return {
      checkedMission: [],
      mission: {
              codeMission : null,
              apparteurAffaire : null,
              typeMission : null,
              ht : null,
              tva : null,
              numeroAffaire : null,
              flagCRP : false,

      },
      succes: false,
      echec: false,
    };

  },
  methods : {
    handelTypeMission() {
       if(this.mission.typeMission == "CRP-LEV")
       {
              this.flagCRP = true
       }
    }
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
  align-items: center;
}

.creationClient h3 {
  width: 100%;
  height: fit-content;
  padding: 5px;
  color: white;
  background-color: #243064;
  text-align: center;

}
.succes {
  background-color: #69cd5b;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.echec {
  background-color: RED;
  color: white;
  padding: 10px;
  width: 100%;
  height: fit-content;
}

.formCreation {

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

}
.formCreation .mission {

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

}

.formCreation div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48%;
}

.formCreation h1 {
  width: 100%;
}
.formCreation div label {
  margin-left:10px;
  margin-bottom: 5px;
  font-size: 14px;
  color :#243064;
}
.formCreation div input {
  height: 40px;
  margin-left:10px;
  margin-bottom: 5px;
  border: 1px solid #243064;
  padding:5px;
}.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}

.formCreation div select {
  height: 40px;
  margin-left:10px;
}



hr {
  width: 100%;
  background-color: black;
  height: 10px;
}

</style>
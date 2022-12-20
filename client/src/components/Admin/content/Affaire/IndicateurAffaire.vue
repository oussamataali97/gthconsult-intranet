<template>
  <div class="indicateur">
    <div class="titre">
      <h2>Gestion administrative des l’organisation de gestions</h2>
    </div>
    <div class="text">

      <span><i class="fa-regular fa-lightbulb"></i>Note :</span>
      Administrative des lorganise GTHCONSULT, concerne l’ensemble des tâches et des formalités
      administratives pour se confirme au respect des procédures de qualité, cette gestion administrative
      désigne l’ensemble des actions à mettre en œuvre pour permettre l’entreprise d’atteindre objectives
      stratégies.

    </div>

    <div class="filter">
      <label for="nom"> <i class="fa-solid fa-magnifying-glass" style="font-size: 20px;"></i> Rechercher par des années:
      </label>
      <select v-model="annee" @change="indicateur">
        <option v-for="item in years" :key="item" :value="item"> {{ item }} </option>
      </select>
    </div>

    <div class="statstique">
      <!-- janvier, fevrier, mars, avril, mai, juin, juillet, aout, septembre, october, novembre, decembre -->
      <div>

        <p v-if="currentMounths == 1" style="background-color: red;">Janvier</p>

        <p v-if="currentMounths != 1">Janvier</p>

        <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.janvier == null ? 0 : mois.janvier.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixJanvier }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, a) in mois.janvier" :key="a"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 2" style="background-color: red;">Fevrier</p>
        <p v-if="currentMounths != 2">Fevrier</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.fevrier == null ? 0 : mois.fevrier.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixFevrier }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, b) in mois.fevrier" :key="b"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 3" style="background-color: red;">Mars</p>
        <p v-if="currentMounths != 3">Mars</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.mars == null ? 0 : mois.mars.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixMars }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, c) in mois.mars" :key="c"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>


          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 4" style="background-color: red;">Avril</p>
        <p v-if="currentMounths != 4">Avril</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.avril == null ? 0 : mois.avril.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixAvril }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, d) in mois.avril" :key="d"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 5" style="background-color: red;">Mai</p>
        <p v-if="currentMounths != 5">Mai</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.mai == null ? 0 : mois.mai.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixMai }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, c) in mois.mai" :key="c"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 6" style="background-color: red;">Juin</p>
        <p v-if="currentMounths != 6">Juin</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.juin == null ? 0 : mois.juin.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixJuin }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, d) in mois.juin" :key="d"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 7" style="background-color: red;">Juillet</p>
        <p v-if="currentMounths != 7">Juillet</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.juillet == null ? 0 : mois.juillet.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixJuillet }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, e) in mois.juillet" :key="e"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>

          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 8" style="background-color: red;">Août</p>
        <p v-if="currentMounths != 8">Août</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.aout == null ? 0 : mois.aout.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixAout }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, f) in mois.aout" :key="f"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 9" style="background-color: red;">Septembre</p>
        <p v-if="currentMounths != 9">Septembre</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.septembre == null ? 0 : mois.septembre.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixSeptembre }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, j) in mois.septembre" :key="j"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 10" style="background-color: red;">Octobre</p>
        <p v-if="currentMounths != 10">Octobre</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.octobre == null ? 0 : mois.octobre.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixOctober }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, k) in mois.octobre" :key="k"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 11" style="background-color: red;">Novembre</p>
        <p v-if="currentMounths != 11">Novembre</p>
        <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.novembre == null ? 0 : mois.novembre.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixNovembre }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, l) in mois.novembre" :key="l"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

      <div>
        <p v-if="currentMounths == 12" style="background-color: red;">Décembre</p>
        <p v-if="currentMounths != 12">Décembre</p>
               <p class="detailbutton">Details <i class="fa-regular fa-eye" ></i></p>

        <p><i class="fa-solid fa-rectangle-list"></i> <span>Total d'offre:</span> {{ mois.decembre == null ? 0 : mois.decembre.length }} </p>
        <p><i class="fa-solid fa-sack-dollar"></i> <span>Total Prix :</span> {{ prix.prixDecembre }} MAD</p>
        <fieldset>
          <legend><i class="fa-solid fa-list-check"></i> Liste des Offre</legend>

          <ul >
            <li v-for="(element, m) in mois.decembre" :key="m"><i class="fa-solid fa-check"></i> {{ element.numeroAffaire }}</li>
          </ul>
        </fieldset>
      </div>

    </div>
  </div>
</template>

<script>
import Service from "../../../../Service";
export default {
  name: "indicateur",
  data() {
    return {
      currentMounths : null,
      mounths: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      years: [],
      annee: null,
      mois: {
        janvier: null,
        fevrier: null,
        mars: null,
        avril: null,
        mai: null,
        juin: null,
        juillet: null,
        aout: null,
        septembre: null,
        octobre: null,
        novembre: null,
        decembre: null
      },

      prix: {
        prixJanvier: null,
        prixFevrier: null,
        prixMars: null,
        prixAvril: null,
        prixMai: null,
        prixJuin: null,
        prixJuillet: null,
        prixAout: null,
        prixSeptembre: null,
        prixOctober: null,
        prixNovembre: null,
        prixDecembre: null
      }
    }
  },

  methods: {

    indicateur() {
      Service.IndicteurAffaire(this.annee)
        .then((result) => {
          this.mois = result.data;
          this.prix = result.data;
        })
        .catch((error) => {
          console.log(error.message)
        });
    }
  },

  created() {

    // get year anee current
    const today = new Date();
    this.selectAnnee = today.getUTCFullYear();
    this.currentMounths = today.getMonth() + 1;

    for (let i = this.selectAnnee; i >= 1970; i--) {
      this.years.push(i);
    }

    // get info Indicateur by current
    Service.IndicteurAffaire(this.selectAnnee)
      .then((result) => {
        this.mois = result.data;
        this.prix = result.data;
      })
      .catch((error) => {
        console.log(error.message)
      });
  }

}
</script>

<style scoped>


.class-1 {
  background-color: red;
}

.indicateur>.text {
  background-color: #fff27a;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
}

.text span {
  font-weight: bold;
}

.titre h2 {
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207, 31, 33, 1) 0%, rgba(24, 86, 161, 1) 100%);
  text-align: center;
  padding: 10px;
  font-size: 25px;
}


.indicateur>.filter {

  background-color: rgb(238, 238, 238);
  display: flex;
  margin: 0 10px;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}



.indicateur>.filter>select {

  padding: 10px;
  margin-left: 10px;
  border: 1px solid #bebebe;
  border-radius: 20px;
}

.indicateur>.redirect {
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
}

.indicateur>.redirect>svg {
  font-size: 40px;
  margin-right: 10px;
  color: #382092;
}

.indicateur>.statstique {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
  padding: 10px;
  margin: 0 5px 0px 5px;
  border-radius: 10px;


}

.indicateur>.statstique div {
  background-color: #f3f3f3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  min-height: 294px;
  max-height: 294px;
  transition: 0.3s ease-in;
  line-height: 40px;

}

.indicateur>.statstique div:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;

}

.indicateur>.statstique div p:nth-child(2),
p:nth-child(3),
p:nth-child(4) {
  padding: 5px;
  color:#e6272a;
  font-weight: 500;
}






legend {
  font-weight: bold;
  color: #243064;
}

.statstique div ul {
  max-height: 90px;
  overflow-y: auto;
  line-height: 30px;
}

.statstique div ul li {
  background-color: rgb(245, 245, 245);
  margin: 5px;
  padding: 0 4px;
  color:red;
  font-weight: 500;
  border-radius: 20px;
}

.indicateur>.statstique>div>p:nth-child(1) {
  font-size: 20px;
  border-bottom: 1px solid gray;
  padding: 5px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: white;
  text-align: center;
  background-color: #243064;
  font-weight: 700;
  transition: 0.3s ease-out;
}

.indicateur>.statstique>div:hover p:nth-child(1){
  background-color: #cf1f21;

}

.indicateur>.statstique div:nth-child(odd) {
  background-color: rgba(255, 255, 255, 0.74);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

div p span {
  font-weight: bold;
  color:#243064;
}





fieldset {
  border: 1px solid rgb(201, 201, 201);
  margin: 6px;

}


.fa-check {
  font-size: 10px;
}

svg {
  color: #243064;
}

.detailbutton{
  color:rgb(6, 92, 126) !important;
  text-decoration: underline;
  float: right;
  margin-right: 5px;
  transition: 0.2s;
}

.detailbutton:hover{
  color:rgb(130, 14, 197) !important;
  letter-spacing: 1px;

}

.detailbutton svg{
  color:rgb(130, 14, 197) !important;
  text-decoration: underline !important;
}

.detailbutton:hover svg{
  color:rgb(6, 92, 126) !important;
}
</style>
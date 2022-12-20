<template>
  <div class="indicateur">

    <div class="titre">
      <h2>LES INDICATEURS DES PRODUCTIONS</h2>
    </div>


    <div class="text">

<span><i class="fa-regular fa-lightbulb"></i>Note :</span>
Faisant suite aux exigences de GTHCONSULT. La gestion de la production est bossée sur les formations
        techniques en interne, maitrise des compétences sur les matières, conductions est la supervision de l’ensemble
        des inspecteurs techniques, elle sembler notamment :
        <ul>
            <li><i class="fa-regular fa-circle-check"></i> planification de production.</li>
            <li><i class="fa-regular fa-circle-check"></i> Affecter les personnes adéquates pour chaque intervention planifiée.</li>
            <li><i class="fa-regular fa-circle-check"></i> Assurée de la qualité de l’intervention, les procédures techniques de Faisant suite aux exigences de GTHCONSULT.</li>
            <li><i class="fa-regular fa-circle-check"></i> Éditions des rapports de vérification suivons exigées par GTHCONSULT.</li>
            <li><i class="fa-regular fa-circle-check"></i> Contrôle de la production suit les instructions validées par GTHCONSULT.</li>
            <li><i class="fa-regular fa-circle-check"></i> Envoi des rapports de vérification.</li>
        </ul>

</div>



      <div class="filter">
            <label for="nom">Rechercher par des années: </label>
            <select v-model="annee" @change="indicateur">
                <option v-for="item in years" :key="item" :value="item" > {{ item }} </option>
            </select>
      </div>



      <div class="statstique">
        <div>
          <p>Janvier</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcJanvier }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionJanvier }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseJanvier }}</p>
        </div>

        <div>
          <p>Février</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcFevrier }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionFevrier }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseFevrier }}</p>
        </div>

        <div>
          <p>Mars</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcMars }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionMars }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseMars }}</p>
        </div>

        <div>
          <p>Avril</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcAvril }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionAvril }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseAvril }}</p>
        </div>

        <div>
          <p>Mai</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcMai }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionMai }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseMai }}</p>
        </div>

        <div>
          <p>Juin</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcJuin }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionJuin }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseJuin }}</p>
        </div>

        <div>
          <p>Juillet</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcJuillet }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionJuillet }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseJuillet }}</p>
        </div>

        <div>
          <p>Août</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcAout }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionAout }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseAout }}</p>
        </div>

        <div>
          <p>Septembre</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcSeptembre }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionSeptembre }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseSeptembre }}</p>
        </div>

        <div>
          <p>Octobre</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcOctober }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionOctober }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseOctober }}</p>
        </div>

        <div>
          <p>Novembre</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcNovembre }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionNovembre }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseNovembre }}</p>
        </div>

        <div>
          <p>Décembre</p>
          <p><span><i class="fa-solid fa-spinner"></i> En attente:</span> {{ production.bcDecembre }} </p>
          <p><span><i class="fa-solid fa-hourglass-half"></i> En cours:</span> {{ production.interventionDecembre }}</p>
          <p><span><i class="fa-solid fa-list-check"></i> Réalisé:</span> {{ production.realiseDecembre }}</p>
        </div>

      </div>
  </div>
</template>

<script>
import Service from "../../../../Service";
export default {
  name : "indicateur",
  data() {
    return {
        mounths : ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
        years : [],
        annee : null,
        production : {
           bcJanvier : null,
           bcFevrier : null,
           bcMars : null,
           bcAvril : null,
           bcMai : null,
           bcJuin : null,
           bcJuillet : null,
           bcAout : null,
           bcSeptembre : null,
           bcOctober : null,
           bcNovembre : null,
           bcDecembre : null,
           interventionJanvier : null,
           interventionFevrier : null,
           interventionMars : null,
           interventionAvril : null,
           interventionMai : null,
           interventionJuin : null,
           interventionJuillet : null,
           interventionAout : null,
           interventionSeptembre : null,
           interventionOctober : null,
           interventionNovembre : null,
           interventionDecembre : null,
           realiseJanvier : null,
           realiseFevrier : null,
           realiseMars : null,
           realiseAvril : null,
           realiseMai : null,
           realiseJuin : null,
           realiseJuillet : null,
           realiseAout : null,
           realiseSeptembre : null,
           realiseOctober : null,
           realiseNovembre : null,
           realiseDecembre : null
        }
    }
  },

  methods : {

      indicateur() {
        Service.IndicteurProduction(this.annee)
          .then((result) => {
            this.production = result.data;
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

      for(let i = this.selectAnnee; i >= 1970 ; i--) {
            this.years.push(i);
      }

      // get info Indicateur by current
      Service.IndicteurProduction(this.selectAnnee)
      .then((result) => {
            this.production = result.data;
      })
      .catch((error) => {
          console.log(error.message)
      });
  }

}
</script>

<style scoped>
.indicateur {
  width: 100%;
  display: flex;
  flex-direction: column;
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

  transition: 0.3s ease-in;
  line-height: 30px;

}

.indicateur>.statstique div:hover {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  cursor: pointer;

}

.indicateur>.statstique div p:nth-child(2),
p:nth-child(3),
p:nth-child(4),
p:nth-child(5) {
  padding: 5px;
  color:#e6272a;
  font-weight: 500;
}






legend {
  font-weight: bold;
  color: #243064;
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








.fa-check {
  font-size: 10px;
}

svg {
  color: #243064;
}

.text ul svg {
  color:rgb(231, 17, 17);
  font-size: 12px;
}


</style>
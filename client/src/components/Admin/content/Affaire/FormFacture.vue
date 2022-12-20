<template>
  <div class="all" style="width:100%;">
    <hr>
    <div class="form" v-if="flagMession">
        <div>
            <label for="List des missions">List des missions</label>

            <select v-model="mission.typeMission" @change="selectMission($event)">

              <optgroup label="Installations électriques">
                <option v-for="mission in ArrayTypeMissionIE" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Appareil et accessoires levage">
                <option v-for="mission in ArrayTypeMissionAAL" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>


              <optgroup label="Installation d’ascenseur">
                <option v-for="mission in ArrayTypeMissionID" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Dispositif incendie">
                <option v-for="mission in ArrayTypeMissionDI" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Appareils à pression de gaz et vapeur">
                <option v-for="mission in ArrayTypeMissionAPGV" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Contrôle machines et engins de chantiers">
                <option v-for="mission in ArrayTypeMissionCMEC" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Contrôles risques au travail">
                <option v-for="mission in ArrayTypeMissionCRT" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Environnement">
                <option v-for="mission in ArrayTypeMissionENV" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup> -->

              <optgroup label="Formations réglementaires">
                <option v-for="mission in ArrayTypeMissionI" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>

              <optgroup label="Formations réglementaires">
                <option v-for="mission in ArrayTypeMissionE" :key="mission.name" :value="mission.prev+'_'+mission.type+'_'+mission.name+'_'+mission.categorie"> {{ mission.name }}</option>
              </optgroup>
              <option value="Autre"> Autre </option>
            </select>
        </div>

        <div>
            <label for="Code Mission">Code Mission</label>
            <input type="text" v-model="mission.codeMission" :disabled ="flagDisabledCodeMission" >
        </div>

        <div v-if="flagAutreMission == true">
            <label for="Code Mission">Auter Type de mission</label>
            <input type="text" v-model="mission.autreMission">
        </div>

        <div v-if="flagAutreMission == true">
            <label for="Numero D' affaire">    </label>
            <input type="hidden" v-model="mission.numAffaire" >
        </div>

        <div>
          <label for="Prix">Prix U. HT</label>
          <input type="text" v-model="mission.prix">
        </div>

        <div>
          <label for="Devis">Devis</label>
            <select v-model="mission.devis">
                <option v-for="devis in ArrayDevis" :key="devis.code" :value="devis.code"> {{ devis.name }}</option>
            </select>
        </div>

        <div class="equipement" v-for="eq in countEquipement" :key="eq - 1">

            <div style="width: 80%;">
              <label for="équipement">équipement</label>
              <input type="text" v-model="mission.equipement[eq - 1]" :disabled ="flagDisabledEquipement">
            </div>

            <div style="width:20%">
              <label for="Quantité">Quantité</label>
              <input type="text" v-model="mission.qte[eq - 1]" :disabled ="flagDisabledQuantite">
            </div>

        </div>



        <h4>Equipement Details :</h4>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div style="width :30%;">
          <label for="valider"> Valider équipement </label>
          <button class="valider"  @click="valideEquipement()"><i class="fa-solid fa-check "></i> Valider</button>
        </div>

        <div style="width :30%;">
          <label for="Annuler">Annuler équipement</label>
          <button class="annuler"  @click="annulerEquipement()"><i class="fa-solid fa-xmark"></i>  Annuler</button>
        </div>

        <div style="width :30%;">
          <label for="Ajouter">Ajouter équipement</label>
          <button class="ajouter" @click="ajouteEquipement()"><i class="fa-solid fa-plus"></i> Ajouter</button>
        </div>


        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" v-model="interlocuteurId">
        </div>

        <div>
          <label for="clientId"></label>
          <input type="hidden" v-model="clientId">
        </div>
        <h4>Missions Details :</h4>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div>
          <label for="interlocuteurId"></label>
          <input type="hidden" >
        </div>
        <div style="width :30%;">
          <label for="valider">Cliquer Pour Valider Cette Mission</label>
          <button class="valider"  @click="valideMission()"><i class="fa-solid fa-circle-check"></i> Valider</button>

        </div>

        <div style="width :30%;">
          <label for="Annuler">Cliquer Pour Annuler Cette mission</label>
          <button class="annuler"  @click="$emit('annuleFacture')"><i class="fa-solid fa-circle-xmark"></i>  Annuler</button>

        </div>

        <div style="width :30%;">
          <label for="Ajouter">Cliquer Pour Ajouter Une autre Mission</label>
          <button class="ajouter" @click="$emit('ajouteFacture')"><i class="fa-solid fa-circle-plus"></i> Ajouter</button>
        </div>


    </div>

    <div class="form" v-if="flagMession == false">
        <div style="width :30%;">
          <label for="Aperçu">Cliquez Pour Aperçevoir Cette Mission</label>
          <button @click="apercu(missionId)" class="apercue"><i class="fa-solid fa-eye"></i> Aperçevoir La Mission</button>
        </div>

    </div>

  </div>
</template>

<script>
import Service from "../../../../Service";
export default {

    props: {
      interlocuteurId: String,
      clientId: String,
      numAffaire : String,
      count: Number,
    },

      data() {

        return {
            countRapport : null,
            file : null,
            countMission : 0,
            countEquipement : 1,
            countQuantiteEquipement : 1,
            missionId : null,
            flagMession : true,
            flagDisabledCodeMission : true,
            flagAutreMission: false,
            mission: {
                  typeMission : null,
                  typeRapport : null,
                  categorie : null,
                  codeMission: null,
                  equipement: [],
                  qte : [],
                  prix : null,
                  devis:null,
                  autreMission: null,
                  numAffaire: null,

            },
            flagDisabledQuantite : false,
            flagDisabledEquipement : false,
            arrayMission: [],

            ArrayTypeMissionIE : [

                  { prev : "CRI-ELEC" , name : "Contrôle réglementaire initial d’installation électrique", type	 : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CRP-ELEC" , name : "Contrôle réglementaire périodique d’installation électrique",type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CLR-ELEC" , name : "Contrôle de levée des réserves suite contrôle d’installation électrique", type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CTH-ELEC" , name : "Contrôle installation électrique par thermographie infrarouge sans Q19",type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CTHQ19-ELEC" , name : "Contrôle installation électrique par thermographie infrarouge avec Q19", type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CAR-ELEC" , name : "Contrôle installation électrique par analyseur de réseau", type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "DIAG-ELEC" , name : "Diagnostique d’une installation électrique",type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "AST-ELEC" , name : "Assistance technique installation électrique",type : "Contrôle des installations électriques"  ,categorie : "Contrôle réglementations installations techniques" }

                ],

            ArrayTypeMissionAAL : [

                  { prev : "CMRS-LEV" , name : "Contrôle réglementaire de mise en service d’appareils et accessoires de levage", type : "Contrôle des accessoires et appareils de levage"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CRP-LEV" , name : "Contrôle réglementaire périodique d’appareils et accessoires de levage", type : "Contrôle des accessoires et appareils de levage"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CLR-LEV" , name : "Contrôle de levée des réserves suite contrôle d’appareils et accessoires de levage", type : "Contrôle des accessoires et appareils de levage"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "DIAG-LEV" , name : "Diagnostique levage", type : "Contrôle des accessoires et appareils de levage"  ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "AST-LEV" , name : "Assistance technique levage", type : "Contrôle des accessoires et appareils de levage"  ,categorie : "Contrôle réglementations installations techniques" }

                ],

            ArrayTypeMissionID : [

               { prev : "CDT-ASC" , name : "Contrôle du dossier technique d’une installation d’ascenseur ou monte-charge accompagné",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },
               { prev : "STI-ASC" , name : "Suivi des travaux d’installation d’une installation d’ascenseur ou monte-charge accompagné",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },
               { prev : "CMRS-ASC" , name : "Contrôle réglementaire de mise en service d’une installation d’ascenseur ou monte-charge accompagné",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },
               { prev : "CRP-ASC" , name : "Contrôle réglementaire périodique d’une installation d’ascenseurs ou monte-charge accompagné",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },
               { prev : "DIAG-ASC" , name : "Diagnostique ascenseur",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },
               { prev : "AST-ASC" , name : "Assistance technique ascenseur",type : "Contrôle installations ascenseurs"  ,categorie : "Contrôle réglementations installations techniques" },

              ],

            ArrayTypeMissionDI : [

                  { prev : "CTSSI-INC" , name : "Contrôle triennale SSI" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CPSSI-INC" , name : "Contrôle périodique SSI" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CDEF-INC" , name : "Contrôle du système de désenfumage" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CMSS-INC" , name : "Contrôle des moyens de secours simples" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CGC-INC" , name : "Contrôle des appareils de cuisson et de remise en températures" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "AUD-INC" , name : "Audit de mise ou remise en conformité réglementaire des dispositifs incendie" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "DIAG-INC" , name : "Diagnostique dispositif incendie" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "AST-INC" , name : "Assistance technique dispositif incendie" ,type : "Contrôle dispositif incendie" ,categorie : "Contrôle réglementations installations techniques" },

                ],

            ArrayTypeMissionAPGV : [

                  { prev : "CMS-PRS" , name : "Contrôle de qualification / requalification" ,type : "Contrôle appareil à pression" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CVE-PRS" , name : "Visite extérieur" ,type : "Contrôle appareil à pression" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CVI-PRE" , name : "Visite intérieur" ,type : "Contrôle appareil à pression" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "DIAG-PRS" , name : "Diagnostique ascenseur" ,type : "Contrôle appareil à pression" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "AST-PRS" , name : "Assistance technique ascenseur" ,type : "Contrôle appareil à pression" ,categorie : "Contrôle réglementations installations techniques" }

                ],

            ArrayTypeMissionCMEC : [

                  { prev : "CRP-MAC" , name : "Contrôle périodique réglementaire trimestriel machine" ,type : "Contrôle machines" ,categorie : "Contrôle réglementations installations techniques" },
                  { prev : "CRP-ENG" , name : "Contrôle périodique réglementaire annuel engins de chantier" ,type : "Contrôle machines" ,categorie : "Contrôle réglementations installations techniques" },

                ],

            ArrayTypeMissionCRT : [

                  { prev : "CDA-BRUIT" , name : "Contrôle des doses de bruits absorbées par les travailleurs par dosimétrie" , type : "Mesures des taux de bruit absorbés" ,categorie : "Contrôle des risques travailleur" },
                  { prev : "CDT-CRUIT" , name : "Contrôle des doses de bruits absorbées par les travailleurs role de travail" , type : "Mesures des taux de bruit absorbés" ,categorie : "Contrôle des risques travailleur" },
                  { prev : "ECG-BRUIT" , name : "Elaboration de la cartographie bruit" ,type : "la cartographie bruit" ,categorie : "Contrôle des risques travailleur" },
                  { prev : "MTE-ECRM" , name : "Mesures des taux d’éclairement au poste du travail" , type : "Mesures des taux de bruit absorbés" , categorie : "Contrôle des risques travailleur" },
                  { prev : "MQA-AIR" , name : "Mesure de la qualité de l’air intérieur" , type : "Contrôle de la qualité de l'air" , categorie : "Contrôle des risques travailleur" },
                  { prev : "POT-EAU" , name : "Analyse de la potabilité de l’eau" , type : "Contrôle de la probabilité de l'eau" , categorie : "Contrôle des risques travailleur" },
                  { prev : "LEG-EAU" , name : "Analyse des légionnelles" , type : "Recherche de la legionella" , categorie : "Contrôle des risques travailleur" },

                ],

            ArrayTypeMissionENV : [

                  { prev : "ARL-ENVIR" , name : "Analyse des rejets liquides" ,type : "Rejets liquides" ,categorie : "Contrôle environnementaux" },
                  { prev : "ARG-ENVIR" , name : "Analyse des rejets atmosphérique" ,type : "Rejets atmosphérique" ,categorie : "Contrôle environnementaux" },
                  { prev : "MNS-ENVIR" , name : "Mesures se la nuisance sonore" ,type : "Rejets atmosphérique" ,categorie : "Contrôle environnementaux" }

                ],

            ArrayTypeMissionI : [

                  { prev : "INC-EVAC" , name : "Evacuation: guide-files et serre-files" ,type : "Autres" ,categorie : "Formation reglementaires" },
                  { prev : "INC-EPI" , name : "Equipier Première Intervention" ,type : "Autres" ,categorie : "Formation reglementaires" },
                  { prev : "INC-ESI" , name : "Equipier Seconde Intervention" ,type : "Autres" ,categorie : "Formation reglementaires" },
                  { prev : "INC-SST" , name : "Sauveteur Secouriste du Travail" ,type : "SST" ,categorie : "Formation reglementaires" },
                  { prev : "INC-PF" , name : "Permis feu" ,type : "Incendie" ,categorie : "Formation reglementaires" },
                  { prev : "INC-SSI1" , name : "Exploitation d’un Système de Sécurité Incendie" ,type : "Incendie" ,categorie : "Formation reglementaires" },

                ],

            ArrayTypeMissionE : [

              { prev : "HAB-001" , name : "Préparation à l’habilitation électrique, personnel non électricien ind. B0-H0-H0V" ,type : "HE" ,categorie : "Formation reglementaires" },
              { prev : "HAB-002" , name : "Préparation à l’habilitation électrique, personnel non électricien ind B0-H0-H0V" ,type : "HE" ,categorie : "Formation reglementaires" },
              { prev : "HAB-003" , name : "Préparation à l’habilitation électrique, personnel électricien Basse tension" ,type : "HE" ,categorie : "Formation reglementaires" },
              { prev : "HAB-004" , name : "Préparation à l’habilitation électrique, personnel électricien Basse et/ou haute tension (HTA)" ,type : "HE" ,categorie : "Formation reglementaires" },
              { prev : "HAB-005" , name : "Préparation à l’habilitation électrique, personnel effectuant des verifications, des mesurages, des manoeuvres es basse et/ou haute tesnsion - Ind. BE-HE verification, mesurage et manoeuvre" ,type : "HE" ,categorie : "Formation reglementaires" },
              { prev : "HAB-006" , name : "Recyclage" , type : "HE" ,categorie : "Formation reglementaires" }

                ],

          ArrayDevis : [

            {"name":"Moroccan Dirham","code":"MAD"},
            {"name":"Euro","code":"EUR"},
            {"name":"US Dollar","code":"USD"}

        ],
        };

  },
    methods : {

      valideEquipement() {

        this.flagDisabledQuantite = !this.flagDisabledQuantite;
        this.flagDisabledEquipement = !this.flagDisabledEquipement;

        const resultQte = this.mission.qte.filter(element => {
               return element !== null;
        });
        this.mission.qte = [];
        this.mission.qte = resultQte;

        const resultEquipement = this.mission.equipement.filter(element => {
               return element !== null;
        });
        this.mission.equipement = [];
        this.mission.equipement = resultEquipement;


      },

      ajouteEquipement() {

            this.countEquipement++ ;
            this.countQuantiteEquipement++ ;
            this.mission.equipement.push(null);
            this.mission.qte.push(null);
      },

      annulerEquipement() {

        if(this.countEquipement != 1 || this.countEquipement > 1) {

            this.countEquipement-- ;
            this.countQuantiteEquipement-- ;
            const coundDelete = this.mission.qte.length;
            this.mission.equipement.splice(coundDelete, 1);
            this.mission.qte.splice(coundDelete, 1);
        }

      },

      selectMission(event) {

        const allvalue = event.target.value.split("_", 4);

        if(allvalue[0] == "Autre")
        {
          this.flagAutreMission = true
          this.flagDisabledCodeMission = false
          this.mission.typeMission = null
          this.mission.codeMission = null

        } else {

          this.flagAutreMission = false
          this.flagDisabledCodeMission = true
          this.mission.codeMission = allvalue[0];
          this.mission.typeMission = allvalue[2],
          this.mission.typeRapport = allvalue[1],
          this.mission.categorie = allvalue[3]

        }




      },

      valideMission() {

        // // var for get titre type mission
        // var titreMission
        // // condition titre simple or autre
        // if(this.mission.autreMission == null)
        // {
        //     const a = this.mission.typeMission.split("_",2, 1);
        //     titreMission = a[1];
        // } else {
        //     titreMission = this.mission.autreMission;
        // }
        // // aassign titre type mission
        // const titre = titreMission;
        // create object info mission
        const obj = {

                   typeMission: this.mission.typeMission,
                   codeMission : this.mission.codeMission,
                   equipement : this.mission.equipement,
                   qte : this.mission.qte,
                   prix : this.mission.prix,
                   devis : this.mission.devis,
                   interlocuteurId : this.interlocuteurId,
                   clientId : this.clientId,
                   numeroAffaire : this.mission.numAffaire,
                   status : "invalid",
                   statusWithAffaire : false,
                   typeRapport :  this.mission.typeRapport,
                   categorie : this.mission.categorie
          };



        this.arrayMission.push(obj);

        Service.createMission(this.arrayMission)
        .then((result) => {
            // hiddden form mission
            this.flagMession = false;
            this.missionId = result.data.data._id;
            // var pointeur for delete mission and decrementer ref rapport OK
            this.countRapport = result.data.data.qte.reduce(function(a, b){
                return parseInt(a) + parseInt(b);
              }, 0);
            // emit
            this.$emit('addCheckedMission', true)

        })
        .catch((err) => {
            console.log(err)
        });

      },

      apercu(missionId) {

      Service.deleteMission(missionId, this.countRapport)
        .then(() => {
            // not hidden form mission
            this.flagMession= true
            this.$emit('deleteCheckedMission', true)

        })
        .catch((err) => {
            console.log(err)
        });

      }



    },
    created() {
      this.mission.numAffaire = this.numAffaire

      // set Data in arra quantite and equipment for
        this.mission.equipement[0] = null;
        this.mission.qte[0] = null;
    }

}


</script>

<style scoped>

.form {
  padding:10px 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

}

.form div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 48%;
}


.formCreation div label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color :#494949;
}
.formCreation div input {
  height: 40px;
  margin-bottom: 5px;
  border: 1px solid #243064;
  padding:5px;
}.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}

.formCreation div input:focus-within {
  outline: 1px solid #cf1f21 ;
  border:0;

}


.formCreation div select {
  height: 40px;
}

hr {
  width: 100%;
  background-color: rgb(190, 190, 190);
  height: 5px;
  margin:10px 0;
}

.ajouter {
  background-color: rgb(160, 15, 189);
  color: white;
  border: 0 !important;
  padding:15px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}

.ajouter:hover{
  background-color: rgb(113, 13, 133);
  border-radius: 30px;
  letter-spacing: 2px;
}

.valider{
  background-color: rgb(33, 146, 33);
  color: white;
  border: 0 !important;
  cursor: pointer;
  padding:15px;
  transition: 0.3s;

  font-size: 16px;

}
.annuler {
  background-color: rgb(184, 0, 0);
  color: white;
  border: 0 !important;
  padding:15px;
  transition: 0.3s;
  font-size: 16px;
  cursor: pointer;
}

.annuler:hover{
  background-color: rgb(110, 13, 13);
  border-radius: 30px;
  letter-spacing: 2px;

}

.valider:hover{
  background-color: rgb(17, 94, 17);
  border-radius: 30px;
  letter-spacing: 2px;

}
.apercue {
  background-color: rgb(18, 114, 240);
  color: rgb(255, 255, 255);
  width: 100%;
  border: 0px !important;
  outline: 0px;
  cursor: pointer;
  padding:15px;
  transition: 0.4s;
}

.apercue:hover{
  background-color: rgb(2, 74, 87);
  letter-spacing: 2px;

}
.enregistrer {

  background-color: green;
  color: white;
  border: 0px;
  outline: 0px;
  cursor: pointer;
}

#app > div > div > div.menu-content > div.content > div > div:nth-child(7) > div.all > div > div.equipement {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

}
h4{
  background-color: rgb(75, 75, 75);
  color:rgb(255, 255, 255);
  padding:5px 10px;

  margin: 5px;
  width: 30%;
}

#app > div > div > div.menu-content > div.content > div > div:nth-child(7) > div.all > div > div.equipement > div:nth-child(1) {
  width: 60%;
  padding: 0;
  margin: 0;
  margin-right: 10px;
}
#app > div > div > div.menu-content > div.content > div > div:nth-child(7) > div.all > div > div.equipement > div:nth-child(1) > input[type=text] {
  width: 100%;
}

#app > div > div > div.menu-content > div.content > div > div:nth-child(7) > div.all > div > div.equipement > div:nth-child(2) {
  width: 10%;
  padding: 0;
  margin: 0;
}
#app > div > div > div.menu-content > div.content > div > div:nth-child(7) > div.all > div > div.equipement > div:nth-child(2) > input[type=text] {
  width: 50%;
}

input[type=submit]:hover{
background-color: #ffdf29;
}

input[type=submit]{
font-size: 18px;
text-transform: capitalize;
}
</style>
<template>
  <div class="indicateur">
<!-- Start etap Action Rapport -->
       <div class="actionRapport">
             <div class="diviser">
                   <input type="submit" value="Étape 1 - Import des rapport" @click="importRapports()">
                   <i class="fa-solid fa-forward-step"></i>
             </div>

             <div class="diviser">
                   <input type="submit" value="Étape 2 - Classfication Affaire" @click="classfication()">
                   <i class="fa-solid fa-forward-step"></i>

             </div>

             <div class="diviser">
                   <input type="submit" value="Étape 3 - classe par Rapport" @click="classficationRapport()">

             </div>

             <div class="diviser">
                   <input type="submit" value="Étape 4 - classe Shema" @click="classficationShema()">
                   <i class="fa-solid fa-forward-step"></i>

             </div>

             <div class="diviser">
                   <input type="submit" value="Étape 5 - Envoyer des rapport" @click="envoyerRapports()">
                   <i class="fa-solid fa-forward-step"></i>

             </div>

             <div class="diviser">
                   <input type="submit" value="Étape 6 - Terminer des rapport" @click="accepterRapport()">
             </div>
       </div>
<!-- End etap action rapport         -->


<!-- Start  Import Rapport   -->
       <div class="listMission" v-if="importRapport">

         <p> <i class="fa-solid fa-circle-exclamation"></i>Attention lors de la saisie des rapports, vous devez prendre en compte l'ordre "Référence de rapport" de chaque rapport séparément</p>
         <h5 style="text-align:center;font-size:24px;color:#cf1f21;text-transform:uppercase;font-weight: 700;">  Étape 1 - Import des rapport</h5>
         <table v-for="(mission, j) in filterMissions" :key="mission._id" class="table table-bordered table-hover">

           <thead>
             <tr>
               <th colspan="100">  {{ mission.typeMission }} </th>
             </tr>
           </thead>

           <tbody>

             <tr>
               <td>Equipement :</td>
               <td v-for="(eq, i) in mission.equipement" :key="i">
                   {{ eq.titre }}
               </td>
             </tr>

             <tr>
               <td>Quantité :</td>
               <td v-for="(eq, i) in mission.qte" :key="i">
                 <ul>
                   <li>{{ eq }}</li>
                   <li><button type="submit" @click="addQuantite(j, i)"><i class="fa-solid fa-plus"></i> Ajouter</button></li>
                 </ul>
               </td>
             </tr>

             <tr>
               <td>References Rapports :</td>
               <td class="equipementpage" v-for="(eq, i) in mission.equipement" :key="i">
                 <ul v-for="(item, index) in eq.refRapport" :key="item">
                   <li>
                     <label></label>
                     <input type="hidden" v-model="mission.typeMission" :key="index" disabled>
                   </li>

                   <li>
                     <label>Type Rapport :</label>
                     <input type="text" v-model="mission.typeRapport" :key="index" disabled>
                   </li>

                   <li>
                     <label> Catégorie</label>
                     <input type="text" v-model="mission.categorie" :key="index" disabled>
                   </li>

                   <li>
                     <label></label>
                     <input type="hidden" v-model="clientId" :key="index" disabled>
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label>Reference Rapport :</label>
                     <input type="text" v-model="eq.refRapport[index]" disabled>
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label>Désignation :</label>
                     <input type="text" @input="event => designation = event.target.value">
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label>Date Production Contrôle :</label>
                     <input type="date" @input="event => dateProductionControle = event.target.value">
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label>Date d'intervention :</label>
                     <input type="date" @input="event => dateIntervention = event.target.value">
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label for="cars">Responsable Client</label>
                     <input type="text" @input="event => responsableClient = event.target.value">
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <label>Rapport file :</label>
                     <input type="file" class="form-control" multiple="multiple" placeholder="Fichier PDF" ref="file" @change="onFileChange($event, i)">
                   </li>

                   <li v-if="!eq.sendRapport[index]">
                     <input type="button" value="Valider" @click="saveRapport(eq.refRapport[index], mission.typeMission, i, j, index, mission._id, mission.typeRapport, mission.categorie)">
                   </li>

                   <li class="modifier" v-if="eq.sendRapport[index]">
                     <input type="text" v-model="eq.refRapport[index]" disabled>
                     <input type="button" class="supprTab" value="Supprimer" @click="modifier(eq.refRapport[index], mission._id, mission.numeroAffaire, i, j, index)">
                   </li>


                 </ul>
               </td>
             </tr>

           </tbody>

         </table>


       </div>

       <!-- End Import Rapport -->

<!-- Start Classment Rapport -->
       <div class="classificationMission" v-if="classementRapport">
         <h5 style="text-align:center;font-size:24px;color:#cf1f21;text-transform:uppercase;font-weight: 700;">Étape 2 - Classfication Affaire</h5>

         <p v-if="buttonClassficationAffaire == false"> Vous Pouvez sisair un classfication a cet affaire<input type="button" class="btn-clasification" value="Oui" @click="handelClassficationOne"></p>
         <p> {{ message }}</p>


         <!-- Start One -->
         <div v-if="classficationAffaire">
               <p>Première classe - 1</p>
               <div v-for="itemOne in niveauOne" :key="itemOne.count">
                   <input type="text" v-model="itemOne.titre" :disabled = itemOne.disabled>
               </div>
               <br>
             <input type="button" value="add" v-if="niveauOne[0].disabled == false" @click="addNiveauOne()">
             <input type="button" value="save" v-if="niveauOne[0].disabled == false" @click="saveNiveauOne()">
             <input type="button" class="deletebtn" value="delete" v-if="niveauOne[0].disabled == true" @click="deleteNiveauOne()">
         </div>



         <!-- End One -->


         <!-- Start Tow -->
         <div v-if="classficationAffaire">
             <p>Deuxième classe - 2</p>
             <div v-for="itemTow in niveauTow" :key="itemTow.count">
                 <input type="text" v-model="itemTow.titre" :disabled = itemTow.disabled>
             </div>
           <input type="button" value="add" v-if="niveauTow[0].disabled == false" @click="addNiveauTow()">
           <input type="button" value="save" v-if="niveauTow[0].disabled == false" @click="saveNiveauTow()">
           <input type="button" class="deletebtn" value="delete" v-if="niveauTow[0].disabled == true" @click="deleteNiveauTow()">
         </div><br>

         <!-- End Tow -->


         <!-- Start Tree -->
         <div v-if="classficationAffaire">
           <p>Troisième classe - 3</p>
           <div v-for="itemTree in niveauTree" :key="itemTree.count">
               <input type="text" v-model="itemTree.titre" :disabled = itemTree.disabled>
           </div>
           <input type="button" value="add" v-if="niveauTree[0].disabled == false" @click="addNiveauTree()">
           <input type="button" value="save" v-if="niveauTree[0].disabled == false" @click="saveNiveauTree()">
           <input type="button" class="deletebtn" value="delete" v-if="niveauTree[0].disabled == true" @click="deleteNiveauTree()">
         </div><br>
         <!-- End Tree -->

         <!-- Start Four -->
         <div v-if="classficationAffaire">
           <p>Troisième classe - 4</p>
           <div v-for="itemFour in niveauFour" :key="itemFour.count">
               <input type="text" v-model="itemFour.titre" :disabled = itemFour.disabled>
           </div>
           <input type="button" value="add" v-if="niveauFour[0].disabled == false" @click="addNiveauFour()">
           <input type="button" value="save" v-if="niveauFour[0].disabled == false" @click="saveNiveauFour()">
           <input type="button" class="deletebtn" value="delete" v-if="niveauFour[0].disabled == true" @click="deleteNiveauFour()">
         </div><br>
         <!-- End Four -->

         <!-- Start Five -->
         <div v-if="classficationAffaire">
           <p>Troisième classe - 5


           </p>
           <div v-for="itemFive in niveauFive" :key="itemFive.count">
               <input type="text" v-model="itemFive.titre" :disabled = itemFive.disabled>
           </div>
           <input type="button" value="add" v-if="niveauFive[0].disabled == false" @click="addNiveauFive()">
           <input type="button" value="save" v-if="niveauFive[0].disabled == false" @click="saveNiveauFive()">
           <input type="button" class="deletebtn" value="delete" v-if="niveauFive[0].disabled == true" @click="deleteNiveauFive()">
         </div><br>
         <!-- End Five -->

         <!-- Start Input Enregistre classfication -->
         <input type="button" class="terminerbtn" value="Enregistrer et terminer" v-if="classficationAffaire && buttonClassficationAffaire == false" @click="enregistrerClassAffaire()">
         <!-- End Input Enregistre classfication -->

         <!-- Start Input delete classfication -->
         <input type="button" class="effacebtn" value="Effacer" v-if="buttonClassficationAffaire == true" @click="effacerClassAffaire()">
         <!-- End Input delete classfication -->
       </div>
         <!-- End  Classment Rapporrts -->

         <!-- Start  List Rapports -->
         <h5 v-if="classficationRapports" style="text-align:center;margin-top: 10px;font-size:24px;color:#cf1f21;text-transform:uppercase;font-weight: 700;">Étape 3 - classe par Rapport</h5>

         <div v-if="classficationRapports" class="classRaport">

           <ul v-for="(rapport, index) in filterRapports" :key="rapport._id">
             <li>
               <label for="">Rapport {{ rapport.disabled }}</label>
               <input type="text" :value="rapport.referenceRapport" disabled>

               <label for="">Class - 1</label>
               <select v-model="rapport.niveauUn" :disabled = rapport.disabled>
                 <option v-for="niveau in niveauOne" :key="niveau.count" >{{ niveau.titre }}</option>
                </select>

                <label for=""> Class - 2</label>
               <select v-model="rapport.niveauDeux" :disabled = rapport.disabled>
                 <option v-for="niveau in niveauTow" :key="niveau.count" >{{ niveau.titre }}</option>
                </select>

               <label for=""> Class - 3</label>
               <select v-model="rapport.niveauTrois" :disabled = rapport.disabled>
                 <option v-for="niveau in niveauTree" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>

               <label for=""> Class - 4</label>
               <select v-model="rapport.niveauQuatre" :disabled = rapport.disabled>
                 <option v-for="niveau in niveauFour" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>

               <label for=""> Class - 5</label>
               <select v-model="rapport.niveauCinq" :disabled = rapport.disabled>
                 <option v-for="niveau in niveauFive" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>

                <input v-if="rapport.disabled == false" type="button" class="saveclassement" value="Enregistrer" @click="enregistrerClassRapport(rapport._id, rapport.niveauUn, rapport.niveauDeux, rapport.niveauTrois, rapport.niveauQuatre, rapport.niveauCinq, index)">
                <input v-if="rapport.disabled == true" type="button" class="deleteclassement"    value="Supprimer" @click="deleteClassRapport(rapport._id, index)">
             </li>
           </ul>
         </div>
         <!-- Start  List Rapports -->


       <!-- Start Classfication Shema -->
       <h5 v-if="flagClassficationShema" style="text-align:center;margin:10px 0;font-size:24px;color:#cf1f21;text-transform:uppercase;font-weight: 700;">Étape 4 - classe Shema</h5>

       <div v-if="flagClassficationShema" class="shemaclassification">
         <ul v-for="(item, index) in schemaClass" :key="item._id">
           <li>
               <select v-model="item.niveauOne" :disabled = item.disabled>
                 <option v-for="niveau in niveauOne" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>
               <select v-model="item.niveauTow" :disabled = item.disabled>
                 <option v-for="niveau in niveauTow" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>
               <select v-model="item.niveauTree" :disabled = item.disabled>
                 <option v-for="niveau in niveauTree" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>

               <select v-model="item.niveauFour" :disabled = item.disabled>
                 <option v-for="niveau in niveauFour" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>

               <select v-model="item.niveauFive" :disabled = item.disabled>
                 <option v-for="niveau in niveauFive" :key="niveau.count" >{{ niveau.titre }}</option>
               </select>
               <button v-if="item.disabled == false" type="button" class="saveclasifica" value="Enregistrer" @click="enregistrerClassShema(item.niveauOne, item.niveauTow, item.niveauTree, item.niveauFour, item.niveauFive, index)"><i class="fa-solid fa-download"></i> Enregister</button>

               <button v-if="item.disabled == true" type="button" class="deleteclasifica" value="Supprimer" @click="deleteClassShema(index)"><i class="fa-solid fa-trash"></i> Supprimer</button>

           </li>
         </ul>
         <button @click="ajouterShema()" class="addshcemabtn"><i class="fa-regular fa-square-plus"></i> Ajouter Un Schema</button>

       </div>
       <!-- End Classfication Shema  -->

       <!-- Start Envoye Rapport -->

       <div v-if="envoyerRapport" class="evoiedesrapports">
         <h5 style="text-align:center;margin:10px 0;font-size:24px;color:#cf1f21;text-transform:uppercase;font-weight: 700;">Étape 5 - Envoyer des rapport</h5>

         <div class="list-destinataire">
           <ul>
             <h4><i class="fa-solid fa-envelope"></i> Sélectionnez le destinataire par Email</h4>
             <li v-for="item in interlocuteurs" :key="item.email">

               <input type="checkbox" :value="item.email" v-model="checkedInterlocuteur"> {{ item.nom+" "+item.prenom }}
             </li>
           </ul>
         </div>
         <div>
           <div class="list-rapports">
             <h4><i class="fa-regular fa-paste"></i> Selectionnez Les rapports que vous souhaitez envoyer puis Cliquez sur valider</h4>
             <ul v-for="item in rapports" :key="item.referenceRapport">
                   <input type="checkbox" :checked="item.sendClient === true" @change="onChangeProcessed($event, item.referenceRapport)">{{ item.referenceRapport }} -  {{ item.designation }}
             </ul>
           </div>
         </div>
         <button class="sendRapportbtn" @click="envoyerClient()"><i class="fa-solid fa-paper-plane"></i> Envoyer au client et valider</button>

         <p class="successrap"><i class="fa-solid fa-envelope-circle-check"></i> {{ msgValidationRapport }}</p>
       </div>
       <!-- End Envoye Rapport  -->






   </div>
</template>

<script>
import Service from "../../../../Service";
import Rapport from "../../../../Rapport";


export default {

   props: {
     numeroAffaire: String,
   },

   components: {

   },

   data() {
       return {

           msgSendClient : null,
           interlocuteurs : [],
           checkedInterlocuteur : [],
           checkedRapport : [],
           envoyerRapport : false,
           importRapport : true,
           classementRapport : false,
           msgRapport : null,
           traitement: false,
           missions : [],
           numRapport: [],
           countRapport : [],
           clientId: null,
           referenceRapport : null,
           designation: null,
           dateProductionControle: null,
           dateIntervention :null,
           responsableClient : null,
           typeRapport : null,
           category: null,
           selectedFile: [],
           refRapport : null,
           newRefRapport :null,
           arber :  [],
           rapports : [],
           affaire: null,
           niveauOne : [],
           niveauUn : [],
           niveauTow : [],
           niveauDeux : [],
           niveauTree : [],
           niveauTrois : [],
           niveauFour : [],
           niveauQuatre : [],
           niveauFive : [],
           niveauCinq : [],
           classficationAffaire : false,
           classficationRapports : false,
           flagClassficationShema : false,
           message : null,
           buttonClassficationAffaire : false,
           rapportsInterlocuteurs : [],
           schemaClass : [],
           msgValidationRapport : null
       }
   },

   methods : {

   ajouterShema() {

     this.schemaClass.push({
       niveauOne : null,
       niveauTow : null,
       niveauTree : null,
       niveauFour : null,
       niveauFive : null,
       disabled : false
     });
   },

   enregistrerClassShema(niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq, index) {
         Service.EnregistrerClassShema(this.numeroAffaire, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq, index)
         .then((result) => {
           if(result) {
             this.schemaClass[index].disabled = true;
           }
         })
         .catch((error) => {
           console.log(error.message);
         });
   },

   deleteClassShema(index) {
         Service.DeleteClassShema(this.numeroAffaire, index)
         .then((result) => {
           if(result) {
             this.schemaClass[index].disabled = false;
           }
         })
         .catch((error) => {
           console.log(error.message);
         });
   },

   enregistrerClassRapport(rapportId, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq, index) {
         Service.EnregistrerClassRapport(rapportId, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq)
         .then((result) => {
           if(result) {
             this.rapports[index].disabled = true
           }
         })
         .catch((error) => {
           console.log(error.message);
         });
   },

   deleteClassRapport(rapportId, index) {
         Service.DeleteClassRapport(rapportId)
         .then((result) => {
           if(result) {
             this.rapports[index].disabled = false
           }
         })
         .catch((error) => {
           console.log(error.message);
         });
   },

   // one
   saveNiveauOne() {

       for(let i = 0; i < this.niveauOne.length; i++) {
              this.niveauOne[i].disabled = true
       }

   },

   addNiveauOne() {

       this.niveauOne.push({
             count : this.niveauOne.length,
             titre : null,
             disabled : false
       });
   },

   deleteNiveauOne() {

       for(let i = 0; i < this.niveauOne.length; i++) {
              this.niveauOne[i].disabled = false
       }

   },
// one


// tow
   saveNiveauTow() {

       for(let i = 0; i < this.niveauTow.length; i++) {
              this.niveauTow[i].disabled = true
       }

   },


   deleteNiveauTow() {

       for(let i = 0; i < this.niveauTow.length; i++) {
              this.niveauTow[i].disabled = false
       }

   },

   addNiveauTow() {

       this.niveauTow.push({
             count : this.niveauTow.length,
             titre : null,
             disabled : false
       });
   },

// tow


// tree

   saveNiveauTree() {

       for(let i = 0; i < this.niveauTree.length; i++) {
              this.niveauTree[i].disabled = true
       }

   },

   deleteNiveauTree() {

       for(let i = 0; i < this.niveauTree.length; i++) {
              this.niveauTree[i].disabled = false
       }

   },

   addNiveauTree() {

       this.niveauTree.push({
             count : this.niveauTree.length,
             titre : null,
             disabled : false
       });
   },
// tree

// four

   saveNiveauFour() {

       for(let i = 0; i < this.niveauFour.length; i++) {
              this.niveauFour[i].disabled = true
       }

   },

   deleteNiveauFour() {

       for(let i = 0; i < this.niveauFour.length; i++) {
              this.niveauFour[i].disabled = false
       }

   },

   addNiveauFour() {

       this.niveauFour.push({
             count : this.niveauFour.length,
             titre : null,
             disabled : false
       });
   },
// four

// Five

   saveNiveauFive() {

       for(let i = 0; i < this.niveauFive.length; i++) {
              this.niveauFive[i].disabled = true
       }

   },

   deleteNiveauFive() {

       for(let i = 0; i < this.niveauFive.length; i++) {
              this.niveauFive[i].disabled = false
       }

   },

   addNiveauFive() {

       this.niveauFive.push({
             count : this.niveauFive.length,
             titre : null,
             disabled : false
       });
   },
// Five


   enregistrerClassAffaire() {

       for(let i = 0; i < this.niveauOne.length; i++) {
              this.niveauUn.push(this.niveauOne[i].titre);
       }

       for(let i = 0; i < this.niveauTow.length; i++) {
              this.niveauDeux.push(this.niveauTow[i].titre);
       }

       for(let i = 0; i < this.niveauTree.length; i++) {
              this.niveauTrois.push(this.niveauTree[i].titre);
       }

       for(let i = 0; i < this.niveauFour.length; i++) {
              this.niveauQuatre.push(this.niveauFour[i].titre);
       }

       for(let i = 0; i < this.niveauFive.length; i++) {
              this.niveauCinq.push(this.niveauFive[i].titre);
       }

     Service.EnregistrerClassAffaire(this.numeroAffaire, this.niveauUn, this.niveauDeux, this.niveauTrois, this.niveauQuatre, this.niveauCinq)
     .then((result) => {
         this.buttonClassficationAffaire = result.msg.saved;
         return this.$router.go(this.$router.currentRoute);

     })
     .catch((error) => {
         console.log(error);
     });

   },

   effacerClassAffaire() {
       Service.EffacerClassAffaire(this.numeroAffaire)
       .then(() => {
         return this.$router.go(this.$router.currentRoute);
       })
       .catch((error) => {
           console.log(error);
       });
   },

   handelClassficationOne() {

       this.niveauOne.push({
             count : this.niveauOne.length,
             titre : null,
             disabled : false
       });

       this.niveauTow.push({
             count : this.niveauTow.length,
             titre : null,
             disabled : false
       });

       this.niveauTree.push({
             count : this.niveauTree.length,
             titre : null,
             disabled : false
       });

       this.niveauFour.push({
             count : this.niveauFour.length,
             titre : null,
             disabled : false
       });

       this.niveauFive.push({
             count : this.niveauFive.length,
             titre : null,
             disabled : false
       });

       this.classficationAffaire = true;
   },

   onChangeProcessed(e,d) {

         if (e.target.checked == true) {

           if(!this.checkedRapport.includes(d))
           {
             this.checkedRapport.push(d);
           }

         }

         if (e.target.checked == false ) {
             const index = this.checkedRapport.indexOf(d);

             if(index != -1) {
               this.checkedRapport.splice(index, 1);

             }
         }

   },

   envoyerClient() {

     Service.EnvoyerClientEmail(this.checkedInterlocuteur, this.checkedRapport, this.numeroAffaire)
     .then((res) => {
         if(res) {
               this.msgValidationRapport = res.data.msg
         }
     })
     .catch((error) => {
         console.log(error);
     });

   },

   classficationShema() {
       this.flagClassficationShema = true;
       this.classficationRapports = false;
       this.importRapport = false;
       this.classementRapport = false;
       this.envoyerRapport = false;
   },

  classficationRapport() {
       this.flagClassficationShema = false;
       this.classficationRapports = true;
       this.importRapport = false;
       this.classementRapport = false;
       this.envoyerRapport = false;
  },

   classfication() {

       this.flagClassficationShema = false;
       this.classficationRapports = false;
       this.importRapport = false;
       this.classementRapport = true;
       this.envoyerRapport = false;

   },

   importRapports() {

       this.flagClassficationShema = false;
       this.classficationRapports = false;
       this.importRapport = true;
       this.classementRapport = false;
       this.envoyerRapport = false;

   },

   envoyerRapports() {

     this.rapports.forEach((element) => {
         if(element.sendClient == true) {
           this.checkedRapport.push(element.referenceRapport);
         }
     });

       this.flagClassficationShema = false;
       this.classficationRapports = false;
       this.importRapport = false;
       this.classementRapport = false;
       this.envoyerRapport = true;

   },

   modifier(refRapport, missionId, numeroAffaire, i, j, index) {

       Service.ModifierRapport(refRapport, missionId, numeroAffaire, i, j, index)
       .then((result) => {
           if(result)  {
               this.missions[j].equipement[i].sendRapport.splice(index, 1);
               this.missions[j].equipement[i].sendRapport.splice(index, 1, false);
           }

       })
       .catch((error) => {
           console.log(error);
       });
   },

   checkedRapports() {
     console.log(this.checkedNames, this.checkedRapportIndex);
   },

   onFileChange(e, i) {
     const selectedFile = e.target.files[0]; // accessing file
     this.selectedFile[i] = selectedFile;
   },

       // add Quantite Rapport
   addQuantite(b, c) {

   var today = new Date();
   var mm = String(today.getMonth() + 1).padStart(2, '0');
   var yyyy = today.getFullYear();

     if(this.newRefRapport == null) {
       Service.getLastRapport()
       .then((res) => {

             // Get last rapport
             this.refRapport = res.last[0].LastRapport;
             // get counter for increment rapport
             const count = this.refRapport.slice(
                   this.refRapport.indexOf('A') + 1,
                   this.refRapport.lastIndexOf('|'),
             );
             //get titre societe
             const titre = this.numeroAffaire.slice(
                 this.numeroAffaire.lastIndexOf('|') + 1,
             );

             this.newRefRapport = `RA${parseInt(count) + 1}|${mm}|${yyyy}|${titre}`
             // set in array missions
             this.missions[b].equipement[c].refRapport.push(this.newRefRapport);

       })
       .catch((error) => {
         console.log(error);
       });

     }else {
             // Get last rapport
             this.refRapport = this.newRefRapport;
             // get counter for increment rapport
             const count = this.refRapport.slice(
                   this.refRapport.indexOf('A') + 1,
                   this.refRapport.lastIndexOf('|'),
             );
             //get titre societe
             const titre = this.numeroAffaire.slice(
                 this.numeroAffaire.lastIndexOf('|') + 1,
             );

             this.newRefRapport = `RA${parseInt(count) + 1}|${mm}|${yyyy}|${titre}`
             // set in array missions
             this.missions[b].equipement[c].refRapport.push(this.newRefRapport);
     }



       // Start add Quantite Equipment
       const oldQte = this.missions[b].qte[c];
       const newQte = parseInt(oldQte) + 1;
       this.missions[b].qte.splice(b, 1, newQte);
       // Fin add Quantite Equipement

     },



     // valider Rapport
     saveRapport(referenceRapport, typeMission, i, j, index, missionId, typeRapport, categorie) {

      if(this.selectedFile[i] == undefined) {
          alert("s'il vous plaît saisir le rapport");
      } 

      if(this.designation == null) {
          alert("s'il vous plaît saisir la désignation");
      }

      if(this.responsableClient == null) {
          alert("s'il vous plaît saisir le responsable client");
      }

      if(this.dateProductionControle == null) {
          alert("s'il vous plaît saisir la date production controle");
      }

      if(this.dateIntervention == null) {
          alert("s'il vous plaît saisir la date Intervention");
      }
    
      if(this.selectedFile[i] != undefined && this.designation != null && this.responsableClient != null && this.dateProductionControle != null && this.dateIntervention != null) {
        
        Rapport.SaveRapport(this.selectedFile[i], this.clientId, referenceRapport, typeMission, this.designation, this.dateProductionControle, this.dateIntervention, this.responsableClient, missionId, i, j, index, this.numeroAffaire, typeRapport, categorie)
          .then((result) => {

            if(result)  {
                this.missions[j].equipement[i].sendRapport.splice(index, 1);
                this.missions[j].equipement[i].sendRapport.splice(index, 1, true);
            }

          })
          .catch((error) => {
                console.log(error);
          });
          
      }


     },

     accepterRapport() {
       Service.accepterRapport(this.numeroAffaire)
       .then(() => {
             this.msgRapport = "Veuillez patienter quelques secondes pour terminer le processus.";
             this.traitement = true;
             setTimeout(() => {
                 return this.$router.go(this.$router.currentRoute);
             }, 5000)

       })
       .catch((err) => {
         console.log(err)
       });
     }

   },

   created() {


     // check classfication exist or no
     Service.ReadClassAffaire(this.numeroAffaire)
     .then((result) => {

         result.msg.classOne.forEach((element, index) => {
           this.niveauOne.push({
             count : index,
             titre : element,
             disabled : true
           });
         });

         result.msg.classTow.forEach((element, index) => {
           this.niveauTow.push({
             count : index,
             titre : element,
             disabled : true
           });
         });

         result.msg.classTree.forEach((element, index) => {
           this.niveauTree.push({
             count : index,
             titre : element,
             disabled : true
           });
         });

         result.msg.classFour.forEach((element, index) => {
           this.niveauFour.push({
             count : index,
             titre : element,
             disabled : true
           });
         });

         result.msg.classFive.forEach((element, index) => {
           this.niveauFive.push({
             count : index,
             titre : element,
             disabled : true
           });
         });

         this.schemaClass = result.msg.schemaClass;

         // check schema exist or no by numero d affaire
         if(this.schemaClass.length > 1) {
           this.schemaClass.shift();
         }

         if(result) {
             this.buttonClassficationAffaire = true;
             this.classficationAffaire = true;
         }

     })
     .catch((error) => {
         console.log(error);
     });


     // Get info missions by affaire
     Service.getMission(this.numeroAffaire)
       .then((result) => {

         this.clientId = result.data.missions[0].clientId

           // sommier  les valeur array pour justifie counteur rapport
           result.data.missions.forEach(element => {
             this.missions.push(element);
                 element.qte.forEach((el) => {
                     this.countRapport.push(parseInt(el));
                 })
           });


       })
       .catch((err) => {
           console.log(err);
       });


     // Get info rapports by numeroAffaire
     Service.selectRapports(this.numeroAffaire)
       .then((result) => {
           this.rapports = result.rapports;
       })
       .catch((err) => {
           console.log(err);
       });

     // Get Info Client by numeroAffaire and get Les Interlocuteurs
     Service.getRefClientByNumeroAffaire(this.numeroAffaire)
     .then((result) => {

         this.interlocuteurs = result.data.interlocuteurs;

         this.rapports.forEach((element) => {
             element.interlocuteurs = this.interlocuteurs;
         });

     })
     .catch((error) => {
         console.log(error);
     });

   },

   computed : {

     filterMissions() {
       return this.missions.filter((item) => {
           return item;
       });
     },

     filterRapports() {
       return this.rapports.filter((item) => {
         return item.sendClient == false;
       });
     }
   }

}


</script>

<style scoped>


.indicateur{
 padding: 10px;
 width: 100%;
 overflow-x: hidden;
}

.actionRapport{
display: grid;
grid-template-columns: repeat(3,1fr);
gap:10px;

}

.actionRapport input{
 border: 0;
 padding:10px;
 width: 100%;
 background-color: #243064;
 color:white;
 text-align: left;
 cursor: pointer;
}

.actionRapport input:hover{

 background-color: #324bb9;

}

.diviser{
 display: flex;
 align-items: center;
}

.diviser svg{
 margin-left: 10px;
 color:#cf1f21
}

.listMission p {
 color:red;
 margin:10px 0;
 font-weight: bold;
}

.listMission{
  width: 100%;
  overflow-x:auto;


}

table{
  max-width: 600px;

  margin:10px 0;



}



.table-bordered {
 border: 1px solid #ddd !important;
}

.table thead{
 cursor: pointer;
 background: #c9dff0;
}

thead tr th {
 font-weight: bold;
 padding: 12px 30px;
 padding-left: 42px;
}

tbody tr {
 color: #555;

}
tbody tr td {
 text-align: center;
 padding: 15px 10px;


}



tbody tr td:not(:first-child) {
min-width: 380px;
border-bottom:1px solid rgb(175, 175, 175);
border-right: 1px solid rgb(175, 175, 175);
}




tbody tr td:first-child{

 background: #c9dff0;
 font-weight: 500;
}

tbody tr td:last-child{

border-bottom: 1px solid rgb(185, 185, 185);
text-align: left;

}

tbody tr:last-child td ul{
border-bottom: 3px dashed rgb(92, 92, 92);
}


tbody tr:last-child td:last-child ul li{
padding:5px 0;
text-align: left;

}

tbody tr:nth-child(2) td:last-child ul li{
display: inline;
margin-left: 10px;

}

tbody input {
 width: 100%;
 padding:6px;
 border:1px solid rgb(175, 175, 175);
 margin-top: 6px;
}

tbody input:focus-within {

 outline:1px solid rgb(255, 15, 15);
 border:0;

}

tbody input[type=button] {
border:0;
background-color: green;
color:white;
padding:10px;
margin-bottom:10px;
}

.supprTab{
 border:0;
background-color: rgb(202, 8, 8) !important;
color:white;
padding:10px;
}

tbody label{
 font-weight: 600;
 color:rgb(175, 41, 41);
}

button {
 padding:6px 20px;
 border-radius: 20px;
 border: 0;

 cursor: pointer;
 background-color: #cf1f21;
 color:white;
}

.form-control {
   display: block;



   font-weight: 400;
   line-height: 1.5;
   color: #212529;
   background-color: #fff;
   background-clip: padding-box;
   border: 1px solid #ced4da;
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;

   transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.form-control::-webkit-file-upload-button {
   padding: 10px;
   margin: -.375rem -.75rem;
   -webkit-margin-end: .75rem;
   margin-inline-end: .75rem;
   color: rgb(58, 58, 58);
   font-weight: 600;
   background-color: #e9e9e9;
   pointer-events: none;
   border:0;

   -webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
   transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out
}

.classificationMission .btn-clasification {
 padding:6px 20px;
 border-radius: 20px;
 border: 0;

 cursor: pointer;
 background-color: #cf1f21;
 color:white;
 margin-left: 10px;
}



.classificationMission {
 margin-top: 20px;
 font-weight: 500;
}

.classificationMission input {
margin-top: 10px;
 padding:6px;
 border:1px solid rgb(175, 175, 175);
}

.classificationMission input:focus-within {

 outline:1px solid rgb(255, 15, 15);
 border:0;

}

.classificationMission>div input[type=text] {
 padding:6px;
 width: 30%;
 border:1px solid rgb(175, 175, 175);
 margin-top: 6px;
}

.classificationMission>div input[type=button] {
 padding:6px;
 width: 15%;
 border:1px solid rgb(175, 175, 175);
 border:0;
 color:white;
 text-transform: capitalize;
 background-color: rgb(64, 52, 241);
 cursor: pointer;

}

.classificationMission>div input[type=button]:last-child {
margin-left: 10px;
color:white;
background-color: rgb(184, 159, 18);
}

.deletebtn{
margin-left: 0 !important;
color:white;
background-color: rgb(255, 46, 46) !important;
}

.terminerbtn{
 background-color: #0b7c11;
 border:0px !important;
 width: 100%;
 color:white;
 padding: 15px !important;
 border-radius: 50px;
 cursor: pointer;
 outline:0;
 font-size: 18px;
}

.effacebtn{
 background-color: #db1717;
 border:0px !important;
 width: 100%;
 color:white;
 padding: 15px !important;
 border-radius: 50px;
 cursor: pointer;
 outline:0;
 font-size: 18px;
 transition: ease 0.3s;
}

.effacebtn:hover{
 background-color: #ff0000;

}


.classRaport input,select{
 padding:10px;
 width: 98%;
 border:1px solid rgb(175, 175, 175);
 margin-top: 6px;

}

.classRaport input:focus-within ,select:focus-within{
outline:1px solid red;



}


.classRaport{
 display: grid;
grid-template-columns: repeat(2,1fr);
gap:10px;
}

.classRaport label{
 font-weight: 700;
}

.classRaport ul{
width: 100%;
box-shadow: 0px 3px 3px  rgb(218, 218, 218);
padding:10px;


}

.saveclassement{
 border:0 !important;
 margin-top: 20px !important;
 cursor: pointer;
 padding:12px !important;
 background-color: rgb(240, 205, 49);
 border-radius: 10px;
 font-size: 17px;
 font-weight:500;
 transition: ease 0.3s;
}

.deleteclassement{
 border:0 !important;
 margin-top: 20px !important;
 cursor: pointer;
 padding:12px !important;
 background-color: rgb(230, 30, 30);
 border-radius: 10px;
 font-size: 17px;
 color:white;
 font-weight:500;
 transition: ease 0.3s;
}

.deleteclassement:hover{

 background-color: rgb(230, 77, 30);

}




.saveclassement:hover{

color: rgb(240, 205, 49);
background-color: black;

}

.shemaclassification{
  display: grid;
  grid-template-columns: repeat(1,1fr);
}

.shemaclassification select{

  width: 10%;
  margin-right: 10px;
}


.saveclasifica{
  border:0 !important;
 margin-top: 20px !important;
 cursor: pointer;
 padding:12px !important;
 background-color: rgb(240, 205, 49);
 border-radius: 10px;
 font-size: 17px;
 font-weight:500;
 transition: ease 0.3s;
}

.deleteclasifica{
  border:0 !important;
 margin-top: 20px !important;
 cursor: pointer;
 padding:12px !important;
 background-color: rgb(228, 24, 24);
 border-radius: 10px;
 font-size: 17px;
 font-weight:500;
 transition: ease 0.3s;
}
.addshcemabtn{
  margin:20px 0;
  padding:15px;
  font-size: 17px;
  width: 300px;

  background-color: #200b7c;
}

.list-rapports ul{
  border-bottom: 1px solid rgb(209, 209, 209);
  padding:10px;
  margin-left: 18px;
}

.list-destinataire li{
  padding:10px;
  margin-left: 18px;
}

.list-rapports ul:nth-child(odd){
background-color: #f0f0f0;

}

.sendRapportbtn{
  border:0 !important;
 margin-top: 20px !important;
 cursor: pointer;
 padding:12px !important;
 background-color: rgb(240, 205, 49);
 border-radius: 10px;
 font-size: 17px;
 width: 100%;
 font-weight:500;
 transition: ease 0.3s;
}

.list-rapports input{
  margin-right: 10px;
}

.list-destinataire input{  margin-right: 10px;
}

.successrap{
  background-color: green;
  padding:10px;
  text-align: center;
  color:white;
  margin:20px 0;
  font-size: 20px;
}

.equipementpage{
  display: flex;
  gap:10px;
}

.equipementpage ul{
    width: 300px;

}
</style>
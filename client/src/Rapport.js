require('dotenv').config();
import axios from 'axios'
const { VUE_APP_API_BASE_URL_DEV } = require('./config');

class Rapport {

        // saved Rapport   
        static SaveRapport(file, clientId, referenceRapport, typeMission, designation, dateProductionControle, dateIntervention, responsableClient, missionId, i, j, index, numeroAffaire, typeRapport, categorie) {
            return new Promise((resolve, reject) => {
    
                            const formData = new FormData();

                            formData.append("numeroAffaire", numeroAffaire);  
                            formData.append("i", i);  
                            formData.append("j", j);  
                            formData.append("index", index);  
                            formData.append("file", file);  
                            formData.append('clientId', clientId);
                            formData.append('referenceRapport', referenceRapport);
                            formData.append('designation', designation);
                            formData.append('designation', designation);
                            formData.append('responsableClient', responsableClient);
                            formData.append('typeMission', typeMission);
                            formData.append('dateProductionControle', dateProductionControle);
                            formData.append('dateIntervention', dateIntervention);
                            formData.append('missionId', missionId);
                            formData.append('typeRapport', typeRapport);
                            formData.append('categorie', categorie);
                        
    
                            axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/saved`, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }})
                                .then(response => {
                                    resolve(response.data);
                                })
                                .catch(error => {
                                    reject(error.response.data);
                                });
        
                })
        }


    

}


export default Rapport;
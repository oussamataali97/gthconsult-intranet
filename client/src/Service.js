require('dotenv').config();
import axios from 'axios'
const { VUE_APP_API_BASE_URL_DEV } = require('./config');
const FormData = require('form-data');
//TelechargerSituationFrais
// getAffaire
class Service {

    //---------------------------------------MAC ADDRESSE --------------------------------------------
    //Check Mac Address
    static CheckMacAddress(macAddresse) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/mac/read`,
            {
                macAddresse : macAddresse
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }
    // -----------------------------------------------------------------------------------------------





    //--------------------------------------- ADMIN --------------------------------------------------

     // Login Admin
    static loginAdmin(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/login`,

            {
                email : email,
                password : password
            },

            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    // Read Admin 

    static readAdmin() {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/admins/read`,
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        });
    }
    // SelectMoisCalendrierInspecteur
    static getAdmin(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/get`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        });
    }
    //----------------------------------- End ADMIN ---------------------------------------------------

    //------------------------------------ CLIENT -----------------------------------------------------
    // create Client

    static createClient(client) {

        const {
            adresse,
            codePostal,
            email, 
            ice,
            pays,
            raisonSocial,
            refClient,
            telephone,
            ville,
          } = client;


        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/clients/create`,

            {
                raisonSocial : raisonSocial,
                adresse : adresse,
                ville : ville,
                codePostal : codePostal,
                pays : pays, 
                email : email,
                ice : ice,
                refClient : refClient,
                telephone : telephone
            },

            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }


    // update Client

        static updateClient(client) {

            const {
                raisonSocial,
                adresse,
                ville,
                codePostal,
                pays, 
                email,
                ice,
                id,
                refClient,
                telephone 
              } = client;
    
              
            return new Promise((resolve, reject) => {
                axios.put(`${VUE_APP_API_BASE_URL_DEV}/clients/update/${id}`,
    
                {
                    raisonSocial : raisonSocial,
                    adresse : adresse,
                    ville : ville,
                    codePostal : codePostal,
                    pays : pays, 
                    email : email,
                    ice : ice,
                    refClient : refClient,
                    telephone : telephone
                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

    //Get Reference Client 
    static getRefClient() {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/clients/reference`,
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    // read all clients 
    static readClient() {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/clients/read`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    // select client 
    static selectClient(clientId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/clients/select/${clientId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }


    // select client with Interlocuteur
    static selectClientInterlocuteur(clientId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/clients/select/interlocuteurs/${clientId}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }


    // delete Client or Clients
    static deleteClient(idClients) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/clients/delete`,
            {
                idClients : idClients
            }, 
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }
 //----------------------------------------- END CLIENT -----------------------------------------------   


 // _________________________________________ INTERLOCUTEUR _________________________________________________       
    // create Interlocuteur
        static createInterlocuteur(interlocuteur) {

            const {
                nom,
                prenom,
                email,
                codePostal,
                fonction, 
                telephone,
                clientId,
                raisonSocial,
                password
              } = interlocuteur;
    
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/create`,
    
                {
                    nom : nom,
                    prenom : prenom,
                    email : email,
                    codePostal : codePostal,
                    fonction : fonction, 
                    telephone : telephone,
                    clientId : clientId,
                    raisonSocial: raisonSocial,
                    password : password
                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        // read all interlocuteurs 
        static readInterlocuteur() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/read`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });

            })
        }

        // read interlocuteur 
        static selectInterlocuteurs(clientId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/select`,
                {
                    clientId : clientId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });

            })
        }

        // get Interlocuteur
        static getInterlocuteur(interlocuteurId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/get`,
                {
                    interlocuteurId : interlocuteurId
                },
                {
                headers: {
                        'Content-Type': 'application/json'
                }
                })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });

            })
        }


        // update Client
        static updateInterlocuteur(interlocuteur) {

            const {
                clientId,
                email,
                fonction,
                interlocuteurId,
                nom,
                password,
                prenom,
                raisonSocial,
                telephone
              } = interlocuteur;
    
              
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/update`,
    
                {
                    clientId: clientId,
                    email: email,
                    fonction: fonction,
                    interlocuteurId: interlocuteurId,
                    nom: nom,
                    password: password,
                    prenom: prenom,
                    raisonSocial: raisonSocial,
                    telephone: telephone
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }



    // delete Interlocuteur   
    static deleteInterlocuteur(idInterlocuteur) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/delete`,
            {
                idInterlocuteur : idInterlocuteur
            },  
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }


    // Send Email Interlocuteur Interlocuteur   
    static ValideInterlocuteur(idInterlocuteur) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/valideInterlocuteur`,
            {
                idInterlocuteur : idInterlocuteur
            },  
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }

    // Send Email Interlocuteur    
    static InvalideInterlocuteur(idInterlocuteur) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/invalideInterlocuteur`,
            {
                idInterlocuteur : idInterlocuteur
            },  
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }


    // Send Email Interlocuteur Interlocuteur   
    static SendEmailInterlocuteur(idInterlocuteur) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurs/sendEmailInterlocuteur`,
            {
                idInterlocuteur : idInterlocuteur
            },  
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }
 // ----------------------------------------- Fin Interlocuteur ----------------------------------------
 
 

 // ------------------------------------------ missions ------------------------------------------------       

    // create Mission 
    static AnnulerAffaireAfterCreateMission(numeroAffaire) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/missions/annulerAffaireAfterCreateMission`,
                {
                    numeroAffaire : numeroAffaire,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


    // create Mission 
    static createMission(mission) {

            const {
                typeMission,
                codeMission,
                equipement,
                qte,
                prix,
                devis,
                interlocuteurId,
                clientId,
                numeroAffaire,
                status,
                statusWithAffaire, 
                typeRapport,
                categorie
              } = mission[0];

    
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/missions/create`,
    
                {
                    typeMission: typeMission,
                    codeMission: codeMission,
                    equipement: equipement,
                    qte: qte,
                    prix: prix,
                    devis: devis,
                    interlocuteurId: interlocuteurId,
                    clientId: clientId,
                    numeroAffaire : numeroAffaire,
                    status: status,
                    statusWithAffaire : statusWithAffaire,
                    typeRapport : typeRapport,
                    categorie : categorie
                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        // delete mission
        static deleteMission(missionId, countRapport) {
            return new Promise((resolve, reject) => {
                axios.delete(`${VUE_APP_API_BASE_URL_DEV}/missions/delete/${missionId}/${countRapport}`,
                    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 .then((response) => {
                    resolve(response);
                 })
                 .catch((response) => {
                    reject(response)
                 })
                 
            })
        }
        

        // delete mission
        static deleteMissionsNotComplete(numeroAffaire) {
            return new Promise((resolve, reject) => {
                axios.delete(`${VUE_APP_API_BASE_URL_DEV}/missions/deleteaffairenotcomplete/${numeroAffaire}`,
                    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 .then((response) => {
                    resolve(response);
                 })
                 .catch((response) => {
                    reject(response)
                 })
    
            })
        }

        static getMission(numeroAffaire) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/missions/getMission/${numeroAffaire}`,
                    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 .then((response) => {
                    resolve(response);
                 })
                 .catch((response) => {
                    reject(response)
                 })
    
            })
        }   

        static readAllMissions() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/missions/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 .then((response) => {
                    resolve(response);
                 })
                 .catch((response) => {
                    reject(response)
                 })
    
            })
        } 
    //------------------------------  Delete Mission ------------------------------------------------     
    
    
    
    //--------------------------------------------AFFAIRE--------------------------------------//


        // get get Indicateur By annee
        static IndicteurAffaire(annee) {
            return new Promise((resolve, reject) => {
                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/indicateur`,
                    {
                        annee: annee
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                            resolve(response);
                    })
                    .catch(error => {
                            reject(error);
                    });
                })
        }


        // get get RefClient By NumeroAffaire
        static EnvoyerClientEmail(checkedInterlocuteur, checkedRapport, numeroAffaire) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/EnvoyerClientEmail`,

                {
                    checkedInterlocuteur: checkedInterlocuteur,
                    checkedRapport: checkedRapport,
                    numeroAffaire : numeroAffaire

                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                            resolve(response);
                 })
                .catch(error => {
                            reject(error);
                 });
    
                })
        }
        // get get RefClient By NumeroAffaire

        static getRefClientByNumeroAffaire(numeroAffaire) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/getRefClientByNumeroAffaire`,

                {
                    numeroAffaire: numeroAffaire
                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                            resolve(response);
                 })
                .catch(error => {
                            reject(error);
                 });
    
                })
        }
        // get affaire by ID

        static getAffaireById(affaireId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/getAffaireById`,

                {
                    affaireId: affaireId
                },
    
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                            resolve(response);
                 })
                .catch(error => {
                            reject(error);
                 });
    
                })
        }

        // get last numero last Rapport
            static lastRapport(lastrapportId) {
                return new Promise((resolve, reject) => {
                    axios.get(`${VUE_APP_API_BASE_URL_DEV}/Lastrapport/updateLastRapport`,
                        {
                            lastrapportId : lastrapportId
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
        
                    })
            }

        // update last numero Rapport in Affaie 
            static lastAffaire(lastaffaireId) {
                return new Promise((resolve, reject) => {
                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/last/updateLastAffaire`,
                        {
                            lastaffaireId : lastaffaireId
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
        
                    })
            }

        // get last numero Affaire 
            static getLastRefAffaireORLastRefRapport() {
                return new Promise((resolve, reject) => {
                    axios.get(`${VUE_APP_API_BASE_URL_DEV}/last/read`,
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
        
                    })
            }
         
        // create Affaire 
            
        static createAffaire(file, numeroAffaire, apporteurAffaire, targetClient, targetInterlocuteur) {
            return new Promise((resolve, reject) => {
                    
                    var formData = new FormData();
                    if(file) {
                        formData.append('file', file);
                    }
                    formData.append('numeroAffaire',numeroAffaire);
                    formData.append('apporteurAffaire',apporteurAffaire);
                    formData.append('clientId',targetClient);
                    formData.append('interlocuteurId',targetInterlocuteur);

                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/create`, formData, {
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

    // read all affaires 
        static readAllAffaires() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/readAll`,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        });
    
                })
    }

    // Delete affaire
    static deleteAffaire(affaireId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/delete`,
            {
                affaireId : affaireId
            },   
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
             .then((response) => {
                resolve(response);
             })
             .catch((response) => {
                reject(response)
             })

        })
    }
//--------------------------------------Fin AFFAIRE -------------------------------------------------


////_______________________________________________Bon Cammande _____________________________________//


    // create Bon Cammande  
    static enregitreBonCommande(file, affaireId, dateBonCammnade, numeroBonCammnade) {
                return new Promise((resolve, reject) => {
                        
                        var formData = new FormData();
                        if(file) {
                            formData.append('file', file);
                        }
                        formData.append('affaireId',affaireId);
                        formData.append('dateBonCammnade',dateBonCammnade);
                        formData.append('numeroBonCammnade',numeroBonCammnade);
    
                        axios.put(`${VUE_APP_API_BASE_URL_DEV}/affaires/bonCommande`, formData, {
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
          
          
    // Delete Bon Cammande
    static DeleteBonCammande(affaireId) {
                return new Promise((resolve, reject) => {

                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/deletebc`,
                    {
                        affaireId : affaireId
                    },
                    {
                        headers: {
                             'Content-Type': 'application/json'
                         }
                     })
                        .then(response => {
                            resolve(response);
                        })
                        .catch(error => {
                            reject(error);
                        });
        
                })
          }
          


// ---------------------------------------- Rapports & Affaires -----------------------------------------------


    // classement  Rapports with numeroAffaire
    static ClassementRapport(numeroAffaire, arber) {
                return new Promise((resolve, reject) => {
                        
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/classementRapport`,
                        {
                            numeroAffaire : numeroAffaire,
                            arber : arber
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                                resolve(response.data);
                        })
                        .catch(error => {
                                reject(error.response.data);
                        });
    
            })
    }

    // select Rapports with numeroAffaire
    static selectRapports(numeroAffaire) {
                return new Promise((resolve, reject) => {
                        
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/selectRapports`,
                        {
                            numeroAffaire : numeroAffaire
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                                resolve(response.data);
                        })
                        .catch(error => {
                                reject(error.response.data);
                        });
    
            })
    }


    // Modifier Rapport   
    static ModifierRapport(refRapport, missionId, numeroAffaire, i, j, index) {
                return new Promise((resolve, reject) => {
                        
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/updateRapport`,
                        {
                                refRapport : refRapport,
                                missionId : missionId,
                                numeroAffaire : numeroAffaire,
                                i : i,
                                j : j,
                                index : index

                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => {
                                resolve(response.data);
                        })
                        .catch(error => {
                                reject(error.response.data);
                        });
    
            })
    }


    // get Affaire   
    static getLastRapport() {
                return new Promise((resolve, reject) => {
                        
                        axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/getLastRapport`, {
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



    static checkRapports(){
        return new Promise((resolve, reject) => {
                        
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/checkRapports`, {
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

    static accepterRapport(numeroAffaire) {

        return new Promise((resolve, reject) => {
                        
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/accepterRapport/${numeroAffaire}`, 
                {
                 headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });

        })
    }

    static DeleteImportRapport(affaireId) {
        
        return new Promise((resolve, reject) => {
                        
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/affaires/deleteImportRapport`, 
                {
                    affaireId : affaireId
                },
                {
                 headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });

        })
    }

    //-----------------------------Fin AFFAIRE & RAPPORTS ------------------------------------------




    //-------------------------------Interventions--------------------------------------------------
    
    // get Indicateur Production By annee
    static IndicteurProduction(annee) {
            return new Promise((resolve, reject) => {
                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/interventions/indicateur`,
                    {
                        annee: annee
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                            resolve(response);
                    })
                    .catch(error => {
                            reject(error);
                    });
                })
    }

    static enregistreIntervention(intervention){
        const {
            affaireId,
            commentaire,
            refClient,
            deDate,
            aDate,
            nameInspecteur,
            chargeAffaire,
            missions,
            interlocuteurId,
            clientId,
            numeroAffaire,
            nameInterlocuteur,
            telephoneInterlocuteur,
            adresseClient,
            raisonSocial,
          } = intervention;

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interventions/create`,

            {
                affaireId: affaireId,
                commentaire: commentaire,
                refClient: refClient,
                deDate : deDate,
                aDate : aDate,
                nameInspecteur : nameInspecteur,
                chargeAffaire : chargeAffaire,
                missions : missions,
                interlocuteurId : interlocuteurId,
                clientId : clientId,
                numeroAffaire : numeroAffaire,
                nameInterlocuteur: nameInterlocuteur,
                telephoneInterlocuteur: telephoneInterlocuteur,
                adresseClient: adresseClient,
                raisonSocial: raisonSocial,
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }
    // delete Intervention
    static DeleteIntervention(affaireId){
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/interventions/deleteIntervention`,

            {
                affaireId: affaireId,
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    // ____________________ START display all file pdf ________________________________________________//

        // display Bon Cammande
        static displayBC(filename) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/displaybc/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
    
            })
        }

        // display Bon Cammande
        static displayDEVIS(filename) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/displaydevis/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
    
            })
        }

        // display Intervention
        static displayIntervention(filename) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/affaires/displayintervention/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
    
            })
        }

        static showBE(be) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/displaybe/${be}`, 
                { 
                    responseType: "arraybuffer" 
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static showFACTURE(facture) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/factures/displayfacture/${facture}`,
                { responseType: "arraybuffer" }
                )
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        
    // display Intervention
    static ShowEmise(filename) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/paiement/read/${filename}`, {
                        headers: this.headers,
                        responseType: 'blob',
            })
            .then(response => {
                 resolve(window.open(URL.createObjectURL(response.data)));
            })
            .catch(error => {
                 reject(error.response.data);
            });
        
        })
    }




        //___________________________BD_______________________________________________________________/


        // delete Bd 
        static DeleteImportRapportandBE(affaireId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/deleteImportRapportandBE`,
                {
                    affaireId : affaireId
                },
                 {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }
        

        // Get last BD for get counter BD
        static getLastBD() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/getLastBD`, {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }
        // Delte BD 
        static deleteBD(affaireId, numeroAffaire, be) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/delete`,
                 {
                    affaireId: affaireId,
                    numeroAffaire: numeroAffaire,
                    be: be
                 },
                 {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }
        //GenerateXSLX

        // Delete BD without Filename BD 
        static DeleteBDWithoutFilenameBE(affaireId, numeroAffaire) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/DeleteBDWithoutFilenameBE`,
                 {
                    affaireId: affaireId,
                    numeroAffaire: numeroAffaire,

                 },
                 {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        // read all BD 
        static readAllBordereaus() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/readAllBordereaus`, {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }
        // enregitre bd
        static enregistreBD(bd) {
            const {
                numeroBD,
                refClient,
                numeroAffaire,
                missions,
                dateEnvoi,
                dateRecu,
                raisonSocial,
                adresse,
                telephone,
                adresseEnvoi,
                numeroBC,
                numeroICE,
                dateCreation,
                affaireId
          } = bd;
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/bordereaus/create`,
                {
                    numeroBD: numeroBD,
                    refClient: refClient,
                    numeroAffaire: numeroAffaire,
                    missions: missions,
                    dateEnvoi: dateEnvoi,
                    dateRecu: dateRecu,
                    raisonSocial: raisonSocial,
                    adresse: adresse,
                    telephone: telephone,
                    adresseEnvoi: adresseEnvoi,
                    numeroBC: numeroBC,
                    numeroICE: numeroICE,
                    dateCreation: dateCreation,
                    affaireId: affaireId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        // -----------------------FIN BD ---------------------------------------------------------------


         //---------------------- FACTURE -------------------------------------------------------------

                 // get Indicateur Affaire By annee
        static IndicteurFacture(annee) {
            return new Promise((resolve, reject) => {
                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/factures/indicateur`,
                    {
                        annee: annee
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(response => {
                            resolve(response);
                    })
                    .catch(error => {
                            reject(error);
                    });
                })
        }

        // Get last BD for get counter BD
        static getLastFACTURE() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/factures/getLastFACTURE`, {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        // read all BD 
        static readAllFactures() {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/factures/readAllFactures`, {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        static enregistreFACTURE(facture) {
            const {
                adresse,
                adresseEnvoi,
                affaireId,
                dateCreation,
                echeance,
                facturation,
                missions,
                numeroAffaire,
                numeroBC,
                numeroFACTURE,
                numeroICE,
                prixLettre,
                prixTotalHT,
                prixTotalTTC,
                raisonSocial,
                refClient,
                telephone,
                tva
          } = facture;

          
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/factures/create`,
                {
                    adresse : adresse,
                    adresseEnvoi : adresseEnvoi,
                    affaireId : affaireId,
                    dateCreation : dateCreation,
                    echeance : echeance,
                    facturation : facturation,
                    missions : missions,
                    numeroAffaire : numeroAffaire,
                    numeroBC : numeroBC,
                    numeroFACTURE : numeroFACTURE,
                    numeroICE : numeroICE,
                    prixLettre : prixLettre,
                    prixTotalHT : prixTotalHT,
                    prixTotalTTC : prixTotalTTC,
                    raisonSocial : raisonSocial,
                    refClient : refClient,
                    telephone : telephone,
                    tva : tva
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        // ------------------------------ FIN FACTURE -----------------------------------------------


        //------------------------------- List Days -------------------------------------------------

        static Sauvgarder(listDays, index, matricule, mois, annee) {

            const {
                  number,
                  jour,
                  client,
                  lieu,
                  objet,
                  gasoil,
                  autoroute,
                  taxi,
                  train,
                  hotel,
                  repas,
                  autre,
                  disabled,
                  flagSauvgarder,
            } = listDays;


            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/listday/sauvgarder`,
                {
                    index : index,
                    matricule : matricule,
                    mois : mois,
                    number : number,
                    jour : jour,
                    annee : annee,
                    client : client,
                    lieu : lieu,
                    objet: objet,
                    gasoil : gasoil,
                    autoroute: autoroute,
                    taxi : taxi,
                    train : train,
                    hotel : hotel,
                    repas : repas,
                    autre : autre,
                    disabled : disabled,
                    flagSauvgarder : flagSauvgarder,
                },

                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }



        static Changer(index, matricule) {

    

            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/listday/changer`,
                {
                    index : index,
                    matricule : matricule,
                },

                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static SelectMois(matricule, mois, annee) {

        
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/listday/selectMois`,
                {
                    mois : mois,
                    matricule : matricule,
                    annee : annee
                },

                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

//____________________ Frais_ _________________________________________________________

        static Valider(nom, prenom, matricule, mois, annee, listDays, totalGeneral, valideListDays) {
        
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/valider`,
                {
                    nom: nom,
                    prenom: prenom,
                    matricule: matricule,
                    mois: mois,
                    annee: annee,
                    listDays: listDays,
                    totalGeneral: totalGeneral,
                    valideListDays: valideListDays
                },

                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static CheckMoisValider(matricule) {
        
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/checkmoisvalider`,
                {
                    matricule: matricule
                },

                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static Read() {
        
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static GenerateXSLX(fraiId) {
        
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/frai/generatexslx/${fraiId}`, 
                { 
                    responseType: "arraybuffer" 
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            });
        }

        static generateWORD(fraiId, nom, prenom) {
        
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/frai/generateword/${fraiId}/${nom}/${prenom}`, 
                { 
                    responseType: "arraybuffer" 
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            });
        }

        static validRH(fraiId){
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/validerh`,
                {
                    fraiId: fraiId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        
        static validDIR(fraiId){
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/validedir`,
                {
                    fraiId: fraiId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        static Paiment(fraiId, typePaiment, refTransaction){
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/paiment`,
                {
                    fraiId: fraiId,
                    typePaiment : typePaiment, 
                    refTransaction : refTransaction, 
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

        static SupprimerPaiment(fraiId){
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/supprimerpaiment`,
                {
                    fraiId: fraiId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static SupprimerFrais(fraiId, mois, annee, matricule) {
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/supprimerfrais`,
                {
                    fraiId: fraiId,
                    mois: mois,
                    annee: annee,
                    matricule: matricule
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }


        static PaimentDate(fraiId, datePaiment){
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/frai/paimentdate`,
                {
                    fraiId: fraiId,
                    datePaiment : datePaiment
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            })
        }

       //----------------------------Calendrier -------------------------------- 


    static SauvegarderCalendrier(listDays, mois, matricule, jour, number, annee) {


        const {
            client,
            countInput,
            disabled,
            flagSauvgarder,
            horaire,
            inspecteur,
            lieu,
            titre,
            valider
        } = listDays;

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/sauvgardercalendrier`,
            {
                client: client,
                countInput: countInput,
                disabled: disabled,
                flagSauvgarder: flagSauvgarder,
                horaire: horaire,
                inspecteur: inspecteur,
                lieu: lieu,
                titre: titre,
                valider: valider,
                mois: mois,
                matricule: matricule,
                jour: jour,
                number: number,
                annee: annee
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }



    static SelectMoisCalendrier(annee, mois) {

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/read`,
            {
                mois: mois,
                annee: annee
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }


    static SelectMoisCalendrierInspecteur(annee, mois, matricule) {

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/readInspecteur`,
            {
                mois: mois,
                annee: annee,
                matricule: matricule
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    static SelectMoisDaysAnneeCalendrierInspecteur(annee, mois, number, inspecteur) {

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/selectMoisDaysAnnee`,
            {
                annee: annee,
                mois: mois,
                number: number,
                matricule: inspecteur
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }


    static DeleteCalendrier(val, i, j, index) {

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/delete`,
            {
                val: val,
                i: i,
                j: j,
                index: index
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    static ValiderCalendrier(id, annee, mois, i, j, inspecteurId) {

        return new Promise((resolve, reject) => {

            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/validercalendrier`,
            {
                id: id,
                annee: annee,
                mois: mois,
                i: i,
                j: j,
                inspecteurId : inspecteurId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    // telecharger word agenda
    static TelechargerAgenda(list, mois, annee, inspecteur) {
        
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/calendriers/telechargeragenda`, 
            {
                list : list,
                mois : mois,
                annee : annee,
                inspecteur : inspecteur
            },
            { 
                responseType: "arraybuffer" 
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        });
    }

    ///// ____________________________________________ Supports Techniques _________________________________///:
    // telecharger word agenda
    static handelPdfSupports(filename) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL_DEV}/supports/display/${filename}`, {
                headers: this.headers,
                responseType: 'blob',
            })
                .then(response => {
                    resolve(response.request.responseURL);
                })
                .catch(error => {
                    reject(error.response.data);
                });

        })
    }
    //////------------------------------Caisse----------------------------------------------
    static EnregitreCheque(typePaiement, refTransaction, file, targetAffaire) {
        return new Promise((resolve, reject) => {
                
                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('typePaiement',typePaiement);
                formData.append('refTransaction',refTransaction);
                formData.append('targetAffaire',targetAffaire);

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/paiement/create`, formData, {
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


    static DeleteEmise(affaireId, nameFilePaiement) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/paiement/delete`, 
                { 
                    affaireId : affaireId,
                    nameFilePaiement : nameFilePaiement
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }




    // Get users Online
    static Online(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/online`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    // reject Online
    static rejectOnline(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/rejectonline`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }


    // check Notification Frais
    static checkNotificationFrais(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/checkNotificationFrais`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    static deleteCheckNotificationCalendrier(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/deleteCheckNotificationCalendrier`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }

    // Delete check Notification Frais
    static deleteCheckNotificationFrais(fraiId, adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/deleteCheckNotificationFrais`,
            {
                adminId : adminId,
                fraiId : fraiId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }
    // check Notification Calendrier
    static checkNotificationCalendrier(adminId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/admins/checkNotificationCalendrier`,
            {
                adminId : adminId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
        })
    }


    // ---------------------------CHAT CONTACTS---------------------------------------------------
    static ChatContact(currentContact, matricule) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/chats/create`, 
                { 
                    currentContact : currentContact,
                    matricule : matricule
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }
    //_________________________________ CHAT CONTENT --------------------------------------------
    
    static EnvoyerMessage(currentRoom, message, matricule) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/chatcontent/create`, 
                { 
                    chatId : currentRoom,
                    message : message,
                    clientId : matricule

                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }


    static EnregistrerClassAffaire(numeroAffaire, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/enregistrerRapportClass`, 
                { 
                    numeroAffaire : numeroAffaire,
                    niveauUn : niveauUn,
                    niveauDeux : niveauDeux,
                    niveauTrois : niveauTrois,
                    niveauQuatre : niveauQuatre,
                    niveauCinq : niveauCinq

                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    static ReadClassAffaire(numeroAffaire) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/readClassAffaire`, 
                { 
                    numeroAffaire : numeroAffaire,
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }


    static EffacerClassAffaire(numeroAffaire) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/effacerClassAffaire`, 
                { 
                    numeroAffaire : numeroAffaire,
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    static EnregistrerClassRapport(rapportId, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/enregistrerClassRapport`, 
                { 
                    rapportId : rapportId,
                    classOne : niveauUn,
                    classTow : niveauDeux,
                    classTree : niveauTrois,
                    classFour : niveauQuatre,
                    classFive : niveauCinq,
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    static DeleteClassRapport(rapportId) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/deleteClassRapport`, 
                { 
                    rapportId : rapportId
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    static EnregistrerClassShema(numeroAffaire, niveauUn, niveauDeux, niveauTrois, niveauQuatre, niveauCinq, index) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/enregistrerClassShema`, 
                { 
                    numeroAffaire : numeroAffaire,
                    niveauOne : niveauUn,
                    niveauTow : niveauDeux,
                    niveauTree : niveauTrois,
                    niveauFour : niveauQuatre,
                    niveauFive : niveauCinq,
                    index : index,
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    static DeleteClassShema(numeroAffaire, index) {
        return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/class/deleteClassShema`, 
                { 
                    numeroAffaire : numeroAffaire,
                    index : index
                }, 
                {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
       })
    }

    // Etalonnage -------------------------------------------------------------------------------------

        // create Etalonnage
        static createEtalonnage(etalonnage, file) {
            const {
                designation,
                marque,
                identification,
                etalonnieLe, 
                prochaineEtalonnage,
                certificatsEtalonnage,
              } = etalonnage;
    
            return new Promise((resolve, reject) => {
                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('designation',designation);
                formData.append('marque',marque);
                formData.append('identification',identification);
                formData.append('etalonnieLe',etalonnieLe);
                formData.append('prochaineEtalonnage',prochaineEtalonnage);
                formData.append('certificatsEtalonnage',certificatsEtalonnage);

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/create`, formData, {
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


        // read Etalonnage
        static readEtalonnage() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


        // Delete Etalonnage
        static deleteEtalonnage(filename) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/delete`,
                {
                    filename : filename
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        // Display Etalonnage
        static displayEtalonnage(filename) {

            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
    
            })
        }

        // Select Etalonnage
        static selectEtalonnage(etalonnageId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/select`,
                {
                    etalonnageId : etalonnageId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
        // deleteSalarie
        // Upadet Etalonnage
        static updateEtalonnage(etalonnageId, etalonnage, file) {

            const {
                designation,
                marque,
                identification,
                etalonnieLe, 
                prochaineEtalonnage,
                certificatsEtalonnage,
              } = etalonnage;
    
            return new Promise((resolve, reject) => {
                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('etalonnageId',etalonnageId);
                formData.append('designation',designation);
                formData.append('marque',marque);
                formData.append('identification',identification);
                formData.append('etalonnieLe',etalonnieLe);
                formData.append('prochaineEtalonnage',prochaineEtalonnage);
                formData.append('certificatsEtalonnage',certificatsEtalonnage);

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/etalonnages/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
    
            });
        }
    // Fiche Technique -------------------------------------------------------------------------------------

        // create Fiche Technique
        static createFicheTechnique(ficheTechnique, file) {
            const { designation, marque, identification, numFiche } = ficheTechnique;
    
            return new Promise((resolve, reject) => {
                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('designation', designation);
                formData.append('marque', marque);
                formData.append('identification', identification);
                formData.append('numFiche', numFiche);


                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fichetechniques/create`, formData, {
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


        // read Etalonnage
        static readFicheTechnique() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fichetechniques/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


        // Delete Etalonnage
        static deleteFicheTechnique(filename) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fichetechniques/delete`,
                {
                    filename : filename
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


        

        // Select Etalonnage
        static selectFicheTechnique(fichetechniqueId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fichetechniques/select`,
                {
                    fichetechniqueId : fichetechniqueId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }

        // Upadet Etalonnage
        static updateFicheTechnique(fichetechniqueId, ficheTechnique, file) {

            const { designation, marque, identification, numFiche } = ficheTechnique;

    
            return new Promise((resolve, reject) => {
                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('fichetechniqueId',fichetechniqueId);
                formData.append('designation',designation);
                formData.append('marque',marque);
                formData.append('identification',identification);
                formData.append('numFiche',numFiche);

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fichetechniques/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
    
            });
        }
    // Fiche Salarie -------------------------------------------------------------------------------------

        // Display Salarie
        static displaySalarie(filename) {

            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/salaries/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
    
            })
        }

        // create Fiche Salarie
        static createFicheSalarie(ficheSalarie, cin, diplome, photo, autres, medical) {

                const { 
                    adresse,
                    banque,
                    cnss,
                    dateEmbauche,
                    dateQuitter,
                    email,
                    identite,
                    matricule,
                    niveauEtude,
                    nom,
                    pays,
                    poste,
                    prenom,
                    rip,
                    telephone,
                    typeContart,
                    typeQuitter,
                    ville
                } = ficheSalarie;


                const form = new FormData();

                form.append(`files[${0}]`, cin);
                form.append(`files[${1}]`, diplome);
                form.append(`files[${2}]`, photo);
                form.append(`files[${3}]`, autres);
                form.append(`files[${4}]`, medical);

                form.append('adresse', adresse);
                form.append('banque', banque);
                form.append('cnss', cnss);
                form.append('dateEmbauche', dateEmbauche);
                form.append('dateQuitter', dateQuitter);
                form.append('email', email);
                form.append('identite', identite);
                form.append('matricule', matricule);
                form.append('niveauEtude', niveauEtude);
                form.append('nom', nom);
                form.append('pays', pays);
                form.append('poste', poste);
                form.append('prenom', prenom);
                form.append('rip', rip);
                form.append('telephone', telephone);
                form.append('typeContart', typeContart);
                form.append('typeQuitter', typeQuitter);
                form.append('ville', ville);



                    return new Promise((resolve, reject) => {
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/create`, form,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                        }})
                        .then(response => {
                                resolve(response.data);
                        })
                        .catch(error => {
                                reject(error.response.data);
                        });
            
                    });
    

           
        }


        // update Fiche Salarie
        static updateFicheSalarie(ficheSalarie, cin, diplome, photo, autres, medical, salarieId) {

                    const { 
                        adresse,
                        banque,
                        cnss,
                        dateEmbauche,
                        dateQuitter,
                        email,
                        identite,
                        matricule,
                        niveauEtude,
                        nom,
                        pays,
                        poste,
                        prenom,
                        rip,
                        telephone,
                        typeContart,
                        typeQuitter,
                        ville
                    } = ficheSalarie;
    
    
                    const form = new FormData();
    
                    form.append(`files[${0}]`, cin);
                    form.append(`files[${1}]`, diplome);
                    form.append(`files[${2}]`, photo);
                    form.append(`files[${3}]`, autres);
                    form.append(`files[${4}]`, medical);
                    form.append('salarieId', salarieId);
                    form.append('adresse', adresse);
                    form.append('banque', banque);
                    form.append('cnss', cnss);
                    form.append('dateEmbauche', dateEmbauche);
                    form.append('dateQuitter', dateQuitter);
                    form.append('email', email);
                    form.append('identite', identite);
                    form.append('matricule', matricule);
                    form.append('niveauEtude', niveauEtude);
                    form.append('nom', nom);
                    form.append('pays', pays);
                    form.append('poste', poste);
                    form.append('prenom', prenom);
                    form.append('rip', rip);
                    form.append('telephone', telephone);
                    form.append('typeContart', typeContart);
                    form.append('typeQuitter', typeQuitter);
                    form.append('ville', ville);
    
    
    
                        return new Promise((resolve, reject) => {
                            axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/update`, form,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                            }})
                            .then(response => {
                                    resolve(response.data);
                            })
                            .catch(error => {
                                    reject(error.response.data);
                            });
                
                        });  
            }

        // read Etalonnage
        static readSalaries() {

                    return new Promise((resolve, reject) => {
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/read`,
                        {
                            headers: {
                                 'Content-Type': 'application/json'
                             }
                         })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
                }
        // Delete Salarie
        static deleteSalarie(cin, diplome, photo, autres, medical, salarieId) {

                    return new Promise((resolve, reject) => {
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/delete`,
                        {
                            cin : cin,
                            diplome : diplome,
                            photo : photo,
                            autres : autres,
                            medical : medical,
                            salarieId : salarieId,
                        },
                        {
                            headers: {
                                 'Content-Type': 'application/json'
                             }
                         })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
        }
        // Delete Salaries
        static deleteSalaries(cins, diplomes, photos, autress, medicals,  salariesId) {

                    return new Promise((resolve, reject) => {
                        axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/deleteMany`,
                        {
                            cins : cins,
                            diplomes : diplomes,
                            photos : photos,
                            autress : autress,
                            medicals : medicals,
                            salariesId : salariesId,
                        },
                        {
                            headers: {
                                 'Content-Type': 'application/json'
                             }
                         })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
        }


        //select Fiche Salarie
        static selectFicheSalarie(salarieId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/salaries/select`,
                {
                    salarieId : salarieId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }


        //select conge by Admin
        static selectCongeAdmin(adminId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/conges/selectCongeAdmin`,
                {
                    adminId : adminId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }


        //create conge 
        static createConge(absence, file, matricule) {

            const { 
                date,
                nom,
                prenom,
                fonction,
                departement,
                motif,
                duree,
                nomberJours,
                nomberJoursOuvrables,
            } = absence;

            const typeAbsence = absence.typeAbsence[0];
            const dateDebutConge = duree.start;
            const dateFinConge = duree.fin;

            const form = new FormData();

            form.append(`file`, file);

            form.append('date', date);
            form.append('adminId', matricule);
            form.append('nom', nom);
            form.append('prenom', prenom);
            form.append('fonction', fonction);
            form.append('departement', departement);
            form.append('typeAbsence', typeAbsence);
            form.append('motif', motif);
            form.append('dateDebutConge', dateDebutConge);
            form.append('dateFinConge', dateFinConge);
            form.append('nomberJours', parseInt(nomberJours));
            form.append('nomberJoursOuvrables', parseInt(nomberJoursOuvrables));

            return new Promise((resolve, reject) => {
                    axios.post(`${VUE_APP_API_BASE_URL_DEV}/conges/create`, form,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                    }})
                    .then(response => {
                            resolve(response.data);
                    })
                    .catch(error => {
                            reject(error.response.data);
                    });
        
                });  
        }


        //select conge by Admin
        static readConges() {

                    return new Promise((resolve, reject) => {
                        axios.get(`${VUE_APP_API_BASE_URL_DEV}/conges/read`,
                        {
                            headers: {
                                 'Content-Type': 'application/json'
                             }
                         })
                            .then(response => {
                                resolve(response);
                            })
                            .catch(error => {
                                reject(error);
                            });
                    });
        }

        // Display Absence
        static displayAbsence(filename) {

            return new Promise((resolve, reject) => {
                        axios.get(`${VUE_APP_API_BASE_URL_DEV}/conges/display/${filename}`, {
                            headers: this.headers,
                            responseType: 'blob',
                        })
                            .then(response => {
                                resolve(window.open(URL.createObjectURL(response.data)));
                            })
                            .catch(error => {
                                reject(error.response.data);
                            });
            
            })
        }

        // Delete Absence
        static deleteAbsence(id, adminId, filename) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/conges/delete`,
                {
                    id : id,
                    adminId : adminId,
                    filename : filename
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }
        // valide Absence
        static valideAbsence(id, adminId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/conges/valide`,
                {
                    id : id,
                    adminId : adminId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        // invalide Absence
        static invalideAbsence(id, adminId) {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/conges/invalide`,
                {
                    id : id,
                    adminId : adminId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


//----------------------- Competences -------------------------------------------
    //create competences 
    static createCompetence(competence, file) {

        var formData = new FormData();

        if(file) {
            formData.append('file', file);
        }

        const { 
            connaissance,
            dateFormation,
            domaineFamille,
            metier,
            moduleFormation,
            nom,
            prenom,
            qualification,
        } = competence;


        formData.append('connaissance', connaissance);
        formData.append('dateFormation', dateFormation);
        formData.append('domaineFamille', domaineFamille);
        formData.append('moduleFormation', moduleFormation);
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('metier', metier);
        formData.append('qualification', qualification);

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/competences/create`, formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                    resolve(response.data);
            })
            .catch(error => {
                    reject(error.response.data);
            });
    
        });
    }

    // read Etalonnage
        static readCompetences() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/competences/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


        // Delete Competence
        static deleteCompetence(filename) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/competences/delete`,
                {
                    filename : filename
                },{
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            })
        }

        // Display Etalonnage
        static displayCompetence(filename) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/competences/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
            })
        }

        // Select Etalonnage
        static selectCompetence(competenceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/competences/select`,
                {
                    competenceId : competenceId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        // Upadet Etalonnage
        static updateCompetence(competenceId, competence, file, filename) {

            const { 
                connaissance,
                dateFormation,
                domaineFamille,
                metier,
                moduleFormation,
                nom,
                prenom,
                qualification,
            } = competence;

    
            return new Promise((resolve, reject) => {

                var formData = new FormData();

                if(file) {
                    formData.append('file', file);
                }

                formData.append('competenceId', competenceId);
                formData.append('connaissance', connaissance);
                formData.append('dateFormation', dateFormation);
                formData.append('domaineFamille', domaineFamille);
                formData.append('metier', metier);
                formData.append('moduleFormation', moduleFormation);
                formData.append('nom', nom);
                formData.append('prenom', prenom);
                formData.append('qualification', qualification);
                formData.append('filename', filename);

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/competences/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
    
            });
        }

        //----------------------- Agrement -------------------------------------------
    static createAgrement(agrement, file) {

        var formData = new FormData();

        if(file) {
            formData.append('file', file);
        }

        const { 
            dateArgument,
            dateExpiration,
            dateRenouvellement,
            duree,
            nomArgument,
            nomMinistre,
            preuve,
            status
        } = agrement;

        const date = new Date(dateExpiration);
        const dateExp = date.setMonth(date.getMonth() - 3);


        formData.append('dateArgument', dateArgument);
        formData.append('dateExpiration', dateExp);
        formData.append('dateRenouvellement', dateRenouvellement);
        formData.append('duree', duree);
        formData.append('nomArgument', nomArgument);
        formData.append('nomMinistre', nomMinistre);
        formData.append('preuve', preuve);
        formData.append('status', status);

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL_DEV}/agrements/create`, formData,
             {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                    resolve(response.data);
            })
            .catch(error => {
                    reject(error.response.data);
            });
    
        });
    }

        // read Etalonnage
        static readAgrements() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/agrements/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }


        // Delete Competence
        static deleteArgement(filename) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/agrements/delete`,
                {
                    filename : filename
                },{
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            })
        }

        // Display Etalonnage
        static displayAgrement(filename) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/agrements/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                    .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                    })
                    .catch(error => {
                        reject(error.response.data);
                    });
            });
        }

        // Select Etalonnage
        static selectAgrement(competenceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/agrements/select`,
                {
                    competenceId : competenceId
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        // Upadet Etalonnage
        static updateAgrement(argumentId, agrement, file, filename) {

            var formData = new FormData();

            if(file) {
                formData.append('file', file);
            }
    
            const { 
                dateArgument,
                dateExpiration,
                dateRenouvellement,
                duree,
                nomArgument,
                nomMinistre,
                preuve,
                status
            } = agrement;
    
            const date = new Date(dateExpiration);
            const dateExp = date.setMonth(date.getMonth() - 3);
    
            formData.append('argumentId', argumentId);
            formData.append('dateArgument', dateArgument);
            formData.append('dateExpiration', dateExp);
            formData.append('dateRenouvellement', dateRenouvellement);
            formData.append('duree', duree);
            formData.append('nomArgument', nomArgument);
            formData.append('nomMinistre', nomMinistre);
            formData.append('preuve', preuve);
            formData.append('status', status);
            formData.append('filename', filename);

    
            return new Promise((resolve, reject) => {

                axios.post(`${VUE_APP_API_BASE_URL_DEV}/agrements/update`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }})
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
    
            });
        }

        // -------------------------- Gestion Frais Salarie --------------------------------//
        static getFraisSalarieYear(inspecteur, annee) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/situations/read`,
                {
                    inspecteur : inspecteur,
                    annee : annee
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static createFraisSalarie(id, i, annee, inspecteur, current, after) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/situations/create`,
                {
                    id : id,
                    i : i,
                    annee : annee,
                    inspecteur : inspecteur,
                    current : current,
                    after : after
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }


        static deleteFraisSalarie(id, i, annee, inspecteur, current, after) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/situations/delete`,
                {
                    id : id,
                    i : i,
                    annee : annee,
                    inspecteur : inspecteur,
                    current : current,
                    after : after
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static TelechargerSituationFrais(inspecteur, annee) {
            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/situations/telecharger/${inspecteur}/${annee}`, 
                { 
                    responseType: "arraybuffer" 
                })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
    
            });
        }

        //------------------------- Sous- Traitance ------------------------------------
        static createSousTraitance(sousTraitance) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/sousTraitance/create`,
                {
                    sousTraitance : sousTraitance,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static updateSousTraitance(sousTraitance, sousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/sousTraitance/update`,
                {
                    sousTraitance : sousTraitance,
                    sousTraitanceId : sousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static selectSousTraitance(sousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/sousTraitance/select`,
                {
                    sousTraitanceId : sousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static deleteSousTraitance(sousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/sousTraitance/delete`,
                {
                    sousTraitanceId : sousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static readSousTraitance() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/sousTraitance/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        // -------------------------- Fournisseur --------------------------------------/
        static createFournisseur(fournisseur) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fournisseurs/create`,
                {
                    fournisseur : fournisseur,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static updateFournisseur(fournisseur, fournisseurId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fournisseurs/update`,
                {
                    fournisseur : fournisseur,
                    fournisseurId : fournisseurId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static selectFournisseur(fournisseurId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fournisseurs/select`,
                {
                    fournisseurId : fournisseurId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static deleteFournisseur(fournisseurId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fournisseurs/delete`,
                {
                    fournisseurId : fournisseurId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static readFournisseur() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/fournisseurs/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        //-------------------------------- InterlocuteurSousTraitance -------------------------------

        static createInterlocuteurSousTraitance(interlocuteurSousTraitance) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurSousTraitance/create`,
                {
                    interlocuteurSousTraitance : interlocuteurSousTraitance,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }
// selectInterlocuteurSousTraitance
        static updateInterlocuteurSousTraitance(interlocuteurSousTraitance, interlocuteurSousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurSousTraitance/update`,
                {
                    interlocuteurSousTraitance : interlocuteurSousTraitance,
                    interlocuteurSousTraitanceId : interlocuteurSousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static selectInterlocuteurSousTraitance(interlocuteurSousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurSousTraitance/select`,
                {
                    interlocuteurSousTraitanceId : interlocuteurSousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static deleteInterlocuteurSousTraitance(interlocuteurSousTraitanceId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurSousTraitance/delete`,
                {
                    interlocuteurSousTraitanceId : interlocuteurSousTraitanceId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static readInterlocuteurSousTraitance() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/interlocuteurSousTraitance/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        //------------------------ Depense ------------------------------
        static createDepense(depense, file) {

            const form = new FormData();
            form.append(`file`, file);
            
            const { 
                autreDepense,
                dateFacture,
                montantHT,
                montantHTT,
                nomSociete,
                numeroFacture,
                tauxTVA,
                type
            } = depense;

            form.append('autreDepense', autreDepense);
            form.append('dateFacture', dateFacture);
            form.append('montantHT', montantHT);
            form.append('montantHTT', montantHTT);
            form.append('nomSociete', nomSociete[1]);
            form.append('nomSocieteId', nomSociete[0]);
            form.append('numeroFacture', numeroFacture);
            form.append('tauxTVA', tauxTVA);
            form.append('type', type);
    
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/depences/create`, form,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
        
            });
        }

        static readDepense() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/depences/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        // selectInterlocuteurSousTraitance
        static updateDepense(depense, file, depenseId) {
            const form = new FormData();
            form.append(`file`, file);
            form.append(`depenseId`, depenseId);
            
            const { 
                autreDepense,
                dateFacture,
                montantHT,
                montantHTT,
                nomSociete,
                numeroFacture,
                tauxTVA,
                type,
                filename
            } = depense;

            form.append('autreDepense', autreDepense);
            form.append('dateFacture', dateFacture);
            form.append('montantHT', montantHT);
            form.append('montantHTT', montantHTT);
            form.append('nomSociete', nomSociete[1]);
            form.append('nomSocieteId', nomSociete[0]);
            form.append('numeroFacture', numeroFacture);
            form.append('tauxTVA', tauxTVA);
            form.append('type', type);
            form.append('filename', filename);
    
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/depences/update`, form,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
        
            });
        }

        static selectDepense(depenseId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/depences/select`,
                {
                    depenseId : depenseId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static deleteDepense(filename) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/depences/delete`,
                {
                    filename : filename,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        // Display Absence
        static displayDepense(filename) {

            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/depences/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                })
                .catch(error => {
                        reject(error.response.data);
                });
                    
            })
        }

        
        //------------------------ Charge D' exploitation ------------------------------
        static createChargeExploitation(charge, file) {

            const form = new FormData();
            form.append(`file`, file);
            
            const { 
                article,
                categorie,
                dateEcheance,
                dateFacture,
                modePaiement,
                montantHT,
                montantHTT,
                nomFournisseur,
                numeroFacture,
                paiement,
                tauxTVA,
                type
            } = charge;

            form.append('article', article);
            form.append('categorie', categorie);
            form.append('dateEcheance', dateEcheance);
            form.append('dateFacture', dateFacture);
            form.append('modePaiement', modePaiement);
            form.append('numeroFacture', numeroFacture);
            form.append('montantHT', montantHT);
            form.append('montantHTT', montantHTT);
            form.append('nomFournisseur', nomFournisseur[1]);
            form.append('nomFournisseurId', nomFournisseur[0]);
            form.append('paiement', paiement);
            form.append('tauxTVA', tauxTVA);
            form.append('type', type);
    
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/charges/create`, form,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
        
            });
        }

        static readChargeExploitation() {

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/charges/read`,
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }

        // selectChargeExploitation
        static updateChargeExploitation(charge, file, chargeId, filename) {

            console.log(charge, file, chargeId);

            const form = new FormData();

            form.append(`file`, file);
            form.append(`chargeId`, chargeId);
            form.append(`filename`, filename);
            
            const { 
                article,
                categorie,
                dateEcheance,
                dateFacture,
                modePaiement,
                montantHT,
                montantHTT,
                nomFournisseur,
                numeroFacture,
                paiement,
                tauxTVA,
                type
            } = charge;

            form.append('article', article);
            form.append('categorie', categorie);
            form.append('dateEcheance', dateEcheance);
            form.append('dateFacture', dateFacture);
            form.append('modePaiement', modePaiement);
            form.append('numeroFacture', numeroFacture);
            form.append('montantHT', montantHT);
            form.append('montantHTT', montantHTT);
            form.append('nomFournisseur', nomFournisseur[1]);
            form.append('nomFournisseurId', nomFournisseur[0]);
            form.append('paiement', paiement);
            form.append('tauxTVA', tauxTVA);
            form.append('type', type);

            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/charges/update`, form,
                 {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                        resolve(response.data);
                })
                .catch(error => {
                        reject(error.response.data);
                });
        
            });
        }

        static selectChargeExploitation(chargeId) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/charges/select`,
                {
                    chargeId : chargeId,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        static deleteChargeExploitation(filename) {
            return new Promise((resolve, reject) => {
                axios.post(`${VUE_APP_API_BASE_URL_DEV}/charges/delete`,
                {
                    filename : filename,
                },
                {
                    headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                .then(response => {
                        resolve(response);
                })
                .catch(error => {
                        reject(error);
                });
            });
        }

        // Display Absence
        static displayChargeExploitation(filename) {

            return new Promise((resolve, reject) => {
                axios.get(`${VUE_APP_API_BASE_URL_DEV}/charges/display/${filename}`, {
                    headers: this.headers,
                    responseType: 'blob',
                })
                .then(response => {
                        resolve(window.open(URL.createObjectURL(response.data)));
                })
                .catch(error => {
                        reject(error.response.data);
                });
                    
            })
        }
}


export default Service;
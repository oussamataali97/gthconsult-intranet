<template>
  <div class="indicateur">

      <div class="titre">
        <h2><i class="fa-solid fa-coins"></i> Gestion Achats-Fournisseur-Dépense</h2>
      </div>

      <div class="filter">
            <label for="nom">Rechercher par des années: </label>
            <select v-model="annee" @change="indicateur">
                <option v-for="item in years" :key="item" :value="item" > {{ item }} </option>
            </select>
      </div>

      <div class="parent">

        <div class="achat">
            <h3 @click="achtat()" >Achat</h3>
            <div class="mounths">

                <div>
                  <p>Janvier</p>

                  <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>

                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Février</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mars</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 0</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Avril</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mai</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juin</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juillet</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Août</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Septembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Octobre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Novembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>
                <div>
                  <p>Decembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>
            </div>
        </div>

        <div class="sous-traitanc">
            <h3 @click="sousTraitance()">Sous-Traitance</h3>
            <div class="mounths">

                <div>
                  <p>Janvier</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Février</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mars</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Avril</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mai</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juin</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juillet</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Août</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Septembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Octobre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Novembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>
                <div>
                  <p>Decembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

              </div>
        </div>

        <div class="charge">
            <h3 @click="chargeExploitation()">Charge en exploitation</h3>
            <div class="mounths">

                <div>
                  <p>Janvier</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Février</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mars</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Avril</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mai</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juin</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juillet</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Août</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Septembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Octobre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Novembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>
                <div>
                  <p>Decembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

            </div>
        </div>

        <div class="depense">
            <h3 @click="depense()">Autre dépense</h3>
            <div class="mounths">

                <div>
                  <p>Janvier</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Février</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mars</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Avril</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Mai</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juin</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Juillet</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Août</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Septembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Octobre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

                <div>
                  <p>Novembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>
                <div>
                  <p>Decembre</p>
                                    <p class="detailbutton" title="voir details" > <i class="fa-regular fa-eye" ></i></p>

                  <ul>
                    <li><i class="fa-solid fa-boxes-packing"></i> Fournisseurs: 2</li>
                    <li><i class="fa-solid fa-coins"></i> Achats : 2</li>
                    <li><i class="fa-solid fa-money-bill-transfer"></i> Dépenses : 2</li>
                    <li><i class="fa-solid fa-hand-holding-dollar"></i> Charges : 2</li>
                  </ul>
                </div>

            </div>
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
        facture : {
            factureJanvier : null,
            factureFevrier : null,
            factureMars : null,
            factureAvril : null,
            factureMai : null,
            factureJuin: null,
            factureJuillet : null,
            factureAout : null,
            factureSeptembre : null,
            factureOctober : null,
            factureNovembre : null,
            factureDecembre : null,
            paimentJanvier : null,
            paimentFevrier : null,
            paimentMars : null,
            paimentAvril : null,
            paimentMai : null,
            paimentJuin : null,
            paimentJuillet : null,
            paimentAout : null,
            paimentSeptembre : null,
            paimentOctober : null,
            paimentNovembre : null,
            paimentDecembre : null,
            attenteJanvier : null,
            attenteFevrier : null,
            attenteMars : null,
            attenteAvril : null,
            attenteMai : null,
            attenteJuin : null,
            attenteJuillet : null,
            attenteAout : null,
            attenteSeptembre : null,
            attenteOctober : null,
            attenteNovembre : null,
            attenteDecembre : null,
            emiseJanvier : null,
            emiseFevrier : null,
            emiseMars : null,
            emiseAvril : null,
            emiseMai : null,
            emiseJuin : null,
            emiseJuillet : null,
            emiseAout : null,
            emiseSeptembre : null,
            emiseOctober : null,
            emiseNovembre : null,
            emiseDecembre : null
        }
    }
  },

  methods : {

      indicateur() {
        Service.IndicteurFacture(this.annee)
          .then((result) => {
            this.facture = result.data;
          })
          .catch((error) => {
              console.log(error.message)
          });
      },

      achtat() {
        return this.$router.push("/achat");
      },

      sousTraitance() {

      },

      chargeExploitation() {
          return this.$router.push("/charge");
      },

      depense() {
        return this.$router.push("/depense");
      }



  },

  created() {

      // get year anee current
      const today = new Date();
      this.selectAnnee = today.getUTCFullYear();

      for(let i = this.selectAnnee; i >= 1970 ; i--) {
            this.years.push(i);
      }
//factureJanvier
      // get info Indicateur by current
      Service.IndicteurFacture(this.selectAnnee)
      .then((result) => {
            this.facture = result.data;
      })
      .catch((error) => {
          console.log(error.message)
      });
  }

}
</script>

<style scoped>

.indicateur{
  padding:2px 5px ;
}

.titre  h2{
  width: 100%;
  height: -webkit-fit-content;
  height: -moz-fit-content;
  height: fit-content;
  margin: 0;
  color: white;
  background: linear-gradient(346deg, rgba(207, 31, 33, 1) 0%, rgba(24, 86, 161, 1) 100%);
  text-align: center;
  padding: 15px;
  font-size: 25px;
}

.filter {

  background-color: rgb(238, 238, 238);
  display: flex;
  margin: 10px 10px;
  padding: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;

}

.filter select{
  padding: 10px;
  margin-left: 10px;
  border: 1px solid #bebebe;
  border-radius: 20px;
}

.filter select:focus-within{
outline:0;
}

.parent {
    width: 100%;
}

.parent {
display: grid;
grid-template-columns: repeat(2, 1fr);
column-gap: 30px;
row-gap: 20px;
}

.parent .achat, .parent .sous-traitanc, .parent .charge, .parent .depense {
  width: 100%;
  display: flex;
  flex-direction: column;

}

.parent .achat h3, .parent .sous-traitanc h3, .parent .charge h3, .parent .depense h3 {
  width: 100%;
  text-align: center;
  cursor: pointer;
  background-color: blueviolet;
  padding:10px;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  margin-bottom:10px;
  color:white;
}

.parent .achat .mounths, .parent .sous-traitanc .mounths, .parent .charge .mounths, .parent .depense .mounths {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap:20px;
  row-gap: 10px;
  font-weight: 600;
}

ul{
  font-weight: 400;
  background-color: rgb(245, 245, 245);
  padding:10px;
  line-height: 25px;
  border-radius: 20px;
  border-top-left-radius: 0;
}



.achat p, .depense p,.sous-traitanc p,.charge p {
  text-align: center;
  color:rgb(255, 56, 56);
  background-color: rgb(245, 245, 245);
  width: fit-content;
  font-weight: 700;
  padding:5px;

  text-transform: uppercase;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}



.parent svg{
  font-size: 15px;
  color:rgb(73, 73, 73);
}

.detailbutton{
  color:rgb(6, 92, 126) !important;
  text-decoration: underline;
  float: right;
  margin-right: 5px;
  transition: 0.4s;
}

.detailbutton:hover{
  color:rgb(130, 14, 197) !important;
  letter-spacing: 1px;

}

.detailbutton svg{
  color:rgb(130, 14, 197) !important;
  text-decoration: underline !important;
  font-size: 20px;
  transition: 0.4s;
  cursor: pointer;
}

.detailbutton:hover svg{
  color:rgb(6, 92, 126) !important;
  transform: scale(1.2);
}

</style>
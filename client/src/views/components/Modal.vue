<template>
  <transition name="modal-fade">
  <div class="modal-backdrop">
    <div class="modal">

      <header class="modal-header">
        <slot name="header">
          liste des missions
        </slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </header>

      <section class="modal-body">
        <slot name="body">
          <ul v-for="(item, index) in calendriers" :key="index">
                <li>Mission N° : {{ index + 1 }}</li>
                <li><i class="fa-solid fa-clipboard"></i> {{ item.titre }}</li>
                <li><i class="fa-solid fa-building"></i> {{ item.client }}</li>
                <li><i class="fa-solid fa-location-dot"></i> {{ item.lieu }}</li>
                <li><i class="fa-solid fa-calendar-days"></i> {{ new Date(item.date).toLocaleDateString() }}</li>
                <li><i class="fa-sharp fa-solid fa-clock"></i> {{ item.horaire[0].start +" - "+ item.horaire[0].fin  }}</li>
                <p class="valider" v-show="item.valider == true"> <i class="fa-regular fa-circle-check"></i> Mission accordée</p>
                <p class="nonvalider" v-show="item.valider == false"><i class="fa-regular fa-circle-xmark"></i> Mission non accordée</p>
                <p style="color : purple;margin-top: 5px;" v-show="item.valider == true"><i class="fa-solid fa-key"></i> {{ item._id }} </p>
          </ul>
        </slot>
       </section>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="close">
          Fermer
        </button>
      </footer>

    </div>
  </div>
 </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props : {
        calendriers : Array
    },

    methods: {
      close() {
        this.$emit('close');
      },
    }
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;

  }

  .modal {
    background: #FFFFFF;
    min-width: 500px;
    max-width: 600px;
    max-height: 400px;
    overflow: auto;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #fd0d0d;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    justify-content: center;
    text-transform: capitalize;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0px 30px;

  }

  .fa-circle-xmark{
    color: red !important;
  }

  .modal-body > ul {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom:2px dashed #241868;
    padding: 5px 10px;

  }

  .modal-body > ul > li{
    text-align: left;
    padding: 5px 0;
    width: 100%;
    border-bottom: 1px solid rgb(228, 228, 228);
    color:rgb(48, 48, 48);
    font-weight: 500;
    font-size: 18px;
    text-transform: capitalize;
  }

  .modal-body > ul > li:nth-child(1) {
    color: #3418b3;
  }

  .modal-body > ul > li:nth-child(7) {
    color: green;
  }

  .modal-body > ul svg {
    color:#243064;
    font-size: 20px;
    margin-right:10px;
  }



  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }



  .btn-green {
    color: white;
    background: #ff0808;
    border: 1px solid #fd0d0d;
    border-radius: 2px;
    margin-bottom: 10px;
    margin-top: 10px;
    height: 40px;
    cursor: pointer;
  }

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .fa-circle-check{
    color:green !important;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  .valider{
    color: green !important;
  }

  .nonvalider{
    color: red !important;
  }

</style>
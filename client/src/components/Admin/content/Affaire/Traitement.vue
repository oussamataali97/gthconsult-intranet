<template>
  <div class="traitement">
    <div class="alertt">
      <i class="fa-solid fa-bell"></i>
    </div>
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    <div class="message">
        <p>
            {{ msg }}
        </p>
    </div>
  </div>
</template>

<script>
export default {
    name : 'traitement',
    data() {
        return {

        }
    },
    props : {
        msg : String
    },
    methods: {

    }
}
</script>

<style scoped>
.traitement{
    height: fit-content;
    background-color: #1dd82d;
    width: 100%;
    padding: 10px;
    color: white !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 5px 0;
    position:relative;
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin-left: 10px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fffbfb transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }

}

.traitement .message   {
    margin-left: 10px;
}
.traitement .message p  {
    color: rgb(255, 255, 255);
    font-size: 18px;
}

.alertt svg{
  font-size: 40px;
  margin: 0 40px ;
  color :#13661a;
}

.alertt::after{
  content: '';
  width: 4px;
  height: 100%;
  position: absolute;
  top:0;
  background-color: #13661a;


}

</style>
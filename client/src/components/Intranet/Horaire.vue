<template>

  <div>
    <div v-for="i in max" :key="i">
          <input type="time" @input="transmitData" v-model="val[i]"/>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            val : [],
        }
    },

    props : {
            max : Number
    },
    methods:{
        transmitData(){
            this.$emit('transmit-data', this.val)
        }
    },


    created() {
        console.log(this.max);
    }

}
</script>

<style scoped>

</style>
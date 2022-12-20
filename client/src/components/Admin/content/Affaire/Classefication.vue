<template>
  <div class="classefication">
        <ul>
            <li><input type="text" name="" id=""></li>
            <li><i class="fa-solid fa-caret-down" @click="nested"></i></li>
        </ul>



  </div>
</template>

<script>
export default {
    name : 'classefication',
    data() {
        return {

        }
    },
    props : {
        i : Number
    },
    methods: {
        nested() {
            this.$emit("sendNested", 1)
        }

    }
}
</script>

<style scoped>

</style>
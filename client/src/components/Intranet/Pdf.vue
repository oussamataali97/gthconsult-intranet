<template>
<div>
    <object :data="path" type="application/pdf" width="100%" height="500px" title="pdf book"> </object>
</div>

</template>

<script>
import Service from "../../Service";
export default {

    data() {
        return {
                path : null
        };
    },

  props: {
    filepath: String,
  },

 methods: {

        handelPdf(filename) {
                Service.handelPdfSupports(filename)
                .then((response) => {
                    this.path = `${response}#toolbar=0`;
                })
                .catch((error) => {
                    console.log(error.message)
                });
        }
  },

  created() {
        this.handelPdf(this.filepath);
  }

}
</script>

<style scoped>

</style>
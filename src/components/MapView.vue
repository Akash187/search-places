<template>
  <div>
    <div id="error" v-if="error">
      Error Fetching Places!
    </div>
    <div v-else>
      <Sidenav :places="places"/>
      <GoogleMap :places="places"/>
    </div>
  </div>
</template>

<script>
  import GoogleMap from './GoogleMap'
  import Sidenav from './Sidenav'

  export default {
    name: "MapView",
    components: {
      GoogleMap,
      Sidenav
    },
    props: {
      places: {
        type: Object,
        required: true
      }
    },
    watch: {
      places: function(val, oldVal) {
        if(val.meta.code === 400){
          this.error = true;
        }
      }
    },
    data(){
      return{
        error: false
      }
    },
    mounted(){
      if(this.places.meta.code === 400){
        this.error = true;
      }
    }
  }
</script>

<style scoped>
  #error{
    height: 80vh;
    color: red;
    width: 100vw;
    font-size: 5vw;
    text-align: center;
  }
</style>
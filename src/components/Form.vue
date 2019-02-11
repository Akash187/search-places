<template>
  <form  v-on:submit.prevent="sendSearchResult">
    <input type="text" v-model="city" placeholder="Enter City" required>
    <input type="text" v-model="place" placeholder="Enter Place" required>
    <button>Search</button>
  </form>
</template>

<script>
  import {bus} from '../main';

  export default {
    name: "Form",
    data(){
      return {
        city: '',
        place: ''
      }
    },
    methods: {
      sendSearchResult: async function() {
        let info = {};
        try{
          const response = await fetch(`https://api.foursquare.com/v2/venues/explore?near=${this.city}&query=${this.place}&client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}&v=${process.env.VUE_APP_VERSION_DATE}`);
          info = await response.json();
        }catch (error){
          info = {meta: {code: 400}};
        }
        bus.$emit('showMapView', info);
      }
    }
  }
</script>

<style scoped>

</style>
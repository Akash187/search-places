<template>
  <div id="app">
    <Navbar @showMapView="showMapView" @showCarousal="showCarousal"/>
    <div v-if="this.component === 'Carousal'">
      <Carousal/>
    </div>
    <div v-else>
      <MapView :places="placesResult"/>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carousal from './components/Carousal.vue'
import MapView from './components/MapView.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    MapView,
    Carousal
  },
  data(){
    return {
      component: 'Carousal',
      placesResult: {}
    }
  },
  methods: {
    showMapView(data){
      console.log("Data : " + data);
      this.placesResult = data;
      this.component = 'MapView';
    },
    showCarousal(){
      this.component = 'Carousal'
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

<template>
  <div id="app">
    <Navbar @showCarousal="showCarousal"/>
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
import {bus} from './main'

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
  created(){
      bus.$on('showMapView', this.showMapView);
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

  /* Full-width input fields */
  input[type=text] {
    width: 100%;
    height: 6vh;
    font-size: 1rem;
    margin: 0 1vw;
    padding: 2vh 20px;
    border: 1px solid #ccc;
  }

  /* Set a style for all buttons */
  button {
    background-color: #4CAF50;
    color: white;
    padding: 0 15px;
    font-size: 1rem;
    width: auto;
    height: 6vh;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }

  @media only screen and (min-width: 900px) {
    #sidnav form{
      display: none;
    }
    #list{
      margin-top: 0;
      max-height: 90vh;
    }
  }

</style>

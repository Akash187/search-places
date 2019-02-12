<template>
  <div id="app">
    <Navbar @showCarousal="showCarousal" :activeComponent="component"/>
      <modal name="searchForm">
        <div class="modal-form">
          <button @click="$modal.hide('searchForm')">
            ❌
          </button>
          <keep-alive><Form></Form></keep-alive>
        </div>
      </modal>
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
import Form from './components/Form'
import {bus} from './main'

export default {
  name: 'App',
  components: {
    Navbar,
    MapView,
    Carousal,
    Form
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

  #search{
    display: none;
  }

  .v--modal-background-click{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .v--modal-box{
    top: 0 !important;
    left: 0 !important;
    height: 180px !important;
    width: 300px !important;
  }

  .modal-form form{
    /*display: none;*/
    display: flex;
    min-height: 140px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* Full-width input fields */
  .modal-form form input[type=text] {
    min-height: 32px;
    width: 80%;
    font-size: 1rem;
    margin: 1vh 1vw;
    padding: 2vh 20px;
    border: 1px solid #ccc;
  }

  .modal-form form button{
    min-height: 32px;
  }

  @media only screen and (min-width: 992px) {
    .sidenav form{
      display: none;
    }

    #hamburger-menu{
      display: none;
    }

    #search{
      display: block;
    }

    #searchIcon{
      display: none;
    }
  }

  @media only screen and (max-width: 992px) {
    #map{
      min-width: 100vw;
      position: fixed;
    }

    #searchIcon{
      display: block;
    }

    .sidenav{
      width: 0;
      left: -320px;
      transition: left 0.5s, width 0.5s;
      z-index: 999;
    }

    .sidenav-open{
      position: absolute;
      max-height: 100%;
      width: 324px;
      left: 0;
      transition: left 0.5s ease-in;
      display: block;
      z-index: 999;
    }

    .list-item{
      width: 320px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

</style>

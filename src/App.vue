<template>
  <div id="app">
    <Navbar/>
    <Map></Map>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
// import Carousal from './components/Carousal.vue'
import Map from './components/Map'

export default {
  name: 'app',
  components: {
    Navbar,
    // Carousal,
    Map
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

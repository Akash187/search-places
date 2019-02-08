<template>
  <div id="app">
    <Navbar/>
    <Carousal/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Carousal from './components/Carousal.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Carousal
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

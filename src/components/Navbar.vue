<template>
  <div id="nav">
    <div id="nav-menu" @click="openSidenav">
      <div v-if="activeComponent !== 'Carousal'" id="hamburger-menu" class="container">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      </div>
      <div id="title" @click="showCarousal">Search Places</div>
    </div>
    <div>
      <div id="search">
        <Form @receiveData="receiveData"></Form>
      </div>
      <div id="searchIcon">
        <img style="height: 6vh" @click="$modal.show('searchForm')" :src="require('@/assets/maps-and-flags.svg')">
      </div>
    </div>
  </div>
</template>

<script>
  import Form from './Form';

  export default {
    name: "Navbar",
    components: {
      Form
    },
    props:{
      activeComponent: {
        type: String,
        required: true
      }
    },
    methods: {
      receiveData: function(info){
        this.$emit('showMapView', info);
      },
      showCarousal: function(){
        try{
          document.getElementById('hamburger-menu').classList.remove('change');
          document.getElementById('sidenav').classList.remove('sidenav-open');
        }catch (e){
          console.log("Error xyz: ", e);
        }
        this.$emit('showCarousal');
      },
      openSidenav: function () {
        document.getElementById('hamburger-menu').classList.toggle('change');
        document.getElementById('sidenav').classList.toggle('sidenav-open');
      },
    }
  }
</script>

<style scoped>
  #nav{
    height: 10vh;
    top: 0;
    position: relative;
    align-items: center;
    background-color: #000066;
    box-shadow: 2px 2px 1px #aaaaaa;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }

  #nav-menu{
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #title{
    color: yellow;
    font-size: 8vh;
    cursor: pointer;
  }

  #title:hover{
    opacity: 0.8;
  }

  #search form{
    display: flex;
    align-items: center;
  }

  .container {
    display: inline-block;
    cursor: pointer;
    margin-right: 1rem;
  }

  .bar1, .bar2, .bar3 {
    width: 35px;
    height: 5px;
    background-color: #ffcb6b;
    margin: 6px 0;
    transition: 0.4s;
  }

  .change .bar1 {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-9px, 6px);
  }

  .change .bar2 {opacity: 0;}

  .change .bar3 {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }

  @media only screen and (max-width: 560px) {
    #title{
      font-size: 5vh;
    }
  }
</style>
<template>
  <div id="nav">
    <div id="title" @click="showCarousal">Search Places</div>
    <div id="search">
      <Form @receiveData="receiveData"></Form>
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
    methods: {
      receiveData: function(info){
        this.$emit('showMapView', info);
      },
      showCarousal: function(){
        this.$emit('showCarousal');
      }
    }
  }
</script>

<style scoped>
  #nav{
    align-items: center;
    background-color: #000066;
    box-shadow: 2px 2px 1px #aaaaaa;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
  }

  #title{
    height: 10vh;
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
</style>
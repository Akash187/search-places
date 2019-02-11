<template>
  <div id="nav">
    <div id="title" @click="showCarousal">Search Places</div>
    <form id="search" v-on:submit.prevent="searchPlaces">
      <input type="text" v-model="city" placeholder="Enter City" required>
      <input type="text" v-model="place" placeholder="Enter Place" required>
      <button>Search</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data(){
      return {
        city: '',
        place: ''
      }
    },
    methods: {
      searchPlaces: async function() {
        let info = {};
        try{
          const response = await fetch(`https://api.foursquare.com/v2/venues/explore?near=${this.city}&query=${this.place}&client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}&v=${process.env.VUE_APP_VERSION_DATE}`);
          info = await response.json();
        }catch (error){
          info = {meta: {code: 400}};
        }
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
    background-color: #1fbbff;
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

  #search{
    display: flex;
    align-items: center;
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
    padding: 10px 15px;
    font-size: 1rem;
    width: auto;
    height: 6vh;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
</style>
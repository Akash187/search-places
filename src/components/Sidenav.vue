<template>
  <div>
    <div id="sidenav" class="sidenav">
      <div id="list">
        <div v-for="venue in venues">
          <h2 @click="showInfoWindow(venue.id)" class="list-item">{{venue.name}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from './Form'
  import {bus} from '../main'

  export default {
    name: "Sidenav",
    components: {
      Form
    },
    data(){
      return{
        venues: []
      }
    },
    props: {
      places: {
        type: Object,
        required: true
      }
    },
    watch: {
      places: function(val, oldVal) {
        this.places = val;
        this.initializeVenue();
      }
    },
    mounted(){
      this.initializeVenue();
    },
    computed: {
      initializeVenue: function(){
        this.venues = [];
        this.places.response.groups[0].items.forEach((place) => {
          this.venues.push({name: place.venue.name, id: place.venue.id});
        });
      }
    },
    methods: {
      showInfoWindow : function (id) {
        bus.$emit('showInfo', id)
      }
    }
  }
</script>

<style>
  .sidenav {
    max-height: 90vh;
    min-height: 90vh;
    width: 30vw;
    background-color: bisque;
  }



  #list{
    overflow-y: scroll;
    max-height: 90vh;
    background-color: white;
  }

  #list::-webkit-scrollbar {
    width: 0.25rem;
  }

  #list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  #list::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .list-item{
    padding: 1vh 0 1vh 1vw;
    color: brown;
    background-color: bisque;
    width: 100%;
    border-bottom: 1px solid brown;
    cursor: pointer;
  }

  .list-item:hover{
    opacity: 0.8;
    background-color: brown;
    color: white;
  }
</style>
<template>
  <div>
    <div id="sidnav">
      <Form class="show-medium"></Form>
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

          console.log(place);
          this.venues.push({name: place.venue.name, id: place.venue.id});
        });
      }
    },
    methods: {
      showInfoWindow : function (id) {
        console.log(id);
        bus.$emit('showInfo', id)
      }
    }
  }
</script>

<style>
  #sidnav{
    max-height: 90vh;
    width: 30vw;
    background-color: #20048b;
  }

  #sidnav form{
    /*display: none;*/
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  /* Full-width input fields */
  #sidnav form input[type=text] {
    height: 6vh;
    width: 80%;
    font-size: 1rem;
    margin: 1vh 1vw;
    padding: 2vh 20px;
    border: 1px solid #ccc;
  }

  #list{
    overflow-y: scroll;
    max-height: 67vh;
    margin-top: 1vh;
  }

  .list-item{
    padding: 1vh 0 1vh 1vw;
    color: brown;
    background-color: bisque;
    width: 100%;
    border-bottom: 1px solid brown;
    cursor: pointer;
  }
</style>
<template>
    <div>
      <div ref="googleMap" id="map"></div>
    </div>
</template>

<script>
  import GoogleMapsApiLoader from "google-maps-api-loader";
  import { bus } from '../main';

  export default {
    name: "GoogleMap",
    props: {
      places: {
        type: Object,
        required: true
      }
    },
    watch: {
      places: function(val, oldVal) {
        this.searchResult = val;
        this.markers = [];
        this.initializeMap();
      }
    },
    data() {
      return {
        google: null,
        searchResult: {},
        markers: [],
        infoWindows: []
      };
    },
    created(){
      bus.$on('showInfo', this.showInfoWindow);
    },
    async mounted() {
      this.searchResult = this.places;
      this.google = await GoogleMapsApiLoader({
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
      });
      this.initializeMap();
    },

    methods: {
      initializeMap: function () {

        let google = this.google;
        const mapContainer = this.$refs.googleMap;
        const map = new google.maps.Map(mapContainer, {
          zoom: 10,
          center: this.searchResult.response.geocode.center,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap']
          }
        });

        this.searchResult.response.groups[0].items.map((place) => {
          let marker = new google.maps.Marker({
            position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
            map: map,
            id: place.venue.id,
            animation: google.maps.Animation.DROP,
            title: place.venue.name
          });

          let fullAddress = '';
          place.venue.location.formattedAddress.forEach((part) => {
            fullAddress += part;
            fullAddress += ', ';
          });
          fullAddress = fullAddress.substring(0, fullAddress.length - 2) + '.';

          marker.addListener('click', () => {
            this.infowindow(map, marker, marker.id, marker.title, fullAddress);
          });

          marker.addListener('mouseover', () => {
            this.toggleBounce(marker, google);
          });

          this.markers.push(marker);
        });
      },
      toggleBounce : function (marker, google) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function () {
            marker.setAnimation(null);
          }, 400);
        }
      },
      infowindow : function(marker, map, id, title, address){
        //close the previous infoWindow
        this.infoWindows.forEach((infoWindow) => {
          infoWindow.close();
        });
        this.infoWindows = [];

        //fetching image using location id and showing on infowindow
        fetch(`https://api.foursquare.com/v2/venues/${id}/photos?client_id=${process.env.VUE_APP_CLIENT_ID}&client_secret=${process.env.VUE_APP_CLIENT_SECRET}&v=${process.env.VUE_APP_VERSION_DATE}`).then((res) => {
          return res.json();
        }).then((data) => {
          let image = data.response.photos.items[0];
          let content =`<h3>${title}</h3><img src=\"${image.prefix}320x240${image.suffix}\"/><div>Address: ${address}</div>`;
          let info = new this.google.maps.InfoWindow({
            content
          });
          info.open(marker, map);
          this.infoWindows.push(info);
        }).catch((error) => {
          let content =`<h3>${title}</h3><img src=\"/img/errorImage.jpg"/><div style="max-width: 240px"><h3>Address: </h3> ${address}</div>`;
          let info = new this.google.maps.InfoWindow({
            content
          });
          info.open(marker, map);
          this.infoWindows.push(info);
        });
      },

      showInfoWindow: function (id) {
        this.markers.forEach((marker) => {
          if(marker.id === id){
            this.google.maps.event.trigger(marker,'click');
          }
        });
      }
    }
  };
</script>

<style>
  #map {
    min-width: 70vw;
    min-height: 90vh;
  }
</style>

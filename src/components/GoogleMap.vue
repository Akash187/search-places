<template>
    <div>
      <div ref="googleMap" id="map"></div>
    </div>
</template>

<script>
  import GoogleMapsApiLoader from "google-maps-api-loader";

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
        map: null,
        searchResult: {},
        markers: [],
        infoWindows: []
      };
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
          zoom: 12,
          center: this.searchResult.response.geocode.center,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap']
          }
        });

        this.map = map;

        this.searchResult.response.groups[0].items.map((place) => {
          let marker = new google.maps.Marker({
            position: {lat: place.venue.location.lat, lng: place.venue.location.lng},
            map: map,
            id: place.venue.id,
            animation: google.maps.Animation.DROP,
            title: place.venue.name
          });

          marker.addListener('click', () => {
            this.infowindow(map, marker, marker.id, marker.title);
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
      infowindow : function(marker, map, id, title){
        let info;

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
          let content =`<h3>${title}</h3><img src=\"${image.prefix}320x240${image.suffix}\"/>`;
          let info = new this.google.maps.InfoWindow({
            content
          });
          info.open(marker, map);
          this.infoWindows.push(info);
        }).catch((error) => {
          let content =`<h3>${title}</h3><img src=\"/img/errorImage.jpg"/>`;
          let info = new this.google.maps.InfoWindow({
            content
          });
          info.open(marker, map);
          this.infoWindows.push(info);
        });
      },

      showInfoWindow: function () {
        this.markers.forEach((marker) => {
          if(marker.id === '43a48f1bf964a520502c1fe3'){
            this.google.maps.event.trigger(marker,'click');
          }
        });
      }
    }
  };
</script>

<style>
  #map {
    width: 100vw;
    min-height: 90vh;
  }
</style>

<template>
    <div>
      <div ref="googleMap" id="map"></div>
    </div>
</template>

<script>
  import GoogleMapsApiLoader from "google-maps-api-loader";

  export default {
    name: "Map",
    data() {
      return {
        google: null,
        places: [
          {
            title: 'SoHo Grand Hotel Club Room',
            lat: 40.7219580076,
            lng: -74.0042521736,
            show: true,
            selected: false,
            address: '310 W Broadway (btwn Grand and Canal)',
            venue_id: '4c899f201eafb1f79c847335'
          }, {
            title: 'Bruins Stadium',
            lat: 40.8050065819,
            lng: -74.0016746521,
            show: true,
            selected: false,
            address: 'North Hudson Park',
            venue_id: '4e11eeaeb61c637b97b194e1'
          },
          {
            title: 'Stadium Storage',
            lat: 40.6923543,
            lng: -73.9854427,
            show: true,
            selected: false,
            address: '365 Bridge St',
            venue_id: '566735d6498e84c17f64f68b'
          }
        ]
      };
    },
    async mounted() {
      this.google = await GoogleMapsApiLoader({
        apiKey: process.env.VUE_APP_GOOGLE_MAPS_API_KEY
      });
      this.initializeMap();
    },

    methods: {
      initializeMap: function () {
        let self = this;
        let google = this.google;
        const mapContainer = this.$refs.googleMap;
        const map = new google.maps.Map(mapContainer, {
          zoom: 10,
          center: {lat: 40.703093539, lng: -73.9874421126},
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap']
          }
        });

        let contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
          '<div id="bodyContent">' +
          '<p><b>Paris</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
          'sandstone rock formation in the southern part of the ' +
          'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
          'south west of the nearest large town, Alice Springs; 450&#160;km ' +
          '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
          'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
          'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
          'Aboriginal people of the area. It has many springs, waterholes, ' +
          'rock caves and ancient paintings. Uluru is listed as a World ' +
          'Heritage Site.</p>' +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>';

        this.places.map((place) => {
          let marker = new google.maps.Marker({
            position: {lat: place.lat, lng: place.lng},
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Uluru (Ayers Rock)'
          });
          marker.addListener('click', () => {
            this.infowindow(map, marker, contentString);
          });
          marker.addListener('mouseover', () => {
            this.toggleBounce(marker, google);
          });
        });
      },
      toggleBounce : function (marker, google) {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function () {
            marker.setAnimation(null);
          }, 1000);
        }
      },
      infowindow : function(marker, map, content){
        let info = new this.google.maps.InfoWindow({
          content
        });
        info.open(marker, map);
        setTimeout(function () { info.close(); }, 3000);
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

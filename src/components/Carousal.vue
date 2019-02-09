<template>
  <div>
    <div id="carousal-text">
      <h1>Search Places Nearby </h1>
      <VueTyper
          :text='["Bangkok","London","Mumbai","Paris","Dubai","Singapore","New York","Kuala Lumpur","Tokyo", "Anywhere"]'
          :repeat='Infinity'
          :shuffle='false'
          initial-action='typing'
          :pre-type-delay='70'
          :type-delay='70'
          :pre-erase-delay='2000'
          :erase-delay='250'
          erase-style='clear'
          :erase-on-complete='false'
          caret-animation='blink'
      />
    </div>
    <div id="carousal">
      <img class="mySlides" :src="require('@/assets/carousal_img2.jpg')">
      <img class="mySlides" :src="require('@/assets/carousal_img3.jpg')">
      <img class="mySlides" :src="require('@/assets/carousal_img4.jpg')">
      <img class="mySlides" :src="require('@/assets/carousal_img5.jpg')">
    </div>
  </div>
</template>

<script>
  import { VueTyper } from 'vue-typer';

  export default {
    name: "Carousal",
    components: {
      VueTyper
    },
    mounted(){
      let myIndex = 0;
      carousel();

      function carousel() {
        let i;
        let x = document.getElementsByClassName("mySlides");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        myIndex++;
        if (myIndex > x.length) {myIndex = 1}
        x[myIndex-1].style.display = "block";
        setTimeout(carousel, 2000); // Change image every 2 seconds
      }
    }
  }
</script>

<style>

  #carousal-text{
    position: fixed;
    top: 10vh;
    width: 100%;
    height: 80vh;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #carousal-text h1{
    font-size: 5vw;
    color: brown;
  }

  .vue-typer{
    margin-left: 1vw;
    font-size: 5vw;
    max-font-size: 1rem;
  }

  .vue-typer .custom.char.typed {
    color: orange;
  }


  #carousal{
    height: 90vh;
  }
  .mySlides{
    object-fit: cover;
    width: 100vw;
    height: 100%;
    animation:fading 2s infinite
  }

  @keyframes fading{
    0%{opacity: 0.5}
    100%{opacity: 1}
  }
</style>
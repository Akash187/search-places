<template>
  <div id="carousal">
    <img class="mySlides" :src="require('@/assets/carousal_img2.jpg')">
    <img class="mySlides" :src="require('@/assets/carousal_img3.jpg')">
    <img class="mySlides" :src="require('@/assets/carousal_img4.jpg')">
    <img class="mySlides" :src="require('@/assets/carousal_img5.jpg')">
  </div>
</template>

<script>
  export default {
    name: "Carousal",
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

<style scoped>

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
<template>
  <div id="nav">
    <div id="title">Search Places</div>
    <form id="search">
      <input type="text" placeholder="Enter City" required>
      <input type="text" placeholder="Enter Place" required>
      <button @click="" >Search</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Navbar"
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
  }

  #search{
    display: flex;
    align-items: center;
  }

  /* Full-width input fields */
  input[type=text] {
    width: 100%;
    height: 8vh;
    font-size: 1rem;
    margin: 0 1vw;
    padding: 1vh 20px;
    border: 1px solid #ccc;
  }

  /* Set a style for all buttons */
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    font-size: 1rem;
    width: auto;
    height: 8vh;
    border: none;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }
</style>
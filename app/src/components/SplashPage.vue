<template>
  <div id="app">
    <SplashForm/>
  </div>
</template>

<script>
import SplashForm from './SplashForm.vue'
export default {
  name: 'app',
  components: {
   SplashForm 
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5c81a7;
  margin-top: 60px;
}
</style>

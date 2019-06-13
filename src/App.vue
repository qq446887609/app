<template>
  <div id="app">
    <router-view/>
    <div class="bottoms"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
    
    }
  },
  methods:{
  
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.bottoms{
  height: .88rem;
  width: 100%;
}
</style>

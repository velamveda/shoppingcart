<template>
 <div class="app">
    <nav-bar/>
    <router-view/>
    <footer-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from '@/components/NavBar.vue'
import footerView from '@/views/FooterView.vue'
export default {
  name: 'App',
  components: { navBar,
  footerView }
}
</script>
<style>
@import "assets/main.css";
*{
  padding:0;
  margin:0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>

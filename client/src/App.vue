<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>
<script>

// import Login from '../src/components/Login'

export default {
  name: "Home",
  components: {

    // Login
  },
};
</script>

<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

*{
font: 1em/1.25em 'Lato',Helvetica,Arial,sans-serif;
}
</style>

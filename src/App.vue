<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    let conn = this.$ls.get('connection')
    console.log(conn)
    if (conn != null) {
      this.$store.commit('initConnection', conn)
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: lighter;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

code {
  padding: 2px 4px;
  font-size: 90%;
  color: #2752a3;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>

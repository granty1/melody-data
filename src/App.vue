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
  color: #2c3e50;
}

.description {
  font-size: 12px;
  text-align: center;
}

code {
  padding: 2px 4px;
  font-size: 90%;
  color: #2752a3;
  background-color: #f9f2f4;
  border-radius: 4px;
}
</style>

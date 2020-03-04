<template>
  <div id="app">
     <v-tabs background-color="#F8BBD0" color="#FFFFFF">
    <v-tab to='/'>GetUsers</v-tab>
    <v-tab to='/create'>CreateUser</v-tab>
  </v-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

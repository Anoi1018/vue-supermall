<template>
  <div id="app">
    <keep-alive exclude="Details">
      <router-view/>
    </keep-alive>
    <main-tab-bar v-show="$route.meta.showTabbar"/>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabbar/MainTabBar.vue";

export default {
  name: 'App',
  components: {
    MainTabBar

  }
}
</script>

<style>
 @import "assets/css/base.css";
</style>

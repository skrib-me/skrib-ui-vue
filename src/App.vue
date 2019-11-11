<template>
  <div id="app">
    <Navigation />
    <main class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  components: {
    Navigation
  },
  created () {
    this.$me()
  }
}
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
@import '@/assets/styles/skrib-theme.scss';

#app {
  text-align: center;
}

main {
    padding-top: 1em;
}
</style>

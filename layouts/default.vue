<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav=false"
    />
    <Nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheHeader from '@/components/Navigation/TheHeader.vue'
import TheSidenav from '@/components/Navigation/TheSidenav.vue'

@Component({
  components: { TheHeader, TheSidenav }
})
export default class extends Vue {
  public displaySidenav = false
}
</script>
<!--script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheSidenav from '@/components/Navigation/TheSidenav'
export default {
  name: 'Default',
  // middleware:'log',
  components: {
    TheHeader,
    TheSidenav
  },
  data () {
    return {
      displaySidenav: false
    }
  }
}
</script-->
<style>
html {
  font-family: 'M PLUS Rounded 1c', sans-serif;
}
body{
  margin: 0;
}

</style>

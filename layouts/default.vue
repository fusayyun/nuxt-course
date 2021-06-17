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
  /** 是否顯示側邊欄 */
  public displaySidenav = false
}
</script>

<style>
html {
  font-family: 'M PLUS Rounded 1c', sans-serif;
}
body{
  margin: 0;
}

</style>

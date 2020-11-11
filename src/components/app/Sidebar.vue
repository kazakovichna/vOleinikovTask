<template>
  <div class="sidebar">
    <ul class="sidenav app-sidenav" :class="{open: value}">
      <router-link
        v-for="link in links"
        :key="link.url"
        tag="li"
        active-class="active"
        :to="link.url"
        :exact="link.exact"
      >
        <a href="#" class="waves-effect waves-orange pointer">{{link.title}}</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'Sidebar',
  props: ['value'],
  data () {
    return {
      links: [
        { title: localizeFilter('Menu_Bill'), url: '/', exact: true },
        { title: localizeFilter('Menu_History'), url: '/history', exact: false },
        { title: localizeFilter('Menu_Planning'), url: '/planning', exact: false },
        { title: localizeFilter('Menu_Record'), url: '/record', exact: false },
        { title: localizeFilter('Menu_Category'), url: '/categories', exact: false }
      ]
    }
  }
}
</script>

<style scoped>

</style>

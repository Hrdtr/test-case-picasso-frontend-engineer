<template>
  <div
    class="menu-container"
    :class="
      !view.atTopOfPage ? 'border-b-0 shadow-lg' : 'border-b-2 shadow-none'
    "
  >
    <div class="container mx-auto flex flex-row items-center flex-no-wrap px-6">
      <NuxtLink
        to="/admin"
        active-class="null"
        class="
          focus:outline-none focus:shadow-none
          menu-logo
          transform
          transition-all
          duration-500
        "
        :class="
          !view.atTopOfPage
            ? 'show-logo scale-100 -ml-px'
            : 'hide-logo scale-0 ml-0'
        "
      >
        PR
      </NuxtLink>
      <div
        class="
          flex flex-row flex-no-wrap
          overflow-x-auto
          transition-all
          duration-500
          no-scrollbar
        "
        :class="
          !view.atTopOfPage
            ? 'ml-3 pl-4 border-l-2 border-gray-200'
            : 'ml-0 pl-0 border-l-0 border-white'
        "
      >
        <NuxtLink
          v-for="(item, i) in submenus"
          :key="i"
          :to="item.path"
          class="
            py-3
            text-gray-600
            hover:text-gray-900
            mr-5
            border-b-2 border-transparent
          "
          exact
        >
          {{ item.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      view: {
        atTopOfPage: true
      }
    }
  },
  computed: {
    submenus() {
      return this.$state.navigations
        .concat(this.$state.moreNavigations)
        .find(
          ({ path }) => path.split('/')[1] === this.$route.path.split('/')[1]
        ).sub
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 60) {
        this.view.atTopOfPage = false
      } else {
        this.view.atTopOfPage = true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.nuxt-link-active {
  --tw-text-opacity: 1;
  color: #111827;
  color: rgba(17, 24, 39, var(--tw-text-opacity));
  border-bottom-width: 2px;
  --border-opacity: 1;
  border-color: #4a5568;
  border-color: rgba(74, 85, 104, var(--text-opacity));
}

.menu-container {
  @apply bg-white sticky top-0 z-20 border-gray-200 transition-all duration-700;
}
.menu-logo {
  @apply font-semibold tracking-widest text-gray-900 uppercase rounded-md;
}

.show-logo {
  max-width: 70px;
}
.hide-logo {
  max-width: 0;
}
</style>

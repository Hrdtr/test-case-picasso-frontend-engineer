<template>
  <transition name="page">
    <div v-if="$state.auth.isLoggedIn === null || loading"><Loader /></div>
    <div v-else>
      <Alert />
      <BaseNavigation />
      <BaseMenu />
      <BaseHero />
      <Nuxt />
      <BaseFooter />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Default',
  data() {
    return {
      loading: true
    }
  },
  watch: {
    // '$store.state.auth.loggedIn'(val) {
    //   if (!val) {
    //     this.$router.push('/admin/login')
    //   } else if (val) {
    //     this.loading = false
    //   }
    // },
  },
  async created() {
    try {
      const auth = await this.$actions.checkAuthState()
      if (auth) {
        this.loading = false
      }
    } catch (error) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="postcss">
* {
  @apply transition-all duration-200 ease-in-out;
}

.page-enter-active,
.page-leave-active {
  opacity: 1;
  transition: opacity 0.4s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>

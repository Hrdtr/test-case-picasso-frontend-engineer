<template>
  <div class="text-gray-600 bg-white">
    <div class="nav-section">
      <div class="py-5 flex flex-row items-center justify-between">
        <NuxtLink to="/" active-class="null" class="nav-logo">PR</NuxtLink>
        <button
          class="
            lg:hidden
            rounded-lg
            focus:outline-none focus:shadow-outline
            -mr-1
          "
          @click="showMenu = !showMenu"
        >
          <svg fill="#000" viewBox="0 0 20 20" class="w-6 h-6">
            <path
              v-if="!showMenu"
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
            <path
              v-if="showMenu"
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <nav :class="showMenu ? 'flex' : 'hidden'" class="more-wrapper">
        <NuxtLink
          v-for="(item, i) in $state.navigations"
          :key="i"
          :to="item.path"
          :exact="item.path === '/'"
          class="nav-menu-item"
          @click.native="showMenu = false"
          >{{ item.name }}</NuxtLink
        >
        <div class="relative">
          <button
            class="more-button"
            :class="showMore ? 'text-gray-900' : ''"
            @click="showMore = !showMore"
            @blur="showMore = false"
          >
            <span>More</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              :class="showMore ? 'rotate-180' : 'rotate-0'"
              class="more-icon"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <transition name="more">
            <div v-if="showMore" class="more">
              <div class="px-2 py-2 bg-white rounded-md shadow-xl">
                <div v-for="(item, i) in $state.moreNavigations" :key="i">
                  <NuxtLink
                    :to="item.path"
                    class="block more-menu-item"
                    exact
                    @click.native="
                      () => {
                        showMore = false
                        showMenu = false
                      }
                    "
                    >{{ item.name }}</NuxtLink
                  >
                </div>
                <button
                  href="#"
                  class="text-left more-menu-item"
                  :disabled="loggingOut"
                  @click="logout"
                >
                  Logout
                </button>
              </div>
            </div>
          </transition>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggingOut: false,
      showMenu: false,
      showMore: false
    }
  },
  methods: {
    async logout() {
      this.loggingOut = true
      try {
        const res = await this.$axios.delete(
          'https://api.picassorewards.com:8443/v1/auth/logout'
        )
        this.$actions.setAuthState({
          isLoggedIn: false,
          token: null,
          adminId: null
        })
        this.$actions.setAlertState({
          isVisible: true,
          type: 'info',
          message: res.data.message
        })
        // Remove data from localStorage
        localStorage.removeItem('pa-accessToken')
        localStorage.removeItem('pa-adminId')
        this.$router.push('/login')
      } catch (error) {
        this.loggingOut = false
        this.$actions.setAlertState({
          isVisible: true,
          type: 'error',
          message: error.response.data.message
        })
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
}
@media (min-width: 1024px) {
  .nuxt-link-active {
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: #edf2f7 !important;
  }
}

.nav-section {
  @apply container mx-auto flex flex-col px-6 lg:items-center lg:justify-between lg:flex-row;
}
.nav-logo {
  @apply text-xl font-semibold tracking-widest text-gray-900 uppercase rounded-md focus:outline-none focus:shadow-none -ml-px;
}
.nav-menu-item {
  @apply py-3 lg:py-2 bg-transparent border-b border-gray-200 lg:border-b-0 rounded-none lg:rounded-md lg:mt-0 lg:ml-6 hover:text-gray-900 lg:focus:text-gray-900 focus:outline-none focus:shadow-none;
}

.more-button {
  @apply flex flex-row items-center w-full px-0 lg:px-4 py-3 lg:py-2 text-left border-b border-gray-200 lg:border-b-0 rounded-none lg:rounded-md lg:w-auto lg:inline lg:mt-0 lg:ml-2 lg:-mr-4 hover:text-gray-900 lg:focus:text-gray-900 focus:outline-none focus:shadow-none;
}
.more-menu-item {
  @apply w-full px-4 py-3 lg:py-2 lg:mt-1 mt-2 bg-transparent rounded-md hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-none;
}
.more-icon {
  @apply inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform lg:-mt-1;
}
.more {
  @apply absolute right-0 w-full mt-2 origin-top-right lg:w-48 lg:-mr-4 z-30;
}
.more-wrapper {
  @apply flex-col flex-grow pb-4 lg:pb-0 lg:flex lg:items-center lg:justify-end lg:flex-row;
}

.more-enter {
  @apply transition ease-out duration-100;
}
.more-enter-active {
  @apply transform opacity-0 scale-95;
}
.more-enter-to {
  @apply transform opacity-100 scale-100;
}
.more-leave {
  @apply transition ease-in duration-75;
}
.more-leave-active {
  @apply transform opacity-100 scale-100;
}
.more-leave-to {
  @apply transform opacity-0 scale-95;
}
</style>

<template>
  <transition name="page">
    <div v-if="loading"><Loader /></div>
    <div v-else>
      <div class="grid min-h-screen full-screen-height place-items-center">
        <div class="w-full max-w-lg p-6 bg-white">
          <h1 class="text-2xl -ml-px">
            <span class="font-bold">Login </span>to continue
          </h1>
          <form class="mt-8 grid grid-cols-1 gap-4" @submit.prevent="userLogin">
            <label class="block">
              <span for="identity" class="text-gray-700">Email/Username</span>
              <input
                id="identity"
                v-model="login.identity"
                v-validate="'required|usernameOrEmail'"
                name="identity"
                type="text"
                class="form-input"
                autofocus
                autocomplete="username"
              />
              <span class="text-sm text-red-500 mt-1">{{
                errors.first('identity')
              }}</span>
            </label>
            <label class="block">
              <span for="password" class="text-gray-700">Password</span>
              <!-- Vee validate inferred -->
              <input
                id="password"
                v-model="login.password"
                v-validate="'required|min:6'"
                name="password"
                type="password"
                class="form-input"
                autofocus
                autocomplete="current-password"
              />
              <span class="text-sm text-red-500 mt-1">{{
                errors.first('password')
              }}</span>
            </label>
            <div class="block">
              <div class="mt-2">
                <div>
                  <label for="stay-signed-in" class="inline-flex items-center">
                    <input
                      id="stay-signed-in"
                      v-model="login.staySignedIn"
                      name="stay-signed-in"
                      type="checkbox"
                      class="form-input-checkbox"
                    />
                    <span class="ml-2">Stay logged in</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              class="submit-button"
              :disabled="submitting || errors.all().length > 0"
            >
              <svg
                v-if="submitting"
                class="animate-spin -ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#ffffff"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="#ffffff"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Login</span>
            </button>
          </form>
        </div>
      </div>
      <div class="fixed bottom-0 w-full text-center" style="z-index: -1">
        <BaseFooter />
      </div>
    </div>
  </transition>
</template>

<script>
import { Validator } from 'vee-validate'
const emailRgx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const usernameRgx = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/

Validator.extend('usernameOrEmail', {
  getMessage: (field) =>
    `The ${field} must be either a valid e-mail or username`,
  validate: (value) => emailRgx.test(value) || usernameRgx.test(value)
})

export default {
  layout: 'blank',
  data() {
    return {
      loading: true,
      login: {
        identity: '',
        password: '',
        registrationToken: '',
        staySignedIn: false
      },
      submitting: false
    }
  },
  head() {
    return {
      title: `Login - Picasso Rewards`
    }
  },
  async created() {
    try {
      const auth = await this.$actions.checkAuthState()
      if (auth) {
        this.$router.push('/')
      }
    } catch (error) {
      if (error.toString() === 'Error: Failed to verify token') {
        this.$actions.setAlertState({
          isVisible: true,
          type: 'error',
          message: 'Failed to verify token, please login again'
        })
      }
      this.loading = false
    }
  },
  beforeMount() {
    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      )
    })
    document.documentElement.style.setProperty(
      '--vh',
      `${window.innerHeight * 0.01}px`
    )
  },
  methods: {
    async userLogin() {
      this.submitting = true
      try {
        const res = await this.$axios.post(
          'https://api.picassorewards.com:8443/v1/auth/login',
          this.login
        )
        // Store data to localStorage
        localStorage.setItem('pa-accessToken', res.data.data.accessToken)
        localStorage.setItem('pa-adminId', res.data.data.account.admin.id)

        await this.$actions.checkAuthState()
        this.$actions.setAlertState({
          isVisible: true,
          type: 'success',
          message: res.data.message
        })
        this.$router.push('/profile')
      } catch (error) {
        this.submitting = false
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
/* Viewport full screen height trick */
.full-screen-height {
  min-height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  min-height: -webkit-fill-available;
  min-height: calc(var(--vh, 1vh) * 100);
}
.submit-button {
  @apply flex flex-row ml-auto items-center justify-center mt-2 px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-900 text-white font-semibold focus:outline-none;
}
.submit-button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
.form-input {
  @apply mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0;
}
.form-input-checkbox {
  @apply rounded border-transparent focus:border-transparent text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500 bg-gray-200 hover:bg-blue-500;
}
.form-input-checkbox:checked {
  @apply bg-blue-500;
}
</style>

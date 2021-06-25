<template>
  <div v-if="isVisible" class="alert-container">
    <div class="alert-wrapper">
      <div class="w-1/6 flex justify-start">
        <svg
          viewBox="0 0 24 24"
          class="max-h-5"
          :class="{
            'text-green-600': type === 'success',
            'text-red-600': type === 'error',
            'text-yellow-600': type === 'warning',
            'text-blue-600': type === 'info'
          }"
        >
          <path fill="currentColor" :d="icon"></path>
        </svg>
      </div>
      <span
        class="w-5/6 text-base"
        :class="{
          'text-green-800': type === 'success',
          'text-red-800': type === 'error',
          'text-yellow-800': type === 'warning',
          'text-blue-800': type === 'info'
        }"
      >
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isVisible() {
      return this.$state.alertState.isVisible
    },
    type() {
      return this.$state.alertState.type
    },
    message() {
      return this.$state.alertState.message
    },
    icon() {
      const success =
        'M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
      const error =
        'M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z'
      const warning =
        'M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z'
      const info =
        'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z'
      if (this.type === 'success') return success
      if (this.type === 'error') return error
      if (this.type === 'warning') return warning
      if (this.type === 'info') return info
      return ''
    }
  },
  watch: {
    isVisible(value) {
      if (value === true) {
        setTimeout(() => {
          this.$actions.setAlertState({
            isVisible: false,
            type: '',
            message: ''
          })
        }, 3000)
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.alert-container {
  @apply fixed w-full sm:w-1/2 md:w-1/3 xl:w-1/4 sm:top-8 sm:right-8 px-4 sm:mx-0 z-50;
}
.alert-wrapper {
  @apply bg-white px-6 py-4 my-4 rounded-md text-lg flex items-center justify-between mx-auto shadow-lg;
}
</style>

<template>
  <div class="mb-5 max-w-xl">
    <p
      class="font-medium text-lg pb-1"
      :class="alt ? 'text-gray-700' : 'text-gray-900'"
    >
      {{ data.title }}
    </p>
    <p class="whitespace-pre-line">{{ data.subtitle }}</p>
  </div>
</template>

<script>
export default {
  props: {
    alt: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default() {
        return {
          title: '',
          subtitle: ''
        }
      }
    }
  }
}
</script>

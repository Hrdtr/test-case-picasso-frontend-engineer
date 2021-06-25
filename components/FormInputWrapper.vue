<template>
  <div class="flex flex-col">
    <span v-if="name" class="text-gray-900 mb-1">{{ name }}</span>
    <span v-if="description" class="text-gray-600 text-sm -mt-1 mb-2">
      {{ description }}
    </span>
    <slot></slot>
    <span v-if="error" class="text-red-500 text-sm mt-1">
      {{ error }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="postcss">
form input,
form textarea {
  @apply px-3 py-2 appearance-none rounded-md bg-white border-2 border-gray-200 !important;
  /* Tailwind v2 */
  /* @apply bg-gray-50; */
}
form input:focus,
form textarea:focus {
  @apply outline-none bg-white border-gray-600 ring-0 !important;
}
form input:disabled,
form textarea:disabled {
  @apply bg-gray-100 !important;
}
</style>

<template>
  <form
    class="max-w-xl rounded-lg border-2 border-gray-200 overflow-hidden"
    @submit.prevent="$emit('onSubmit')"
  >
    <div class="space-y-5 p-6">
      <slot></slot>
    </div>
    <div class="mt-2 flex justify-end bg-white p-6 border-t-2 border-gray-200">
      <slot name="footer"></slot>
    </div>
  </form>
</template>

<script>
export default {}
</script>

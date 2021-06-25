<template>
  <div
    class="
      flex flex-col
      px-6
      py-4
      border-2 border-gray-200
      rounded-lg
      shadow-none
      bg-white
    "
    :class="{ 'hover:shadow-lg hover:border-transparent': hoverEffect }"
    @click="$emit('click')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    hoverEffect: {
      type: Boolean,
      default: true
    }
  }
}
</script>

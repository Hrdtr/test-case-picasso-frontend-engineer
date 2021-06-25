<template>
  <div>
    <BaseCard
      v-if="loading"
      class="
        grid grid-cols-1
        gap-6
        w-full
        md:w-1/2
        mb-8
        h-24
        bg-gray-200
        animate-pulse
      "
      :hover-effect="false"
    >
    </BaseCard>
    <BaseCard
      v-else
      class="grid grid-cols-1 gap-4 w-full md:w-1/2 mb-8"
      :hover-effect="false"
    >
      <div
        v-for="(item, i) in data"
        :key="item.id"
        class="flex flex-row items-start border-b border-gray-200 pb-4"
      >
        <p>{{ i + 1 }}.</p>
        <div class="w-full flex flex-row justify-between ml-2">
          <div>
            <NuxtLink :to="`/signatures/${item.id}`" class="font-medium">
              {{ item.fullName }}
            </NuxtLink>
            <p class="mb-2">{{ item.jobTitle }}</p>
            <p class="text-gray-500 text-sm">
              Created At: {{ item.createdAt | formatDate }}
            </p>
            <p class="text-gray-500 text-sm">
              Last Updated At: {{ item.lastUpdatedAt | formatDate }}
            </p>
          </div>
          <img :src="item.image" alt="" class="ml-auto h-16 mr-4" />
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
export default {
  filters: {
    formatDate(value) {
      if (!value) return ''
      const date = new Date(value)
      return `${date
        .toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
        .split('/')
        .join(' ')} ${date.getHours()}:${date.getMinutes()}`
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style></style>

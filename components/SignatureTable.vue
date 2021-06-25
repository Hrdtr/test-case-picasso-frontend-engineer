<template>
  <div>
    <BaseCard
      v-if="loading"
      class="grid grid-cols-1 gap-6 w-full mb-8 h-24 bg-gray-200 animate-pulse"
      :hover-effect="false"
    >
    </BaseCard>
    <BaseCard
      v-if="!loading"
      class="grid grid-cols-1 gap-6 w-full mb-8 overflow-x-auto"
      :hover-effect="false"
    >
      <table class="table-auto -my-4 -mx-6">
        <thead>
          <tr class="bg-gray-200 uppercase text-sm leading-normal text-left">
            <th class="p-3 whitespace-nowrap pl-5">No</th>
            <th class="p-3 whitespace-nowrap">Name</th>
            <th class="p-3 whitespace-nowrap">Job Title</th>
            <th class="p-3 whitespace-nowrap">Created At</th>
            <th class="p-3 whitespace-nowrap">Update At</th>
            <th class="p-3 whitespace-nowrap pr-5">Image</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in data"
            :key="item.id"
            class="border-b border-gray-200 hover:bg-gray-100"
          >
            <td class="px-3 py-2 pl-5">
              {{ i + 1 }}
            </td>
            <td class="px-3 py-2">
              <NuxtLink :to="`/signatures/${item.id}`" class="font-medium">
                {{ item.fullName }}
              </NuxtLink>
            </td>
            <td class="px-3 py-2">
              {{ item.jobTitle }}
            </td>
            <td class="px-3 py-2">
              {{ item.createdAt | formatDate }}
            </td>
            <td class="px-3 py-2">
              {{ item.lastUpdatedAt | formatDate }}
            </td>
            <td class="px-3 py-2 pr-5">
              <img :src="item.image" alt="" class="h-16 mr-4" />
            </td>
          </tr>
        </tbody>
      </table>
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

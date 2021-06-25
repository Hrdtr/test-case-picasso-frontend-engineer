<template>
  <div class="grid grid-cols-12 gap-4 py-4">
    <div
      v-for="(nav, i) in navigation"
      :key="i"
      class="col-span-12 sm:col-span-6 md:col-span-3"
    >
      <BaseCard>
        <div class="flex flex-col flex-grow">
          <div class="text-gray-900 font-medium mb-3">
            {{ nav.name }}
          </div>
          <div class="border-b border-gray-200 mb-3 -ml-6"></div>
          <ul class="space-y-2">
            <li v-for="(sub, i2) in nav.sub" :key="i2">
              <NuxtLink
                :to="sub.path"
                class="text-gray-600 hover:text-gray-900"
              >
                {{ sub.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </BaseCard>
    </div>
    <div class="col-span-12 sm:col-span-6 md:col-span-3">
      <BaseCard>
        <div class="flex flex-col flex-grow">
          <div class="text-gray-900 font-medium mb-3">Other</div>
          <div class="border-b border-gray-200 mb-3 -ml-6"></div>
          <ul class="space-y-2">
            <li v-for="(item, i) in $state.moreNavigations" :key="i">
              <NuxtLink
                :to="item.path"
                class="text-gray-600 hover:text-gray-900"
              >
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </BaseCard>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {
          products: null,
          productCategories: null,
          parousels: null
        }
      }
    }
  },
  computed: {
    navigation() {
      return this.$state.navigations.filter((nav) => nav.path !== '/')
    }
  }
}
</script>

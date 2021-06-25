<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: 'Signature list'
        }"
      />
      <div class="flex flex-col md:flex-row mb-8">
        <select
          v-model="limit"
          type="text"
          placeholder="Search"
          class="search-input"
          @change="
            () => {
              page = 1
              fetchData()
            }
          "
        >
          <option value="2">2 items per page</option>
          <option value="4">4 items per page</option>
          <option value="6">6 items per page</option>
          <option value="8">8 items per page</option>
          <option value="10" selected>10 items per page</option>
          <option value="9999">Show all items</option>
        </select>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="search-input"
          @keyup.enter="
            () => {
              page = 1
              fetchData()
            }
          "
        />
        <div class="toggle mr-auto md:mr-0">
          <button
            id="grid"
            class="toggle-button"
            :class="{ 'toggle-active': viewStyle === 'table' }"
            @click="viewStyle = 'table'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="fill-current w-4 h-4 mr-2"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Table</span>
          </button>
          <button
            id="list"
            class="toggle-button"
            :class="{ 'toggle-active': viewStyle === 'list' }"
            @click="viewStyle = 'list'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="fill-current w-4 h-4 mr-2"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
            <span>List</span>
          </button>
        </div>
      </div>
      <SignatureTable
        v-if="viewStyle === 'table'"
        :loading="loading"
        :data="signatures"
      />
      <SignatureList v-else :loading="loading" :data="signatures" />
      <div class="flex">
        <BaseButton
          v-if="page > 1"
          variant-type="outline"
          size="small"
          class="items-center"
          @click="page--"
        >
          <span class="inline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-6 h-6 -ml-2"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </span>
          Previous Page
        </BaseButton>
        <BaseButton
          v-if="page < pagination.lastPage"
          variant-type="outline"
          size="small"
          class="items-center"
          @click="page++"
        >
          Next Page
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right w-6 h-6 -mr-2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      submitting: false,
      page: 1,
      limit: '10',
      viewStyle: 'table',
      searchQuery: '',
      signatures: [],
      pagination: {}
    }
  },
  head() {
    return {
      title: `Signatures - Picasso Rewards`
    }
  },
  watch: {
    page(val) {
      if (val <= this.pagination.lastPage) {
        this.fetchData()
      }
    }
  },
  created() {
    this.$actions.setPageState({
      title: 'Signatures',
      subtitle: 'Record List'
    })
    this.fetchData()
  },
  methods: {
    async fetchData(search) {
      this.loading = true
      try {
        const branchId = await this.$axios.get(
          `https://api.picassorewards.com:8443/v1/hotels/me`
        )
        const res = await this.$axios.get(
          `https://api.picassorewards.com:8443/v1/branches/${branchId.data.data.branch.id}/signatures?q=${this.searchQuery}&page=${this.page}&limit=${this.limit}`
        )
        this.signatures = res.data.data
        this.pagination = res.data.pagination
        this.loading = false
      } catch (error) {
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

<style lang="postcss">
.toggle {
  @apply bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-full inline-flex;
}
.toggle-button {
  @apply inline-flex items-center ease-in focus:outline-none hover:text-blue-500 focus:text-blue-500 rounded-l-full px-4 py-2;
}
.toggle-active {
  @apply bg-white text-blue-500 rounded-full;
}
.search-input {
  @apply px-3 py-2 appearance-none rounded-md bg-white border-2 border-gray-200 focus:outline-none focus:border-gray-600 mb-3 md:mb-0 md:mr-3 focus:ring-0;
}
</style>

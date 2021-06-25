<template>
  <div class="py-8 bg-gray-100">
    <transition name="page">
      <ModalDialog
        v-if="showModalDialog"
        title="Are You Sure?"
        :show-trash-icon="true"
        message="Do you really want to delete this signature? This process cannot be undone"
        :delete-button-loading="deleteButtonLoading"
        @onCancel="showModalDialog = false"
        @onDelete="deleteData"
      />
    </transition>
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: `ID: ${data.id}`
        }"
      />
      <div class="space-y-4">
        <div>
          <p class="text-gray-500">Full Name:</p>
          <p>{{ data.fullName }}</p>
        </div>
        <div>
          <p class="text-gray-500">Job Title:</p>
          <p>{{ data.jobTitle }}</p>
        </div>
        <div>
          <p class="text-gray-500">Signature Image:</p>
          <img class="h-28 mt-2" :src="data.image" />
        </div>
        <div>
          <p class="text-gray-500">Created At:</p>
          <p>{{ data.createdAt | formatDate }}</p>
        </div>
        <div>
          <p class="text-gray-500">Last Updated At:</p>
          <p>{{ data.lastUpdatedAt | formatDate }}</p>
        </div>
        <div>
          <p class="text-gray-500">Created By:</p>
          <p>{{ data.createdBy.username }} ({{ data.createdBy.email }})</p>
        </div>
        <div>
          <p class="text-gray-500">Last Updated By:</p>
          <p>{{ data.createdBy.username }} ({{ data.createdBy.email }})</p>
        </div>
        <div>
          <p class="text-gray-500">Actions:</p>
          <div class="inline-flex mt-2">
            <BaseButton
              @click="$router.push(`/signatures/${$route.params.id}/update`)"
              >Edit</BaseButton
            >
            <BaseButton variant="danger" @click="showModalDialog = true">
              Delete
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
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
  data() {
    return {
      loading: true,
      submitting: false,
      showModalDialog: false,
      deleteButtonLoading: false,
      data: {
        fullName: '',
        jobTitle: '',
        fileName: null,
        base64String: null,
        createdBy: {
          username: '',
          email: ''
        },
        lastUpdatedBy: {
          username: '',
          email: ''
        }
      }
    }
  },
  head() {
    return {
      title: `Detail Signature - Picasso Rewards`
    }
  },
  async created() {
    this.$actions.setPageState({
      title: 'Signature Detail'
    })
    try {
      const res = await this.$axios.get(
        `https://api.picassorewards.com:8443/v1/signatures/${this.$route.params.id}`
      )
      this.data = res.data.data
      this.loading = false
    } catch (error) {
      this.$actions.setAlertState({
        isVisible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  },
  methods: {
    getBase64FromPad() {
      const { data } = this.$refs.signaturePad.saveSignature()
      this.data.base64String = data.split(',')[1]
    },
    undoPad() {
      this.$refs.signaturePad.undoSignature()
    },
    getBase64FromUpload(e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.data.base64String = reader.result.split(',')[1]
      }
      reader.onerror = function (error) {
        this.$actions.setAlertState({
          isVisible: true,
          type: 'error',
          message: error
        })
      }
    },
    async deleteData() {
      try {
        this.deleteButtonLoading = true
        const res = await this.$axios.delete(
          `https://api.picassorewards.com:8443/v1/signatures/${this.$route.params.id}`
        )
        this.$actions.setAlertState({
          isVisible: true,
          type: 'success',
          message: res.data.message
        })
        this.$router.push('/signatures')
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

<style></style>

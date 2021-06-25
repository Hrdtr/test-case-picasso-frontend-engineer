<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: `ID: ${data.id}`
        }"
      />
      <FormWrapper class="mb-6" @onSubmit="saveChanges">
        <FormInputWrapper name="Full Name" :error="errors.first('fullName')">
          <input
            v-model="data.fullName"
            v-validate="'required|regex:^[a-zA-Z ]+$|max:100'"
            name="fullName"
            type="text"
            class="form-input"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            required
          />
        </FormInputWrapper>
        <FormInputWrapper name="Job Title" :error="errors.first('jobTitle')">
          <input
            v-model="data.jobTitle"
            v-validate="'required|regex:^[a-zA-Z& ]+$|max:100'"
            name="jobTitle"
            type="text"
            class="form-input"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            required
          />
        </FormInputWrapper>
        <div class="mt-3">
          <div class="flex items-center mr-4 mb-2">
            <input
              v-model="editSignatureImage"
              type="checkbox"
              class="opacity-0 absolute h-8 w-8"
            />
            <div
              class="
                bg-white
                border-2
                rounded-md
                border-gray-300
                w-5
                h-5
                flex flex-shrink-0
                justify-center
                items-center
                mr-2
                focus-within:border-gray-300
              "
            >
              <svg
                class="
                  fill-current
                  hidden
                  w-3
                  h-3
                  text-gray-600
                  pointer-events-none
                "
                version="1.1"
                viewBox="0 0 17 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-9 -11)"
                    fill="#1F73F1"
                    fill-rule="nonzero"
                  >
                    <path
                      d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <label for="A3-yes" class="select-none">Edit Signature Image</label>
          </div>
        </div>
        <div v-if="editSignatureImage" class="space-y-4">
          <FormInputWrapper name="Signature">
            <VueSignaturePad
              ref="signaturePad"
              height="250px"
              class="border-2 border-gray-200 rounded-md bg-white"
            />
            <div class="mt-4">
              <BaseButton
                type="button"
                variant="secondary"
                size="small"
                @click="getBase64FromPad"
              >
                Use this signature
              </BaseButton>
              <BaseButton
                type="button"
                variant="secondary"
                size="small"
                @click="undoPad"
                >Undo</BaseButton
              >
            </div>
          </FormInputWrapper>
          <FormInputWrapper name="Or Upload an Image">
            <input type="file" @change="getBase64FromUpload" />
          </FormInputWrapper>
          <FormInputWrapper v-if="data.base64String" name="Signature Preview">
            <img :src="'data:image/png;base64,' + data.base64String" />
          </FormInputWrapper>
          <FormInputWrapper name="File Name" :error="errors.first('fileName')">
            <input
              v-model="data.fileName"
              v-validate="'required|alpha_dash'"
              name="fileName"
              type="text"
              class="form-input"
              :class="loading ? 'bg-gray-200 animate-pulse' : ''"
              required
            />
          </FormInputWrapper>
        </div>
        <div slot="footer" class="flex flex-row justify-end spacing-x-4">
          <BaseButton type="submit" :loading="submitting"> Save </BaseButton>
        </div>
      </FormWrapper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      submitting: false,
      editSignatureImage: false,
      data: {
        fullName: '',
        jobTitle: '',
        fileName: null,
        base64String: null
      }
    }
  },
  head() {
    return {
      title: `Update Signature - Picasso Rewards`
    }
  },
  async created() {
    this.$actions.setPageState({
      title: 'Update Signature'
    })
    try {
      const res = await this.$axios.get(
        `https://api.picassorewards.com:8443/v1/signatures/${this.$route.params.id}`
      )
      this.data.id = res.data.data.id
      this.data.fullName = res.data.data.fullName
      this.data.jobTitle = res.data.data.jobTitle
      this.data.base64String = null
      this.data.fileName = null
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
    async saveChanges() {
      this.submitting = true
      try {
        const payload = {
          fullName: this.data.fullName,
          jobTitle: this.data.jobTitle,
          base64String: this.editSignatureImage ? this.data.base64String : null,
          fileName: this.editSignatureImage ? this.data.fileName + '.png' : null
        }
        const res = await this.$axios.put(
          `https://api.picassorewards.com:8443/v1/signatures/${this.$route.params.id}`,
          payload
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
        this.submitting = false
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
input:checked + div {
  @apply border-gray-400;
}
input:checked + div svg {
  @apply block;
}
</style>

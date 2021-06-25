<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: 'Record Data'
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
      loading: false,
      submitting: false,
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
      title: `Add Signature - Picasso Rewards`
    }
  },
  created() {
    this.$actions.setPageState({
      title: 'Add Signature',
      subtitle: 'Fill form below with new signature'
    })
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
      if (this.data.base64String !== null) {
        this.submitting = true
        try {
          const res = await this.$axios.post(
            'https://api.picassorewards.com:8443/v1/signatures',
            { ...this.data, fileName: this.data.fileName + '.png' }
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
      } else {
        alert(
          "Please upload a signature image or click on 'Use this signature' button if you already filled signature pad"
        )
      }
    }
  }
}
</script>

<style></style>

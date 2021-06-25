<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: 'General',
          subtitle: 'Basic information'
        }"
      />
      <FormWrapper class="mb-6">
        <FormInputWrapper name="First Name" :error="errors.first('firstName')">
          <input
            v-model="data.admin.firstName"
            v-validate="'required|alpha_spaces'"
            name="firstName"
            type="text"
            class="form-input"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            disabled
            required
          />
        </FormInputWrapper>
        <FormInputWrapper name="Last Name">
          <input
            v-model="data.admin.lastName"
            type="text"
            class="form-input"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            disabled
            required
          />
        </FormInputWrapper>
        <div slot="footer" class="flex flex-row justify-end spacing-x-4">
          <BaseButton type="submit" :loading="submitting" disabled>
            Save
          </BaseButton>
        </div>
      </FormWrapper>
      <SectionTitle
        :data="{
          title: 'Account',
          subtitle: 'User Account information'
        }"
      />
      <FormWrapper>
        <FormInputWrapper name="Username" :error="errors.first('username')">
          <input
            v-model="data.user.username"
            name="username"
            type="text"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            disabled
            required
          />
        </FormInputWrapper>
        <FormInputWrapper name="Email">
          <input
            v-model="data.user.email"
            type="text"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            disabled
            required
          />
        </FormInputWrapper>
        <FormInputWrapper name="Phone">
          <input
            v-model="data.user.phone"
            type="text"
            :class="loading ? 'bg-gray-200 animate-pulse' : ''"
            disabled
            required
          />
        </FormInputWrapper>
        <div slot="footer" class="flex flex-row justify-end spacing-x-4">
          <BaseButton type="submit" :loading="submitting" disabled>
            Save
          </BaseButton>
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
      data: {
        admin: {
          firstName: '',
          lastname: ''
        },
        user: {
          username: '',
          email: '',
          phone: ''
        }
      }
    }
  },
  head() {
    return {
      title: `Profile - Picasso Rewards`
    }
  },
  async created() {
    try {
      const res = await this.$axios.get(
        `https://api.picassorewards.com:8443/v1/admins/${this.$state.auth.adminId}`
      )
      this.data = res.data.data
      this.loading = false

      this.$actions.setPageState({
        title: res.data.data.admin.fullName,
        subtitle: 'Account Information'
      })
    } catch (error) {
      this.$actions.setAlertState({
        isVisible: true,
        type: 'error',
        message: error.response.data.message
      })
    }
  }
}
</script>

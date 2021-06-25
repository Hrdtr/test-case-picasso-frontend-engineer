<template>
  <div class="py-8 bg-gray-100">
    <div class="container mx-auto text-gray-700 px-6">
      <SectionTitle
        :data="{
          title: 'Quick Navigation'
        }"
      />
      <div class="-mt-4">
        <QuickNav></QuickNav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$actions.setPageState({
      title: 'Welcome',
      subtitle: 'What do you want to manage today?'
    })
  }
}
</script>

<style></style>

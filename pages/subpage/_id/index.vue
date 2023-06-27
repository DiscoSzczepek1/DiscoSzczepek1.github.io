<template>
<div class="container d-flex flex-column mt-4">
  <h1>{{ $store.state.subpage.name }}</h1>
  <div v-html="$store.state.subpage.content" class="p-4"></div>
</div>
</template>

<script>
export default {
  name: "index",
  mounted () {
    this.$store.dispatch('loadSubpage', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>

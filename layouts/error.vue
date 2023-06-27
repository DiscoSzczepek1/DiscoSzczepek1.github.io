<template>
  <div class="d-flex flex-column align-items-center mt-5">
    <h1 v-if="error.statusCode === 404">Nie znaleziono</h1>
    <h1 v-else>Wystąpił błąd</h1>
    <NuxtLink to="/">Wróć do strony głównej</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

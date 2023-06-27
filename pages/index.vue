<template>
  <div>
  <section class="intro">
    <div class="intro-main container d-flex flex-lg-row flex-column-reverse justify-content-between align-items-center py-5">
      <div class="d-flex flex-column gap-2 col-12 col-lg-6 py-5">
        <h1>{{$store.state.shop.name}}</h1>
        <p class="col-sm-12 col-lg-10">
          {{$config.description}}
        </p>
        <div class="d-flex gap-4 col-12 col-md-8 mx-0 flex-md-row flex-column">
          <button class="gradient-button col-12 col-md-6" @click="copy()">Skopiuj adres</button>
          <a class="outline-button custom-btn col-12 col-md-6" href="#servers">Sklep</a>
        </div>
      </div>
      <!-- <img :src="$store.state.shop.logo" alt="Logo serwera" class="col-6 col-lg-4 justify-content-center"> -->
    </div>
  </section>
  <section class="servers bg-black">
    <div class="servers-main container" id="servers">
      <h2>Tryby serwera</h2>
      <p>Wybierz tryb serwera, aby przejść do sklepu</p>

      <div class="servers-container mx-2 gy-5 row align-items-center">
        <div v-for="server in $store.state.servers" :key="server.id" class="col-12 col-md-6 col-lg-6 col-xl-3 py-2">
          <div class="bg-second p-4">
            <div class="server d-flex flex-column align-items-center">
              <img v-if="server.image" :src="server.image" alt="Zdjęcie trybu" width="250" height="250">
              <span class="text-center fs-3 mt-1 fw-semibold">{{server.name}}</span>
              <nuxt-link :to="'server/' + server.id" class="custom-btn gradient-button col-10 mt-3">Wybierz</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  methods: {
    copy() {
      navigator.clipboard.writeText(this.$config.address);
      this.$toast.success('Skopiowano adres serwera')
    }
  }
}
</script>

<style>
body {
  color: #fff;
}
.container {
  max-width: 80% !important;
}
.intro {
  min-height: 65vh;
  background-size: cover;
  background: url("~/assets/background.jpg") no-repeat center center;
  background-size: cover;
  backdrop-filter: blur(1px);
}
h1 {
  font-weight: 600;
  font-size: 48px;
}
.intro-main p {
  text-align: justify;
  opacity: 0.9;
  font-weight: 300;
}
.outline-button {
  background: none;
  border: 2px solid #fff;
}
.outline-button:hover {
  background: #fff;
  color: #000;
}
.intro::after {
  content: "";
    position: absolute;
    background-image: url("~/assets/wave.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    bottom: 0;
    left: 0;
    height: 15vh;
    width: 100%;
    overflow: hidden;
    line-height: 0;
}
.servers-main h2 {
  font-weight: 600;
  font-size: 40px;
}
.servers-main p {
  opacity: 0.9;
}
.server {
  background: #0C0C0C;
  position: relative;
}
</style>


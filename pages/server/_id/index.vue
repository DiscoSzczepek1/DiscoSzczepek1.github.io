<template>
  <div class="container d-flex flex-column mt-4">
    <h1>{{ $store.state.server.name }}</h1>
    <style>
      .alert > p {
        margin-bottom: 0 !important;
      }
    </style>
    <div v-if="announcements" class="d-flex flex-column mx-2">
      <div class="alert" :style="`background: `+announcement.color+`; border-radius: 0;`" role="alert" v-for="announcement in announcements" :key="announcement.id" v-html="announcement.content">
      </div>
    </div>
    <div class="row align-items-center justify-content-center">
      <span v-if="$store.state.products.length===0 && $store.state.server.name">Brak produktów</span>
       <div class="products row justify-content-start align-items-center  col-xl-9 col-lg-12">
         <div v-for="product in $store.state.products" v-bind:key="product.id" class="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4 pb-4 align-self-stretch">
           <div class="bg-second p-4 d-flex h-100 flex-column">
             <div class="position-relative d-flex flex-column align-items-center h-100">
                <img v-if="product.image" :src="product.image" alt="Zdjęcie produktu" width="250" height="250">
                <span class="text-center fs-5 mt-1 fw-semibold">{{product.name}}</span>
                <span class="badge" style="background-color: var(--first-color);" v-if="product.promo">-{{product.promo}}%</span>
                <div class="d-flex flex-row mb-3" v-if="product.main_price">
                  <span class="text-center fs-6 mt-2" :class="{ 'text-decoration-line-through': product.promo }">{{product.main_price}} zł</span>
                  <span class="text-center fs-6 mt-2 ms-2" v-if="product.promo">{{ $price.calcPrice(product.main_price, product.promo) }} zł</span>
                </div>
                  <nuxt-link :to="'/server/' + $store.state.server.id + '/product/' + product.id" class="custom-btn gradient-button col-10 mt-auto">Zakup</nuxt-link>
             </div>
           </div>
         </div>
      </div>
      <div class="align-self-start col-xl-3 col-lg-12">
        <div v-if="$store.state.shop.monthly_goal_public !== null" class="bg-second p-4 mb-4">
          <span class="fs-5 fw-bolder">Cel miesiąca</span>
          <div class="progress">
            <div
              class="progress-bar fw-semibold"
              role="progressbar"
              aria-label="Basic example"
              :style='`width: `+$store.state.shop.monthly_goal_public+`%; background: var(--first-color);`'
              :aria-valuenow="$store.state.shop.monthly_goal_public"
              aria-valuemin="0"
              aria-valuemax="100">
              {{Math.ceil($store.state.shop.monthly_goal_public)}}%
            </div>
          </div>
        </div>
        <div v-if="$store.state.shop.latest_payments" class="bg-second p-4 mb-4">
          <span class="fs-5 fw-bolder">Ostatni kupujący</span>
          <div v-for="purchase in $store.state.latestPayments" v-bind:key="purchase.id">
            <div class="p-2 d-flex align-items-start">
              <img :src="`https://minotar.net/avatar/`+purchase.player+`/50`" :alt="purchase.player">
              <div class="d-flex flex-column ms-2">
                <span class="fw-semibold">{{purchase.player}}</span>
                <span>{{purchase.product_name}} <span v-if="purchase.quantity > 1">x{{purchase.quantity}}</span> </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="$store.state.shop.richest_player" class="bg-second p-4">
          <span class="fs-5 fw-bolder">Najbogatszy gracz</span>
          <div class="p-2 d-flex" v-if="richestPlayer">
            <img :src="`https://minotar.net/avatar/`+richestPlayer.player+`/50`">
            <div class="d-flex flex-column ms-2">
              <span class="fw-semibold">{{ this.richestPlayer.player }}</span>
              <span>{{ this.richestPlayer.spend }} zł</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      richestPlayer: {},
      announcements: []
    }
  },
  async created () {
    await this.$store.dispatch('loadServer', this.$route.params.id)
    await this.$store.dispatch('loadProducts', this.$route.params.id)
    await this.loadAnnouncements()
    if (this.$store.state.shop.richest_player) {
      await this.loadRichestPlayer()
    }
  },
  methods: {
    async loadRichestPlayer(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/richest_player/`)
      .then((response) => response.json())
      .then((data) => {
        this.richestPlayer = data
      })
      .catch((err) => console.error(err));
    },
    async loadAnnouncements(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/announcements/`)
      .then((response) => response.json())
      .then((data) => {
        this.announcements = data
      })
      .catch((err) => console.error(err));
    },
  }
}
</script>

<style scoped>
.progress {
  background: #1e1e1e;
}
</style>

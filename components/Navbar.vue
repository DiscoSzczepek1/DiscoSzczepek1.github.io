<template>
    <nav class="navbar navbar-dark bg-black navbar-expand-lg shadow">
    <div class="container">
      <nuxt-link to="/" class="navbar-brand mb-0">{{$store.state.shop.name}}</nuxt-link>
      <div class="d-flex align-items-center"><div :class="{ 'blob green': status, 'blob blob-red': !status }"></div>{{players}}</div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Włącz nawigacje">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
          <li class="nav-item me-5" v-if="$store.state.shop.home_link">
            <nuxt-link to="/" class="nav-link">Strona główna</nuxt-link>
          </li>
          <li v-for="navElement in $store.state.shop.navigation" v-bind:key="navElement.id" class="nav-item me-5">
            <nuxt-link :to="'/subpage/'+navElement.subpage" class="nav-link" v-if="navElement.subpage">{{navElement.name}}</nuxt-link>
            <a :href="navElement.url" class="nav-link" v-else>{{navElement.name}}</a>
          </li>
          <li class="nav-item me-5">
            <nuxt-link to="/voucher" class="nav-link">Voucher</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      players: '?',
      status: true
    }
  },
  async created () {
    await this.loadStatus()
  },
  methods: {
    async loadStatus(context) {
      return await fetch(`https://api.mcsrvstat.us/2/${this.$config.address}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.online) {
            this.players = 0
            this.status = false
            return
          }
          this.players = data.players.online
        })
        .catch((err) => console.log(err));
    },
  }
}
</script>

<style>
.navbar {
  padding: 25px;
}
.navbar-brand {
  font-weight: 600;
}
.nav-item {
  font-size: 16px;
  font-weight: 300;
}
.nav-link {
  color: #fff;
}
.blob {
  background: rgba(51, 217, 178, 1);
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(51, 217, 178, 1);
  margin: 10px;
  height: 15px;
  width: 15px;
  animation: pulse-green 2s infinite;
}
.blob-red {
  background: rgb(217, 51, 51) !important;
  box-shadow: 0 0 0 0 rgb(217, 51, 51) !important;
  animation: none !important;
}
@keyframes pulse-green {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(51, 217, 178, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(51, 217, 178, 0);
  }
}
</style>


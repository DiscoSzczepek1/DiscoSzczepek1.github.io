export const state = () => ({
  shop: {},
  servers: {},
  products: {},
  server: {},
  subpage: {}
})

export const mutations = {
  setShop(state, shop) {
    state.shop = shop;
  },
  setServers(state, servers) {
    state.servers = servers;
  },
  setProducts(state, products) {
    state.products = products;
  },
  setServer(state, server) {
    state.server = server;
  },
  setSubpage(state, subpage) {
    state.subpage = subpage;
  },
  setLatestPayments(state, latestPayments) {
    state.latestPayments = latestPayments;
  }
}

export const actions = {
  async nuxtServerInit(context) {
    await this.dispatch('loadShop')
    await this.dispatch('loadServers')
  },
  async loadShop(context) {
    return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/`)
      .then((response) => response.json())
      .then(async (data) => {
        context.commit("setShop", data);

        if (data.latest_payments) {
          await this.dispatch('loadLatestPayments')
        }
      })
      .catch((err) => console.error(err));
  },
  async loadServers(context) {
    return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/servers/`)
      .then((response) => response.json())
      .then((data) => {
        context.commit("setServers", data);
      })
      .catch((err) => console.error(err));
  },
  async loadProducts(context, server_id) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/products/?server=${server_id}`)
      .then((response) => response.json())
      .then((data) => {
        context.commit("setProducts", data);
      })
      .catch((err) => console.error(err));
  },
  async loadLatestPayments(context) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/latest_payments/`)
      .then((response) => response.json())
      .then((data) => {
        context.commit("setLatestPayments", data);
      })
      .catch((err) => console.error(err));
  },
  async loadSubpage(context, subpage_id) {
      await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/subpages/${subpage_id}/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          $nuxt.context.error({
            status: 404,
            message: 'Podstrona nie została znaleziona',
          })
        }
        context.commit("setSubpage", data);
      })
      .catch((err) => console.error(err));
  },
  loadServer(context, server_id) {
    const server = context.state.servers.find(server => server.id === Number(server_id))
    if (!server) {
      $nuxt.context.error({
        status: 404,
        message: 'Serwer nie został znaleziony',
      })
    }
    return context.commit("setServer", server)
  }
}

export const getters = {
  shop(state) {
    return state.shop;
  },
  servers(state) {
    return state.servers;
  },
  products(state) {
    return state.products;
  },
  server(state) {
    return state.server;
  },
  subpage(state) {
    return state.subpage;
  },
  latestPayments(state) {
    return state.latestPayments;
  }
}

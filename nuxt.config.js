module.exports = {
  /*
  ** Headers of the page
  */
  publicRuntimeConfig: {
    shop_id: 1, // id sklepu na vishop
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam convallis, ligula sed lacinia mollis, enim turpis suscipit enim, porta viverra tellus risus et augue.", // opis serwera
    first_color: "#DFA103",  // pierwszy kolor
    second_color: "#CC3100",  // drugi kolor
    address: "hypixel.net"  // adres serwera
  },
  head: {
    title: 'vbasic - szablon VIshop',  // tytuł strony
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Podstawowy szablon VIshop.pl' }  // opis strony dla wyszukiwarek i discorda
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet ', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap'}
    ]
  },
  /*
  ** Poniższa konfiguracja jest dla bardziej zaawansowanych użytkowników, nie ma tam nic ciekawego
  */
  server: {
    host: '0.0.0.0'
  },
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.min.css"
  ],
  plugins: [
      { src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js", mode: "client" },
      { src: "~/plugins/price.js"}
  ],
  modules: [
    "vue-toastification/nuxt"
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}


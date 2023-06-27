<template>
  <div :style="cssVars">
    <component :is="`style`">{{$store.state.shop.style}}</component>
    <Navbar/>
    <nuxt/>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Navbar, Footer
  },
  computed: {
    cssVars() {
      return {
        '--first-color': this.$config.first_color,
        '--second-color': this.$config.second_color
      }
    }
  }
}
</script>

<style>
html, body {
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background: #000;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

body::-webkit-scrollbar {
  width: 6px;
}
body::-webkit-scrollbar-track {
  background: #2c2c2c;
}
a {
  color: var(--first-color);
}
.gradient-button {
  background: linear-gradient(270deg, var(--first-color) 0%, var(--second-color) 98%);
  background-size: 130% 100%;
}
body::-webkit-scrollbar-thumb {
  background: transparent;
  box-shadow: 0px 0px 0px 100000vh black;
}
button, .custom-btn {
  color: #fff;
  display: flex;
  justify-content: center;
  padding: 12px;
  text-align: center;
  border: none;
  font-size: 16px;
  font-weight: 300;
  transition: all .4s ease-in-out;
  text-decoration: none;
}
a:hover {
  color: inherit;
}
.gradient-button:hover {
  background-position: 100% 0;
  cursor: pointer;
}
.card-btn {
  position: absolute;
  bottom: -22px;
}
.bg-second {
  background: #0C0C0C !important;
}
h1 {
  font-size: 48px;
}
input:disabled {
  opacity: 0.5;
}
.input-txt {
  border: none;
  padding: 15px;
  background: #1e1e1e;
  color: #fff;
  outline: none;
}
</style>


<template>
<div class="container d-flex flex-column mt-4">
  <h1>Zrealizuj voucher</h1>
  <div class="d-flex flex-column col-xl-3 col-md-6 col-12 gap-2">
    <input type="text" class="input-txt" placeholder="Nick" v-model="nick">
    <input type="text" class="input-txt" placeholder="Kod" v-model="code">
    <button class="gradient-button" @click="useVoucher">Zrealizuj</button>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      nick: "",
      code: ""
    }
  },
  methods: {
    async useVoucher(context) {
      const params = {
          headers: {
              'Accept': "application/json, text/plain, */*",
              'Content-Type': "application/json;charset=utf-8"
          },
          body: JSON.stringify({ player: this.nick, code: this.code }),
          method: "POST"
      }

      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/vouchers/use/`, params)
        .then((response) => {
          if (!response.ok) {
            this.$toast.error('Niepoprawny voucher')
            throw Error(response.status);
          }
          return response.json()
        })
        .then((data) => {
          this.$toast.success('Voucher został zrealizowany')
        })
        .catch((err) => console.log(err));
    },
  }
}
</script>

<style scoped>

</style>

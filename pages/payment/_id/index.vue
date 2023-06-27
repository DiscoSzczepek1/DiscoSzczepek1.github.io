<template>
<div class="container d-flex flex-column mt-4">
  <h1>Status transakcji</h1>
  <div class="alert alert-success" role="alert" v-if="paymentStatus">
    Zamówienie zostało opłacone. Realizacja zamówienia nastąpi automatycznie w ciągu 30 sekund.
  </div>
  <div class="alert alert-danger" role="alert" v-else>
    <span>Zamówienie nie zostało jeszcze opłacone. W przypadku niektórych płatności trzeba odczekać kilka minut. Poczekaj chwilę i odśwież tę stronę.</span>
  </div>
</div>
</template>

<script>
export default {
  name: "index",
  data: function () {
    return {
      paymentStatus: false
    }
  },
  mounted () {
    this.loadPayment()
  },
  methods: {
    async loadPayment(context) {
      return await fetch(`https://dev123.vishop.pl/panel/shops/${this.$config.shop_id}/payment-status/${this.$route.params.id}/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            console.log(data)
            this.paymentStatus = false
            return
          }
          this.paymentStatus = data.status !== 'waiting'
        })
        .catch((err) => console.log(err));
    },
  }
}
</script>

<style scoped>

</style>

export default ({ app, store }, inject) => {
  inject('price', {
    calcPrice (price, promo = null, quantity = 1, promoCode = null ) {
      let lastPrice = parseFloat((price * quantity) * (1 - promo / 100)).toFixed(2)
      if (promoCode) {
        lastPrice *= (1 - promoCode.discount / 100)
      }
      return lastPrice
    }
  })
}

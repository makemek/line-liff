new Vue({
  el: '#app',
  data() {
    return {
      newProduct: {
        name: undefined,
        image: undefined,
        price: undefined,
      },
    }
  },
  methods: {
    async onAddProduct() {
      const { name, image, price } = this.newProduct
      await axios.post('/backoffice/product', { name, image, price })
      window.location.reload()
    },
  },
})

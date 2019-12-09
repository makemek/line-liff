new Vue({
  el: '#app',
  data() {
    return {
      productLoading: false,
      products: [],
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async getProducts() {
      this.productLoading = true
      const { data } = await axios.get('/product')
      this.products = data.products
      this.productLoading = false
    },
    async onPlaceOrder(productId) {
      await axios.post('/orders', { productId })
    },
  },
})

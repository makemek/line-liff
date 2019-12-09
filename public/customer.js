new Vue({
  el: '#app',
  data() {
    return {
      productLoading: false,
      products: [],
    }
  },
  created() {
    const eventSource = new EventSource('/events')
    this.getProducts()
    this.listenIncommingProduct(eventSource)
  },
  methods: {
    async getProducts() {
      this.productLoading = true
      const { data } = await axios.get('/products')
      this.products = data.products
      this.productLoading = false
    },
    async onPlaceOrder(productId) {
      await axios.post('/orders', { productId })
    },
    async listenIncommingProduct(eventSource) {
      eventSource.addEventListener('product-add', async () => {
        await this.getProducts()
      })
      eventSource.addEventListener('product-delete', async () => {
        await this.getProducts()
      })
    },
  },
})

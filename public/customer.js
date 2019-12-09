new Vue({
  el: '#app',
  data() {
    return {
      productLoading: false,
      products: [],
      globalMessage: undefined,
    }
  },
  created() {
    const eventSource = new EventSource('/events')
    this.getProducts()
    this.listenIncommingProduct(eventSource)
    this.listenIncommingOrder(eventSource)
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
    listenIncommingOrder(eventSource) {
      let timeoutId
      eventSource.addEventListener('order-served', (event) => {
        const data = JSON.parse(event.data)
        clearTimeout(timeoutId)
        this.globalMessage = `order ${data.orderId} has been served.`
        timeoutId = setTimeout(() => {
          this.globalMessage = undefined
        }, 3000)
      })
    },
  },
})

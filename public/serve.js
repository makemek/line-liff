new Vue({
  el: '#app',
  data() {
    return {
      fetching: false,
      orders: [],
    }
  },
  created() {
    this.getOrders()
  },
  methods: {
    async onServeOrder(orderId) {
      await axios.post('/backoffice/order/serve', { orderId })
      this.getOrders()
    },
    async getOrders() {
      this.fetching = true
      const { data } = await axios.get('/backoffice/order')
      this.orders = data.orders
      this.fetching = false
    },
  },
})

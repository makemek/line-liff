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
    this.listenIncommingOrder()
  },
  methods: {
    async onServeOrder(orderId) {
      await axios.put(`/backoffice/order/${orderId}/serve`, {
        orderId,
      })
      this.getOrders()
    },
    async getOrders() {
      this.fetching = true
      const { data } = await axios.get('/backoffice/order')
      this.orders = data.orders
      this.fetching = false
    },
    listenIncommingOrder() {
      const source = new EventSource('/backoffice/order/event')
      source.addEventListener('order', async () => {
        await this.getOrders()
      })
    },
  },
})

new Vue({
  el: '#app',
  data() {
    return {
      fetching: false,
      orders: [],
    }
  },
  created() {
    const eventSource = new EventSource('/backoffice/events')
    this.getOrders()
    this.listenIncommingOrder(eventSource)
  },
  methods: {
    async onServeOrder(orderId) {
      await axios.put(`/backoffice/orders/${orderId}/serve`, {
        orderId,
      })
      this.getOrders()
    },
    async getOrders() {
      this.fetching = true
      const { data } = await axios.get('/backoffice/orders')
      this.orders = data.orders
      this.fetching = false
    },
    listenIncommingOrder(eventSource) {
      eventSource.addEventListener('order-created', async () => {
        await this.getOrders()
      })
    },
  },
})

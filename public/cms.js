new Vue({
  el: '#app',
  data() {
    return {
      newProduct: {
        name: undefined,
        image: undefined,
        price: undefined,
      },
      fetching: false,
      products: [],
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    async onAddProduct() {
      const { name, image, price } = this.newProduct
      await axios.post('/backoffice/product', { name, image, price })
      await this.getProducts()
    },
    async getProducts() {
      this.fetching = true
      const { data } = await axios.get('/backoffice/product')
      this.products = data.products
      this.fetching = false
    },
    async onRemoveProduct(id) {
      await axios.delete(`/backoffice/product/${id}`)
      await this.getProducts()
    },
  },
})

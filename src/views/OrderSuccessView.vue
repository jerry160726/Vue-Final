<template>
  <div class="container py-5">
    <div class="banner d-flex align-items-center">
      <div class="container flex-column py-3 text-center">
        <h2 class="title text-white fw-bold">訂單完成</h2>
        <p class="slogan text-white mb-3">
        感謝您的購買！<br>
        您的訂單， 將在 1 ~ 3 個工作天內出貨！
        </p>
        <div class="banner-btn">
          <router-link to="/products"
          class="btn btn-outline-danger reservation-btn btn-sm me-2 fs-5 px-3 py-2">
              繼續選購</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/pages/ordersuccess.scss" scoped>
</style>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 清空購物車才可以用disabled
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: ''
        }
      },
      products: [],
      product: {},
      productId: '',
      isLoadingItem: '' // 新增讀取效果
    }
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
        })
    },
    openProductModal (id) {
      this.productId = id
      this.$refs.productModal.openModal()
    },
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          console.log(res.data)
          this.getCart()
          this.$refs.productModal.closeModal()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    removeCartItem (id) {
      this.isLoadingItem = id
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          this.getCart()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
    },
    removeCartItems () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    updateCart (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      this.$http
        .put(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((res) => {
          console.log(res.data)
          this.getCart()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((response) => {
          console.log(response)
          alert(response.data.message)
          this.$refs.form.resetForm()
          this.form.message = ''
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCart()
  }
}
</script>

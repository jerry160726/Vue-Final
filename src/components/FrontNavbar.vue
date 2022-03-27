<template>
  <nav class="header navbar navbar-expand-lg navbar-dark bg-primary sticky-top box-shadow">
    <div class="container">
      <router-link class="navbar-brand text-dark fw-bold" to="/"
        >小安甜點</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link text-dark fw-bold" to="/products"
              >產品頁面</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark fw-bold" to="/cart"
              >購物車</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark fw-bold" to="/login"
              >後台管理</router-link
            >
          </li>
        </ul>
      </div>
      <div class="d-flex">
        <router-link class="nav-link position-relative px-0 py-0" to="/cart">
        <i class="bi bi-cart-fill cartlogo" style="font-size: 1.5rem;"></i>
          <span class="position-absolute
              translate-middle badge rounded-pill bg-danger cartnum">
              {{ cartData.carts.length }}
            <span class="visually-hidden">unread messages</span></span></router-link>
      </div>
      <!-- <span class="badge rounded-pill bg-danger">
          {{ cartData.carts.length }}
        </span> -->
      <!-- <button type="button" class="btn btn-secondary">
        結帳
        <span class="badge rounded-pill bg-danger">
          {{ cartData.carts.length }}
        </span>
      </button> -->
    </div>
  </nav>
</template>

<style lang="scss" src="../assets/stylesheets/navbar.scss" scoped>
</style>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 清空購物車才可以用disabled
      }
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>

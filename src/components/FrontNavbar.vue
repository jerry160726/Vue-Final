<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-dark" to="/">小安甜點</router-link>
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
          <!-- <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li> -->
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/products">產品頁面</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/cart">購物車</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-dark" to="/login">後台管理</router-link>
          </li>
        </ul>
      </div>
      <button type="button" class="btn btn-light">
        結帳
        <span class="badge rounded-pill bg-danger"> {{cartData.carts.length}} </span>
      </button>
    </div>
  </nav>
</template>

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

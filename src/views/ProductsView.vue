<template>
   <div class="banner d-flex align-items-center">
    <div class="container flex-column py-3">
      <h2 class="title text-white fw-bold text-center">產品頁面</h2>
    </div>
  </div>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample">
          <div class="card border-0">
            <div class="card-header px-0 py-3 bg-white
                border border-bottom-0 border-top border-start-0 border-end-0
                rounded-0" id="headingOne"
              data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0 fw-bold ps-3">商品分類<i class="bi bi-caret-down"></i></h4>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li class="d-grid">
                      <button class="btn btn-outline-secondary mb-2"
                      @click="getProducts()">全部商品</button>
                  </li>
                  <li class="d-grid">
                      <button class="btn btn-outline-secondary mb-2"
                      @click="getProducts('巧克力')">巧克力區</button>
                  </li>
                  <li class="d-grid">
                      <button class="btn btn-outline-secondary mb-2"
                      @click="getProducts('糕點')">糕點區</button>
                  </li>
                  <li class="d-grid">
                      <button class="btn btn-outline-secondary mb-2"
                      @click="getProducts('糖果')">糖果區</button>
                  </li>
                  <li class="d-grid">
                      <button class="btn btn-outline-secondary mb-3 d-grid"
                      @click="getProducts('禮盒')">禮盒區</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row row-cols-1 row-cols-lg-3 g-3">
          <div class="product col-md-6" v-for="product in products" :key="product.id">
              <div class="card h-100">
                <router-link :to="`/product/${product.id}`" style="overflow: hidden;">
                <div :style="{ backgroundImage: `url(${product.imageUrl})` }"
                      style="height: 200px;
                            background-size: cover;
                            background-position: center center;
                            transition: all 1s ease 0s;
                            "
                      class="card-img-top"></div>
                </router-link>
                <div class="card-body">
                  <h5 class="card-title">{{ product.title }}</h5>
                  <p class="card-text" style="height: 3rem; overflow:hidden">
                    {{ product.description }}
                  </p>
                  <div class="priceArea py-2 d-flex">
                   <span class="text-muted"><del>NT${{ product.origin_price }}</del></span>&nbsp;&nbsp;
                    <p class="card-text price">
                    NT${{ product.price }}</p>
                  </div>
                  <router-link :to="`/product/${product.id}`"
                  class="info btn btn-outline-success me-2">
                  產品資料</router-link>
                  <!-- <router-link :to="`/product/${product.id}`"
                  class="order btn btn-outline-danger">
                  加到購物車</router-link> -->
                  <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <!-- 當兩個一致的時候 就不會再執行 -->
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoadingItem === product.id"
                  ></span>
                  <!-- bootstrap也有讀取按鈕 -->
                  加到購物車
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/productsView.scss" scoped>
</style>

<script>
import emitter from '@/libs/emitter.js'
export default {
  data () {
    return {
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts (category) {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      if (category) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?category=${category}`
      }
      this.$http(url).then((res) => {
        this.products = res.data.products
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
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          console.log(res)
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err.data)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

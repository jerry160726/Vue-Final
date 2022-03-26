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
            <div class="card-header px-0 py-4 bg-white
                border border-bottom-0 border-top border-start-0 border-end-0
                rounded-0" id="headingOne"
              data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0 fw-bold">商品分類</h4>
                <i class="bi bi-caret-down-fill"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                    <a href="#" class="py-2 d-block text-muted">巧克力區</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">糕點區</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">糖果區</a>
                  </li>
                  <li>
                    <a href="#" class="py-2 d-block text-muted">禮盒區</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img
                :src="product.imageUrl"
                class="card-img-top rounded-0"
                alt="..."
              />
              <a href="#" class="text-dark">
                <i class="bi bi-heart position-absolute" style="right: 16px; top: 16px"></i>
              </a>
              <div class="card-body p-0">
                <h4 class="mb-0 mt-3">
                  <a href="./detail.html" class="text-dark">{{ product.title }}</a>
                </h4>
                <p class="card-text mb-0">
                  NT${{ product.price }}
                  <span class="text-muted"><del>NT${{ product.origin_price }}</del></span>
                </p>
                <p class="text-muted mt-3"></p>
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
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      ).then((res) => {
        this.products = res.data.products
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

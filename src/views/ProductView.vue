<template>
  <div class="container">
    <router-link to="/products">
      <i class="bi bi-arrow-left" style="font-size: 2rem;"></i>
    </router-link>
    <div class="row align-items-center">
      <div class="col-md-7">
        <!-- 輪播效果 -->
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="product.imageUrl"
                class="d-block w-100"
                style="height:500px"/>
            </div>
            <div class="carousel-item" v-for="image in product.imagesUrl" :key="image">
              <img
              :src="image"
                class="d-block w-100"
                style="height:500px"/>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-5">
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <p class="mb-0 text-muted text-end"><del>NT$1,200</del></p>
        <p class="h4 fw-bold text-end">NT$1,080</p>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-light rounded">
              <div class="input-group-prepend">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon1"
                >
                  <i class="fas fa-minus"></i>
                </button>
              </div>
              <input
                type="text"
                class="
                  form-control
                  border-0
                  text-center
                  my-auto
                  shadow-none
                  bg-light
                "
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
                value="1"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-dark border-0 py-2"
                  type="button"
                  id="button-addon2"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <a
              href="./checkout.html"
              class="text-nowrap btn btn-dark w-100 py-2"
              >Lorem ipsum</a
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row my-5">
        <div class="col-md-4">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
        </div>
        <div class="col-md-3">
          <p class="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
        </div>
      </div>
      <h3 class="fw-bold">Lorem ipsum dolor sit amet</h3>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/productView.scss" scoped>
</style>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      ).then((res) => {
        this.product = res.data.product
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>

<template>
  <div class="container">
    <router-link to="/products">
        <i class="bi bi-box-arrow-left" style="font-size: 3rem;"></i>
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
      <div class="col-md-5" style="border: 1px solid black;">
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <div class="priceArea" style="border: 1px solid blue;">
          <p class="mb-0 text-muted text-end origin_price"><del>NT${{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end price">NT${{ product.price }}</p>
        </div>
        <div class="row align-items-center">
          <div class="col-6">
            <div class="input-group my-3 bg-secondary rounded">
              <div class="input-group-prepend">
                <button class="btn btn-outline-dark border-0 py-2"
                  type="button" id="button-addon1">
                  <i class="bi bi-dash"></i>
                </button>
              </div>
              <input type="text" class="form-control border-0
                  text-center my-auto shadow-none bg-primary"
                placeholder=""
                aria-label="Example text with button addon"
                aria-describedby="button-addon1" value="1"/>
              <div class="input-group-append">
                <button class="btn btn-outline-dark border-0 py-2"
                  type="button" id="button-addon2">
                 <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <router-link to="/cart" class="text-nowrap btn btn-outline-danger w-100 py-2">
                加到購物車</router-link>
          </div>
        </div>
        <div class="content">
          <h2 class="mb-2">商品說明</h2>
          <p>{{ product.content }}</p>
        </div>
        <div class="need_know">
          <h2 class="mb-2">購物須知</h2>
          <p>每次購物滿 3,000 元以上免運費，未達 3,000 元，需加付 230 元運費，訂單完成後，將在 1 ~ 3 個工作天內出貨。</p>
        </div>
      </div>
    </div>
      <h3 class="fw-bold py-3">你可能感興趣的其他甜點</h3>
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

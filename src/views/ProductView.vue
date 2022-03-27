<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <router-link to="/products">
        <i class="bi bi-arrow-bar-left" style="font-size: 3rem;"></i>
    </router-link>
    <div class="row align-items-center">
      <div class="col-md-7">
        <!-- 輪播效果 -->
        <div id="carouselExampleControls" class="carousel slide carousel-fade"
        data-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="product.imageUrl"
                class="d-block w-100"
                style="height:450px"/>
            </div>
            <div class="carousel-item" v-for="image in product.imagesUrl" :key="image">
              <img
              :src="image"
                class="d-block w-100"
                style="height:450px"/>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
          data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-5">
        <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
        <div class="priceArea">
          <p class="mb-0 text-muted text-end origin_price"><del>NT${{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end price">NT${{ product.price }}</p>
        </div>
        <div class="row align-items-center order_group py-3">
          <div class="col-6">
            <div class="input-group">
                <select id="" class="form-select" v-model.number="qty">
                  <option value="0" disabled selected>請選擇數量</option>
                  <option :value="num" v-for="num in 20" :key="`${num}-${product.id}`">
                    {{ num }}</option>
                </select>
                <span class="input-group-text" id="basic-addon2">{{product.unit}}</span>
            </div>
          </div>
          <div class="col-6">
              <button type="button" class="text-nowrap btn btn-outline-danger w-100 py-2"
              @click.prevent="addToCart">加入購物車</button></div>
        </div>
        <div class="content">
          <h2 class="mb-2 fw-bold">商品說明</h2>
          <p>{{ product.content }}</p>
        </div>
        <div class="need_know">
          <h2 class="mb-2 fw-bold">購物須知</h2>
          <p>每次購物滿 3,000 元以上免運費，未達 3,000 元，需加付 230 元運費，訂單完成後，將在 1 ~ 3 個工作天內出貨。</p>
        </div>
      </div>
    </div>
    <div class="other_products">
      <h3 class="fw-bold py-4">你可能感興趣的其他甜點</h3>
      <swiper :slides-per-view="1"
      :space-between="20"
      :breakpoints="{
        '992': {
          slidesPerView: 3,
        },
      }"
      :modules="modules"
    >
      <swiper-slide v-for="(item) in products" :key="item.id">
        <!-- <router-link :to="`/product/${item.id}`"> -->
          <div class="card border-0 mb-4 position-relative p-card"
          @click="getProduct(item.id)">
            <div class="p-card-image"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
            style="height: 300px;
            background-size: cover;
            background-position: center;">
              <div class="hover-area d-flex align-items-center justify-content-center">
                <router-link :to="`/product/${item.id}`"
                class="btn btn-outline-danger px-5">查看商品</router-link>
              </div>
            </div>
            <div class="card-body text-left">
              <h4>{{ item.title }}</h4>
              <div class="d-flex justify-content-between">
                <p class="card-text text-muted mb-0"
                style="height: 4.5rem; overflow: hidden;">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        <!-- </router-link> -->
      </swiper-slide>
    </swiper>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/productView.scss" scoped>
</style>

<script>
import Loading from 'vue-loading-overlay'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper'

export default {
  data () {
    return {
      products: [],
      product: {},
      productId: '',
      isLoading: false, // 新增讀取效果
      qty: 1
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    Loading
  },
  setup () {
    return {
      modules: [Navigation]
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        })
    },
    getProduct () {
      const { id } = this.$route.params
      this.isLoading = true
      this.$http(
        `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      ).then((res) => {
        this.product = res.data.product
        this.isLoading = false
      })
    },
    addToCart () {
      this.isLoading = true
      const data = {
        product_id: this.product.id,
        qty: this.qty
      }
      this.isLoadingItem = this.product.id
      console.log(data)
      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          console.log(res.data.message)
          this.isLoading = false
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.getProduct()
    this.getProducts()
  }
}
</script>

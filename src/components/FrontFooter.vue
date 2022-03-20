<template>
  <div class="footer bg-dark">
    <div class="container px-0 first-column d-lg-flex">
      <h3 class="text-white me-lg-auto" data-aos="fade-right">
        現在訂閱，獲得課程優惠碼！
      </h3>

      <div class="input-group" data-aos="fade-left">
        <input
          type="email"
          class="form-control"
          placeholder="輸入您的電子信箱"
          aria-label="Input group example"
          aria-describedby="btnGroupAddon"
        />
        <button type="submit" class="btn btn-light">訂閱</button>
      </div>
    </div>
    <hr class="solid" />

    <div class="container px-0 second-column" data-aos="fade-up">
      <div class="weblink d-flex justify-content-between align-items-center">
        <a href="index.html" class="d-inline-block">
          <h4 class="text-white mb-2">DOYOGA</h4>
        </a>

        <ul class="list-unstyled d-flex weblink-icon">
          <li>
            <a href="#" class="d-inline-block pe-2"
              ><i class="fab fa-facebook"></i
            ></a>
          </li>
          <li>
            <a href="#" class="d-inline-block pe-2"
              ><i class="fab fa-instagram"></i
            ></a>
          </li>
          <li>
            <a href="#" class="d-inline-block"><i class="fab fa-line"></i></a>
          </li>
        </ul>
      </div>

      <ul class="list-unstyled text-white">
        <li class="mb-2">
          <a href="#" class="d-inline-block footer-intro">課程介紹</a>
        </li>
        <li class="mb-2">
          <a href="#" class="d-inline-block footer-space">瑜珈空間</a>
        </li>

        <div class="index-final-link d-md-flex">
          <li class="mb-2">
            <a href="#" class="d-inline-block footer-schedule">當月課表</a>
          </li>
          <span class="text-white">© 2021. All Rights Reserved.</span>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/footer.scss" scoped>
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

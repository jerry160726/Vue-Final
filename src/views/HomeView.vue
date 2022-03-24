<template>
  <div class="banner d-flex align-items-center">
    <div class="container flex-column py-3">
      <h2 class="title text-white fw-bold">小安甜點，您生活的好朋友</h2>
      <p class="slogan text-white mb-3">
        經過多年的努力，開發出一道道讓人食指大動，味蕾滿足的甜點系列。
      </p>
      <div class="banner-btn">
        <!-- <button class="btn btn-outline-danger reservation-btn btn-sm
        me-2 fs-5 px-3 py-2" type="button">立即訂購</button> -->
        <!-- <button class="btn btn-outline-secondary intro-btn btn-sm
        fs-5 px-3 py-2" type="button">甜點目錄</button> -->
        <router-link to="/products"
        class="btn btn-outline-danger reservation-btn btn-sm me-2 fs-5 px-3 py-2">
            立即訂購</router-link>
        <router-link to="/cart"
        class="btn btn-outline-secondary intro-btn btn-sm fs-5 px-3 py-2">
            甜點目錄</router-link>
      </div>
    </div>
  </div>
  <div class="comfortable-space py-lg-6">
    <div class="container d-md-flex flex-md-row-reverse">
      <div class="comfo-content
          col-12 col-md-6 d-md-flex flex-column justify-content-center">
        <h2 class="mb-1 text-dark fw-bold">職人工法、平價美食</h2>
        <p class="text-dark mb-3 col-lg-10">
          我們都渴望平靜安穩的生活，擁有一處能夠靜心的角落，安撫每天繁雜忙碌的心。
        </p>
      </div>
      <div class="comfo-photo col-12 col-md-6">
        <div class="row flex-nowrap">
          <div class="picture1 col col-md-7"></div>
          <div class="comfo-twophotos px-0 col col-md-4">
            <div class="picture2 mb-md-5"></div>
            <div class="picture3 d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div class="choose-case">
      <div class="container my-3">
        <h3 class="text-dark text-center mb-1 fw-bold">
          商品分類
        </h3>
        <p class="text-dark text-center mb-4">
          我們可以帶給您...
        </p>
        <div class="row">
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card h-100">
              <div class="card-img-top choco-picture"></div>
              <div class="card-body text-center">
                <h5 class="card-title text-dark">巧克力</h5>
                <p class="card-text text-dark mb-1">現在只要 40 元</p>
                <p class="card-text2 text-dark">
                  濃純巧克力融化在口中的美妙滋味。
                </p>
                <!-- <a href="#" class="btn btn-secondary text-white d-grid">相關甜點</a> -->
                <router-link to="/products" class="btn btn-secondary text-white d-grid">
                相關甜點</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card h-100">
              <div class="card-img-top cake-picture"></div>
              <div class="card-body text-center">
                <h5 class="card-title text-dark">糕點區</h5>
                <p class="card-text text-dark mb-1">現在只要 75 元</p>
                <p class="card-text2 text-dark">
                  冰涼再食用，風味更佳。
                </p>
                <!-- <a href="#" class="btn btn-secondary text-white d-grid">相關甜點</a> -->
                <router-link to="/products" class="btn btn-secondary text-white d-grid">
                相關甜點</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card h-100">
              <div class="card-img-top candy-picture"></div>
              <div class="card-body text-center">
                <h5 class="card-title text-dark">糖果區</h5>
                <p class="card-text text-dark mb-1">現在只要 25 元</p>
                <p class="card-text2 text-dark">
                  夢幻粉粉甜蜜味，香草療癒感。
                </p>
                <!-- <a href="#" class="btn btn-secondary text-white d-grid">相關甜點</a> -->
                <router-link to="/products" class="btn btn-secondary text-white d-grid">
                相關甜點</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="../assets/stylesheets/home.scss" scoped>
</style>

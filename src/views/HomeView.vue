<template>
  <div class="banner d-flex align-items-center">
    <div class="container flex-column py-2">
      <h2 class="title text-light fw-bold">小安甜點，做你生活的好朋友</h2>
      <p class="slogan text-light mb-3">
        經過多年的努力，開發出一道道讓人食指大動，味蕾滿足的甜點系列
      </p>
      <div class="banner-btn">
        <button
          class="
            reservation-btn
            btn-primary
            text-dark
            btn-sm
            me-2
            fs-5
            px-3
            py-2
          "
          type="button"
        >
          立即訂購
        </button>
        <button
          class="intro-btn btn-dark text-white btn-sm fs-5 px-3 py-2"
          type="button"
        >
          餐點介紹
        </button>
      </div>
    </div>
  </div>
  <div class="comfortable-space">
    <div class="container d-md-flex flex-md-row-reverse">
      <div
        class="
          comfo-content
          col-12 col-md-6
          d-md-flex
          flex-column
          justify-content-center
        "
      >
        <h2 class="text-dark mb-1">職人工法、平價美食</h2>
        <p class="text-dark mb-3 col-lg-10">
          我們都渴望平靜安穩的生活，擁有一處能夠靜心的角落，安撫每天繁雜忙碌的心。
        </p>

        <!-- <a href="#">
          <div class="comfo-intro d-inline-block mb-3">
            <span class="text-dark">環境介紹</span>
          </div>
        </a> -->
      </div>

      <div class="comfo-photo col-12 col-md-6">
        <div class="row flex-nowrap">
          <div class="picture1 col col-md-7"></div>
          <div class="comfo-twophotos px-0 col col-md-4">
            <div class="picture2"></div>
            <div class="picture3 d-none d-md-block"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section>
    <div class="choose-case">
      <div class="container my-3">
        <h3 class="text-dark text-center mb-1">
          方案選擇
        </h3>
        <p class="text-light text-center mb-4">
          DOYOGA 可以帶給你...
        </p>
        <div class="row">
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card">
              <div>
                <img
                  src="https://github.com/hexschool/webLayoutTraining1st/blob/master/yoga-week8/woman%20in%20white%20tank%20top%20and%20white%20leggings%20bending%20her%20body.jpg?raw=true"
                  class="card-img-top object-fit-cover"
                  alt="..."
                />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title text-dark">首次體驗</h5>
                <p class="card-text text-light">NT $450 / 次</p>
                <p class="card-text2 text-dark">
                  分基礎、中級、高級可以選擇。初次至 DOYOGA 上課建議選擇此方案。
                </p>
                <a href="#" class="btn btn-light text-white d-grid">選擇課程</a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card">
              <div>
                <img
                  src="https://github.com/hexschool/webLayoutTraining1st/blob/master/yoga-week8/woman%20performing%20yoga.jpg?raw=true"
                  class="card-img-top object-fit-cover"
                  alt="..."
                />
              </div>
              <div class="card-body text-center">
                <h5 class="card-title text-dark">短期體驗</h5>
                <p class="card-text text-light">NT $1800 / 月</p>
                <p class="card-text2 text-dark">
                  分基礎、中級、高級可以選擇。想試著培養瑜珈習慣者可以選擇此方案。
                </p>
                <a href="#" class="btn btn-light text-white d-grid">選擇課程</a>
              </div>
            </div>
          </div>
          <div class="col-md-12 col-lg-4 mb-2 case-pd-off px-lg-2">
            <div class="card">
              <div>
                <img
                  src="https://github.com/hexschool/webLayoutTraining1st/blob/master/yoga-week8/woman%20in%20blue%20leggings%20and%20black%20tank%20top%20doing%20yoga.jpg?raw=true"
                  class="card-img-top object-fit-cover"
                  alt="..."
                />
              </div>
              <div class="card-body text-center" data-aos="fade-left">
                <h5 class="card-title text-dark">長期體驗</h5>
                <p class="card-text text-light">NT $5600 / 季</p>
                <p class="card-text2 text-dark">
                  分基礎、中級、高級可以選擇。有長期習慣做瑜伽者建議選擇此方案。
                </p>
                <a href="#" class="btn btn-light text-white d-grid">選擇課程</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="../assets/stylesheets/home.scss">
</style>

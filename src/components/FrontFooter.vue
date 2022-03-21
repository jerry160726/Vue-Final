<template>
  <div class="footer bg-primary">
    <div class="container px-0 second-column" data-aos="fade-up">
      <div class="weblink d-flex justify-content-between align-items-center">
        <router-link class="navbar-brand text-dark" to="/">小安甜點</router-link>
        <ul class="list-unstyled d-flex weblink-icon">
          <li>
            <i class="bi bi-meta pe-3" style="font-size: 1.8rem; color: cornflowerblue;"></i>
          </li>
          <li>
            <i class="bi bi-line pe-3" style="font-size: 1.8rem; color: cornflowerblue;"></i>
          </li>
          <li>
            <i class="bi bi-envelope pe-3" style="font-size: 1.8rem; color: cornflowerblue;"></i>
          </li>
          <li>
            <i class="bi bi-github" style="font-size: 1.8rem; color: cornflowerblue;"></i>
          </li>
        </ul>
      </div>

      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li>
          <router-link class="nav-link text-dark" to="/products">產品頁面</router-link>
        </li>
        <li>
          <router-link class="nav-link text-dark" to="/cart">購物車</router-link>
        </li>
        <div class="index-final-link d-md-flex">
          <li>
            <router-link class="nav-link text-dark" to="/login">後台管理</router-link>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/footer.scss" scoped>
</style>

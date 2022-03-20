<template>
  <div class="footer bg-primary">
    <div class="container second-column">
      <div class="weblink d-flex justify-content-between align-items-center">
        <router-link class="navbar-brand text-dark d-inline-block mb-2" to="/"
          >小安甜點</router-link
        >
      </div>

      <ul class="list-unstyled text-white">
        <li class="nav-item mb-2">
          <router-link
            class="nav-link text-dark d-inline-block footer-intro"
            to="/products"
            >產品頁面</router-link
          >
        </li>
        <li class="nav-item mb-2">
          <router-link
            class="nav-link text-dark d-inline-block footer-space"
            to="/cart"
            >購物車</router-link
          >
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link text-dark d-inline-block footer-schedule"
            to="/login"
            >後台管理</router-link
          >
          <span class="text-dark copyright">© 2021. All Rights Reserved.</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/footer.scss">
</style>

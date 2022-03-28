<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-8 login_block">
        <h1 class="h3 text-center text-white">管理者登入</h1>
        <form class="form-signin">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              v-model="user.username"
              placeholder="name@example.com"
              required
              autofocus
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="user.password"
              placeholder="Password"
              required
            />
            <label for="password">Password</label>
          </div>
          <button
            class="btn btn-lg btn-outline-primary w-100"
            type="button"
            @click="login">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/login.scss" scoped>
</style>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const url = 'https://vue3-course-api.hexschool.io/v2/admin/signin'
      this.$http
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data
          console.log(token, expired)
          console.log(res)
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`
          this.$router.push('/admin/products')
        })
        .catch((error) => {
          console.log(error)
          alert('輸入的帳號密碼有誤')
        })
    }
  }
}
</script>

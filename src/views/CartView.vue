<template>
  <div class="container py-5">
    <h2 class="text-center mb-3">購物車內容</h2>
    <div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th class="text-center">刪除</th>
            <th class="text-center" style="width: 150px">圖片</th>
            <th class="text-center">品名</th>
            <th class="text-start" style="width: 150px">數量/單位</th>
            <th class="text-center">單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm text-center"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-trash-fill"></i>
                </button>
              </td>
              <td class="text-center">
                <div
                  :style="{ backgroundImage: `url(${item.product.imageUrl})` }"
                  style="
                    height: 100px;
                    width: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                ></div>
              </td>
              <td class="text-center">
                {{ item.product.title }}
              </td>
              <td class="text-start">
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCart(item)"
                      :disabled="isLoadingItem === item.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 300"
                        :key="`${num}-${item.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>

                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-center">
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="text-end">總計</td>
            <td class="text-center">{{ cartData.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="order-column d-flex justify-content-evenly">
      <button
        class="btn btn-outline-warning btn-sm fs-5 px-3 py-2"
        type="button"
        @click="removeCartItems"
        :disabled="cartData.carts.length === 0"
      >
        清空購物車
      </button>
      <router-link to="/confirm"
      class="btn btn-outline-danger btn-sm fs-5 px-3 py-2">確定訂單</router-link>
    </div>
  </div>
</template>

<style lang="scss" src="../assets/stylesheets/pages/cartview.scss" scoped>
</style>

<script>
import emitter from '@/libs/emitter.js'

export default {
  data () {
    return {
      cartData: {
        carts: [] // 清空購物車才可以用disabled
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: ''
        }
      },
      products: [],
      product: {},
      productId: '',
      isLoadingItem: '' // 新增讀取效果
    }
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
        })
    },
    openProductModal (id) {
      this.productId = id
      this.$refs.productModal.openModal()
    },
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http
        .post(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          console.log(res.data)
          this.getCart()
          this.$refs.productModal.closeModal()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    removeCartItem (id) {
      this.isLoadingItem = id
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          this.getCart()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
    },
    removeCartItems () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          this.getCart()
          emitter.emit('get-cart')
        })
        .catch((err) => {
          console.log(err.data)
        })
    },
    updateCart (item) {
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.isLoadingItem = item.id
      this.$http
        .put(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((res) => {
          console.log(res.data)
          this.getCart()
          this.isLoadingItem = ''
          emitter.emit('get-cart')
        })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http
        .post(url, { data: order })
        .then((response) => {
          console.log(response)
          alert(response.data.message)
          this.$refs.form.resetForm()
          this.form.message = ''
          this.getCart()
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getProducts()
    this.getCart()
  }
}
</script>

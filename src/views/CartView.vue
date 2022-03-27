<template>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <product-modal
        :id="productId"
        ref="productModal"
        @add-cart="addToCart"
      ></product-modal>
      <!-- 產品Modal -->
      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>
              {{ product.title }}
            </td>
            <td>
              <!-- 如果價格一樣的話 顯示上面那一組就好
                如果不一樣 顯示下面這一組 -->
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  :disabled="isLoadingItem === product.id"
                  @click="openProductModal(product.id)"
                >
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoadingItem === product.id"
                >
                  <!-- 當兩個一致的時候 就不會再執行 -->
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoadingItem === product.id"
                  ></span>
                  <!-- bootstrap也有讀取按鈕 -->
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="removeCartItems"
          :disabled="cartData.carts.length === 0"
        >
          清空購物車
        </button>
      </div>

      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <!-- 購物車的資料存不存在 -->
          <template v-if="cartData.carts">
            <!-- 改cartData 方便閱讀使用 -->
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  x
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <!-- <div class="text-success">
                    已套用優惠券
                  </div> -->
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!-- <input min="1" type="number" class="form-control" v-model="item.qty"> -->
                    <!-- 使用者會亂填資料 bootstrap找select代替使用 -->

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
              <td class="text-end">
                <!-- <small class="text-success">折扣價：</small> -->
                {{ item.total }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
          <!-- <tr>
              <td colspan="3" class="text-end text-success">折扣價</td>
              <td class="text-end text-success">{{ }}</td>
            </tr> -->
        </tfoot>
      </table>
      <div class="my-5 row justify-content-center">
        <v-form
          ref="form"
          class="col-md-6"
          v-slot="{ errors }"
          @submit="createOrder"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <v-field
              id="email"
              name="email"
              type="email"
              class="form-control"
              v-model="form.user.email"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
            ></v-field>
            <error-message
              name="email"
              class="invalid-feedback"
            ></error-message>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <v-field
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              placeholder="請輸入姓名"
              rules="required"
              v-model="form.user.name"
            ></v-field>
            <error-message name="姓名" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <v-field
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              placeholder="請輸入電話"
              rules="required"
              v-model="form.user.tel"
            ></v-field>
            <error-message name="電話" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <v-field
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              placeholder="請輸入地址"
              rules="required"
              v-model="form.user.address"
            ></v-field>
            <error-message name="地址" class="invalid-feedback"></error-message>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-danger">送出訂單</button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import emitter from '@/libs/emitter.js'
import { Field, Form, ErrorMessage } from 'vee-validate'
import ProductModal from '@/components/ProductModal.vue'

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
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
    ProductModal
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
        })
    },
    removeCartItems () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
        )
        .then(() => {
          this.getCart()
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

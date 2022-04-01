<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="orderModal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="product.user">
                  <tr>
                    <th style="width: 100px">姓名</th>
                    <td>{{ product.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ product.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ product.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ product.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ product.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ product.create_at }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="product.paid_date">
                        {{ product.paid_date }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="product.is_paid" class="text-success"
                        >已付款</strong
                      >
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>
                      {{ product.total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr></tr>
                </thead>
                <tbody>
                  <tr v-for="item in product.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>{{ item.qty }} / {{ item.product.unit }}</td>
                    <td class="text-end">
                      {{ item.final_total }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="d-flex justify-content-end">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="product.is_paid"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    <span v-if="product.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-success"
            @click="updateProduct"
          >
            修改付款狀態
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import modalMixin from '@/mixins/modalMixin'
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempOrder'],
  template: '#templateForProductModal',
  data () {
    return {
      product: {},
      bsModal: {}
    }
  },
  watch: {
    tempOrder () {
      this.product = this.tempOrder
    }
  },
  methods: {
    updateProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`

      this.$http.put(url, { data: this.tempOrder }) // 資料的格式要參照api的格式
        .then((res) => {
          console.log(res)
          // this.getProducts();  //沒有get Product (外層方法)
          this.$emit('get-orders')
          this.bsModal.hide()
        })
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.orderModal)
  }
}
</script>

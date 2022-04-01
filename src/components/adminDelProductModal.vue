<template>
  <div
    id="delProductModal"
    ref="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary cancel_btn"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-danger del_btn"
            @click="delProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-header {
  background-color: red;
}
.cancel_btn:hover {
  color: white;
}
.del_btn:hover {
  background-color: red;
  color: white;
}
</style>

<script>
import Modal from 'bootstrap/js/dist/modal'
export default {
  props: ['tempProduct'],
  template: '#templateForDelProductModal',
  methods: {
    data () {
      return {
        product: {},
        bsModal: {}
      }
    },
    // watch: {
    //   tempProduct () {
    //     this.product = this.tempProduct
    //   }
    // },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http
        .delete(url) // 資料的格式要參照api的格式
        .then((res) => {
          console.log(res)
          // this.getProducts();
          this.$emit('get-products')
          this.bsModal.hide()
        })
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.delProductModal)
  }
}
</script>

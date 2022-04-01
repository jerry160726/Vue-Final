<template>
  <div
    id="delOrderModal"
    ref="delOrderModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delOrderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header text-white">
          <h5 id="delOrderModalLabel" class="modal-title">
            <span>刪除訂單</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <strong>是否刪除此筆訂單(刪除後將無法恢復)。</strong>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary cancel_btn"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button type="button" class="btn btn-outline-danger del_btn" @click="delProduct">
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
  props: ['tempOrder'],
  template: '#templateForDelProductModal',
  methods: {
    data () {
      return {
        product: {},
        bsModal: {}
      }
    },
    // watch: {
    //   tempOrder () {
    //     this.product = this.tempOrder
    //   }
    // },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`

      this.$http
        .delete(url) // 資料的格式要參照api的格式
        .then((res) => {
          console.log(res)
          // this.getProducts();
          this.$emit('get-orders')
          this.bsModal.hide()
        })
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.delOrderModal)
  }
}
</script>

<template>
  <div
    id="productModal"
    ref="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>新增產品</span>
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
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主圖網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="imageUrl"
                  v-model="product.imageUrl"
                />
                <img :src="product.imageUrl" class="img-fluid" alt="" />

                <div class="mb-3">
                  <div v-if="Array.isArray(product.imagesUrl)">
                    <!-- 多圖新增 看是不是Array -->
                    <!-- 用這段語法判斷時不是陣列 (沒有陣列這個型別!) -->

                    <!-- Key為唯一值 加個隨意的 template幫助辨識 -->
                    <template
                      v-for="(img, key) in product.imagesUrl"
                      :key="key + '12345'"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="product.imagesUrl[key]"
                      />
                      <img
                        :src="product.imagesUrl[key]"
                        class="img-fluid"
                        alt=""
                      />
                    </template>

                    <!-- 前面判斷陣列的長度 後面判斷陣列內有無文字(陣列長度-1) -->
                    <button
                      v-if="
                        !product.imagesUrl.length ||
                        product.imagesUrl[product.imagesUrl.length - 1]
                      "
                      type="button"
                      class="btn btn-primary w-100"
                      @click="product.imagesUrl.push('')"
                    >
                      ADD
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn btn-outline-danger w-100"
                      @click="product.imagesUrl.pop()"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="product.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="product.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="product.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model.number="product.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model.number="product.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  v-model="product.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  v-model="product.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="product.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
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
          <button type="button" class="btn btn-primary" @click="updateProduct">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
// const productModal = {}

export default {
  props: ['tempProduct', 'isNew'],
  template: '#templateForProductModal',
  data () {
    return {
      product: {},
      bsModal: {}
    }
  },
  watch: {
    tempProduct () {
      this.product = this.tempProduct
    }
  },
  methods: {
    updateProduct () {
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let method = 'post'

      if (!this.isNew) {
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
        method = 'put'
      } // 如果是編輯的話 就代id並改成put

      this.$http[method](url, { data: this.tempProduct }) // 資料的格式要參照api的格式
        .then((res) => {
          // console.log(res)
          // this.getProducts();  //沒有get Product (外層方法)
          this.$emit('get-products')
          this.bsModal.hide()
        })
    }
  },
  mounted () {
    this.bsModal = new Modal(this.$refs.productModal)
  }
}
</script>

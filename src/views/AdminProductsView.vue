<template>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-secondary" type="button" @click="openModal('isNew')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody v-for="item in products" :key="item.id">
        <tr>
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-left">{{ item.origin_price }}</td>
          <td class="text-left">{{ item.price }}</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-success btn-sm"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :pages="pagination" @get-product="getProducts"></pagination>
  </div>
  <product-modal
    :temp-product="tempProduct"
    :is-new="isNew"
    v-on:get-products="getProducts"
    ref="productModal"
  ></product-modal>
  <del-product-modal
    :temp-product="tempProduct"
    v-on:get-products="getProducts"
    ref="delProductModal"
  ></del-product-modal>
</template>

<script>
import pagination from '@/components/Pagination.vue'
import productModal from '@/components/AdminProductModal'
import delProductModal from '@/components/AdminDelProductModal'

export default {
  components: {
    pagination,
    productModal,
    delProductModal
  },
  data () {
    return {
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      isNew: false, // 新增編輯需要用到的狀態判斷
      pagination: {} // 分頁的資料
    }
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      // eslint-disable-next-line dot-notation
      this.$http.defaults.headers.common['Authorization'] = token
      // console.log(token)

      const url = `${process.env.VUE_APP_API}api/user/check`
      this.$http.post(url).then(() => {
        this.getProducts()
      })
    },
    getProducts (page = 1) {
      // 帶入page這個參數
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/?page=${page}` // 參數預設值

      this.$http.get(url).then((res) => {
        // console.log(res)
        // console.log(res.data.products)
        this.products = res.data.products
        this.pagination = res.data.pagination // 撈出分頁資料
      })
    },
    openModal (status, product) {
      // console.log(status, product);
      if (status === 'isNew') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.$refs.productModal.bsModal.show()
        this.isNew = true
      } else if (status === 'edit') {
        this.tempProduct = { ...product } // 淺拷貝, 因為傳參考
        this.$refs.productModal.bsModal.show()
        this.isNew = false
      } else if (status === 'delete') {
        // delProductModal.show()
        this.$refs.delProductModal.bsModal.show()
        this.tempProduct = { ...product } // 淺拷貝, 因為傳參考
      }
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>

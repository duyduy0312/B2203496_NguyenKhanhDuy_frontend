<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" @submit="performSearch" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách độc giả
        <i class="fas fa-address-book"></i>
      </h4>
      <DocGiaList
        v-if="filteredDocGiasCount > 0"
        :docgias="filteredDocGias"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddDocGia()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllDocGias()">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeDocGia">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <DocGiaCard :docgia="activeDocGia" />
        <router-link
          :to="{
            name: 'docgia.edit',
            params: { id: activeDocGia._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaCard from "@/components/Card/docgia.card.vue";
import InputSearch from "@/components/InputSearch.vue";
import DocGiaList from "@/components/List/docgia.list.vue";
import DocGiaService from "@/services/docgia.service";
export default {
  components: {
    DocGiaCard,
    InputSearch,
    DocGiaList,
  },
  data() {
    return {
      docgias: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    docgiaStrings() {
      return this.docgias.map((docgia) => {
        return Object.values(docgia).join("").toLowerCase();
      });
    },

    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredDocGias() {
      if (!this.searchText) return this.docgias;
      const searchLower = this.searchText.toLowerCase();
      return this.docgias.filter((_docgia, index) =>
        this.docgiaStrings[index].includes(searchLower)
      );
    },

    activeDocGia() {
      if (this.activeIndex < 0) return null;
      return this.filteredDocGias[this.activeIndex];
    },
    filteredDocGiasCount() {
      return this.filteredDocGias.length;
    },
  },
  methods: {
    async retrieveDocGias() {
      try {
        this.docgias = await DocGiaService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveDocGias();
      this.activeIndex = -1;
    },
    async removeAllDocGias() {
      if (confirm("Bạn muốn xóa tất cả Độc giả?")) {
        try {
          await DocGiaService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddDocGia() {
      this.$router.push({ name: "docgia.add" });
    },
    performSearch() {
      // Có thể thêm logic tìm kiếm bổ sung ở đây nếu cần
      console.log("Performing search with:", this.searchText);
    }
  },
  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>

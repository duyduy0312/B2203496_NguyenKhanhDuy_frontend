<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" @submit="performSearch" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách nhân viên
        <i class="fas fa-users"></i>
      </h4>
      <NhanVienList
        v-if="filteredNhanViensCount > 0"
        :nhanviens="filteredNhanViens"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có nhân viên nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddNhanVien()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllNhanViens()">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeNhanVien">
        <h4>
          Chi tiết Nhân viên
          <i class="fas fa-id-card"></i>
        </h4>
        <NhanVienCard :nhanvien="activeNhanVien" />
        <router-link
          :to="{
            name: 'nhanvien.edit',
            params: { id: activeNhanVien._id },
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
import NhanVienCard from "@/components/Card/nhanvien.card.vue";
import InputSearch from "@/components/InputSearch.vue";
import NhanVienList from "@/components/List/nhanvien.list.vue";
import NhanVienService from "@/services/nhanvien.service";

export default {
  components: {
    NhanVienCard,
    InputSearch,
    NhanVienList,
  },
  data() {
    return {
      nhanviens: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    nhanvienStrings() {
      return this.nhanviens.map((nhanvien) => {
        return Object.values(nhanvien).join("").toLowerCase();
      });
    },
    filteredNhanViens() {
      if (!this.searchText) return this.nhanviens;
      const searchLower = this.searchText.toLowerCase();
      return this.nhanviens.filter((_nhanvien, index) =>
        this.nhanvienStrings[index].includes(searchLower)
      );
    },
    activeNhanVien() {
      if (this.activeIndex < 0) return null;
      return this.filteredNhanViens[this.activeIndex];
    },
    filteredNhanViensCount() {
      return this.filteredNhanViens.length;
    },
  },
  methods: {
    async retrieveNhanViens() {
      try {
        this.nhanviens = await NhanVienService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveNhanViens();
      this.activeIndex = -1;
    },
    async removeAllNhanViens() {
      if (confirm("Bạn muốn xóa tất cả Nhân viên?")) {
        try {
          await NhanVienService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNhanVien() {
      this.$router.push({ name: "nhanvien.add" });
    },
    performSearch() {
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
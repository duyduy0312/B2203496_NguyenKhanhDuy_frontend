<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" @submit="performSearch" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Sách thư viện
        <i class="fas fa-book"></i>
      </h4>
      <SachList
        v-if="filteredSachsCount > 0"
        :sachs="filteredSachs"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddSach()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllSachs()">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeSach">
        <h4>
          Chi tiết Sách
          <i class="fas fa-info-circle"></i>
        </h4>
        <SachCard :sach="activeSach" />
        <router-link
          :to="{
            name: 'sach.edit',
            params: { id: activeSach._id },
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
import SachCard from "@/components/Card/Sach.vue";
import InputSearch from "@/components/InputSearch.vue";
import SachList from "@/components/List/Sach.vue";
import SachService from "@/services/sach.service";

export default {
  components: {
    SachCard,
    InputSearch,
    SachList,
  },
  data() {
    return {
      sachs: [],
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
    sachStrings() {
      return this.sachs.map((sach) => {
        return Object.values(sach).join("").toLowerCase();
      });
    },
    filteredSachs() {
      if (!this.searchText) return this.sachs;
      const searchLower = this.searchText.toLowerCase();
      return this.sachs.filter((_sach, index) =>
        this.sachStrings[index].includes(searchLower)
      );
    },
    activeSach() {
      if (this.activeIndex < 0) return null;
      return this.filteredSachs[this.activeIndex];
    },
    filteredSachsCount() {
      return this.filteredSachs.length;
    },
  },
  methods: {
    async retrieveSachs() {
      try {
        this.sachs = await SachService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveSachs();
      this.activeIndex = -1;
    },
    async removeAllSachs() {
      if (confirm("Bạn muốn xóa tất cả sách?")) {
        try {
          await SachService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddSach() {
      this.$router.push({ name: "sach.add" });
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
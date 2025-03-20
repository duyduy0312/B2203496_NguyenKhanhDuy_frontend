<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" @submit="performSearch" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách nhà xuất bản
        <i class="fas fa-building"></i>
      </h4>
      <NhaXuatBanList
        v-if="filteredNhaXuatBansCount > 0"
        :nhaxuatbans="filteredNhaXuatBans"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có nhà xuất bản nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddNhaXuatBan()">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllNhaXuatBans()">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeNhaXuatBan">
        <h4>
          Chi tiết Nhà xuất bản
          <i class="fas fa-info-circle"></i>
        </h4>
        <NhaXuatBanCard :nhaxuatban="activeNhaXuatBan" />
        <router-link
          :to="{
            name: 'nhaxuatban.edit',
            params: { id: activeNhaXuatBan._id },
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
import NhaXuatBanCard from "@/components/Card/NhaXuatBan.vue";
import InputSearch from "@/components/InputSearch.vue";
import NhaXuatBanList from "@/components/List/NhaXuatBan.vue";
import NhaXuatBanService from "@/services/nhaxuatban.service";

export default {
  components: {
    NhaXuatBanCard,
    InputSearch,
    NhaXuatBanList,
  },
  data() {
    return {
      nhaxuatbans: [],
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
    nhaxuatbanStrings() {
      return this.nhaxuatbans.map((nhaxuatban) => {
        return Object.values(nhaxuatban).join("").toLowerCase();
      });
    },
    filteredNhaXuatBans() {
      if (!this.searchText) return this.nhaxuatbans;
      const searchLower = this.searchText.toLowerCase();
      return this.nhaxuatbans.filter((_nhaxuatban, index) =>
        this.nhaxuatbanStrings[index].includes(searchLower)
      );
    },
    activeNhaXuatBan() {
      if (this.activeIndex < 0) return null;
      return this.filteredNhaXuatBans[this.activeIndex];
    },
    filteredNhaXuatBansCount() {
      return this.filteredNhaXuatBans.length;
    },
  },
  methods: {
    async retrieveNhaXuatBans() {
      try {
        this.nhaxuatbans = await NhaXuatBanService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveNhaXuatBans();
      this.activeIndex = -1;
    },
    async removeAllNhaXuatBans() {
      if (confirm("Bạn muốn xóa tất cả Nhà xuất bản?")) {
        try {
          await NhaXuatBanService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddNhaXuatBan() {
      this.$router.push({ name: "nhaxuatban.add" });
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
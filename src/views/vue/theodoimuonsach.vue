<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh sách mượn sách
        <i class="fas fa-book"></i>
      </h4>
      <TheoDoiMuonSachList
        v-if="filteredMuonSachCount > 0"
        :danhSachMuonSach="filteredMuonSach"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có thông tin mượn sách nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddMuonSach">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-sm btn-danger" @click="removeAllMuonSach">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeMuonSach">
        <h4>
          Chi tiết mượn sách
          <i class="fas fa-book-open"></i>
        </h4>
        <TheoDoiMuonSachCard :theoDoiMuonSach="activeMuonSach" />
        <router-link
          :to="{
            name: 'theodoimuonsach.edit',
            params: { id: activeMuonSach._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachList from '@/components/List/theodoimuonsach.list.vue';
import InputSearch from '@/components/InputSearch.vue';
import TheoDoiMuonSachService from '@/services/theodoimuonsach.service';
import TheoDoiMuonSachCard from '@/components/Card/theodoimuonsach.card.vue';

export default {
  components: {
    TheoDoiMuonSachList,
    TheoDoiMuonSachCard,
    InputSearch,
  },
  data() {
    return {
      danhSachMuonSach: [],
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
    filteredMuonSach() {
      if (!this.searchText) return this.danhSachMuonSach;
      return this.danhSachMuonSach.filter((item) =>
        `${item.MADOCGIA} ${item.MASACH}`.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    activeMuonSach() {
      if (this.activeIndex < 0) return null;
      return this.filteredMuonSach[this.activeIndex];
    },
    filteredMuonSachCount() {
      return this.filteredMuonSach.length;
    },
  },
  methods: {
    async retrieveMuonSach() {
      try {
        this.danhSachMuonSach = await TheoDoiMuonSachService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveMuonSach();
      this.activeIndex = -1;
    },
    async removeAllMuonSach() {
      if (confirm("Bạn muốn xóa tất cả thông tin mượn sách?")) {
        try {
          await TheoDoiMuonSachService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddMuonSach() {
      this.$router.push({ name: "theodoimuonsach.add" });
    },
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

<template>
  <div v-if="theoDoiMuonSach" class="page">
    <h4>Hiệu chỉnh thông tin mượn sách</h4>
    <TheoDoiMuonSachForm
      :theoDoiMuonSach="theoDoiMuonSach"
      @submit:theoDoiMuonSach="updateTheoDoiMuonSach"
      @delete:theoDoiMuonSach="deleteTheoDoiMuonSach"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import TheoDoiMuonSachForm from '@/components/Form/theodoimuonsach.form.vue';
import TheoDoiMuonSachService from '@/services/theodoimuonsach.service';

export default {
  components: {
    TheoDoiMuonSachForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      theoDoiMuonSach: null,
      message: "",
    };
  },
  methods: {
    async getTheoDoiMuonSach(id) {
      try {
        this.theoDoiMuonSach = await TheoDoiMuonSachService.get(id);
      } catch (error) {
        console.log(error);
        this.$router.push({
          name: "notfound",
          params: {
            pathMatch: this.$route.path.split("/").slice(1),
          },
          query: this.$route.query,
          hash: this.$route.hash,
        });
      }
    },
    async updateTheoDoiMuonSach(data) {
      try {
        await TheoDoiMuonSachService.update(this.theoDoiMuonSach._id, data);
        alert("Thông tin mượn sách được cập nhật thành công.");
        this.$router.push({ name: "theodoimuonsach" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi cập nhật thông tin mượn sách.";
      }
    },
    async deleteTheoDoiMuonSach() {
      if (confirm("Bạn muốn xóa thông tin mượn sách này?")) {
        try {
          await TheoDoiMuonSachService.delete(this.theoDoiMuonSach._id);
          this.$router.push({ name: "theodoimuonsach" });
        } catch (error) {
          console.log(error);
          this.message = "Có lỗi xảy ra khi xóa thông tin mượn sách.";
        }
      }
    },
  },
  created() {
    this.getTheoDoiMuonSach(this.id);
    this.message = "";
  },
};
</script>
<template>
  <div v-if="nhaxuatban" class="page">
    <h4>Hiệu chỉnh Nhà xuất bản</h4>
    <NhaXuatBanForm
      :nhaxuatban="nhaxuatban"
      @submit:nhaxuatban="updateNhaXuatBan"
      @delete:nhaxuatban="deleteNhaXuatBan"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NhaXuatBanForm from "@/components/Form/NhaXuatBan.vue";
import NhaXuatBanService from "@/services/nhaxuatban.service";

export default {
  components: {
    NhaXuatBanForm,
  },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      nhaxuatban: null,
      message: "",
    };
  },
  methods: {
    async getNhaXuatBan(id) {
      try {
        this.nhaxuatban = await NhaXuatBanService.get(id);
      } catch (error) {
        console.log(error);

        // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
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
    async updateNhaXuatBan(data) {
      try {
        await NhaXuatBanService.update(this.nhaxuatban.MANXB, data);
        this.message = "Nhà xuất bản được cập nhật thành công.";
        this.$router.push({ name: "danhsachnhaxuatban" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi cập nhật nhà xuất bản.";
      }
    },
    async deleteNhaXuatBan() {
      if (confirm("Bạn muốn xóa Nhà xuất bản này?")) {
        try {
          await NhaXuatBanService.delete(this.nhaxuatban.MANXB);
          this.$router.push({ name: "danhsachnhaxuatban" });
        } catch (error) {
          console.log(error);
          this.message = "Có lỗi xảy ra khi xóa nhà xuất bản.";
        }
      }
    },
  },
  created() {
    this.getNhaXuatBan(this.id);
    this.message = "";
  },
};
</script>

<style>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
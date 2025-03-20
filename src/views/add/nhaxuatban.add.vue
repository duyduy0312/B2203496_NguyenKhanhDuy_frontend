<template>
  <div v-if="nhaxuatban" class="page">
    <h4>Thêm Nhà xuất bản</h4>
    <NhaXuatBanForm
      :nhaxuatban="nhaxuatban"
      @submit:nhaxuatban="addNhaXuatBan"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NhaXuatBanForm from "@/components/Form/nhaxuatban.form.vue";
import NhaXuatBanService from "@/services/nhaxuatban.service";

export default {
  components: {
    NhaXuatBanForm,
  },

  data() {
    return {
      nhaxuatban: {
        MANXB: "",
        TENNXB: "",
        DIACHI: "",
      },
      message: "",
    };
  },

  methods: {
    async addNhaXuatBan(data) {
      try {
        await NhaXuatBanService.create(data);
        this.message = "Nhà xuất bản đã được thêm thành công.";
        this.$router.push({ name: "danhsachnhaxuatban" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi thêm nhà xuất bản.";
      }
    },
  },

  created() {
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

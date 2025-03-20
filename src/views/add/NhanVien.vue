<template>
  <div v-if="nhanvien" class="page">
    <h4>Thêm Nhân viên</h4>
    <NhanVienForm :nhanvien="nhanvien" @submit:nhanvien="addNhanVien" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import NhanVienForm from "@/components/Form/NhanVien.vue";
import NhanVienService from "@/services/nhanvien.service";

export default {
  components: {
    NhanVienForm,
  },

  data() {
    return {
      nhanvien: {},
      message: "",
    };
  },

  methods: {
    async addNhanVien(data) {
      try {
        await NhanVienService.create(data);
        this.$router.push({ name: "danhsachnhanvien" });
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {},
};
</script>
<template>
  <div v-if="sach" class="page">
    <h4>Thêm Sách</h4>
    <SachForm :sach="sach" @submit:sach="addSach" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import SachForm from "@/components/Form/sach.form.vue";
import SachService from "@/services/sach.service";

export default {
  components: {
    SachForm,
  },

  data() {
    return {
      sach: {},
      message: "",
    };
  },

  methods: {
    async addSach(data) {
      try {
        await SachService.create(data);
        this.$router.push({ name: "danhsachsach" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi thêm sách.";
      }
    },
  },

  created() {},
};
</script>

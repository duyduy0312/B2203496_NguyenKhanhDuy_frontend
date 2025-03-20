<template>
  <div class="page">
    <h4>Thêm thông tin mượn sách</h4>
    <TheoDoiMuonSachForm :theoDoiMuonSach="theoDoiMuonSach" @submit:theoDoiMuonSach="createTheoDoiMuonSach" />
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
  data() {
    return {
      theoDoiMuonSach: {
        MADOCGIA: '',
        MASACH: '',
        NGAYMUON: '',
        NGAYTRA: '',
        TRANGTHAI: '',
        MSNV: '',
      },
      message: "",
    };
  },
  methods: {
    async createTheoDoiMuonSach(data) {
      try {
        await TheoDoiMuonSachService.create(data);
        alert("Thông tin mượn sách được thêm thành công.");
        this.$router.push({ name: "theodoimuonsach" });
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi thêm thông tin mượn sách.";
      }
    },
  },
};
</script>
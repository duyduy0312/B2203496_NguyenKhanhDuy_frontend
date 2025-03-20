<template>
  <div>
    <TheoDoiMuonSachCard :theoDoiMuonSach="combinedData" />
  </div>
</template>

<script>
import TheoDoiMuonSachCard from '@/components/Card/theodoimuonsach.card.vue';
import TheoDoiMuonSachService from '@/services/theodoimuonsach.service';
import DocGiaService from '@/services/docgia.service';

export default {
  components: {
    TheoDoiMuonSachCard,
  },
  data() {
    return {
      theoDoiMuonSach: null,
      docGia: null,
    };
  },
  computed: {
    combinedData() {
      if (this.theoDoiMuonSach && this.docGia) {
        return {
          ...this.theoDoiMuonSach,
          TEN_DOC_GIA: `${this.docGia.HOLOT} ${this.docGia.TEN}`,
        };
      }
      return null;
    },
  },
  async created() {
    try {
      const id = this.$route.params.id; // Giả sử ID được truyền qua route params
      this.theoDoiMuonSach = await TheoDoiMuonSachService.get(id);
      this.docGia = await DocGiaService.get(this.theoDoiMuonSach.MADOCGIA);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>
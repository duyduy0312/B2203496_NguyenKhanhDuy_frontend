<template>
  <div v-if="docgia" class="page">
    <h4>Thêm Liên hệ</h4>
    <DocGiaForm :docgia="docgia" @submit:docgia="addDocGia" />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import DocGiaForm from "@/components/Form/DocGia.vue";
import DocGiaService from "@/services/docgia.service";

export default {
  components: {
    DocGiaForm,
  },

  data() {
    return {
      docgia: {},
      message: "",
    };
  },

  methods: {
    async addDocGia(data) {
      try {
        await DocGiaService.create(data);
        this.$router.push({ name: "danhsachdocgia" });
      } catch (error) {
        console.log(error);
      }
    },
  },

  created() {},
};
</script>

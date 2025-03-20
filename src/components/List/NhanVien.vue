<script>
export default {
  props: {
    nhanviens: { type: Array, default: [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  methods: {
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="(nhanvien, index) in nhanviens"
      :key="nhanvien.MSNV"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ nhanvien.HoTenNV }} - {{ nhanvien.ChucVu }}
    </li>
  </ul>
</template>

<template>
  <ul class="list-group">
    <li
      v-for="(item, index) in danhSachMuonSach"
      :key="item.id"
      :class="{ active: index === activeIndex }"
      class="list-group-item"
      @click="updateActiveIndex(index)"
    >
      {{ item.MADOCGIA }} - {{ item.MASACH }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    danhSachMuonSach: { type: Array, required: true },
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


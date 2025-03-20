<script>
export default {
  props: {
    sachs: { type: Array, default: [] },
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
      v-for="(sach, index) in sachs"
      :key="sach.MASACH"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ sach.TENSACH }} - {{ sach.TACGIA }}
    </li>
  </ul>
</template>
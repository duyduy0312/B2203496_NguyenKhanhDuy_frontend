<script>
export default {
  props: {
    docgias: { type: Array, default: [] },
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
      v-for="(docgia, index) in docgias"
      :key="docgia.MADOCGIA"
      :class="{ active: index === activeIndex }"
      @click="updateActiveIndex(index)"
    >
      {{ docgia.HOLOT }} {{ docgia.TEN }}
    </li>
  </ul>
</template>
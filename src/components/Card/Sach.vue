<script>
export default {
  props: {
    sach: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Mã sách:</strong>
      {{ sach.MASACH }}
    </div>
    <div class="p-1">
      <strong>Tên sách:</strong>
      {{ sach.TENSACH }}
    </div>
    <div class="p-1">
      <strong>Đơn giá:</strong>
      {{ sach.DONGIA }}
    </div>
    <div class="p-1">
      <strong>Số quyển:</strong>
      {{ sach.SOQUYEN }}
    </div>
    <div class="p-1">
      <strong>Năm xuất bản:</strong>
      {{ sach.NAMXUATBAN }}
    </div>
    <div class="p-1">
      <strong>Tác giả:</strong>
      {{ sach.TACGIA }}
    </div>
    <div class="p-1">
      <strong>Tên nhà xuất bản:</strong>
      {{ sach.TENNXB}} 
    </div>
  </div>
</template>
<script>
export default {
  props: {
    docgia: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Mã độc giả:</strong>
      {{ docgia.MADOCGIA }}
    </div>
    <div class="p-1">
      <strong>Họ lót:</strong>
      {{ docgia.HOLOT }}
    </div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ docgia.TEN }}
    </div>
    <div class="p-1">
      <strong>Ngày sinh:</strong>
      {{ docgia.NGAYSINH }}
    </div>
    <div class="p-1">
      <strong>Phái:</strong>
      {{ docgia.PHAI }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ docgia.DIACHI }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ docgia.DIENTHOAI }}
    </div>
  </div>
</template>
<template>
  <div>
    <div class="p-1">
      <strong>Độc giả:</strong>
      {{ theoDoiMuonSach.TEN_DOC_GIA }} 
    </div>
    <div class="p-1">
      <strong>Sách:</strong>
      {{ theoDoiMuonSach.MASACH }}
    </div>
    <div class="p-1">
      <strong>Ngày mượn:</strong>
      {{ theoDoiMuonSach.NGAYMUON }}
    </div>
    <div class="p-1">
      <strong>Ngày trả:</strong>
      {{ theoDoiMuonSach.NGAYTRA }}
    </div>
    <div class="p-1">
      <strong>Trạng thái:</strong>
      {{ theoDoiMuonSach.TRANGTHAI }}
    </div>
    <div class="p-1">
      <strong>Nhân viên:</strong>
      {{ tenNhanVien }}
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";
import SachService from "@/services/sach.service";
import NhanVienService from "@/services/nhanvien.service";
export default {
  props: {
    theoDoiMuonSach: { type: Object, required: true },
  },
  data() {
    return {
      tenDocGia: "",
      tenSach: "",
      tenNhanVien: "",
    };
  },
  methods: {
    async getDocGiaInfo() {
      try {
        const docGia = await DocGiaService.findByMADOCGIA(this.theoDoiMuonSach.MADOCGIA);
        this.tenDocGia = `${docGia[0].HOLOT} ${docGia[0].TEN}`;
      } catch (error) {
        console.log(error);
        this.tenDocGia = "Không tìm thấy";
      }
    },
    async getSachInfo() {
      try {
        const sach = await SachService.findByMASACH(this.theoDoiMuonSach.MASACH);
        this.tenSach = sach[0].TENSACH;
      } catch (error) {
        console.log(error);
        this.tenSach = "Không tìm thấy";
      }
    },
    async getNhanVienInfo() {
      try {
        const nhanVien = await NhanVienService.findByMSNV(this.theoDoiMuonSach.MSNV);
        this.tenNhanVien = nhanVien[0].HoTenNV;
      } catch (error) {
        console.log(error);
        this.tenNhanVien = "Không tìm thấy";
      }
    },
  },
  created() {
    this.getDocGiaInfo();
    this.getSachInfo();
    this.getNhanVienInfo();
  },
};
</script>

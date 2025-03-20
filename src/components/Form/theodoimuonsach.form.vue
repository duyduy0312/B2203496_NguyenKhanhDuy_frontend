<template>
  <Form
    @submit="submitTheoDoiMuonSach"
    :validation-schema="theoDoiMuonSachFormSchema"
  >
    <div class="form-group">
      <label for="madocgia">Độc giả</label>
      <Field
        as="select"
        name="MADOCGIA"
        v-model="theoDoiMuonSachLocal.MADOCGIA"
        id="madocgia"
        class="form-control"
      >
        <option
          v-for="docgia in docgiaList"
          :key="docgia.MADOCGIA"
          :value="docgia.MADOCGIA"
        >
          {{ docgia.HOLOT }} {{ docgia.TEN }}
        </option>
      </Field>
      <ErrorMessage name="MADOCGIA" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="masach">Sách</label>
      <Field
        as="select"
        name="MASACH"
        v-model="theoDoiMuonSachLocal.MASACH"
        id="masach"
        class="form-control"
      >
        <option
          v-for="sach in sachList"
          :key="sach.MASACH"
          :value="sach.MASACH"
        >
          {{ sach.TENSACH }}
        </option>
      </Field>
      <ErrorMessage name="MASACH" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="msnv">Nhân viên</label>
      <Field
        as="select"
        name="MSNV"
        v-model="theoDoiMuonSachLocal.MSNV"
        id="msnv"
        class="form-control"
      >
        <option
          v-for="nhanvien in nhanvienList"
          :key="nhanvien.MSNV"
          :value="nhanvien.MSNV"
        >
          {{ nhanvien.HoTenNV }}
        </option>
      </Field>
      <ErrorMessage name="MSNV" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ngaymuon">Ngày mượn</label>
      <Field
        type="date"
        name="NGAYMUON"
        v-model="theoDoiMuonSachLocal.NGAYMUON"
        id="ngaymuon"
        class="form-control"
      />
      <ErrorMessage name="NGAYMUON" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ngaytra">Ngày trả</label>
      <Field
        type="date"
        name="NGAYTRA"
        v-model="theoDoiMuonSachLocal.NGAYTRA"
        id="ngaytra"
        class="form-control"
      />
      <ErrorMessage name="NGAYTRA" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="trangthai">Trạng thái</label>
      <Field
        as="select"
        name="TRANGTHAI"
        v-model="theoDoiMuonSachLocal.TRANGTHAI"
        id="trangthai"
        class="form-control"
      >
        <option value="Đang mượn">Đang mượn</option>
        <option value="Đã trả">Đã trả</option>
      </Field>
      <ErrorMessage name="TRANGTHAI" class="error-feedback" />
    </div>

    <button class="btn btn-primary">Lưu</button>
    <button
      v-if="theoDoiMuonSachLocal._id"
      type="button"
      class="ml-2 btn btn-danger"
      @click="deleteTheoDoiMuonSach"
    >
      Xóa
    </button>
    <button type="button" class="ml-2 btn btn-danger" @click="cancel">
      Thoát
    </button>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import SachService from "@/services/sach.service";
import NhanVienService from "@/services/nhanvien.service";
import DocGiaService from "@/services/docgia.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:theoDoiMuonSach", "delete:theoDoiMuonSach"],
  props: {
    theoDoiMuonSach: { type: Object, required: true },
  },
  data() {
    const theoDoiMuonSachFormSchema = yup.object().shape({
      MADOCGIA: yup.string().required("Mã độc giả là bắt buộc."),
      MASACH: yup.string().required("Mã sách là bắt buộc."),
      MSNV: yup.string().required("Mã số nhân viên là bắt buộc."),
      NGAYMUON: yup.date().required("Ngày mượn là bắt buộc."),
      NGAYTRA: yup.date().required("Ngày trả là bắt buộc.")
      .min(yup.ref('NGAYMUON'), "Ngày trả phải lớn hơn hoặc bằng ngày mượn"),
      TRANGTHAI: yup
        .string()
        .required("Trạng thái là bắt buộc.")
        .oneOf(["Đang mượn", "Đã trả"], "Trạng thái không hợp lệ."),
    });

    return {
      theoDoiMuonSachLocal: { ...this.theoDoiMuonSach },
      theoDoiMuonSachFormSchema,
      docgiaList: [],
      sachList: [],
      nhanvienList: [],
    };
  },
  methods: {
    async submitTheoDoiMuonSach() {
      this.$emit("submit:theoDoiMuonSach", this.theoDoiMuonSachLocal);
    },
    async deleteTheoDoiMuonSach() {
      this.$emit("delete:theoDoiMuonSach", this.theoDoiMuonSachLocal._id);
    },
    async getSach() {
      try {
        this.sachList = await SachService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async getDocgia() {
      try {
        this.docgiaList = await DocGiaService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async getNhanvien() {
      try {
        this.nhanvienList = await NhanVienService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      const reply = window.confirm("Bạn có muốn thoát không?");
      if (!reply) {
        return false;
      } else this.$router.push({ name: "theodoimuonsach" });
    },
  },
  created() {
    this.getSach();
    this.getDocgia();
    this.getNhanvien();
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>

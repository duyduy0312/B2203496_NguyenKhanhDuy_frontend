<template>
  <Form @submit="submitNhanVien" :validation-schema="nhanVienFormSchema">
    <div class="form-group">
      <label for="MSNV">Mã số nhân viên</label>
      <Field
        name="MSNV"
        type="text"
        class="form-control"
        v-model="nhanVienLocal.MSNV"
      />
      <ErrorMessage name="MSNV" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="HoTenNV">Họ tên nhân viên</label>
      <Field
        name="HoTenNV"
        type="text"
        class="form-control"
        v-model="nhanVienLocal.HoTenNV"
      />
      <ErrorMessage name="HoTenNV" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="ChucVu">Chức vụ</label>
      <Field
        name="ChucVu"
        type="text"
        class="form-control"
        v-model="nhanVienLocal.ChucVu"
      />
      <ErrorMessage name="ChucVu" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DiaChi">Địa chỉ</label>
      <Field
        name="DiaChi"
        type="text"
        class="form-control"
        v-model="nhanVienLocal.DiaChi"
      />
      <ErrorMessage name="DiaChi" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="SoDienThoai">Số điện thoại</label>
      <Field
        name="SoDienThoai"
        type="tel"
        class="form-control"
        v-model="nhanVienLocal.SoDienThoai"
      />
      <ErrorMessage name="SoDienThoai" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="nhanVienLocal.MSNV"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteNhanVien"
      >
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-danger" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:nhanvien", "delete:nhanvien"],
  props: {
    nhanvien: { type: Object, required: true },
  },
  data() {
    const nhanVienFormSchema = yup.object().shape({
      MSNV: yup.string().required("Mã số nhân viên là bắt buộc"),
      HoTenNV: yup.string().required("Họ tên nhân viên là bắt buộc"),
      ChucVu: yup.string().required("Chức vụ là bắt buộc"),
      DiaChi: yup.string().required("Địa chỉ là bắt buộc"),
      SoDienThoai: yup
        .string()
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
    });
    return {
      nhanVienLocal: this.nhanvien,
      nhanVienFormSchema,
    };
  },
  methods: {
    submitNhanVien() {
      this.$emit("submit:nhanvien", this.nhanVienLocal);
    },
    deleteNhanVien() {
      this.$emit("delete:nhanvien", this.nhanVienLocal.MSNV);
    },
    Cancel() {
      this.$router.push({ name: "danhsachnhanvien" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
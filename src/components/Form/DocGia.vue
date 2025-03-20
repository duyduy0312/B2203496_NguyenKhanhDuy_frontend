<template>
  <Form @submit="submitDocGia" :validation-schema="docGiaFormSchema">
    <div class="form-group">
      <label for="MADOCGIA">Mã độc giả</label>
      <Field
        name="MADOCGIA"
        type="text"
        class="form-control"
        v-model="docGiaLocal.MADOCGIA"
      />
      <ErrorMessage name="MADOCGIA" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="HOLOT">Họ lót</label>
      <Field
        name="HOLOT"
        type="text"
        class="form-control"
        v-model="docGiaLocal.HOLOT"
      />
      <ErrorMessage name="HOLOT" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TEN">Tên</label>
      <Field
        name="TEN"
        type="text"
        class="form-control"
        v-model="docGiaLocal.TEN"
      />
      <ErrorMessage name="TEN" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="NGAYSINH">Ngày sinh</label>
      <Field
        name="NGAYSINH"
        type="date"
        class="form-control"
        v-model="docGiaLocal.NGAYSINH"
      />
      <ErrorMessage name="NGAYSINH" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="PHAI">Phái</label>
      <Field
        name="PHAI"
        as="select"
        class="form-control"
        v-model="docGiaLocal.PHAI"
      >
        <option value="Nam">Nam</option>
        <option value="Nữ">Nữ</option>
      </Field>
      <ErrorMessage name="PHAI" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DIACHI">Địa chỉ</label>
      <Field
        name="DIACHI"
        type="text"
        class="form-control"
        v-model="docGiaLocal.DIACHI"
      />
      <ErrorMessage name="DIACHI" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DIENTHOAI">Điện thoại</label>
      <Field
        name="DIENTHOAI"
        type="tel"
        class="form-control"
        v-model="docGiaLocal.DIENTHOAI"
      />
      <ErrorMessage name="DIENTHOAI" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="PASSWORD">Mật khẩu</label>
      <Field
        name="PASSWORD"
        type="password"
        class="form-control"
        v-model="docGiaLocal.PASSWORD"
      />
      <ErrorMessage name="PASSWORD" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="docGiaLocal.MADOCGIA"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteDocGia"
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
  emits: ["submit:docgia", "delete:docgia"],
  props: {
    docgia: { type: Object, required: true },
  },
  data() {
    const docGiaFormSchema = yup.object().shape({
      MADOCGIA: yup.string().required("Mã độc giả là bắt buộc"),
      HOLOT: yup.string().required("Họ lót là bắt buộc"),
      TEN: yup.string().required("Tên là bắt buộc"),
      NGAYSINH: yup.date().required("Ngày sinh là bắt buộc").max(new Date(2025,11,31),"Năm sinh không hợp lệ"),
      PHAI: yup.string().required("Phái là bắt buộc"),
      DIACHI: yup.string().required("Địa chỉ là bắt buộc"),
      DIENTHOAI: yup
        .string()
        .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ")
        .min(10, "Số điện thoại phải có ít nhất 10 số")
        .max(11, "Số điện thoại không được quá 11 số"),
      PASSWORD: yup
        .string()
        .required("Mật khẩu là bắt buộc")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    });
    return {
      docGiaLocal: this.docgia,
      docGiaFormSchema,
    };
  },
  methods: {
    submitDocGia() {
      this.$emit("submit:docgia", this.docGiaLocal);
    },
    deleteDocGia() {
      this.$emit("delete:docgia", this.docGiaLocal.MADOCGIA);
    },
    Cancel() {
      this.$router.push({ name: "danhsachdocgia" });
      if (!reply) {
        return false;
      } else this.$router.push({ name: "danhsachdocgia" }); // Assume you have a route named 'readerlist'
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>

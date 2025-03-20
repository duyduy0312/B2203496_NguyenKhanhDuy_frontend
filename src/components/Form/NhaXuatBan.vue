<template>
  <Form @submit="submitNhaXuatBan" :validation-schema="nhaXuatBanFormSchema">
    <div class="form-group">
      <label for="MANXB">Mã nhà xuất bản</label>
      <Field
        name="MANXB"
        type="text"
        class="form-control"
        v-model="nhaXuatBanLocal.MANXB"
      />
      <ErrorMessage name="MANXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TENNXB">Tên nhà xuất bản</label>
      <Field
        name="TENNXB"
        type="text"
        class="form-control"
        v-model="nhaXuatBanLocal.TENNXB"
      />
      <ErrorMessage name="TENNXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DIACHI">Địa chỉ</label>
      <Field
        name="DIACHI"
        type="text"
        class="form-control"
        v-model="nhaXuatBanLocal.DIACHI"
      />
      <ErrorMessage name="DIACHI" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="nhaXuatBanLocal.MANXB"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteNhaXuatBan"
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
  emits: ["submit:nhaxuatban", "delete:nhaxuatban"],
  props: {
    nhaxuatban: { type: Object, required: true },
  },
  data() {
    const nhaXuatBanFormSchema = yup.object().shape({
      MANXB: yup.string().required("Mã nhà xuất bản là bắt buộc"),
      TENNXB: yup.string().required("Tên nhà xuất bản là bắt buộc"),
      DIACHI: yup.string().required("Địa chỉ là bắt buộc"),
    });
    return {
      nhaXuatBanLocal: this.nhaxuatban,
      nhaXuatBanFormSchema,
    };
  },
  methods: {
    submitNhaXuatBan() {
      this.$emit("submit:nhaxuatban", this.nhaXuatBanLocal);
    },
    deleteNhaXuatBan() {
      this.$emit("delete:nhaxuatban", this.nhaXuatBanLocal.MANXB);
    },
    Cancel() {
      this.$router.push({ name: "danhsachnhaxuatban" });
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
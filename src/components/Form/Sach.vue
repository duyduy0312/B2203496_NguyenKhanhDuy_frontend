<template>
  <Form @submit="submitSach" :validation-schema="sachFormSchema">
    <div class="form-group">
      <label for="MASACH">Mã sách</label>
      <Field
        name="MASACH"
        type="text"
        class="form-control"
        v-model="sachLocal.MASACH"
      />
      <ErrorMessage name="MASACH" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TENSACH">Tên sách</label>
      <Field
        name="TENSACH"
        type="text"
        class="form-control"
        v-model="sachLocal.TENSACH"
      />
      <ErrorMessage name="TENSACH" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DONGIA">Đơn giá</label>
      <Field
        name="DONGIA"
        type="number"
        class="form-control"
        v-model="sachLocal.DONGIA"
      />
      <ErrorMessage name="DONGIA" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="SOQUYEN">Số quyển</label>
      <Field
        name="SOQUYEN"
        type="number"
        class="form-control"
        v-model="sachLocal.SOQUYEN"
      />
      <ErrorMessage name="SOQUYEN" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="NAMXUATBAN">Năm xuất bản</label>
      <Field
        name="NAMXUATBAN"
        type="number"
        class="form-control"
        v-model="sachLocal.NAMXUATBAN"
      />
      <ErrorMessage name="NAMXUATBAN" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TACGIA">Tác giả</label>
      <Field
        name="TACGIA"
        type="text"
        class="form-control"
        v-model="sachLocal.TACGIA"
      />
      <ErrorMessage name="TACGIA" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="MANXB">Nhà xuất bản</label>
      <Field
        name="MANXB"
        as="select"
        class="form-control"
        v-model="sachLocal.MANXB"
      >
        <option v-for="nxb in nhaXuatBans" :key="nxb.MANXB" :value="nxb.MANXB">
          {{ nxb.TENNXB }}
        </option>
      </Field>
      <ErrorMessage name="MANXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-primary">Lưu</button>
      <button
        v-if="sachLocal.MASACH"
        type="button"
        class="ml-2 btn btn-danger"
        @click="deleteSach"
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
import NhaXuatBanService from "@/services/nhaxuatban.service";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:sach", "delete:sach"],
  props: {
    sach: { type: Object, required: true },
  },
  data() {
    const sachFormSchema = yup.object().shape({
      MASACH: yup.string().required("Mã sách là bắt buộc"),
      TENSACH: yup.string().required("Tên sách là bắt buộc"),
      DONGIA: yup.number().required("Đơn giá là bắt buộc").positive("Đơn giá phải là số dương"),
      SOQUYEN: yup.number().required("Số quyển là bắt buộc").integer("Số quyển phải là số nguyên"),
      NAMXUATBAN: yup.number().required("Năm xuất bản là bắt buộc").integer("Năm xuất bản phải là số nguyên"),
      TACGIA: yup.string().required("Tác giả là bắt buộc"),
    });
    return {
      sachLocal: this.sach,
      sachFormSchema,
    };
  },
  methods: {
    submitSach() {
      this.$emit("submit:sach", this.sachLocal);
    },
    deleteSach() {
      this.$emit("delete:sach", this.sachLocal.MASACH);
    },
    Cancel() {
      this.$router.push({ name: "danhsachsach" });
    },
    async getNhaXuatBans() {
      try {
        this.nhaXuatBans = await NhaXuatBanService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getNhaXuatBans();
  }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
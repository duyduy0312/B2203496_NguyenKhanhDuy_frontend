import { createWebHistory, createRouter } from "vue-router";
import DocGia from "@/views/vue/docgia.vue";
import NhanVien from "@/views/vue/nhanvien.vue";
import NhaXuatBan from "@/views/vue/nhaxuatban.vue";
import Sach from "@/views/vue/sach.vue";
import TheoDoiMuonSach from "@/views/vue/theodoimuonsach.vue";

const routes = [
  {
    path: "/docgia",
    name: "danhsachdocgia",
    component: DocGia,
  },
  {
    path: "/nhanvien",
    name: "danhsachnhanvien",
    component: NhanVien,
  },
  {
    path: "/nhaxuatban",
    name: "danhsachnhaxuatban",
    component: NhaXuatBan,
  },
  {
    path: "/sach",
    name: "danhsachsach",
    component: Sach,
  },
  {
    path: "/theodoimuonsach",
    name: "theodoimuonsach",
    component: TheoDoiMuonSach,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/docgias/:id",
    name: "docgia.edit",
    component: () => import("@/views/edit/docgia.edit.vue"),
    props: true,
  },
  {
    path: "/docgias/",
    name: "docgia.add",
    component: () => import("@/views/add/docgia.add.vue"),
    props: true,
  },
  {
    path: "/nhanviens/:id",
    name: "nhanvien.edit",
    component: () => import("@/views/edit/nhanvien.edit.vue"),
    props: true,
  },
  {
    path: "/nhanviens/",
    name: "nhanvien.add",
    component: () => import("@/views/add/nhanvien.add.vue"),
    props: true,
  },
  {
    path: "/nhaxuatbans/:id",
    name: "nhaxuatban.edit",
    component: () => import("@/views/edit/nhaxuatban.edit.vue"),
    props: true,
  },
  {
    path: "/nhanxuatbans/",
    name: "nhaxuatban.add",
    component: () => import("@/views/add/nhaxuatban.add.vue"),
    props: true,
  },
  {
    path: "/sachs/:id",
    name: "sach.edit",
    component: () => import("@/views/edit/sach.edit.vue"),
    props: true,
  },
  {
    path: "/sachs/",
    name: "sach.add",
    component: () => import("@/views/add/sach.add.vue"),
    props: true,
  },
  {
    path: "/theodoimuonsachs/:id",
    name: "theodoimuonsach.edit",
    component: () => import("@/views/edit/theodoimuonsach.edit.vue"),
    props: true,
  },
  {
    path: "/theodoimuonsachs/",
    name: "theodoimuonsach.add",
    component: () => import("@/views/add/theodoimuonsach.add.vue"),
    props: true,
  },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
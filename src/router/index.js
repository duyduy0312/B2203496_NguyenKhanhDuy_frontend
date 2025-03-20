import { createWebHistory, createRouter } from "vue-router";
import DocGia from "@/views/vue/DocGia.vue";
import NhanVien from "@/views/vue/NhanVien.vue";
import NhaXuatBan from "@/views/vue/NhaXuatBan.vue";
import Sach from "@/views/vue/Sach.vue";

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
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/docgias/:id",
    name: "docgia.edit",
    component: () => import("@/views/edit/DocGia.vue"),
    props: true,
  },
  {
    path: "/docgias/",
    name: "docgia.add",
    component: () => import("@/views/add/DocGia.vue"),
    props: true,
  },
  {
    path: "/nhanviens/:id",
    name: "nhanvien.edit",
    component: () => import("@/views/edit/NhanVien.vue"),
    props: true,
  },
  {
    path: "/nhanviens/",
    name: "nhanvien.add",
    component: () => import("@/views/add/NhanVien.vue"),
    props: true,
  },
  {
    path: "/nhaxuatbans/:id",
    name: "nhaxuatban.edit",
    component: () => import("@/views/edit/NhaXuatBan.vue"),
    props: true,
  },
  {
    path: "/nhanxuatbans/",
    name: "nhaxuatban.add",
    component: () => import("@/views/add/NhaXuatBan.vue"),
    props: true,
  },
  {
    path: "/sachs/:id",
    name: "sach.edit",
    component: () => import("@/views/edit/Sach.vue"),
    props: true,
  },
  {
    path: "/sachs/",
    name: "sach.add",
    component: () => import("@/views/add/Sach.vue"),
    props: true,
  },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
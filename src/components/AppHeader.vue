<template>
  <a href="/" class="navbar-brand">Ứng dụng Quản lý thư viện</a>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'danhsachdocgia' }" class="nav-link">
          Danh sách độc giả
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'danhsachnhanvien' }" class="nav-link">
          Danh sách nhân viên
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'danhsachnhaxuatban' }" class="nav-link">
          Danh sách nhà xuất bản
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'danhsachsach' }" class="nav-link">
          Sách thư viện
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
  </nav>
</template>

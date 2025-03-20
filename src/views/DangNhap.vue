<template>
  <div class="login-page">
    <div class="login-form">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Đăng nhập</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      // Thay thế logic này bằng logic xác thực thực tế
      if (this.username === 'admin' && this.password === 'password') {
        // Lưu thông tin đăng nhập (ví dụ: token) vào localStorage
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
        this.$router.push({ name: 'home' });
      } else {
        this.errorMessage = 'Tên đăng nhập hoặc mật khẩu không đúng.';
      }
    },
  },
};
</script>


<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}
.error-message {
  color: red;
  margin-top: 10px;
}

</style>
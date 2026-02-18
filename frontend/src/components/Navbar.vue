<template>
  <v-app-bar color="dark" dark>
    <template v-slot:prepend>
      <router-link to="/" class="navbar-brand">
        <span class="title">🎬 Filmi plakat</span>
      </router-link>
    </template>

    <v-spacer />

    <div class="auth-buttons" v-if="!isLoggedIn">
      <v-btn color="primary" @click="openRegister">Регистрация</v-btn>
      <v-btn color="success" @click="openLogin">Вход</v-btn>
    </div>

    <div class="user-menu" v-else>
      <span class="user-email">{{ currentUser?.email }}</span>
      <v-btn color="error" @click="logout">Выход</v-btn>
    </div>
  </v-app-bar>

  <RegisterModal v-model="showRegister" @close="showRegister = false" @success="handleRegisterSuccess" />
  <LoginModal v-model="showLogin" @close="showLogin = false" @success="handleLoginSuccess" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import RegisterModal from './RegisterModal.vue';
import LoginModal from './LoginModal.vue';

const showRegister = ref(false);
const showLogin = ref(false);
const currentUser = ref(null);

const isLoggedIn = computed(() => !!currentUser.value);

const openRegister = () => {
  showRegister.value = true;
};

const openLogin = () => {
  showLogin.value = true;
};

const handleRegisterSuccess = () => {
  // После регистрации можно открыть логин
  showRegister.value = false;
  showLogin.value = true;
};

const handleLoginSuccess = (data) => {
  currentUser.value = data.user;
  showLogin.value = false;
  // Можете добавить редирект или другие действия
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  currentUser.value = null;
};

// При загрузке компонента проверяем, авторизован ли пользователь
onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      currentUser.value = JSON.parse(user);
    } catch (e) {
      console.error(e);
    }
  }
});
</script>

<style scoped>
.navbar-brand {
  text-decoration: none;
  color: white;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #e50914;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-email {
  color: white;
  margin-right: 10px;
}
</style>

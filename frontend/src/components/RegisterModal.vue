<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title>Регистрация</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            required
            :error-messages="errors.email"
          />

          <v-text-field
            v-model="form.name"
            label="ימя"
            :error-messages="errors.name"
          />

          <v-text-field
            v-model="form.password"
            label="Пароль (минимум 8 символов)"
            type="password"
            required
            :error-messages="errors.password"
          />

          <v-text-field
            v-model="form.confirmPassword"
            label="Подтвердите пароль"
            type="password"
            required
            :error-messages="errors.confirmPassword"
          />

          <v-alert v-if="errors.general" type="error" class="mt-4">
            {{ errors.general }}
          </v-alert>

          <v-alert v-if="successMessage" type="success" class="mt-4">
            {{ successMessage }}
          </v-alert>

          <div class="d-flex gap-3 mt-6">
            <v-btn color="red" @click="closeModal">Отмена</v-btn>
            <v-btn color="primary" type="submit" :loading="loading">
              Зарегистрироваться
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { API_URL } from '@/main';

const emit = defineEmits(['close', 'success', 'update:modelValue']);
const props = defineProps({
  modelValue: Boolean
});

const isOpen = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  isOpen.value = newVal;
});
const loading = ref(false);
const successMessage = ref('');

const form = ref({
  email: '',
  name: '',
  password: '',
  confirmPassword: ''
});

const errors = ref({
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
  general: ''
});

const closeModal = () => {
  isOpen.value = false;
  emit('close');
  resetForm();
};

const resetForm = () => {
  form.value = {
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  };
  errors.value = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    general: ''
  };
  successMessage.value = '';
};

const validateForm = () => {
  errors.value = {
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    general: ''
  };

  if (!form.value.email) {
    errors.value.email = 'Email обязателен';
    return false;
  }

  if (!form.value.password) {
    errors.value.password = 'Пароль обязателен';
    return false;
  }

  if (form.value.password.length < 8) {
    errors.value.password = 'Пароль должен содержать минимум 8 символов';
    return false;
  }

  if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Пароли не совпадают';
    return false;
  }

  return true;
};

const register = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errors.value.general = '';

  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.value.email,
        name: form.value.name || undefined,
        password: form.value.password
      })
    });

    if (!response.ok) {
      const data = await response.json();
      errors.value.general = data.error || 'Ошибка при регистрации';
      return;
    }

    successMessage.value = 'Регистрация успешна! Закрывание окна...';
    emit('success');
    setTimeout(() => {
      closeModal();
    }, 1500);
  } catch (error) {
    errors.value.general = 'Ошибка сети: ' + error.message;
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>

<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card>
      <v-card-title>Вход</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="form.email"
            label="Email"
            type="email"
            required
            :error-messages="errors.email"
          />

          <v-text-field
            v-model="form.password"
            label="Пароль"
            type="password"
            required
            :error-messages="errors.password"
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
              Вход
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
  password: ''
});

const errors = ref({
  email: '',
  password: '',
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
    password: ''
  };
  errors.value = {
    email: '',
    password: '',
    general: ''
  };
  successMessage.value = '';
};

const validateForm = () => {
  errors.value = {
    email: '',
    password: '',
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

  return true;
};

const login = async () => {
  if (!validateForm()) return;

  loading.value = true;
  errors.value.general = '';

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password
      })
    });

    if (!response.ok) {
      const data = await response.json();
      errors.value.general = data.error || 'Ошибка при входе';
      return;
    }

    const data = await response.json();
    
    // Сохраняем токен в localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    successMessage.value = 'Вход успешен!';
    emit('success', data);
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

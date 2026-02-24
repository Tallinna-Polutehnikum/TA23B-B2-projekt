<template>
  <v-app>
    <Navbar />
    <Suspense>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </Suspense>
  </v-app>
</template>

<script setup>
import { Suspense } from 'vue';
import Navbar from '@/components/Navbar.vue';
</script>

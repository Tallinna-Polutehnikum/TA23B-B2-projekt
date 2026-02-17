<template>
  <v-app>
    <Suspense>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </Suspense>
  </v-app>
</template>

<script setup>
  import { Suspense } from 'vue'

//
</script>

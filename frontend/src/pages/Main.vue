<template>
  <div class="main-page">
    <h1>Filmi plakat</h1>
    <router-link to="/admin/add-film">
      <button class="btn admin-btn">Admin: Add New Film</button>
    </router-link>

    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">

        <img alt="" class="poster" :src="movie.posterSmall">

        <div class="info">
          <h2>{{ movie.title }}</h2>
          <p><strong>Žanr:</strong> {{ movie?.genre }}</p>
          <p><strong>Kestus:</strong> {{ movie.durationMin }}</p>
          <p>{{ movie?.description?.substring(0, 120) }}...</p>

          <router-link :to="`/movie/${movie.id}`">
            <button class="btn">Rohkem infot →</button>
          </router-link>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { API_URL } from '@/main'

  let movies = [
    {
      id: 1,
      title: 'Põgenev mees',
      length: '2h 13min',
      genre: 'Märul, Ulmefilm, Thriller',
      posterSmall: '/src/assets/poster1.jpg',
      description: 'Mitte kuigi kauges tulevikus on riigi…',
    },
    {
      id: 2,
      title: 'The Glassworker',
      length: '1h 30min',
      genre: 'Animatsioon, Draama',
      posterSmall: '/src/assets/poster2.jpg',
      description: 'Filmi kirjeldus The Glassworker',
    },

  ]
  // Пытаемся загрузить фильмы с бэкенда, но не падаем,
  // если бэкенд недоступен (остаётся локальный список).
  try {
    const res = await fetch(`${API_URL}/movies`)
    if (res.ok) {
      movies = await res.json()
    }
  } catch (error) {
    console.error('Не удалось загрузить фильмы с бэкенда, используем локальные данные', error)
  }
</script>

<style scoped>

.main-page {
  min-height: 100vh;
  background: #111;
  color: white;
  padding: 20px;
}

.movie-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.movie-item {
  display: flex;
  background: #1c1c1c;
  border-radius: 8px;
  overflow: hidden;
  padding: 10px;
  gap: 20px;
}

.poster {
  width: 200px;
  object-fit: cover;
  border-radius: 6px;
}

.info {
  flex: 1;
}

.btn {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 6px;
  background: #e50914;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.btn:hover {
  background: #f6121d;
}

.admin-btn {
  margin-bottom: 20px;
  background: #007bff;
}

.admin-btn:hover {
  background: #0056b3;
}
</style>

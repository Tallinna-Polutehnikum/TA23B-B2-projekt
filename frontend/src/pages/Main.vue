<template>
  <div class="main-page">
    <h1>Афиша фильмов</h1>
    <div class="movie-list">
      <div class="movie-item" v-for="movie in movies" :key="movie.id">
        
        <img :src="movie.posterSmall" alt="" class="poster" />

        
        <div class="info">
          <h2>{{ movie.title }}</h2>
          <p><strong>Жанр:</strong> {{ movie.genre }}</p>
          <p><strong>Длительность:</strong> {{ movie.length }}</p>
          <p>{{ movie.description.substring(0, 120) }}...</p>

          <router-link :to="`/movie/${movie.id}`">
            <button class="btn">Подробнее →</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const movies = [
  {
    id: 1,
    title: 'Põgenev mees',
    length: '2h 13min',
    genre: 'Märul, Ulmefilm, Thriller',
    posterSmall: '/src/assets/poster1.jpg',
    description: 'Mitte kuigi kauges tulevikus on riigi…'
  },
  {
    id: 2,
    title: 'The Glassworker',
    length: '1h 30min',
    genre: 'Анимация, Драма',
    posterSmall: '/src/assets/poster2.jpg',
    description: 'Описание фильма The Glassworker'
  },
  {
    id: 3,
    title: 'Фильм 3',
    length: '1h 45min',
    genre: 'Боевик',
    posterSmall: '/src/assets/poster3.jpg',
    description: 'Описание фильма 3'
  },
  {
    id: 4,
    title: 'Фильм 4',
    length: '2h 00min',
    genre: 'Фантастика',
    posterSmall: '/src/assets/poster4.jpg',
    description: 'Описание фильма 4'
  },
  {
    id: 5,
    title: 'Фильм 5',
    length: '1h 50min',
    genre: 'Комедия',
    posterSmall: '/src/assets/poster5.jpg',
    description: 'Описание фильма 5'
  }
]
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
</style>

<template>
  <div class="movie-page">
    
    <div
      class="banner"
      :style="{ backgroundImage: `url(${movie.banner || movie.posterSmall})` }"
    >
      <h1>{{ movie.title }}</h1>
    </div>

    
    <div class="content">
      
      <div class="video">
        <h2>Трейлер</h2>
        <div class="video-wrapper">
          <iframe
            v-if="movie.trailer.search(/youtube/) !== -1"
            :src="movie.trailer"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <video v-else controls>
            <source :src="movie.trailer" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>

      
      <div class="details">
        <h3>Информация о фильме</h3>
        <p><strong>Жанр:</strong> {{ movie.genre }}</p>
        <p><strong>Длительность:</strong> {{ movie.length }}</p>
        <p><strong>Язык:</strong> {{ movie.language }}</p>
        <p><strong>Описание:</strong></p>
        <p>{{ movie.description }}</p>

        <div class="buttons">
          <router-link :to="`/movie-select/${movie.id}`">
            <button class="btn booking-btn">→ Оформить билет</button>
          </router-link>
          <router-link to="/">
            <button class="btn back-btn">← Вернуться к афише</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movieId = route.params.id

const movies = [
  {
    id: 1,
    title: 'Pogenev mees',
    length: '2h 13min',
    genre: 'Marul, Ulmefilm, Thriller',
    posterSmall: 'src/assets/poster1.jpg',
    banner: 'src/assets/banner1.jpg',
    trailer: 'https://www.youtube.com/embed/ThWT4XwUcug',
    language: 'Estonski',
    description: 'Miljonid jahivad Uks pogeneb Koik vaatavad Kohe algab maailma populaarseim telemang Pogenev mees 1982 aastal ilmutas oudustemeister Stephen King Richard Bachmani pseudonymi all haarava ulmoponeviku The Running Man mis kirjeldas kauges tulevikus aastal 2025 ulipopulaarset telemangu mille voitmiseks on vaja lihtsalt 30 paeva ellu jaada Samal ajal kui sulle peavad jahti elukutselised kutid ning praktiliselt kogu elanikkond Sel suvel toob filmi Pogenev mees ekraanile lennuka stiiliga Edgar Wright Shaun of the Dead Baby Driver peaosas Glen Powell Top Gun Maverick Lisaks talle teevad kaasa Josh Brolin Duun Colman Domingo Michael Cera Katy OBrian William Z Macy Lee Pace David Zayas ja teised'
}
,
  {
    id: 2,
    title: 'The Glassworker',
    length: '—',
    genre: 'Анимация, Драма',
    posterSmall: 'src/assets/poster2.jpg',
    banner: 'src/assets/banner2.jpg',
    trailer: 'https://www.youtube.com/embed/gn2o3shXU8U',
    language: 'Английский',
    description: 'Описание фильма The Glassworker'
  },
  
]

const movie = ref({})

onBeforeMount(() => {
  movie.value = movies.find(m => m.id == movieId) || movies[0]
})
</script>

<style scoped>
.movie-page {
  min-height: 100vh;
  background: #111;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

.banner {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 30px 40px;
  font-size: 2.5rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px black;
}

.content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  padding: 40px;
  flex: 1;
}

.video, .details {
  flex: 1 1 500px;
}

.video-wrapper {
  width: 900px;
  max-width: 100%;
  height: 506px; 
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(0,0,0,0.7);
  margin-top: 10px;
}

.video-wrapper iframe,
.video-wrapper video {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 12px;
}

.details {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: #1c1c1c;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}

.details h3 {
  margin-bottom: 15px;
}

.buttons {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 24px;
  border: none;
  border-radius: 6px;
  background: #e50914;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s, transform 0.2s;
}

.btn:hover {
  background: #f6121d;
  transform: scale(1.05);
}

.booking-btn {
  background: #ff4500;
}

.booking-btn:hover {
  background: #ff5722;
}
</style>

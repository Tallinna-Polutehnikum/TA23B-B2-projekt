<template>
  <div class="movie-page">

    <!-- Баннер -->
<div
  v-if="movieId == 1"
  class="banner"
  :style="{ backgroundImage: `url('https://images.markus.live/mcswebsites.blob.core.windows.net/1013/Event_9644/landscape_billboard_wide/RunningMan_3840x750.png?width=3360&height=640&format=jpg&quality=90')` }"
>
  <h1>{{ movie.title }}</h1>
</div>

<div
  v-else
  class="banner"
  :style="{ backgroundImage: `url(${movie.banner || movie.posterSmall})` }"
>
  <h1>{{ movie.title }}</h1>
</div>
    <div class="content">

      <!-- Блок выбора -->
      <div class="details">
        <h3>Выбор времени</h3>

        <div class="time-list">
          <button
            v-for="t in times"
            :key="t"
            class="time-btn"
            :class="{ active: selectedTime === t }"
            @click="selectedTime = t"
          >
            {{ t }}
          </button>
        </div>

        <h3 style="margin-top: 25px;">Выбор мест</h3>

        <div class="seats">
          <div
            v-for="seat in seats"
            :key="seat.id"
            class="seat"
            :class="{ selected: selectedSeats.includes(seat.id), taken: seat.taken }"
            @click="toggleSeat(seat)"
          >
            {{ seat.label }}
          </div>
        </div>

        <div class="buttons" style="margin-top: 30px;">
          <button class="btn booking-btn" @click="confirmBooking">
            ✔ Подтвердить
          </button>

          <router-link to="/">
            <button class="btn back-btn">← Вернуться</button>
          </router-link>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const movieId = Number(route.params.id) // Преобразуем к числу

// Фильмы
const movies = [
  {
    id: 1,
    title: "Pogenev mees",
    length: "2h 13min",
    genre: "Marul, Ulmefilm, Thriller",
    posterSmall: "src/assets/poster1.jpg",
    banner: "src/assets/banner1.jpg",
    language: "Estonski",
    description:
      "Miljonid jahivad Uks pogeneb Koik vaatavad Kohe algab maailma populaarseim telemang..."
  },
  {
    id: 2,
    title: "The Glassworker",
    length: "—",
    genre: "Анимация, Драма",
    posterSmall: "src/assets/poster2.jpg",
    banner: "src/assets/banner2.jpg",
    language: "Английский",
    description: "Описание фильма The Glassworker"
  }
]

const movie = ref({})
const times = ref(["12:30", "14:10", "16:00", "18:45", "21:15"])
const selectedTime = ref(null)
const seats = ref([])
const selectedSeats = ref([])

onMounted(() => {
  const foundMovie = movies.find(m => m.id === movieId)
  if (!foundMovie) {
    console.error("Фильм не найден")
    return
  }
  movie.value = foundMovie

  // Генерация 40 мест
  seats.value = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    label: i + 1,
    taken: Math.random() < 0.15
  }))
})

function toggleSeat(seat) {
  if (seat.taken) return

  const index = selectedSeats.value.indexOf(seat.id)
  if (index > -1) {
    selectedSeats.value.splice(index, 1)
  } else {
    selectedSeats.value.push(seat.id)
  }
}

// ====== Подтверждение брони с переходом на оплату ======
function confirmBooking() {
  if (!selectedTime.value) {
    console.warn("Выберите время!")
    return
  }

  if (!selectedSeats.value.length) {
    console.warn("Выберите хотя бы одно место!")
    return
  }

  router.push({
    name: "Payment",
    query: {
      movieId: movie.value.id,
      title: movie.value.title,
      time: selectedTime.value,
      seats: selectedSeats.value.join(',')
    }
  })
}
</script>


<style scoped>
/* Используем твой стиль, немного расширяем под MovieSelect */

.movie-page {
  min-height: 100vh;
  background: #111;
  color: white;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', sans-serif;
}

.banner {
  height: 300px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 30px 40px;
  font-size: 2.3rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px black;
}

.content {
  padding: 40px;
  display: flex;
  justify-content: center;
}

.details {
  width: 600px;
  background: #1c1c1c;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.7);
}

.time-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.time-btn {
  padding: 10px 18px;
  background: #333;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s;
}

.time-btn:hover {
  background: #444;
}

.time-btn.active {
  background: #ff4500;
}

.seats {
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

.seat {
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
}

.seat.selected {
  background: #ff4500;
}

.seat.taken {
  background: #555;
  cursor: not-allowed;
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

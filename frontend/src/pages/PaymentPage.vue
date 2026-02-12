<template>
  <div class="payment-page">
    <div class="payment-container">
      <h1>Pileti maksmine</h1>

      <div v-if="movie" class="content">
        <div class="booking-info">
          <p><strong>Film:</strong> {{ movie.title }}</p>
          <p><strong>Aeg:</strong> {{ time }}</p>
          <p><strong>Kohad:</strong> {{ seats.join(', ') }}</p>
        </div>

        <h2>Makseinfo</h2>
        <form @submit.prevent="payTicket" class="payment-form">
          <div class="form-group">
            <label for="cardName">Nimi kaardil</label>
            <input id="cardName" v-model="cardName" type="text" required placeholder="Mati Maasikas">
          </div>

          <div class="form-group">
            <label for="cardNumber">Kaardi number</label>
            <input id="cardNumber" v-model="cardNumber" type="text" required maxlength="16" placeholder="1234 5678 9012 3456">
          </div>

          <div class="form-row">
            <div class="form-group">
                <label>MM / YY</label>
                <input type="text" placeholder="01/25">
            </div>
         <div class="form-group">
            <label>CVV</label>
            <input type="text" placeholder="123" class="short">
         </div>
        </div>
          <div class="form-group">
            <label for="email">E-post kinnituseks</label>
            <input id="email" v-model="email" type="email" required placeholder="example@mail.com">
          </div>

          <button type="submit" class="btn">Maksa</button>
        </form>
      </div>

      <div v-else>
        <p>Broneeringu andmeid ei leitud.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const movie = ref(null)
const time = ref('')
const seats = ref([])


const cardName = ref('')
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const email = ref('')

onMounted(() => {
  const query = route.query
  if (query.movieId && query.title && query.time && query.seats) {
    movie.value = { id: query.movieId, title: query.title }
    time.value = query.time
    seats.value = query.seats.split(',')
  }
})

function payTicket() {
  if (!cardName.value || !cardNumber.value || !expiry.value || !cvv.value || !email.value) {
    alert('Palun täida kõik makseväljad.')
    return
  }

  alert(`Pileti makse filmile "${movie.value.title}" õnnestus!\nKohad: ${seats.join(', ')}\nKinnitus saadeti aadressile ${email.value}`)

  cardName.value = ''
  cardNumber.value = ''
  expiry.value = ''
  cvv.value = ''
  email.value = ''
}
</script>

<style scoped>
.payment-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111;
  font-family: 'Segoe UI', sans-serif;
  color: white;
}

.payment-container {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background: #1c1c1c;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(0,0,0,0.8);
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.booking-info p {
  font-size: 1.4rem;
  margin: 10px 0;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.form-group label {
  margin-bottom: 8px;
  font-size: 1.2rem;
}

.form-group input {
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 1.2rem;
  background: #333;      
  color: white;           
}

.form-group input::placeholder {
  color: #bbb;            
}

.form-row {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 16px;
  background: #ff4500;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.3s, transform 0.2s;
}

.btn:hover {
  background: #ff5722;
  transform: scale(1.05);
}

.form-row input.short {
  width: 100px; 
}
</style>



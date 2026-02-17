<template>
  <div class="admin-add-film">
    <h1>Add New Film</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Film Name:</label>
        <input id="title" v-model="form.title" required type="text">
      </div>
      <div class="form-group">
        <label for="genre">Genre:</label>
        <input id="genre" v-model="form.genre" required type="text">
      </div>
      <div class="form-group">
        <label for="durationMin">Duration (minutes):</label>
        <input id="durationMin" v-model.number="form.durationMin" required type="number">
      </div>
      <div class="form-group">
        <label for="description">Summary:</label>
        <textarea id="description" v-model="form.description" required />
      </div>
      <button class="btn" type="submit">Add Film</button>
    </form>
    <router-link to="/">
      <button class="btn back-btn">Back to Main</button>
    </router-link>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { API_URL } from '@/main'

  const router = useRouter()

  const form = ref({
    title: '',
    genre: '',
    durationMin: 0,
    description: '',
  })

  async function submitForm () {
    try {
      const res = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.value),
      })
      if (res.ok) {
        alert('Film added successfully!')
        router.push('/')
      } else {
        alert('Failed to add film')
      }
    } catch (error) {
      console.error(error)
      alert('Error adding film')
    }
  }
</script>

<style scoped>
.admin-add-film {
  min-height: 100vh;
  background: #111;
  color: white;
  padding: 20px;
}

form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
  background: #1c1c1c;
  color: white;
}

textarea {
  height: 100px;
  resize: vertical;
}

.btn {
  padding: 10px 20px;
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

.back-btn {
  margin-top: 20px;
  background: #333;
}

.back-btn:hover {
  background: #555;
}
</style>

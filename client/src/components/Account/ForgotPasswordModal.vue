<script setup>
import { ref } from 'vue'
import { forgotPassword } from '@/store/user'

const show = ref(false)
const email = ref('')

const closeModal = () => {
  show.value = false
}

const sendResetLink = async () => {
  await forgotPassword(email.value)
  closeModal()
}
</script>
<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Forgot Password</h2>
      <input type="email" v-model="email" placeholder="Enter your email" />
      <button @click="sendResetLink">Send Reset Link</button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>

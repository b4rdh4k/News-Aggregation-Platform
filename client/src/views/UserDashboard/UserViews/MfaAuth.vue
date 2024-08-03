<template>
  <div class="mfa-container flex justify-center items-center bg-primary bg-opacity-50 dark:bg-dark-primary p-4">
    <h2>Enable Multi-Factor Authentication (MFA)</h2>
    <p class="description">
      Scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy) and enter the verification code.
    </p>

    <div class="qr-code">
      <img :src="qrCodeUrl" alt="QR Code" />
    </div>

    <form @submit.prevent="verifyToken">
      <label for="verificationCode">Verification Code:</label>
      <input
        v-model="verificationCode"
        type="text"
        id="verificationCode"
        placeholder="Enter code"
        required
      />
      <button type="submit" class="btn-submit">Verify & Enable</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const qrCodeUrl = ref('https://example.com/path-to-your-qr-code')
const verificationCode = ref('')

const verifyToken = () => {
  console.log('Verification code:', verificationCode.value)
}
</script>


<style scoped lang="scss">
.mfa-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin:auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .description {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #555;
  }

  .qr-code {
    margin-bottom: 1rem;
    img {
      width: 200px;
      height: 200px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .btn-submit {
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      background-color: var(--secondary);
      color: #fff;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--accent);
      }
    }
  }
}
</style>


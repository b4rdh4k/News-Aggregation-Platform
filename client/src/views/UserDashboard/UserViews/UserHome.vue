<script setup>
import { ref } from 'vue'

const username = ref('john_doe')
const fullName = ref('John Doe')
const email = ref('john@example.com')
const birthdate = ref('1990-01-01')
const profilePicture = ref(null)
const newPassword = ref('')
const confirmNewPassword = ref('')
const currentPassword = ref('')

const handleProfilePictureChange = (event) => {
  profilePicture.value = event.target.files[0]
}

const updateProfile = () => {
  if (newPassword.value && newPassword.value !== confirmNewPassword.value) {
    alert('New passwords do not match')
    return
  }

  alert('Profile updated successfully')
  // Mock logic to demonstrate data handling
  console.log({
    username: username.value,
    fullName: fullName.value,
    email: email.value,
    birthdate: birthdate.value,
    profilePicture: profilePicture.value,
    newPassword: newPassword.value,
    currentPassword: currentPassword.value
  })
}
</script>

<template>
  <div class="profile-dashboard">
    <div class="form">
    <h4 class="border-b-2 p-2 border-primary dark:border-dark-primary">Profile Information</h4>
      <form @submit.prevent="updateProfile" enctype="multipart/form-data" class="mt-4">
        <div class="form-group">
          <label for="profilePicture">Profile Picture</label>
          <input id="profilePicture" type="file" @change="handleProfilePictureChange" />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input id="fullName" v-model="fullName" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="birthdate">Birthdate</label>
          <input id="birthdate" v-model="birthdate" type="date" required />
        </div>
        <button type="submit" class="update-button">Update Profile</button>
      </form>
    </div>
    <div class="form bg-primary bg-opacity-30 p-4 rounded-lg">
      <h4 class="border-b-2 p-2 mb-4 border-primary dark:border-dark-primary">Change your password</h4>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input id="currentPassword" v-model="currentPassword" type="password" required />
        </div>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input id="newPassword" v-model="newPassword" type="password" />
        </div>
        <div class="form-group">
          <label for="confirmNewPassword">Confirm New Password</label>
          <input id="confirmNewPassword" v-model="confirmNewPassword" type="password" />
        </div>
        <button type="submit" class="update-button">Update Password</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/views/UserDashboard/styles/base.scss';

.profile-dashboard {
  margin: 0 auto;
  width: 100%;
  color: var(--text);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    font-family: 'M PLUS Code Latin', sans-serif;
  }

  .form {
    margin: 2rem;
    .form-group {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 700;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--secondary);
        border-radius: 0.25rem;
        font-size: 1rem;
        background-color: var(--primary);
        color: var(--text);

        &:focus {
          border-color: var(--accent);
          outline: none;
          background-color: var(--secondary);
        }
      }
    }
  }

  .update-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--accent);
    color: var(--text);
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 700;

    &:hover {
      background-color: var(--secondary);
    }
  }
}
</style>

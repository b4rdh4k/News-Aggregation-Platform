<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const username = ref(userStore.user?.username || '');
const fullName = ref(userStore.user?.fullName || '');
const profilePicture = ref(null);
const profilePicturePreview = ref(null);

// Constants for file validation
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

const updateUsername = async () => {
  try {
    await userStore.updateUserUsername(username.value);
    alert('Username updated successfully');
  } catch (error) {
    console.error('Update username error:', error);
    alert('Failed to update username');
  }
};

const updateFullName = async () => {
  try {
    // Ensure you're passing the correct data structure
    await userStore.updateUserFullName(fullName.value);
    alert('Full name updated successfully');
  } catch (error) {
    console.error('Update full name error:', error);
    alert('Failed to update full name');
  }
};


const updateProfileImage = async () => {
  if (profilePicture.value) {
    try {
      await userStore.updateProfileImage(profilePicture.value);
      alert('Profile image updated successfully');
    } catch (error) {
      console.error('Update profile image error:', error);
      alert('Failed to update profile image');
    }
  } else {
    alert('No profile picture selected');
  }
};

// Handle file input change
const handleFileInput = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= MAX_FILE_SIZE) {
    profilePicture.value = file;
    profilePicturePreview.value = URL.createObjectURL(file);
  } else {
    alert('Please select an image file smaller than 25MB');
  }
};
</script>

<template>
  <div class="profile-dashboard">
    <div class="form">
      <h4>Proffffffile Information</h4>
      <form @submit.prevent="updateProfile" enctype="multipart/form-data" class="mt-4">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" />
          <button @click.prevent="updateUsername">Update Username</button>
        </div>
        <div class="form-group">
          <label for="fullName">Full Name</label>
          <input id="fullName" v-model="fullName" type="text" />
          <button @click.prevent="updateFullName">Update Full Name</button>
        </div>
        <div class="form-group">
          <label for="profilePicture">Profile Picture</label>
          <input id="profilePicture" type="file" @change="handleFileInput" />
          <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Preview" />
          <button @click.prevent="updateProfileImage">Update Profile Picture</button>
        </div>
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

  .drag-drop-area {
    border: 2px dashed var(--secondary);
    padding: 1rem;
    text-align: center;
    border-radius: 0.25rem;
    margin-top: 1rem;
    cursor: pointer;

    .profile-preview {
      max-width: 100%;
      max-height: 200px;
      display: block;
      margin: 0 auto;
    }
  }

  .remove-button {
    margin-top: 0.5rem;
    background-color: red;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
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

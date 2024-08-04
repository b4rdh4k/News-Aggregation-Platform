<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const username = ref('');
const fullName = ref('');
const email = ref('');
const profilePicture = ref(null);
const profilePicturePreview = ref(null);
const newPassword = ref('');
const confirmNewPassword = ref('');

// Constants for file validation
const MAX_WIDTH = 2048;
const MAX_HEIGHT = 2048;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 400;
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

// Load user data when component mounts
onMounted(async () => {
  try {
    if (userStore.token) {
      await userStore.refreshAuthToken(); // Attempt to refresh token
      await userStore.fetchUser(); // Fetch user details after refreshing
      const user = userStore.user;

      if (user) {
        username.value = user.username || '';
        fullName.value = user.fullName || '';
        email.value = user.email || '';
        if (user.profileImage) {
          profilePicturePreview.value = user.profileImage;
        }
      }
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    // Optional: Handle specific cases like logging out the user if needed
  }
});


// Handle profile picture change
const handleProfilePictureChange = (file) => {
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file.');
    profilePicture.value = null;
    profilePicturePreview.value = null;
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    alert(`File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`);
    profilePicture.value = null;
    profilePicturePreview.value = null;
    return;
  }

  const img = new Image();
  img.onload = () => {
    if (
      img.width < MIN_WIDTH ||
      img.height < MIN_HEIGHT ||
      img.width > MAX_WIDTH ||
      img.height > MAX_HEIGHT
    ) {
      alert(`Image dimensions should be between ${MIN_WIDTH}x${MIN_HEIGHT} and ${MAX_WIDTH}x${MAX_HEIGHT} pixels.`);
      profilePicture.value = null;
      profilePicturePreview.value = null;
    } else {
      profilePicture.value = file;
      profilePicturePreview.value = URL.createObjectURL(file);
    }
  };
  img.src = URL.createObjectURL(file);
};

const handleFileInput = (event) => {
  handleProfilePictureChange(event.target.files[0]);
};

const handleDrop = (event) => {
  event.preventDefault();
  if (event.dataTransfer.files.length) {
    handleProfilePictureChange(event.dataTransfer.files[0]);
  }
};

const preventDefault = (event) => event.preventDefault();

const removeProfilePicture = () => {
  profilePicture.value = null;
  profilePicturePreview.value = null;
};

const updateProfile = async () => {
  try {
    // Update user profile
    await userStore.updateUser({
      username: username.value,
      fullName: fullName.value,
    });

    // Update profile image if provided
    if (profilePicture.value) {
      const formData = new FormData();
      formData.append('profileImage', profilePicture.value);
      await userStore.updateProfileImage(formData);
    }

    // Refresh token after updating profile
    await userStore.refreshAuthToken();

    alert('Profile updated successfully');
  } catch (error) {
    console.error('Error updating profile:', error.message);
    alert('Failed to update profile');
  }
};

</script>

<template>
  <div class="profile-dashboard">
    <div class="form">
      <h4 class="border-b-2 p-2 border-primary dark:border-dark-primary">Profile Information</h4>
      <form @submit.prevent="updateProfile" enctype="multipart/form-data" class="mt-4">
        <div 
          class="form-group" 
          id="profilePictureDropArea" 
          @click="() => $refs.fileInput.click()"
          @drop="handleDrop"
          @dragover="preventDefault"
        >
          <input id="profilePicture" ref="fileInput" type="file" @change="handleFileInput" accept="image/*" style="display: none;" />
          <div class="drag-drop-area">
            <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Preview" class="profile-preview" />
            <span v-else>Drag and drop your profile picture here or click to upload</span>
          </div>
          <button type="button" v-if="profilePicturePreview" @click="removeProfilePicture" class="remove-button">Remove Profile Picture</button>
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
          <input id="email" v-model="email" type="email" required disabled />
        </div>
        <button type="submit" class="update-button">Update Profile</button>
      </form>
    </div>
    <div class="form bg-primary bg-opacity-30 p-4 rounded-lg">
      <h4 class="border-b-2 p-2 mb-4 border-primary dark:border-dark-primary">Change your password</h4>
      <form @submit.prevent="updateProfile">
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

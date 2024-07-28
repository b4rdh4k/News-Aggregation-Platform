<script setup>
import { ref, computed } from 'vue'

const users = ref([
  {
    id: 1,
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    birthday: '1990-01-01',
    subscription: 'Premium',
    role: 'Admin'
  },
  {
    id: 2,
    fullName: 'Jane Smith',
    username: 'janesmith',
    email: 'janesmith@example.com',
    birthday: '1992-02-02',
    subscription: 'Free',
    role: 'User'
  },
  {
    id: 3,
    fullName: 'Sarah Johnson',
    username: 'sarahjohnson',
    email: 'sarahjohnson@example.com',
    birthday: '1995-05-05',
    subscription: 'Premium',
    role: 'User'
  },
  {
    id: 4,
    fullName: 'Michael Brown',
    username: 'michaelbrown',
    email: 'michaelbrown@example.com',
    birthday: '1988-08-08',
    subscription: 'Free',
    role: 'User'
  }
])

const currentPage = ref(1)
const usersPerPage = 3

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage
  const end = start + usersPerPage
  return users.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(users.value.length / usersPerPage)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}
</script>

<template>
  <div class="users-page">
    <h2 class="text-2xl font-semibold mb-4">Active users</h2>
    <div class="table-container">
      <table class="responsive-table min-w-full">
        <thead>
          <tr>
            <th class="sticky-column py-2 px-8 border">Username</th>
            <th class="py-2 px-4 border">Full name</th>
            <th class="py-2 px-4 border">Email</th>
            <th class="py-2 px-6 border">Birthday</th>
            <th class="py-2 px-4 border">Subscription</th>
            <th class="py-2 px-4 border">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="sticky-column py-2 px-4 border">{{ user.username }}</td>
            <td class="py-2 px-4 border">{{ user.fullName }}</td>
            <td class="py-2 px-4 border">{{ user.email }}</td>
            <td class="py-2 px-4 border">{{ user.birthday }}</td>
            <td class="py-2 px-4 border">{{ user.subscription }}</td>
            <td class="py-2 px-4 border">{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination mt-4">
      <button
        @click="previousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-l"
      >
        Previous
      </button>
      <span class="px-4 py-2">{{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-r"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-page {
    position: relative;
    min-height: 80vh; 
    display: flex;
    flex-direction: column;
}

.table-container {
  overflow-x: auto;
  scroll-behavior: auto;
  flex: 1; 
}

.responsive-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: separate;
  
  
  th, td {
    padding: 12px;
    border: 1px solid var(--accent);
    text-align: left;
  }

  .sticky-column {
    position: sticky;
    left: 0;
    background: var(--secondary);
    z-index: 1;
  }

  th.sticky-column {
    z-index: 2;
  }
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding: 1em;

    button {
        background-color: var(--primary);
        color: var(--accent);
        border: 1px solid var(--accent);
        cursor: pointer;
    }
    button:hover {
        background-color: var(--accent);
        color: var(--primary);
    }
    button:disabled {
        background-color: var(--secondary);
        color: var(--primary);
        cursor: not-allowed;
    }

    span {
        background-color: var(--background);
        color: var(--accent);
    }
}
</style>

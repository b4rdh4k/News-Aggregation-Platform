<script setup>
import { ref, reactive } from 'vue'

const categories = reactive([
  { title: 'U.S.' },
  { title: 'Entertainment' },
  { title: 'Sports' },
  { title: 'Technology' },
  { title: 'Business' }
])

const dropdownCategories = reactive([
  { title: 'World', topic: 'Global' },
  { title: 'Politics', topic: 'Global' },
  { title: 'Celebrities', topic: 'Entertainment' },
  { title: 'TV', topic: 'Entertainment' },
  { title: 'Movies', topic: 'Entertainment' },
  { title: 'Theater', topic: 'Entertainment' },
  { title: 'Soccer', topic: 'Sports' },
  { title: 'Cycling', topic: 'Sports' },
  { title: 'Motor sports', topic: 'Sports' },
  { title: 'Tennis', topic: 'Sports' },
  { title: 'Combat sports', topic: 'Sports' },
  { title: 'Basketball', topic: 'Sports' },
  { title: 'Baseball', topic: 'Sports' },
  { title: 'Football', topic: 'Sports' },
  { title: 'Sports betting', topic: 'Sports' },
  { title: 'Water sports', topic: 'Sports' },
  { title: 'Hockey', topic: 'Sports' },
  { title: 'Golf', topic: 'Sports' },
  { title: 'Cricket', topic: 'Sports' },
  { title: 'Rugby', topic: 'Sports' },
  { title: 'Economy', topic: 'Business' },
  { title: 'Personal Finance', topic: 'Business' }
])


const categorizedDropdownCategories = ref({})

dropdownCategories.forEach((category) => {
  if (!categorizedDropdownCategories.value[category.topic]) {
    categorizedDropdownCategories.value[category.topic] = []
  }
  categorizedDropdownCategories.value[category.topic].push(category)
})


const removeCategory = (index) => {
  categories.splice(index, 1)
}

const onDragStart = (category, event) => {
  event.dataTransfer.setData('text', JSON.stringify(category))
}

const onDrop = (index, event) => {
  const draggedCategory = JSON.parse(event.dataTransfer.getData('text'))
  categories.splice(index, 0, draggedCategory)
}

const saveCategories = () => {
  console.log('Saved categories:', categories)
}

const clearCategories = () => {
  categories.splice(0, categories.length)
}
</script>
<template>
<div class="h-full w-full">
    <div v-for="(group, topic) in categorizedDropdownCategories" :key="topic">
      <h2 class="text-xl mb-2 font-semibold">{{ topic }}</h2>
      <ul>
        <li
          v-for="category in group"
          :key="category.title"
          class="px-4 py-2 hover:bg-secondary dark:hover:bg-dark-primary cursor-pointer"
          draggable="true"
          @dragstart="onDragStart(category, $event)"
        >
          {{ category.title }}
        </li>
      </ul>
    </div>

    <div
      class="bg-gray-200 p-4 rounded-md"
      @dragover.prevent
      @drop="onDrop(categories.length, $event)"
    >
      <h2 class="text-xl mb-2 font-semibold">Drop Here</h2>
      <ul>
        <li
          v-for="(category, index) in categories"
          :key="category.title"
          class="flex items-center justify-between bg-gray-100 p-2 rounded shadow"
          draggable="true"
          @dragstart="onDragStart(category, $event)"
          @dragover.prevent
          @drop="onDrop(index, $event)"
        >
          <span>{{ category.title }}</span>
          <button @click="removeCategory(index)" class="text-red-500">X</button>
        </li>
      </ul>
    </div>

    <div class="col-span-2 flex justify-end mt-4">
      <button
        @click="saveCategories"
        class="bg-primary dark:bg-dark-primary hover:bg-accent dark:hover:bg-dark-accent px-4 py-2 rounded text-text dark:text-dark-text"
      >
        Save
      </button>
      <button
        @click="clearCategories"
        class="ml-2 bg-secondary dark:bg-dark-secondary hover:bg-accent dark:hover:bg-dark-accent px-4 py-2 rounded text-text dark:text-dark-text"
      >
        Clear
      </button>
    </div>
    </div>
</template>

<style scoped>
.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>

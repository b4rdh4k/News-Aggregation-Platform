<script setup>
import { ref, computed, watch } from 'vue';
import { useCategoryStore } from '@/store/categoryStore';
import draggable from 'vuedraggable';
import ModalFormat from '@/components/shared/Interactions/ModalFormat.vue';

const props = defineProps({
  show: Boolean,
});

const emit = defineEmits(['close']);

const categoryStore = useCategoryStore();
const categories = computed(() => categoryStore.categories);
const selectedCategories = ref([]);

watch(() => props.show, async (newValue) => {
  if (newValue) {
    await categoryStore.fetchCategories();
    selectedCategories.value = [...categoryStore.selectedCategories];
  }
});

const availableCategories = computed(() => {
  return categories.value.filter(
    (category) => !selectedCategories.value.some((selected) => selected.id === category.id)
  );
});

const closeModal = () => {
  emit('close');
};

const addCategory = async (category) => {
  if (!selectedCategories.value.some((c) => c.id === category.id) && selectedCategories.value.length < 9) {
    selectedCategories.value.push(category);
    await categoryStore.addCategory(category); // Add the category to the server preferences
  }
};

const removeCategory = async (category) => {
  selectedCategories.value = selectedCategories.value.filter((cat) => cat.id !== category.id);
  await categoryStore.removeCategory(category); // Remove the category from the server preferences
};

const savePreferences = async () => {
  await categoryStore.setSelectedCategories(selectedCategories.value);
  closeModal();
};

const onDragEnd = () => {
  categoryStore.setSelectedCategories(selectedCategories.value);
};
</script>

<template>
  <ModalFormat v-if="props.show" @close="closeModal">
    <div class="bg-secondary dark:bg-dark-secondary p-4 max-h-screen overflow-y-auto rounded-lg flex flex-col h-full">
      <div class="flex-grow">
        <h3>Manage your preferences</h3>
        <p>Select up to 9 categories to customize your news feed.</p>
        <hr class="my-4 border-dashed" />
        <div class="flex flex-col md:flex-row justify-between mt-2">
          <div>
            <h4>All Categories</h4>
            <p>Click on a category to add it to your feed.</p>
            <ul class="categories-grid mt-4">
              <li
                v-for="category in availableCategories"
                :key="category.id"
                @click="addCategory(category)"
                class="category-item bg-primary dark:bg-dark-primary"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>
          <div class="mt-6 md:mt-0 md:px-2">
            <h4>Selected Categories</h4>
            <p class="mb-2">Drag and drop to reorder your feed.</p>
            <draggable v-model="selectedCategories" @end="onDragEnd" itemKey="id">
              <template #item="{ element }">
                <div
                  class="flex justify-between mb-2 bg-primary dark:bg-dark-primary rounded-md p-2 pr-3 category-item"
                >
                  {{ element.name }}
                  <button @click="removeCategory(element)" class="ml-2">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4 mr-2">
        <button class="rounded-lg p-4 px-6 bg-accent dark:bg-dark-accent hover:bg-opacity-20 dark:hover:bg-opacity-20" @click="savePreferences">
          Save
        </button>
      </div>
    </div>
  </ModalFormat>
</template>

<style scoped>
.category-item {
  transition: background-color 0.3s;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
}

.category-item:hover {
  background-color: #55649b;
}

.sortable-ghost {
  background-color: #af6dee;
  opacity: 0.8;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}
</style>

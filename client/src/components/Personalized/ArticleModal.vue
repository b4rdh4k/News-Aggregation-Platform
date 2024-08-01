<script setup>
import ModalFormat from '@/components/shared/Interactions/ModalFormat.vue'

const props = defineProps({
  show: Boolean,
  article: Object
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <ModalFormat v-if="props.show" @close="closeModal">
    <div
      class="bg-secondary dark:bg-dark-secondary p-4 max-h-screen overflow-y-auto rounded-lg flex flex-col h-full"
    >
      <h2 class="text-xl font-bold mb-4">{{ article.fields.headline }}</h2>
      <img :src="article.fields.thumbnail" alt="Thumbnail" class="w-full h-auto mb-4" />
      <div v-html="article.fields.body" class="text-text dark:text-dark-text mb-4"></div>
      <div class="flex justify-end mt-4 mr-2">
        <a :href="props.article.webUrl" target="_blank" rel="noopener noreferrer">
          <button
            class="rounded-lg p-4 px-6 bg-accent dark:bg-dark-accent hover:bg-opacity-20 dark:hover:bg-opacity-20"
          >
            Read More
          </button>
        </a>
      </div>
    </div>
  </ModalFormat>
</template>


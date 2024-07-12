<template>
    <FullModalFormat @close="closeModal">
      <DraggableTopics @closeModal="closeModal" />
    </FullModalFormat>
  </template>
  
  <script>
import DraggableTopics from './DraggableTopics.vue';
import FullModalFormat from '@/components/FullModalFormat.vue';
  
  export default {
    components: {
        DraggableTopics,
        FullModalFormat,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
<template>
    <Modal @close="closeModal">
      <SignupForm @closeModal="closeModal" />
    </Modal>
  </template>
  
  <script>
  import SignupForm from '@/components/Account/SignupForm.vue';
  import Modal from '@/components/ModalFormat.vue';
  
  export default {
    components: {
      SignupForm,
      Modal,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
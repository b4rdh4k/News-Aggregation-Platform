<template>
    <Modal @close="closeModal">
      <SigninForm @closeModal="closeModal" />
    </Modal>
  </template>
  
  <script>
  import SigninForm from '@/components/Account/SigninForm.vue';
  import Modal from '@/components/ModalFormat.vue';
  
  export default {
    components: {
      SigninForm,
      Modal,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
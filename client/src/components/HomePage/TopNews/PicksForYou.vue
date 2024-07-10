<template>
  <div v-for="pick in picksForYou" :key="pick.id" class="mb-4 md:ml-4 lg:ml-4 xl:ml-4 ">
    <h3 class="font-semibold">{{ pick.title }}</h3>
    <p class="text-gray-500">{{ pick.time }} • {{ pick.author }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picksForYou: [
        {
          id: 1,
          title: 'Dead Online Shooter Refunds DrDisrespect Skins In The Worst Way',
          time: '23 hours ago'
        },
        {
          id: 2,
          title: 'Netflix’s next live event is a Joe Rogan comedy special',
          time: '1 hour ago'
        }
      ]
    }
  }
}
</script>

<template>
  <div class="news-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <div
      v-for="(article, index) in articles"
      :key="index"
      class="card rounded-lg p-2 shadow-inner shadow-secondary dark:shadow-dark-secondary bg-secondary dark:bg-dark-secondary bg-opacity-20 dark:bg-opacity-20"
      @click="goToNewsView(article.Id)"
    >
      <div class="img rounded-lg">
        <img
          :src="article.ImageUrl || 'https://via.placeholder.com/500'"
          alt="Article image"
          class="w-full h-full object-cover rounded-lg hover:animate-pulse"
        />
        <div class="save">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 683 683"
            height="683"
            width="683"
            class="svg"
          >
            <g clip-path="url(#clip0_993_25)">
              <mask
                height="683"
                width="683"
                y="0"
                x="0"
                maskUnits="userSpaceOnUse"
                style="mask-type: luminance"
                id="mask0_993_25"
              >
                <path fill="white" d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z"></path>
              </mask>
              <g mask="url(#mask0_993_25)">
                <path
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="40"
                  stroke="#CED8DE"
                  d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z"
                ></path>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_993_25">
                <rect fill="white" height="682.667" width="682.667"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      <div class="text-container p-2 pb-0">
        <div class="items-center pb-2">
          <h5 class="truncate-text">{{ article.Title }}</h5>
          <p>{{ article.Source }} | {{ article.Time }}</p>
        </div>
        <div class="flex justify-end p-4 border-t-2 border-accent dark:border-dark-accent">
          <router-link
            :to="{ name: 'News', params: { id: article.Id } }"
            class="flex items-center space-x-2"
          >
            <p class="m-0">Read More</p>
            <i
              class="fa fa-arrow-circle-right"
              aria-hidden="true"
              style="font-size: 1.5em; color: var(--accent)"
            ></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
})

const router = useRouter()

const goToNewsView = (articleId) => {
  if (articleId) {
    router.push({ name: 'News', params: { id: articleId } })
  } else {
    console.error('Missing article ID:', articleId)
  }
}
</script>

<style scoped>
.truncate-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card:hover {
  cursor: pointer;
}

.img {
  width: 100%;
  height: 13em;
  background: linear-gradient(var(--primary), var(--accent));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.save {
  transition: 0.2s ease-in-out;
  border-radius: 10px;
  margin: 10px;
  width: 30px;
  height: 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
}

.save .svg {
  transition: 0.2s ease-in-out;
  width: 15px;
  height: 15px;
}

.save:hover .svg {
  fill: var(--accent);
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  padding: 7px 20px;
}

.text-container h5 {
  font-size: medium;
  font-weight: 600;
  margin: 0;
}

.text-container p {
  font-size: 13px;
  margin: 0;
}

.text-container .author,
.text-container .time {
  font-size: 12px;
  margin: 0;
}
</style>

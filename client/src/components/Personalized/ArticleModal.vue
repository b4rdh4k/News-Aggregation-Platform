<script setup>
import ModalFormat from '@/components/shared/Interactions/ModalFormat.vue'
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  article: Object
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const isEmbeddable = (url) => {
  const embeddableDomains = ['youtube.com', 'vimeo.com', 'google.com/maps', 'twitter.com', 'instagram.com'];
  
  try {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    return embeddableDomains.some(embeddableDomain => domain.includes(embeddableDomain));
  } catch {
    return false; 
  }
}

const getEmbedCode = (url) => {
  try {
    const urlObject = new URL(url);
    const domain = urlObject.hostname;

    if (domain.includes('youtube.com')) {
      const videoId = urlObject.searchParams.get('v');
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (domain.includes('vimeo.com')) {
      const videoId = urlObject.pathname.split('/')[1];
      return `<iframe src="https://player.vimeo.com/video/${videoId}" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    } else if (domain.includes('google.com/maps')) {
      return `<iframe src="${url.replace('/view', '/embed')}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    } else if (domain.includes('twitter.com')) {
      return `<blockquote class="twitter-tweet"><a href="${url}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\\/script>`;
    } else if (domain.includes('instagram.com')) {
      return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px rgba(0,0,0,0.1); margin:0; max-width:540px; min-width:326px; padding:0; width:99.375%; height:auto;"><div style="padding:16px;"><a href="${url}" style="color:#000; font-family:sans-serif; font-size:14px; font-weight:600; line-height:18px; text-decoration:none; display:block; margin-bottom:8px;">A post on Instagram</a></div></blockquote><script async src="https://www.instagram.com/embed.js"><\\/script>`;
    }
    return '';
  } catch {
    return '';
  }
}

const processBodyContent = (body) => {
  const urlRegex = /https?:\/\/[^\s]+/g; 
  return body ? body.replace(urlRegex, (url) => {
    return isEmbeddable(url) ? getEmbedCode(url) : url;
  }) : '';
}

const processedBody = ref('')

watch(() => props.article, (newArticle) => {
  if (newArticle && newArticle.fields) {
    processedBody.value = processBodyContent(newArticle.fields.body)
  } else {
    processedBody.value = ''
  }
}, { immediate: true })

</script>

<template>
  <ModalFormat v-if="props.show" @close="closeModal">
    <div
      class="bg-secondary dark:bg-dark-secondary p-4 max-h-screen overflow-y-auto rounded-lg flex flex-col h-full"
    >
      <h2 v-if="props.article && props.article.fields" class="text-xl font-bold mb-4">{{ props.article.fields.headline }}</h2>
      <img v-if="props.article && props.article.fields" :src="props.article.fields.thumbnail" alt="Thumbnail" class="w-full h-auto mb-4" />
      <div v-if="props.article && props.article.fields" v-html="processedBody" class="text-text dark:text-dark-text mb-4"></div>

      <div class="flex justify-end mt-4 mr-2" v-if="props.article">
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

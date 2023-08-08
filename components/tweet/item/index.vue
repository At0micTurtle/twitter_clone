<template>
  <div>
    <TweetItemHeader :tweet="props.tweet" />
    
    <div class="ml-16">
      <p class="flex-shrink font-medium text-gr-800 w-auto dark:text-white">
        {{ props.tweet.text }}
      </p>
    
      <div v-for="image in tweet.mediaFiles" :key="image.id" class="flex my-3 border-2 rounded-2xl" :class="twitterBorderColor">
        <img :src="image.url" class="w-full rounded-2xl" />
      </div>
    </div>
  </div>
</template>

<script setup>
  const { twitterBorderColor } = useTailwindConfig()
  const props = defineProps({
    tweets: {
      type: Object,
      required: true
    }
  })
</script>
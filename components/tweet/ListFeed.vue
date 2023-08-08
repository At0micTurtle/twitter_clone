<template>
  <div>
    <div class="pb-4 border-b hover:bg-gray-100" :class="twitterBorderColor" v-for="tweet in props.tweets" :key="tweet.id" >
      <TweetItem :tweet="tweet" />
    </div>
  </div>
</template>

<script setup>
  const { twitterBorderColor, defaultTransition } = useTailwindConfig()
  const props = defineProps({
    tweets: {
      type: Array,
      required: true
    }
  })
</script>
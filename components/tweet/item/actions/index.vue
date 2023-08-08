<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <ChatBubbleBottomCenterIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:count>
        {{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <CircleStackIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:count>
        <span>{{ generateRandomNumber() }}</span>
      </template>
    </TweetItemActionsIcon>
    
    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:count>
        <span>{{ generateRandomNumber() }}</span>
      </template>
    </TweetItemActionsIcon>
    
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <ShareIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:count>
        <span>{{ generateRandomNumber() }}</span>
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup>
  import { ChatBubbleBottomCenterIcon, CircleStackIcon, HeartIcon, ShareIcon } from '@heroicons/vue/24/outline';

  const props = defineProps({
    tweet: {
      type: Object,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    }
  });

  const showStats = computed(() => props.compact);
  const size = computed(() => props.compact ? 5 : 8);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100);
  }
</script>
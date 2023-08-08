<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <head>
        <title>Home / Twitter</title>
      </head>
      
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup>
  const { twitterBorderColor } = useTailwindConfig()
  const { getHomeTweets } = useTweets()

  const loading = ref(false)
  const homeTweets = ref([])
  const { useAuthUser } = useAuth()

  const user = useAuthUser()

  onBeforeMount(async () => {
    loading.value = true    
    try {
      await getHomeTweets()

      homeTweets.value = tweets
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  })
</script>

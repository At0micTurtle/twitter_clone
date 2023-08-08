import { tweetTransformer } from "~~/server/transformers/tweet";
import { getTweets } from "~~/server/db/tweets";

export default defineEventHandler(async (event) => {
  const tweets = await getTweets({
    include: {
      author: true,
      mediaFiles: true,
      replies: {
        include: {
          author: true,
        }
      },
      replyTo: {
        include: {
          author: true,
        }
      },
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ]
  })

  return {
    tweets: tweets.map(tweetTransformer)
  }
});
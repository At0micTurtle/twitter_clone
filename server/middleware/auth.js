import UrlPattern from "url-pattern";
import { decodeAccessToken } from "../utils/jwt.js";
import { sendError } from "h3"
import { getUserById } from "../db/users.js";

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
  ]

  const isHandledByThisMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint)
    
    if (event.request && event.request.url) {
      // event.request.url is undefined. Check for the url
      return pattern.match(event.request.url)
    }

    return false
  })

  if (!isHandledByThisMiddleware) {
    return
  }

  const token = event.request.headers['authorization']?.split(' ')[1]
  const decoded = decodeAccessToken(token)

  if (!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }))
  }  

  try {
// sourcery skip: use-object-destructuring
    const userId = decoded.userId
    const user = await getUserById(userId)

    event.context.auth = { user }
  } catch (error) {
    return
  }
})
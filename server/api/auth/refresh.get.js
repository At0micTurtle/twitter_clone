import { sendError } from 'h3'
import { getRefreshTokenByToken } from '../../db/refreshTokens.js'
import { decodeRefreshToken, generateTokens } from '../../utils/jwt.js'
import { getUserById } from '../../db/users.js'

export default defineEventHandler(async (event) => {
  const cookie = useCookie(event)
  const refreshToken = cookie.refresh_token
  const rToken = await getRefreshTokenByToken(refreshToken)

  if (!refreshToken || !rToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token is invalid'
    }))
  }

  const token = decodeRefreshToken(refreshToken)

  try {
    const user = await getUserById(token.userId)
    const { accessToken } = generateTokens(user)

    return { access_token: accessToken }
  } catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    }))
  }
});
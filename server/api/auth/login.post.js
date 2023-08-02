import { getUserByUsername } from '@/db/users.js';
import { generateTokens, sendRefreshToken } from '../../utils/jwt.js';
import { userTransformer } from '../../transformers/user.js';
import { createRefreshToken } from '@/db/refreshTokens.js';
import { sendError } from 'h3';
import bcrypt from 'bcrypt';

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  const { username, password } = body

  if (!username || !password) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid params'}))
  }

  // Is the user registered?
  const user = getUserByUsername(username)

  if (!user) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid username or password'}))
  }

  // Compare the password
  const isPasswordValid = bcrypt.compareSync(password, user.password)

  if (!isPasswordValid) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Invalid username or password'}))
  }

  // Generate tokens
  // Access and Refresh token
  const { accessToken, refreshToken } = generateTokens(user)

  // Save the refresh token in the database
  await createRefreshToken({
    token: refreshToken,
    userId: user.id
  })

  // Add httpOnly cookie
  sendRefreshToken(event, refreshToken)

  return {
    access_token: accessToken,
    user: userTransformer(user)
  }
})

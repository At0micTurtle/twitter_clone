import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  const config = runtimeConfig();

  return jwt.sign({userId: user.id}, config.jwtAccessSecret, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  const config = runtimeConfig();

  return jwt.sign({userId: user.id}, config.jwtRefreshSecret, {
    expiresIn: "4h",
  });
};

export const decodeRefreshToken = (token) => {
  const config = runtimeConfig();
  
  try {
    return jwt.verify(token, config.jwtRefreshSecret);
  } catch (error) {
    
  }
};

export const generateTokens = (user) => {
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
  };
};

export const sendRefreshToken = (event, token) => {
  setCookie(event.res, 'refresh_token', token, {
    httpOnly: true,
    sameSite: true
  })
}

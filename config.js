module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  GITHUB_URL: process.env.GITHUB_URL || 'https://api.github.com',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
};

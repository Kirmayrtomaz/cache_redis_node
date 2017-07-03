module.exports = {
  APP_PORT: process.env.APP_PORT || 3000,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
  GITHUB_URL: process.env.GITHUB_URL || 'https://api.github.com',
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
};

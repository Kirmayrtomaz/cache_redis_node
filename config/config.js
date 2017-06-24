module.exports = {
  db: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    database: 'github',
    host: process.env.MYSQL_HOST || '127.0.01',
    dialect: 'mysql',
  },
  APP_PORT: process.env.APP_PORT || 3000,
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  GITHUB_URL: process.env.GITHUB_URL || 'https://api.github.com',
};


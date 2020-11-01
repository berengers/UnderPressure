module.exports = {
  HOST: process.env.HOST || '0.0.0.0',
  PORT: process.env.PORT || 4000,
  DB: process.env.DB || 'postgres://postgres:postgres@127.0.0.1:5432/postgres'
}

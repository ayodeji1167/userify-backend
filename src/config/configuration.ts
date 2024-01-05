export default () => ({
  port: process.env.PORT || 8080,

  postgress: {
    dbUrl: process.env.DATABASE_URL,
  },
});

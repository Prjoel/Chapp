module.exports = {

  // If using online database
  // development: {
  //   use_env_variable: 'DATABASE_URL'
  // },

  development: {
    database: process.env.DEVDB_NAME,
    username: process.env.DEVDB_USER,
    password: process.env.DEVDB_PASS,
    host: process.env.DEVDB_HOST,
    dialect: 'postgres'
  },
  test: {
    database: process.env.TESTDB_NAME,
    username: process.env.TESTDB_USER,
    password: process.env.TESTDB_PASS,
    host: process.env.TESTDB_HOST,
    dialect: 'postgres'
  },

  production: {
    database: process.env.PRODDB_NAME,
    username: process.env.PRODDB_USER,
    password: process.env.PRODDB_PASS,
    host: process.env.PRODDB_HOST,
    dialect: 'postgres'
  }
};

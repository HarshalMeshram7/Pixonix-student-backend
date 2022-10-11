/* DB Configuration */
module.exports = {
  HOST: process.env.DB_HOST_NAME,
  USER: process.env.DB_USER_NAME,
  PASSWORD: process.env.DB_PASSWORD,
  DBNAME: process.env.DB_NAME,
  dialect: "mysql",
  // PORT: 5432,
  pool: {
    max: 30,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

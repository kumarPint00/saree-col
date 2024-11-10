module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "4123",
  DB: "thc",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

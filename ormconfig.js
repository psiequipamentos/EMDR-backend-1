const dotenv = require("dotenv");
dotenv.config();

const sync = process.env.SYNC ?? false;
console.log(`🔃 [database sync]: ${sync}`);

module.exports = {
  name: "default",
  type: "mysql",
  host: "host",
  port: 3306,
  username: "username",
  password: "password",
  database: "database",
  synchronize: sync,
  logging: false,
  entities: ["src/models/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/models",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

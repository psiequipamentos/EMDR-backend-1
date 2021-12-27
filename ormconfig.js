const dotenv = require("dotenv");
dotenv.config();

const sync = process.env.SYNC ? true : false;
console.log(`🔃 [database sync]: ${sync}`);

module.exports = {
  name: "default",
  type: "mysql",
  host: "mysql02-farm36.kinghost.net",
  port: 3306,
  username: "thetracker05",
  password: "emdr3xp",
  database: "thetracker05",
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

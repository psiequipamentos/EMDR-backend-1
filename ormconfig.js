const dotenv = require("dotenv");
dotenv.config();

const sync = process.env.SYNC ?? false;
console.log(`🔃 [database sync]: ${sync}`);

module.exports = {
  name: "default",
  type: "mysql",
  host: "mysql27-farm1.kinghost.net",
  port: 3306,
  username: "luspew13",
  password: "emdr3xp1204",
  database: "luspew13",
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

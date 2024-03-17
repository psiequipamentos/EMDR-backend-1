const dotenv = require("dotenv");
dotenv.config();

const sync = process.env.SYNC ? true : false;
console.log(`🔃 [database sync]: ${sync}`);

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_TYPE,
} = process.env;

module.exports = {
  name: "default",
  type: DATABASE_TYPE,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: sync,
  logging: false,
  entities: [__dirname + "src/models/**/*.ts"],
  migrations: [__dirname + "src/migration/**/*.ts"],
  subscribers: [__dirname + "src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: __dirname + "src/models",
    migrationsDir: __dirname + "src/migration",
    subscribersDir: __dirname + "src/subscriber",
  },
};

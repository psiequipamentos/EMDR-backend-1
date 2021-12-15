const dotenv = require("dotenv");
dotenv.config();

const sync = process.env.SYNC ? true : false;
console.log(`🔃 [database sync]: ${sync}`);

module.exports = {
  name: "default",
  type: "mysql",
  host: "ec2-15-228-197-218.sa-east-1.compute.amazonaws.com",
  port: 3306,
  username: "emdraccess",
  password: "emdr3xp$",
  database: "emdr",
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

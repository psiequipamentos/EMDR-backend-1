import app from "../src/app";
import * as dotenv from "dotenv";

import createConnection from "../database/connect";
import DailyService from "../src/services/daily.co/daily.service";
import TimeHandler from "../src/utils/timehandler.utils";
import { daily_config } from "../src/config/daily.config";

dotenv.config();
const port: string = process.env.PORT;

// * Connect database default
createConnection("default")
  .then((_) =>
    console.log(" ✔️ [database]: Default database connected successfully.")
  )
  .catch((database_connection_error) =>
    console.log(
      ` ⚠ [database]: Default database was not connected! Error: ${database_connection_error.message}`
    )
  );

// * Run server
app.listen(port, () => {
  console.log(`🚀 [server]: Server is running at :${port}.`);
});

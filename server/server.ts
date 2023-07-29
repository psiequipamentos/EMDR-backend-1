import app from "../src/app";
import * as dotenv from "dotenv";

import createConnection from "../database/connect";
import WebsocketServer from "./websocket.server";

dotenv.config();
const port: string = process.env.PORT;

// * Connect database default
createConnection("default")
  .then((_) =>
    console.log("✔️  [database]: Default database connected successfully.")
  )
  .catch((database_connection_error) =>
    console.log(
      ` ⚠ [database]: Default database was not connected! Error: ${database_connection_error}`
    )
  );


  // Rota de health check
  app.get('/health', (req, res) => {
  res.send('OK');
  });

if(process.env.HTTPS_MODE) {
  app.enable('trust proxy')
  app.use((req, res, next) => {
    if(req.secure)
      next()
    else{
      res.redirect(`https://${req.headers.host}${req.url}`)
    }
  })
}
// * Run server
app.listen(8080, 'https://king-prawn-app.ondigitalocean.app/', () => {
  new WebsocketServer().run();
  console.log(`🚀 [server]: Server is running at :${port}.`);
});

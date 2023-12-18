import app from "../src/app";
import * as dotenv from "dotenv";

import createConnection from "../database/connect";
import WebsocketServer from "./websocket.server";

dotenv.config();
const port: string = process.env.PORT;
console.log(process.env)
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


  // Rota de health check     - Esse método estava no health check Coloquei aqui pra testar.
  app.get('/health', (req, res) => {
  console.log(res);
  res.send('OK');
  });

if(process.env.HTTPS_MODE) {
  app.enable('trust proxy')
  app.use((req, res, next) => {
    if(req.secure)
      next()
    else{
      res.redirect(`http://${req.headers.host}${req.url}`)
    }
  })
}
// * Run server
//ESTAVA app.listen(port, ()=> {..)
app.listen(port, () => {
  new WebsocketServer().run();
  console.log(`🚀 [server]: Server is running at: ${port}.`);
});

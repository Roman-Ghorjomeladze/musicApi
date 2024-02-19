import { EnvService } from "./config/EnvService";
import { app } from "@src/app";

const PORT = EnvService.getAppPort();

const bootstrap = async () => {
  try {
    app.listen(PORT);
    console.log("App is started on port 3000");
  } catch (err) {
    // console.error(err);
    process.exit(0);
  }
  process.on('uncaughtException', (error) => {
    console.error(error);
  })
};

bootstrap();

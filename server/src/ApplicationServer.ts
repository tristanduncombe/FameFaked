import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConfigType } from "./config/config.schema";
import { IContainer } from "./Container";
import ApplicationRouter from "./ApplicationRouter";

const ApplicationServer = (config: ConfigType, container: IContainer) => {
  const app = expressApp(config);

  const router = ApplicationRouter(container);

  app.use(router);

  return {
    app,
    start: () => {
      return app.listen(config.PORT, () => {
        console.log(`Server started on port ${config.PORT}`);
      });
    },
  };
};

const expressApp = (config: ConfigType) => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: [config.CLIENT_ORIGIN, "https://deco3801-htmlheroes.uqcloud.net"],
    })
  );

  app.use(cookieParser());

  app.use(urlencoded({ extended: false }));

  app.use(json({ limit: "25mb" }));

  return app;
};

export default ApplicationServer;

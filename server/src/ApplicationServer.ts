import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ConfigType } from "./config/config.schema";
import { IContainer } from "./Container";
import ApplicationRouter from "./ApplicationRouter";

/**
 * Creates an application server.
 *
 * @param {ConfigType} config - The application configuration.
 * @param {IContainer} container - The dependency injection container providing necessary components.
 * @returns {object} - An object containing the app and a `start` function.
 */
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

/**
 * Creates an application with the provided configuration.
 *
 * @param {ConfigType} config - The app configuration.
 * @returns {express.Application} - A new express application.
 */
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

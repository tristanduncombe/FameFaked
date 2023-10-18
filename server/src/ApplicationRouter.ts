import { IContainer } from "./Container";
import { Router } from "express";

/**
 * Creates a new express router for the application.
 *
 * @param {IContainer} container - The dependency injection container.
 * @returns {Router} - the new express router instance with app-specific routes.
 */
const ApplicationRouter = (container: IContainer) => {
  const router = Router();

  router.use("/famevideo", container.fameVideoComponent.fameVideoRouter);
  router.use("/scoreboard", container.scoreboardComponent.scoreboardRouter);

  return router;
};

export default ApplicationRouter;

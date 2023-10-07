import { IContainer } from "./Container";
import { Router } from "express";

const ApplicationRouter = (container: IContainer) => {
  const router = Router();

  router.use("/famevideo", container.fameVideoComponent.fameVideoRouter);
  router.use("/scoreboard", container.scoreboardComponent.scoreboardRouter);

  return router;
};

export default ApplicationRouter;

import { IContainer } from "./Container";
import { Router } from "express";

const ApplicationRouter = (container: IContainer) => {
  const router = Router();

  router.use("/famevideo", container.fameVideoComponent.fameVideoRouter);

  return router;
};

export default ApplicationRouter;

import { IContainer } from "./Container";
import { Router } from "express";

const ApplicationRouter = (container: IContainer) => {
  const router = Router();

  router.use("/memevideo", container.memeVideoComponent.memeVideoRouter);

  return router;
};

export default ApplicationRouter;

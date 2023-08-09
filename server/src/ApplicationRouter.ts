import { IContainer } from "./Container";
import { Router } from "express";

const ApplicationRouter = (container: IContainer) => {
  const router = Router();

  return router;
};

export default ApplicationRouter;

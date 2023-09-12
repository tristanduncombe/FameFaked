import { Router } from "express";
import { IMemeVideoController } from "./MemeVideoController";

export type IMemeVideoRouter = Router;

export const MemeVideoRouter = (
  MemeVideoController: IMemeVideoController
): Router => {
  const router = Router();

  router.get("/random", MemeVideoController.getRandomVideo);
  router.post("/insert", MemeVideoController.insertVideo);

  return router;
};

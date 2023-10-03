import { Router } from "express";
import { IFameVideoController } from "./FameVideoController";

export type IFameVideoRouter = Router;

export const FameVideoRouter = (
  FameVideoController: IFameVideoController
): Router => {
  const router = Router();

  router.get("/random", FameVideoController.getVideos);
  router.get("/regions", FameVideoController.getRegions);
  router.post("/insert", FameVideoController.insertVideo);
  router.get("/region/:region", FameVideoController.getVideosByRegion);

  return router;
};

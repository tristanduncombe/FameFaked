import { Router } from "express";
import { IFameVideoController } from "./FameVideoController";

export type IFameVideoRouter = Router;

export const FameVideoRouter = (
    FameVideoController: IFameVideoController
): Router => {
    const router = Router();

    router.get("/random", FameVideoController.getRandomVideo);
    router.post("/insert", FameVideoController.insertVideo);

    return router;
};

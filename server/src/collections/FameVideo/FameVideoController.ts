import { Request, Response } from "express";
import { IFameVideo } from "./FameVideo";
import { successResponse, failResponse } from "../../Utils/CommonUtil";
import { IFameVideoService } from "./FameVideoService";

export interface IFameVideoController {
  getVideos: (
    req: Request,
    res: Response
  ) => Promise<Response<IFameVideo[] | void>>;
  insertVideo: (
    req: Request,
    res: Response
  ) => Promise<Response<boolean | void>>;
}

export default (FameVideoService: IFameVideoService): IFameVideoController => {
  return {
    getVideos: async (req, res) => {
      try {
        const FameVideo = await FameVideoService.getVideos();
        if (!FameVideo.success) return failResponse(res, "No video found");
        return successResponse(res, FameVideo.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
    insertVideo: async (req, res) => {
      try {
        const { videoLink, deepfaked } = req.body;

        const FameVideo = await FameVideoService.insertVideo(
          videoLink,
          deepfaked
        );

        if (!FameVideo.success) return failResponse(res, "No video found");
        return successResponse(res, FameVideo.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
  };
};

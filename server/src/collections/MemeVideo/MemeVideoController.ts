import { Request, Response } from "express";
import { IMemeVideo } from "./MemeVideo";
import { successResponse, failResponse } from "../../Utils/CommonUtil";
import { IMemeVideoService } from "./MemeVideoService";

export interface IMemeVideoController {
  getRandomVideo: (
    req: Request,
    res: Response
  ) => Promise<Response<IMemeVideo | void>>;
  insertVideo: (
    req: Request,
    res: Response
  ) => Promise<Response<boolean | void>>;
}

export default (MemeVideoService: IMemeVideoService): IMemeVideoController => {
  return {
    getRandomVideo: async (req, res) => {
      try {
        const MemeVideo = await MemeVideoService.getRandomVideo();
        if (!MemeVideo.success) return failResponse(res, "No video found");
        return successResponse(res, MemeVideo.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
    insertVideo: async (req, res) => {
      try {
        const { videoLink, deepfaked } = req.body;

        const MemeVideo = await MemeVideoService.insertVideo(
          videoLink,
          deepfaked
        );

        if (!MemeVideo.success) return failResponse(res, "No video found");
        return successResponse(res, MemeVideo.payload);
      } catch (err) {
        return failResponse(res, err);
      }
    },
  };
};

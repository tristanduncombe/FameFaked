import { Collection } from "mongodb";
import {
  SuccessReturn,
  FailReturn,
  success,
  failure,
} from "../../Utils/CommonUtil";
import { IMemeVideo } from "./MemeVideo";

export interface IMemeVideoRepository {
  getRandomVideo(): Promise<SuccessReturn<IMemeVideo> | FailReturn>;
  insertVideo(
    videoLink: string,
    deepfaked: boolean
  ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (MemeVideoCollection: Collection): IMemeVideoRepository => {
  return {
    getRandomVideo: async () => {
      const MemeVideos = await MemeVideoCollection.find<IMemeVideo>(
        {}
      ).toArray();
      const randomIndex = Math.floor(Math.random() * MemeVideos.length);
      const MemeVideo: IMemeVideo = MemeVideos[randomIndex];

      if (!MemeVideo) return failure("No video found");

      return success(MemeVideo);
    },
    insertVideo: async (videoLink, deepfaked) => {
      const MemeVideo = await MemeVideoCollection.insertOne({
        videoLink,
        deepfaked,
      });

      if (!MemeVideo) return failure("No video found");

      return success(true);
    },
  };
};

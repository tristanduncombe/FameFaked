import { Collection } from "mongodb";
import {
  SuccessReturn,
  FailReturn,
  success,
  failure,
} from "../../Utils/CommonUtil";
import { IFameVideo } from "./FameVideo";

export interface IFameVideoRepository {
  getVideos(): Promise<SuccessReturn<IFameVideo[]> | FailReturn>;
  insertVideo(
    videoLink: string,
    deepfaked: boolean
  ): Promise<SuccessReturn<boolean> | FailReturn>;
  getRegions(): Promise<SuccessReturn<string[]> | FailReturn>;
  getVideosByRegion(
    region: string
  ): Promise<SuccessReturn<IFameVideo[]> | FailReturn>;
}

export default (FameVideoCollection: Collection): IFameVideoRepository => {
  return {
    getVideos: async () => {
      const FameVideos = await FameVideoCollection.find<IFameVideo>(
        {}
      ).toArray();

      // randomize the video order
      FameVideos.sort(() => Math.random() - 0.5);

      if (!FameVideos) return failure("No videos found");

      return success(FameVideos);
    },
    insertVideo: async (videoLink, deepfaked) => {
      const FameVideo = await FameVideoCollection.insertOne({
        videoLink,
        deepfaked,
      });

      if (!FameVideo) return failure("No video found");

      return success(true);
    },
    getRegions: async () => {
      const regions = await FameVideoCollection.distinct("region");

      regions.push("Global");

      if (!regions) return failure("No regions found");

      return success(regions);
    },
    getVideosByRegion: async (region) => {
      const FameVideos = await FameVideoCollection.find<IFameVideo>({
        region,
      }).toArray();

      if (!FameVideos) return failure("No videos found");

      return success(FameVideos);
    },
  };
};

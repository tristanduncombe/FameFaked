import { IFameVideoRepository } from "./FameVideoRepository";
import {
  SuccessReturn,
  FailReturn,
  failure,
  success,
} from "../../Utils/CommonUtil";
import { IFameVideo } from "./FameVideo";

export interface IFameVideoService {
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

export default (
  FameVideoRepository: IFameVideoRepository
): IFameVideoService => {
  return {
    getVideos: async () => await FameVideoRepository.getVideos(),
    insertVideo: async (videoLink, deepfaked) =>
      await FameVideoRepository.insertVideo(videoLink, deepfaked),
    getRegions: async () => await FameVideoRepository.getRegions(),
    getVideosByRegion: async (region) =>
      await FameVideoRepository.getVideosByRegion(region),
  };
};

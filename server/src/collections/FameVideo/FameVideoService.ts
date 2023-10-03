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

export default (UserRepository: IFameVideoRepository): IFameVideoService => {
  return {
    getVideos: async () => await UserRepository.getVideos(),
    insertVideo: async (videoLink, deepfaked) =>
      await UserRepository.insertVideo(videoLink, deepfaked),
    getRegions: async () => await UserRepository.getRegions(),
    getVideosByRegion: async (region) =>
      await UserRepository.getVideosByRegion(region),
  };
};

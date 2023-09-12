import { IMemeVideoRepository } from "./MemeVideoRepository";
import {
  SuccessReturn,
  FailReturn,
  failure,
  success,
} from "../../Utils/CommonUtil";
import { IMemeVideo } from "./MemeVideo";

export interface IMemeVideoService {
  getRandomVideo(): Promise<SuccessReturn<IMemeVideo> | FailReturn>;
  insertVideo(
    videoLink: string,
    deepfaked: boolean
  ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (UserRepository: IMemeVideoRepository): IMemeVideoService => {
  return {
    getRandomVideo: async () => await UserRepository.getRandomVideo(),
    insertVideo: async (videoLink, deepfaked) =>
      await UserRepository.insertVideo(videoLink, deepfaked),
  };
};

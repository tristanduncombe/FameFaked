import { IFameVideoRepository } from "./FameVideoRepository";
import {
    SuccessReturn,
    FailReturn,
    failure,
    success,
} from "../../Utils/CommonUtil";
import { IFameVideo } from "./FameVideo";

export interface IFameVideoService {
    getRandomVideo(): Promise<SuccessReturn<IFameVideo> | FailReturn>;
    insertVideo(
        videoLink: string,
        deepfaked: boolean
    ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (UserRepository: IFameVideoRepository): IFameVideoService => {
    return {
        getRandomVideo: async () => await UserRepository.getRandomVideo(),
        insertVideo: async (videoLink, deepfaked) =>
            await UserRepository.insertVideo(videoLink, deepfaked),
    };
};

import { Collection } from "mongodb";
import {
  SuccessReturn,
  FailReturn,
  success,
  failure,
} from "../../Utils/CommonUtil";
import { IFameVideo } from "./FameVideo";

export interface IFameVideoRepository {
    getRandomVideo(): Promise<SuccessReturn<IFameVideo> | FailReturn>;
    insertVideo(
        videoLink: string,
        deepfaked: boolean
    ): Promise<SuccessReturn<boolean> | FailReturn>;
}

export default (FameVideoCollection: Collection): IFameVideoRepository => {
    return {
        getRandomVideo: async () => {
            const FameVideos = await FameVideoCollection.find<IFameVideo>(
                {}
            ).toArray();
            const randomIndex = Math.floor(Math.random() * FameVideos.length);
            const FameVideo: IFameVideo = FameVideos[randomIndex];

            if (!FameVideo) return failure("No video found");

            return success(FameVideo);
        },
        insertVideo: async (videoLink, deepfaked) => {
            const FameVideo = await FameVideoCollection.insertOne({
                videoLink,
                deepfaked,
            });

            if (!FameVideo) return failure("No video found");

            return success(true);
        },
    };
};

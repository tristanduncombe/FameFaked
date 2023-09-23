import { Db } from "mongodb";
import FameVideoController, {
  IFameVideoController,
} from "./FameVideoController";
import FameVideoRepository, {
  IFameVideoRepository,
} from "./FameVideoRepository";
import { FameVideoRouter, IFameVideoRouter } from "./FameVideoRouter";
import FameVideoService, { IFameVideoService } from "./FameVideoService";

export interface IFameVideoComponent {
  fameVideoRepository: IFameVideoRepository;
  fameVideoService: IFameVideoService;
  fameVideoController: IFameVideoController;
  fameVideoRouter: IFameVideoRouter;
}

export const FameVideoComponent = (db: Db): IFameVideoComponent => {
  const fameVideoCollection = db.collection("FameVideos");
  const fameVideoRepository = FameVideoRepository(fameVideoCollection);
  const fameVideoService = FameVideoService(fameVideoRepository);
  const fameVideoController = FameVideoController(fameVideoService);
  const fameVideoRouter = FameVideoRouter(fameVideoController);

  return {
    fameVideoRepository,
    fameVideoService,
    fameVideoController,
    fameVideoRouter,
  };
};

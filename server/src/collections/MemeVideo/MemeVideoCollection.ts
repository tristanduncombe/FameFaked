import { Db } from "mongodb";
import MemeVideoController, {
  IMemeVideoController,
} from "./MemeVideoController";
import MemeVideoRepository, {
  IMemeVideoRepository,
} from "./MemeVideoRepository";
import { MemeVideoRouter, IMemeVideoRouter } from "./MemeVideoRouter";
import MemeVideoService, { IMemeVideoService } from "./MemeVideoService";

export interface IMemeVideoComponent {
  memeVideoRepository: IMemeVideoRepository;
  memeVideoService: IMemeVideoService;
  memeVideoController: IMemeVideoController;
  memeVideoRouter: IMemeVideoRouter;
}

export const MemeVideoComponent = (db: Db): IMemeVideoComponent => {
  const memeVideoCollection = db.collection("MemeVideos");
  const memeVideoRepository = MemeVideoRepository(memeVideoCollection);
  const memeVideoService = MemeVideoService(memeVideoRepository);
  const memeVideoController = MemeVideoController(memeVideoService);
  const memeVideoRouter = MemeVideoRouter(memeVideoController);

  return {
    memeVideoRepository,
    memeVideoService,
    memeVideoController,
    memeVideoRouter,
  };
};

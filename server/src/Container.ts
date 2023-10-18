import {
  IFameVideoComponent,
  FameVideoComponent,
} from "./collections/FameVideo/FameVideoCollection";
import { ScoreboardComponent } from "./collections/Scoreboard/ScoreboardCollection";
import { ConfigType } from "./config/config.schema";
import { MongoClient } from "mongodb";
export interface IContainer {
  fameVideoComponent: IFameVideoComponent;
  scoreboardComponent: any;
}

/**
 * Asynchronously creates a dependency injection container.
 *
 * @param {ConfigType} config - The configuration settings for the container and its components.
 * @returns {Promise<IContainer>} - Resolves to the dependency injection container containing initialized components.
 */
const Container = async (config: ConfigType): Promise<IContainer> => {
  const client = new MongoClient(config.DATABASE_URL);

  await client.connect();

  const db = client.db(config.DATABASE_NAME);

  const fameVideoComponent = FameVideoComponent(db);

  const scoreboardComponent = ScoreboardComponent(db);

  return {
    fameVideoComponent,
    scoreboardComponent,
  };
};

export default Container;

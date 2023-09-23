import {
  IFameVideoComponent,
  FameVideoComponent,
} from "./collections/FameVideo/FameVideoCollection";
import { ConfigType } from "./config/config.schema";
import { MongoClient } from "mongodb";
export interface IContainer {
  fameVideoComponent: IFameVideoComponent;
}

const Container = async (config: ConfigType): Promise<IContainer> => {
  const client = new MongoClient(config.DATABASE_URL);

  await client.connect();

  const db = client.db(config.DATABASE_NAME);

  const fameVideoComponent = FameVideoComponent(db);

  return {
    fameVideoComponent,
  };
};

export default Container;

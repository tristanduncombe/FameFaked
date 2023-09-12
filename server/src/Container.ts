import {
  IMemeVideoComponent,
  MemeVideoComponent,
} from "./collections/MemeVideo/MemeVideoCollection";
import { ConfigType } from "./config/config.schema";
import { MongoClient } from "mongodb";
export interface IContainer {
  memeVideoComponent: IMemeVideoComponent;
}

const Container = async (config: ConfigType): Promise<IContainer> => {
  const client = new MongoClient(config.DATABASE_URL);

  await client.connect();

  const db = client.db(config.DATABASE_NAME);

  const memeVideoComponent = MemeVideoComponent(db);

  return {
    memeVideoComponent,
  };
};

export default Container;

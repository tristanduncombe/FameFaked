// script to seed db

import { MongoClient } from "mongodb";
import { ConfigType } from "../config/config.schema";
import { IFameVideo } from "../collections/FameVideo/FameVideo";

import videos from "./videos.json";
import config from "../../config.json";

const seed = async (config: ConfigType) => {
  const client = new MongoClient(config.DATABASE_URL);

  await client.connect();

  const db = client.db(config.DATABASE_NAME);

  const FameVideoCollection = db.collection<IFameVideo>("FameVideos");

  await FameVideoCollection.insertMany(videos);

  console.log("Seeded db");

  await client.close();

  process.exit(0);
};

seed(config);
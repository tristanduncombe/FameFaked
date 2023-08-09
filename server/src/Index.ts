import ApplicationServer from "./ApplicationServer";
import configFile from "../config.json";
import Container from "./Container";
import { ConfigType } from "./config/config.schema";

const startServer = async (configurationFile: ConfigType) => {
    const moduleContainer = await Container(configurationFile);

    const applicationServer = await ApplicationServer(
        configurationFile,
        moduleContainer
    );

    applicationServer.start();
};

startServer(configFile);

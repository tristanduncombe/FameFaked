import ApplicationServer from "./ApplicationServer";
import configFile from "../config.json";
import Container from "./Container";
import { ConfigType } from "./config/config.schema";

/**
 * Asynchronously starts the server.
 *
 * @param {ConfigType} configurationFile - The configuration settings.
 * @returns {Promise<void>} - A Promise that resolves once the server is started.
 */
const startServer = async (configurationFile: ConfigType) => {
    const moduleContainer = await Container(configurationFile);

    const applicationServer = await ApplicationServer(
        configurationFile,
        moduleContainer
    );

    applicationServer.start();
};

startServer(configFile);

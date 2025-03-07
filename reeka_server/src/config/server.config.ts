import { config } from "dotenv";
import debug from "debug";

config();

class ServerConfig {
  public DEBUG = debug("dev");

  public NODE_ENV = process.env.NODE_ENV;

  public PORT = process.env.PORT;

  public ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
}

export default new ServerConfig();

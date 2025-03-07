import express, { Application } from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import serverConfig from "./config/server.config";
import systemMiddleware from "./middlewares/system.middlewares";
import db from "./db";
import routes from "./routes/index.route";
import { seedDatabase } from "./seed";

class Server {
  public app: Application;
  protected port: number;
  private corsOptions: cors.CorsOptions;

  constructor() {
    this.app = express();
    this.port =
      serverConfig.NODE_ENV === "test"
        ? 3236
        : Number(serverConfig.PORT) || 3003;
    this.corsOptions = {
      origin: serverConfig.ALLOWED_ORIGINS
        ? serverConfig.ALLOWED_ORIGINS.split(",")
        : [],
    };
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await this.initializeDb();
      await this.seedData();
      this.initializeMiddlewares();
      this.initializeRoutes();
      this.initializeErrorHandling();
    } catch (error) {
      console.error("Failed to initialize the server:", error);
    }
  }

  private async initializeDb(): Promise<void> {
    await db.sync();
    console.log("✅ Database connected successfully");
  }

  private async seedData(): Promise<void> {
    await seedDatabase();
  }

  private initializeMiddlewares(): void {
    this.app.use(compression());
    this.app.use(
      cors({
        origin: "*", // Allow any origin
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    if (
      ["development", "staging", "production"].includes(serverConfig.NODE_ENV)
    ) {
      this.app.use(morgan("dev"));
    }
  }

  private initializeRoutes(): void {
    this.app.use(routes);
  }

  private initializeErrorHandling(): void {
    this.app.use(systemMiddleware.errorHandler);
  }

  public start(): void {
    this.app.listen(this.port, () => {
      serverConfig.DEBUG(
        `🚀 Server running on http://localhost:${this.port} in ${serverConfig.NODE_ENV} mode.\nPress CTRL-C to stop.`
      );
    });
  }
}

const server = new Server();
server.start();

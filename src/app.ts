import express from "express";
import swaggerUi from "swagger-ui-express";

import { searchSongRouter } from "@src/routers/searchSong.router";
import { favoritesRouter } from "./routers/favorites.router";
import { swaggerDocument } from "./config/swagger";
import { NotFoundError } from "./utils/error/NotFoundError";
import { authRouter } from "./routers/auth.router";

const app = express();

app.use(express.json());
app.use("/search", searchSongRouter);
app.use("/favorite", favoritesRouter);
app.use("/auth", authRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("*", (req, res) => {
  return res.status(404).json(new NotFoundError("Unsupported API endpoint."));
});
export { app };

import "../utils/env.ts";
import app from "../app.ts";
import debug from "debug";

const log = debug("node_expr:server:bin");
const PORT = 3000;

const server = app.listen(PORT, () => log("Server started"));

server.on("error", (error: Error) => {
  log("Server error: ", error);
});
import express from "express";
import routes from "./config/routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 5101;
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'static/site'))); // Serve static files

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}.`);
});

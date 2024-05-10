import express from "express";
import routes from "./config/routes.js";
import cors from "cors";

const PORT = 5101;
const app = express();

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

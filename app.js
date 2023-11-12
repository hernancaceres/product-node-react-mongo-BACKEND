import { indexRoutes } from "./routes/index.routes.js";
import express from "express";
import { productRoutes } from "./routes/products.routes.js";
import "./database/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { createRoles } from "./initial.setup.js";
import {guardMiddleware} from "./middlewares/middlewares-guard.js"
import cors from "cors";

const app = express();
createRoles();

app.use(cors());
app.use(express.json());
app.use("/", indexRoutes);
app.use("/api/", productRoutes);
app.use("/api/", authRouter);


//servidor 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER corriendo en: http://localhost:${PORT}`);
});
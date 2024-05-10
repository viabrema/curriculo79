/**
 * @fileoverview Arquivo de rotas da aplicação, responsável por definir o roteamento dos endpoints da API.
 * @module routes
 */

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";
import AuthController from "../controllers/AuthController.js";
import UserController from "../controllers/UserController.js";
import ResumeController from "../controllers/ResumeController.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

/**
 * Rotas de Usuários
 */
router.get("/users", UserController.index);
router.post("/users", UserController.index);

/**
 * Rotas de Currículos
 */
router.post(
  "/api/resume",
  upload.single("pdf_file"),
  ResumeController.index
);

/**
 * Rotas de Autenticação
 */
router.post("/login", AuthController.login);

export default router;

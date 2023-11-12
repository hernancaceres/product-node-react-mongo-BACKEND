import { Router } from "express";
import { singup, signin,protect, getAllUsuarios} from "../controllers/auth.controller.js";
import { validarUsuario, manejarErroresValidacion, } from "../middlewares/user.validations.js";
import { verifyToken, isAdmin } from "../middlewares/auth.jwt.js";

export const authRouter = Router();

//SIGNUP REGISTRARCE
authRouter.post("/signup", validarUsuario, manejarErroresValidacion, verifyToken, singup);

//INICIAR SECION
authRouter.post("/signin", signin);

//RUTA PROTEGIDA
authRouter.get('/protected',verifyToken, protect, (req, res) => {
    res.json({ message: 'You have access to this route!' });
});

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);
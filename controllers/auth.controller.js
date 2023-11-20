import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config.js";
import Role from "../models/Role.js";

//BUSCAR TODOS LOS USUARIOS

export const getAllUsuarios = async (req, res) => {
  const usuarios = await User.find();
  res.json(usuarios);
};

//metodos de singup (para registrar un usuario) 

export const singup = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); //encriptamos la contraseña

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  //logica para los roles
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((rol) => rol._id);
  } else {
    const role = await Role.findOne({
      name: "user",
    });
    newUser.roles = [role._id];
  }
  const userValidated = await newUser.save();

  //ver los token

  const token = jwt.sign({ id: userValidated._id }, settingSecretToken().secret, { expiresIn: "1h", });
  res.status(200).json({ Message: "Usuario registrado con éxito", token });
};

//LOGIN  signin (para loguearse)
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    //VERIFICAMOS EL EMAIL
    if (!user)
      return res.status(400).json({ message: "El usuario no esta registrado" });

    const verifiedPassword = await User.comparePassword(password, user.password);
    
    //VERIFICAMOS EL PASSWORD
    if (!verifiedPassword) {
      return res
        .status(400)
        .json({ message: "Password incorrecto", token: null });
    } else {

      //generamos el token
      const token = jwt.sign({ id: user._id }, settingSecretToken().secret, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ message: "El Usuario ingreso con exito", token });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error en el inicio de sesión" });
  }
};

export const protect = async (req, res, next) => {
  try {
    return res
    .status(200)
    .json({ message: "ingreso correctamente" });
  } catch (error) {
    return res.status(400).json({ message: "Error en el inicio de sesión" });
  }
};


//ELIMINAR UN USUARIO
export const deleteUsuarioById = async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const deleteUsuario = await User.findByIdAndDelete(usuarioId);
    res.status(200).json({ message: "Usuario  eliminado" });
  }
  catch (error) {
    res.status(404).json({ message: "Error al eliminar un usuario" });
  }
};
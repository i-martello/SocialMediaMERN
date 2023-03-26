import UserSchema from '../models/users.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

let ctrlUser = {}


ctrlUser.signup = async (req, res) => {
  let mgs
  let state

  const { name, password } = req.body

  const User = await UserSchema.findOne({ name }) || false
  console.log(User)

  if (name.length < 5 || name.length > 20) {
    mgs = "El nombre tiene que tener entre 5 y 20 caracteres"
  } else if (password.length < 5 || password.length > 20) {
    mgs = "La contraseña tiene que tener entre 5 y 20 caracteres"
  } else if (User.name) {
    mgs = "El usuario ya esta en uso"
  }
  else {
    const newUser = new UserSchema({ name, password })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
  }

  res.status(200).json({ mgs, state });
}

ctrlUser.singin = async (req, res) => {
  const { name, password } = req.body
  const userValid = await UserSchema.findOne({ name });
  if (!userValid) {
    return res.json({ mensaje: 'El usuario no existe' });
  }
  const validPassword = await bcryptjs.compare(password, userValid.password);
  if (validPassword) {
    const { id, name } = UserSchema
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      name,
      role: "usuario"
    }, process.env.JWT_KEY);
    const serialized = serialize("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/"
    });
    try {
      res.setHeader('Set-Cookie', serialized);
      return res.status(200).cookie("token",token).json({success: "Inicio exitoso"});
    } catch (error) {
      return res.status(400).json({message: "Token invalido"});
    }
  } else {
    return res.json({ mensaje: "Contraseña incorrecta" })
  }
};

ctrlUser.validateJWT = async (req, res) => {
  const token = req.cookies.token;
  if(!token) return res.json({msg: "Acceso denegado"})
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY)
    return res.json({decodedToken})
  } catch (error) {
    console.log(error);
  }
}

ctrlUser.logout = async (req, res) => {
  const { token } = req.cookies
  if(!token) return res.json({msg: "Error, no estas logueado"})  
  
  const serialized = serialize("token", null, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
    path: "/"
  });

  res.setHeader("Set-Cookie", serialized);
  return res.status(200).json({success: "Cierre de sesión exitosa"})
}

export default ctrlUser
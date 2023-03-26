import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token
  console.log(token);
    const decoded =  await jwt.verify(token, process.env.JWT_KEY);
    if(decoded.iat){
      global.verifySession = decoded.iat;
      req.user = decoded;
      console.log(decoded);
      next();
    } else {
      console.log("error middleware")
    res.status(401).json({ error: "Token inválido" });
    }  
};

export default verifyToken;

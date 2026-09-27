import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtPrivateKey = process.env.JWT_SECRET

if (!jwtPrivateKey) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

interface AppJwtTokenContent {
  email: string;
  userId: number
  role: 'USER' | 'ADMIN'
}

const signToken = (payload: AppJwtTokenContent) => {
  return jwt.sign(payload, jwtPrivateKey, { issuer: "ehb", expiresIn: "1d" });
};

const verifyToken = (token:string):  AppJwtTokenContent => {
  return jwt.verify(token, jwtPrivateKey) as  AppJwtTokenContent

} 

export default  {signToken, verifyToken}

import express from "express";
import { getUser, logIn, signUp} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";
import { refreshToken } from "../middleware/refreshToken.js";

const userRouter = express.Router();


userRouter.post("/signup",signUp);
userRouter.post("/login",logIn);
userRouter.get("/user",verifyToken,getUser);
userRouter.get("/refresh",refreshToken,verifyToken,getUser);

export default userRouter;
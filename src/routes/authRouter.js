import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { validateSignInMiddleware } from "../middlewares/validateSignInMiddleware.js";
import { validateUserMiddleware } from "../middlewares/validateUserMiddleware.js";

const authRouter = Router();

authRouter.post("/auth/sign-up", validateUserMiddleware, signUp);
authRouter.post("/auth/sign-in", validateSignInMiddleware, signIn);

export default authRouter;

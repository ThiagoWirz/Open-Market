import { Router } from "express";
import authRouter from "./authRouter";
import categorieRouter from "./categorieRouter";
import productRouter from "./productRouter";

const router = Router();
router.use(authRouter);
router.use(productRouter);
router.use(categorieRouter);

export default router;

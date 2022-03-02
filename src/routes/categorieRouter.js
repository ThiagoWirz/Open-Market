import { Router } from "express";
import {
  deleteCategorie,
  getCategories,
  postCategorie,
  updateCategorie,
} from "../controllers/categorieController";

const categorieRouter = Router();

categorieRouter.post("/products", postCategorie);
categorieRouter.get("/products", getCategories);
categorieRouter.patch("/products/:idCategorie", updateCategorie);
categorieRouter.delete("/products/:idCategorie", deleteCategorie);

export default categorieRouter;

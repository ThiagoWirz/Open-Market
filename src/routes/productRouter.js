import { Router } from "express";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.post("/products", postProduct);
productRouter.get("/products", getProducts);
productRouter.patch("/products/:idProduct", updateProduct);
productRouter.delete("/products/:idProduct", deleteProduct);

export default productRouter;

import express from "express";
import apiController from "../controller/apiController";

let router = express.Router()
     
const initAPIRoute = (app)=> {
  // router.get("/get-acc", accountController.getAcc);
  // router.post("/create-acc", accountController.createAcc);
  // router.put("/update-acc", accountController.updateAcc);
  // router.delete("/delete-acc", accountController.deleteAcc);

  // router.get("/get-product", productController.getProduct);
  // router.post("/create-product", productController.createProduct);
  // router.put("/update-product", productController.updateProduct);
  // router.delete("/delete-product", productController.deleteProduct);
  // router.get("/get-group-product", productController.getProductByGroup);

  router.post("/auth/signin", apiController.signin);
  router.post("/auth/signup", apiController.signup);
  router.post("/create-user", apiController.createUser);

  return app.use("/api/v1/", router);
}

export default initAPIRoute;
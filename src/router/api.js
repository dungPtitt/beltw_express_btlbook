import express from "express";
import apiController from "../controller/apiController";
import bookController from "../controller/bookController";
import orderController from "../controller/orderController";
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
  router.post("/auth/changePassword", apiController.changePassword);
  router.post("/auth/forgotPassword", apiController.forgotPassword);

  router.post("/create-book", bookController.createBookApi);
  router.get("/get-book", bookController.getBookApi);
  router.get("/get-feedback", apiController.getFeedBack);
  router.post("/create-feedback", apiController.createFeedBack);

  router.get("/get-order", apiController.getOrder);
  router.post("/create-order", apiController.createOrder);
  router.put("/update-order", orderController.updateOrderApi);
  router.delete("/delete-order", apiController.deleteOrder);

  
  return app.use("/api/v1/", router);
}

export default initAPIRoute;
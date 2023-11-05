import express from "express";
import bookController from "../controller/bookController";
import userController from "../controller/userController";
import orderController from "../controller/orderController";
import authJwt from "../middleware/authJwt";

let router = express.Router()
     
const initAdminRoute = (app)=> {
  router.post("/create-book", bookController.createBookApi);
  router.get("/get-book", bookController.getBookApi);
  router.put("/update-book", bookController.updateBookApi);
  router.delete("/delete-book", bookController.deleteBookApi);
  //--------api user-----
  router.get("/get-user", userController.getUserApi);
  router.post("/create-user", userController.createUserApi);
  router.put("/update-user", userController.updateUserApi);
  router.delete("/delete-user", userController.deleteUserApi);

  //---------------api order--------------
  router.get("/get-order", orderController.getOrderApi);
  router.post("/create-order", orderController.createOrderApi);
  router.put("/update-order", orderController.updateOrderApi);
  router.delete("/delete-order", orderController.deleteOrderApi);

  return app.use("/api/v1/admin", [authJwt.verifyToken, authJwt.isAdmin], router);
}

export default initAdminRoute;
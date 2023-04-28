import express from "express";
import homeController from "../controller/homeController";
import bookController from "../controller/bookController";
import userController from "../controller/userController";
let router = express.Router()

const initWebRoute = (app)=> {
  router.get("/", homeController.getHomePage);
  // router.get("/get-student", homeController.getStudent);
  router.post("/create-book", bookController.createBook);
  router.get("/edit-add-book", bookController.getViewEditBook);
  router.post("/update-book", bookController.updateBook);
  router.get("/delete-book", bookController.deleteBook);

  router.get("/user/get-user", userController.getUser);
  router.post("/user/create-user", userController.createUser);
  router.get("/user/edit-add-user", userController.getViewEditUser);
  router.post("/user/update-user", userController.updateUser);
  router.get("/user/delete-user", userController.deleteUser);
  return app.use("/", router);
}

export default initWebRoute;
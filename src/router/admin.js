import express from "express";
import bookController from "../controller/bookController";
import authJwt from "../middleware/authJwt";

let router = express.Router()
     
const initAdminRoute = (app)=> {
  router.post("/create-book", bookController.createBookApi);
  router.get("/get-book", bookController.getBookApi);
  router.put("/update-book", bookController.updateBookApi);
  router.delete("/delete-book", bookController.deleteBookApi);

  return app.use("/api/v1/admin", [authJwt.verifyToken, authJwt.isAdmin], router);
}

export default initAdminRoute;
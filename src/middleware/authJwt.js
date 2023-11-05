import jwt from "jsonwebtoken";
import userService from "../service/userService";

let verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "No token provided!"
    });
  }

  jwt.verify(token, "mk", (err, decoded) => {
    if (err) {
      return res.status(200).json({
        errCode: 1,
        errMessage: "Unauthorized!"
      });
    }
    console.log(decoded);
    req.userId = decoded.id;
    next();
  });
};

let isAdmin = async(req, res, next) => {
  try{
    let response = await userService.checkIsAdmin(req.userId);
    if(response.errCode===0){
      next();
      return;
    }
    return res.status(200).json(response);
  }catch(e){
    return res.status(500).send({
      errCode: -1,
      errMessage: "Err from server!"
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin
  // isModerator: isModerator,
  // isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
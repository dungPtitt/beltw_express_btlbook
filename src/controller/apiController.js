import userService from "../service/userService";
import feedBackService from "../service/feedBackService";
import orderService from "../service/orderService";

let signin = async(req, res)=>{
  try{
    let data = req.body;
    let response = await userService.handleSignin(data.email, data.password);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let signup = async(req, res)=>{
  try{
    let data = req.body;
    let response = await userService.handleCreateUser(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let createUser = async(req, res)=>{
  try{
    let data = req.body;
    let response = await userService.handleCreateUser(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getFeedBack = async(req, res)=>{
  try{
    let idBook = req.query.idBook;
    let response = await feedBackService.handleGetFeedBack(idBook);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}
let createFeedBack = async(req, res)=>{
  try{
    let data = req.body;
    let response = await feedBackService.handleCreateFeedBack(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getOrder = async(req, res)=>{
  try{
    let idUser = req.query.idUser;
    let response = await orderService.handleGetOrder(idUser);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}


let createOrder = async(req, res)=>{
  try{
    let data = req.body;
    let response = await orderService.handleCreateOrder(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let deleteOrder = async(req, res)=>{
  try{
    let idOrder = req.query.id;
    let response = await orderService.handleDeleteOrder(idOrder);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}


module.exports = {
  signin,
  signup,
  createUser,
  getFeedBack,
  createFeedBack,
  getOrder,
  createOrder,
  deleteOrder
}
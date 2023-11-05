import orderService from "../service/orderService";

//----------------api-------------
let getOrderApi = async(req, res)=>{
  try{
    let idOrder = req.query.id;
    let response = await orderService.handleGetOrder(idOrder);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}

let createOrderApi = async(req, res)=>{
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

let updateOrderApi = async(req, res)=>{
  try{
    let data = req.body;
    let response = await orderService.handleUpdateOrder(data);
    return res.status(200).json(response);
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let deleteOrderApi = async(req, res)=>{
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
  // api
  createOrderApi,
  getOrderApi,
  updateOrderApi,
  deleteOrderApi
}
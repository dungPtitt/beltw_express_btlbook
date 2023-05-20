import db from "../models/index";

let handleGetOrder = (idUser)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idUser){
        return resolve({
          errCode: 1,
          errMessage: "Missing idUser input!"
        })
      }
      let orders="";
      if(idUser){
        orders = await db.Bill.findAll({
          where: {idUser: idUser},
          raw: true
        });
        return resolve({
          errCode: 0,
          message: "Get all FeedBack successfully!",
          data: orders
        })
      }
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateOrder = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.idUser || !data.arrIdBook ||!data.arrQuantity ||!data.totalMoney){
        return resolve({
          errCode:1,
          errMessage: "Missing input data!"
        })
      }
      
      await db.Bill.create({
        idUser: data.idUser,
        arrIdBook: data.arrIdBook,
        arrQuantity: data.arrQuantity,
        totalMoney: data.totalMoney,
        status: data.status
      })
      resolve({
        errCode: 0,
        message: "Create order successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteOrder = (idOrder)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idOrder){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let order = await db.Bill.findOne({
        where: {id: idOrder},
        raw: false
      })
      if(!order){
        return resolve({
          errCode: 2,
          errMessage: "book not found!"
        })
      }
      await order.destroy();
      return resolve({
        errCode:0,
        message: "Delete book successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetOrder,
  handleCreateOrder,
  handleDeleteOrder
}
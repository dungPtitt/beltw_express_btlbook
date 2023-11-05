import db from "../models/index";
import emailService from "./emailService";

let handleGetOrder = (idUser)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      
      let orders="";
      if(idUser){
        orders = await db.Bill.findAll({
          where: {idUser: idUser},
          raw: true
        });
        
      }else {
        orders = await db.Bill.findAll();
      }
      return resolve({
        errCode: 0,
        message: "Get all Order successfully!",
        data: orders
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateOrder = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.idUser || !data.arrIdBook ||!data.arrQuantity ||!data.totalMoney || !data.name||!data.email||!data.address){
        return resolve({
          errCode:1,
          errMessage: "Missing input data!"
        })
      }
      let product = await db.Book.findOne({
        where: {id: data.arrIdBook},
        raw: false
      })
      if(!product) {
        return resolve({
          errCode:2,
          errMessage: "Product not found!"
        })
      }
      if(data.quantitySold> product.quantitySold){
        return resolve({
          errCode:3,
          errMessage: "Quantity not enough!"
        })
      }
      product.quantitySold -= Number(data.arrQuantity);
      await product.save();
      await db.Bill.create({
        idUser: data.idUser,
        arrIdBook: data.arrIdBook,
        arrQuantity: data.arrQuantity,
        totalMoney: data.totalMoney,
        status: data.status,
        name: data.name,
        email: data.email,
        address: data.address
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

let handleUpdateOrder = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let order = await db.Bill.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!order) {
        resolve({
          errCode: 2,
          errMessage: "Order not found!"
        })
      }
      if(data.status==0){
       
        let product = await db.Book.findOne({
          where: {id: data.arrIdBook},
          raw: false
        })
        if(!product) {
          return resolve({
            errCode:3,
            errMessage: "Product not found!"
          })
        }
        product.quantitySold += Number(data.arrQuantity);
        await product.save();
      }
      if(data.status==2){
        await emailService.sendOrderSuccess(data);
      }
      order.idUser = data.idUser
      order.arrIdBook = data.arrIdBook;
      order.arrQuantity = data.arrQuantity;
      order.totalMoney = data.totalMoney
      order.status = data.status;
      await order.save();
      resolve({
        errCode: 0,
        message: "Update Order Successfully!",
      })
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
  handleDeleteOrder,
  handleUpdateOrder
}
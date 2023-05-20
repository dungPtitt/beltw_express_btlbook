import db from "../models/index";

let handleGetFeedBack = (idBook)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idBook){
        return resolve({
          errCode: 1,
          errMessage: "Missing idBook input!"
        })
      }
      let feedbacks="";
      if(idBook){
        feedbacks = await db.Feedback.findAll({
          where: {idBook: idBook},
          raw: true
        });
        return resolve({
          errCode: 0,
          message: "Get all FeedBack successfully!",
          data: feedbacks
        })
      }
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateFeedBack= async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.idUser || !data.idBook ||!data.starRate ||!data.comment){
        return resolve({
          errCode:1,
          errMessage: "Missing input data!"
        })
      }
      let feedback = await db.Feedback.findOne({
        where: {comment: data.comment, idUser: data.idUser},
        raw: true
      })
      if(feedback){
        return resolve({
          errCode: 2, 
          errMessage: "Comment da ton tai!"
        })
      }
      await db.Feedback.create({
        idUser: data.idUser,
        idBook: data.idBook,
        starRate: data.starRate,
        comment: data.comment
      })
      resolve({
        errCode: 0,
        message: "Create FeedBack successfully!"
      });
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateFeedBack = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let feedback = await db.FeedBack.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!feedback) {
        resolve({
          errCode: 2,
          errMessage: "FeedBack not found!"
        })
      }
      // ten va cac thuoc tinh kiem tra co su thay doi thi moi can kiem tra them
      if(!(feedback.title==data.title && feedback.author==data.author)){
        let checkFeedBack = await db.FeedBack.findOne({
          where: {title: data.title, author: data.author},
          raw: true
        })
        if(checkFeedBack){
          return resolve({
            errCode: 5,
            errMessage: "Title and author of feedback đã có trong database.Vui lòng thư lại!"
          })
        }
      }
      feedback.title = data.title
      feedback.author = data.author;
      feedback.category = data.category;
      feedback.dateRelease = data.dateRelease
      feedback.quantitySold = data.quantitySold;
      feedback.numberPage = data.numberPage;
      feedback.image = data.image?data.image:"";
      feedback.price = data.price;
      feedback.des = data.des;
      await feedback.save();
      resolve({
        errCode: 0,
        message: "Update FeedBack Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteFeedBack = (idFeedBack)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idFeedBack){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let feedback = await db.FeedBack.findOne({
        where: {id: idFeedBack},
        raw: false
      })
      if(!feedback){
        return resolve({
          errCode: 2,
          errMessage: "feedback not found!"
        })
      }
      await feedback.destroy();
      return resolve({
        errCode:0,
        message: "Delete feedback successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetFeedBack,
  handleCreateFeedBack,
  handleUpdateFeedBack,
  handleDeleteFeedBack
}
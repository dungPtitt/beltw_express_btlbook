import db from "../models/index";
import bcrypt from 'bcryptjs';
let salt = bcrypt.genSaltSync(10);
import jwt from "jsonwebtoken";

let handleSignin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkEmail(email);
      // neu ton tai email thi check password
      if(!isExist){
        resolve({
          errCode: 1,
          errMessage: "Your email not exit. Please try again!"
        })
      }
      let acc = await db.User.findOne({
        where: { email: email },
        raw: true
      })
      if(!acc){
        resolve({
          errCode: 1,
          errMessage: "User not exist in db!"
        })
      }
      let check = await bcrypt.compare(password, acc.password);
      if(!check){
        return resolve({
          errCode: 2,
          errMessage: "Wrong password!"
        })
      }
      delete acc.password;
      let token = jwt.sign({ id: acc.id }, 'mk', {expiresIn: 86400});//24 gio
      acc.accessToken = token;
      resolve({
        errCode: 0,
        message: "Login successfully!",
        data: acc
      });
    } catch (e) {
      reject(e)
    }
  })
}

let checkEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await db.User.findOne({
        where: { email: userEmail }
      })
      if(user) {
        resolve(true)
      }
      else {
        resolve(false)
      }
    }catch(e) {
      reject(e)
    }
  })
}

let handleSignup = async()=>{

}

let checkUserExist = (userName, userEmail) => {
  return new Promise(async (resolve, reject) => {
    try{
      let user = await db.User.findOne({
        where: { name: userName, email: userEmail}
      })
      if(user) {
        resolve(true);
      }
      else {
        resolve(false);
      }
    }catch(e) {
      reject(e)
    }
  })
}

let checkIsAdmin = (userId)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      let user = await db.User.findByPk(userId);
      if(!user){
        return resolve({
          errCode: 1,
          errMessage: "User not found!"
        })
      }
      if(user.idAuth!==3){
        return resolve({
          errCode: 2,
          errMessage: "Require Admin Role!"
        })
      }
      return resolve({
        errCode: 0,
        message: "Welcome admin"
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleGetUser = (idUser)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idUser){
        let users = await db.User.findAll();
        resolve({
          errCode: 0,
          message: "Get all User successfully!",
          data: users
        })
      }
      let user = await db.User.findOne({
        where: {id: idUser},
        raw: true
      });
      if(!user){
        resolve({
          errCode: 2,
          message: "User not exist",
        })
      }
      resolve({
        errCode: 0,
        message: "Get User successfully!",
        data: user
      })
    }catch(e){
      reject(e);
    }
  })
}

let handleCreateUser= async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!data.name || !data.email || !data.password){
        return resolve({
          errCode:1,
          errMessage: "Missing input value!"
        })
      }
      let user = await db.User.findOne({
        where: {name: data.name, email: data.email},
        raw: true
      })
      if(user){
        return resolve({
          errCode: 2, 
          errMessage: "Name and email of user đã có trong database.Vui lòng thư lại!"
        })
      }
      let passwordHash = await hashUserPassword(data.password);
      await db.User.create({
        idAuth: data.idAuth? data.idAuth: 1,
        name: data.name,
        email: data.email,
        password: passwordHash
      })
      resolve({
        errCode: 0,
        message: "Create User successfully!",
      });
    } catch (e) {
      reject(e)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword)
    } catch (e) {
      reject(e)
    }
  })
}

let handleUpdateUser = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing input parameter"
        })
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false
      })
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "User not found!"
        })
      }
      // ten va cac thuoc tinh kiem tra co su thay doi thi moi can kiem tra them
      if(!(user.name==data.name && user.email==data.email)){
        let checkUser = await db.User.findOne({
          where: {name: data.name, email: data.email},
          raw: true
        })
        if(checkUser){
          return resolve({
            errCode: 5,
            errMessage: "Title and author of user đã có trong database.Vui lòng thư lại!"
          })
        }
      }
      user.name = data.name
      user.email = data.email;
      user.password = data.password;
      await user.save();
      resolve({
        errCode: 0,
        message: "Update User Successfully!",
      })
    } catch (e) {
      reject(e)
    }
  })
}

let handleDeleteUser = (idUser)=>{
  return new Promise(async(resolve, reject)=>{
    try{
      if(!idUser){
        return resolve({
          errCode: 1,
          errMessage: "Missing input parameter!"
        })
      }
      let user = await db.User.findOne({
        where: {id: idUser},
        raw: false
      })
      if(!user){
        return resolve({
          errCode: 2,
          errMessage: "user not found!"
        })
      }
      await user.destroy();
      return resolve({
        errCode:0,
        message: "Delete user successfully!",
      })
    }catch(e){
      reject(e);
    }
  })
}

module.exports = {
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,

  //authority
  handleSignin,
  handleSignup,
  checkIsAdmin,
}
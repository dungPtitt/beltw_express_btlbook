import userService from "../service/userService";

let createUser = async(req, res)=>{
  try{
    let data = req.body;
    let response = await userService.handleCreateUser(data);
    if(response.errCode==0){
      return res.redirect("/user/get-user");
    }
    return res.render("errPage", {errMessage: response.errMessage});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

let getUser = async(req, res)=>{
  try{
    let idUser = req.query.id;
    let response = await userService.handleGetUser(idUser);
    return res.render("user/users.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}
let getViewEditUser = async(req, res)=>{
  try{
    let idUser = req.query.id;
    let data = "";
    if(idUser!=-1){
      let response = await userService.handleGetUser(idUser);
      data = response.data;
    }else {
      data = {
        name: "",
        email: "",
        password: ""
      }
    }
    return res.render("user/editAndAddUser.ejs", {data: data, idUser: idUser});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateUser = async(req, res)=>{
  try{
    let data = req.body;
    let response = await userService.handleUpdateUser(data);
    if(response.errCode==0){
      return res.redirect("/user/get-user");
    }
    return res.render("errPage", {errMessage: response.errMessage});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}
let deleteUser = async(req, res)=>{
  try{
    let idUser = req.query.id;
    let response = await userService.handleDeleteUser(idUser);
    if(response.errCode==0){
      res.redirect("/user/get-user");
    }
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Err from server!"
    })
  }
}

module.exports = {
  createUser,
  getUser,
  getViewEditUser,
  updateUser,
  deleteUser
}
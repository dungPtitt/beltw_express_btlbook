import userService from "../service/userService";

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
    let response = await accountService.handleSignup(data);
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


module.exports = {
  signin,
  signup,
  createUser,
}
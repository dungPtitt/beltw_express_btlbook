import bookService from "../service/BookService";

let createBook = async(req, res)=>{
  try{
    let data = req.body;
    let response = await bookService.handleCreateBook(data);
    if(response.errCode==0){
      return res.redirect("/");
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

let getBook = async(req, res)=>{
  try{
    let idBook = req.query.id;
    let response = await bookService.handleGetBook(idBook);
    console.log(response);
    return res.render("book/books.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
  
}
let getViewEditBook = async(req, res)=>{
  try{
    let idBook = req.query.id;
    let data = "";
    if(idBook!=-1){
      let response = await bookService.handleGetBook(idBook);
      data = response.data;
    }else {
      data = {
        name: "",
        price: "",
        brand: "",
        sold: "1",
        dateManufacture: ""
      }
    }
    return res.render("book/editAndAdd.ejs", {data: data, idBook: idBook});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

let updateBook = async(req, res)=>{
  try{
    let data = req.body;
    let response = await bookService.handleUpdateBook(data);
    if(response.errCode==0){
      return res.redirect("/");
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
let deleteBook = async(req, res)=>{
  try{
    let idBook = req.query.id;
    let response = await bookService.handleDeleteBook(idBook);
    if(response.errCode==0){
      res.redirect("/");
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
  createBook,
  getBook,
  getViewEditBook,
  updateBook,
  deleteBook
}
import bookService from "../service/bookService";

let getHomePage = async(req, res)=>{
  try{
    let response = await bookService.handleGetBook();
    return res.render("book/books.ejs", {data: response.data});
  }catch(e){
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from server!"
    })
  }
}

module.exports = {
  getHomePage
}
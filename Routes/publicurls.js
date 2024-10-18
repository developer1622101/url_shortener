const { publicurlModel , urlModel } = require("../db");  

const {Router }  = require("express") ; 

const publicurlRoutes  = new Router()  ; 

publicurlRoutes.get("/:id" , async (req,res ) => {

    try { 

    const tiny_url = req.params.id ;  
    console.log(tiny_url) ;  

    const tiny_url_ = '/tiny_url/' + tiny_url  

    console.log(tiny_url_) ;
    
    const url_record =  await publicurlModel.findOne({ tiny_url : tiny_url_ })  ; 
     
    if( !url_record) { 
      return  res.json({msg :"no such tiny url exists" }) ; 
    } 
     
    const personal_url_record = await urlModel.findOne({ tiny_url  :tiny_url_ }) ;  

    console.log(personal_url_record) ; 
    
    

    personal_url_record.no_of_clicks = personal_url_record.no_of_clicks + 1  ; 

    const full_url = url_record.url ; 

    res.redirect(full_url) ; 

} 
    catch(e){  
        console.log(e)  ; 
        res.json( {msg : "internal server error" } )     
    } 
} ) 

module.exports = { publicurlRoutes : publicurlRoutes  }  
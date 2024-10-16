const {Router} = require("express") ; 
const {userMiddleware} = require("../Middlewares/user") ; 
const {urlModel} = require("../db") ; 


const urlRouter =  Router() ; 

urlRouter.post("/url" ,  userMiddleware ,  (req,res) => { 
    
    const { url } = req.body ;   

    const res  = fetch("url") ; 

    if(!res) { 
    res.send("invalid url exist") ; 
    }
 
      



     
     

    

} ) 







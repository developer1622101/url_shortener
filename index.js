// this is the main entry point of my backend  

const express = require("express")  ;
const mongoose = require("mongoose") ;  
const cors   = require("cors") ; 

const {userRoutes } = require("./Routes/user") ; 

const app = express() ;  

app.use(cors()) ; 

app.use(express.json()) ;  

app.use("/user" , userRoutes) ;  


const main  = async () => { 

try  {    
    console.log("connecting") ; 
   await mongoose.connect("mongodb://127.0.0.1:27017/url_shortener") ;  
    app.listen(3000)  ;  
    console.log("connected") ; 
} 

catch(e) { 
    console.log(e) ;  
}
} 

main() ; 


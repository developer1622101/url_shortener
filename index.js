// this is the main entry point of my backend  

const express = require("express")  ;
const mongoose = require("mongoose") ;  
const cors   = require("cors") ; 

const {userRoutes  } = require("./Routes/user") ;  
const {urlRouter  } = require("./Routes/urls") ;  
const { publicurlRoutes  } = require("./Routes/publicurls") ;  


const app = express() ;  

app.use(cors()) ; 

app.use(express.json()) ;  

app.use("/auth" , userRoutes) ; 

app.use("/user" ,  urlRouter ) ; 
app.use("/tiny_url" ,  publicurlRoutes) ; 


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
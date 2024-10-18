const express = require("express") ; 
const cors = require("cors")  ; 
const app = express() ; 

app.use(cors()) ;   

app.get("/user" ,(req,res) => { 
     res.send("hi")
}) 
app.get("/user/data" , (req, res) =>  { 

   const params = req.params ; 
     
    console.log(params )
} )   

app.listen(3000)  ;     
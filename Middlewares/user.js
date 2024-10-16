const jwt = require("jsonwebtoken"); 

const jwt_secret = 'asddfgh' ;


const userMiddleware =  (  req,res , next ) => {   

    const token = localStorage.getItem('token')  ; 
     const verified  =  jwt.verify(token, jwt_secret) ;  

     if(verified) { 
        next() ; 
     } 

     else { 
        res.send("u are not logged in") ; 
     }
} 

module.exports = { userMiddleware : userMiddleware}  ; 




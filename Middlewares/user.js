const jwt = require("jsonwebtoken"); 

const jwt_secret = 'asdfgh' ;


const userMiddleware =  (  req,res , next ) => {   

   try {  
    
      const token  = req.headers.authorization.split(" ")[1] ;    
      console.log(token) ; 
      

    if(!token) { 
      return res.json( { msg : "token is required .. u are not logged in." }  )
    }
     const decoded   =  jwt.verify(token, jwt_secret) ; 
     
     if(decoded) {    
        req.body.email = decoded.email  ;  // once authorised  ,  I will send the email of the user to the upcoming urls
        next() ;  
        
     }   

     else { 
        res.send("u are not logged in") ; 
     } } 

     catch(e) { 
      console.log(e) ; 
      res.json({msg : "UNAUTHORISED ACCESS" } ) ;   
     }
} 

module.exports = { userMiddleware : userMiddleware}  ; 




// the request details sent to the middleware are accessible by the further routes down the url 
// any modifications that u make in the 'request details' will be accessed by the next routes


// another doubt is regarding tokens 
// signing of tokens  ,  const token = jwt.sign(payload  , jwt_Secret ) ;  

// when u verify the tokens  , jwt.verify(token , jwt_secret ) ;  u get the payload which u used to sign the token 
// if verification fails , then jwt.verify --> throws an error  

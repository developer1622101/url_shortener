const {Router} = require("express") ;  
const {userModel , urlModel} = require("../db") ;
const  mongoose = require("mongoose") ; 
const bcrypt = require("bcrypt") ; 
const jwt = require("jsonwebtoken") ;  



const jwt_secret   = "asdfgh" ; 

userRoutes = Router() ; 

userRoutes.post("/signup" , async (req,res) => {   
     

    try  {
    const {email,password} = req.body ;  

    const userExists = await  userModel.findOne({ email  }   )  ;
    
    if(userExists)  { 
     return  res.json({ msg : "user already exists" })
    }  


    const salt   =  bcrypt.genSaltSync() ; 

    const hashedPassword  = bcrypt.hashSync(  password , salt )  ; 
    
     await userModel.create( { 
        email :email , 
        password : hashedPassword  
    })    
    res.json( { msg  :" user signed up successfully"})   
} 
catch(e) { 
    console.log(e)  ; 
    res.send("internal server error") ;  
}  
} ) 

userRoutes.post("/signin" , async (req,  res) => {  

    try { 
  const { email,password } = req.body ; 
  
  const user =  await userModel.findOne({email}) ; 
  if(!user) { 
    return res.json( { msg : "user doesnt exist"})
  }    

  const correctPassword = user.password ;  

  const check =  bcrypt.compareSync( password,correctPassword  ) ; 

  if(!check) {
    return res.json({msg : "incorrect password"}) 
  } 

  const token =  jwt.sign( { email :  user.email  } , jwt_secret  )  ;   

  res.json( { msg : "user logged in successfully"  , token : token }   ); 
}  catch(e) { 
    res.send("internal server error") ; 
    console.log(e)  ; 
}  } ) 


module.exports = { userRoutes : userRoutes} 




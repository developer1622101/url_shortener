const {Schema ,  Types , model } = require("mongoose") 



const userScehma = new Schema(  {  
    email : {type :String , unique :true   } ,
    password : String , 
} ) 

const urlSchema = new Schema ( { 
    url : String , 
    tiny_url : String  , 
    no_of_clicks : Number , 
    userId : {type : Types.ObjectId  ,  ref  : "user"}
}) 


const userModel = model("user" ,  userScehma ) ; 
const urlModel  = model("urls" ,  urlSchema ) ; 

module.exports = ( 
    {userModel , urlModel}
)


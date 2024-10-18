const {Schema ,  Types , model } = require("mongoose") 



const userScehma = new Schema(  {  
    email : {type :String , unique :true   } ,
    password : String , 
} ) 

const urlSchema = new Schema ( { 
    url : { type:  String , unique : true } ,  
    tiny_url : String  , 
    no_of_clicks : Number , 
    userId : {type : Types.ObjectId  ,  ref  : "user"} 
})  

const publicurlSchema =  new Schema( { 
 url : { type :  String  , unique : true  }  ,  
 tiny_url : String    
})


const userModel = model("user" ,  userScehma ) ; 
const urlModel  = model("urls" ,  urlSchema ) ;  
const publicurlModel = model("publicurls" , publicurlSchema) ; 
module.exports = ( 
    {userModel , urlModel , publicurlModel} 
 )
 



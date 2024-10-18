const express = require("express");
const crypto = require("crypto");
const fetch = require("node-fetch"); // Install this package or use axios
const { userMiddleware } = require("../Middlewares/user");
const { userModel, urlModel, publicurlModel } = require("../db");

const urlRouter = express.Router();

urlRouter.post("/create-new", userMiddleware, async (req, res) => {
  try {
    const { url } = req.body;

    
    try {
      const fetchRes = await fetch(url);  // fetchRes is an  object  
      if (!fetchRes.ok) {
        return res.status(400).json({ msg: "Invalid URL" });
      }
    } catch (e) {
      return res.status(400).json({ msg: "Invalid URL" });
    }

    const hashObject = crypto.createHash("sha256");
    const tiny_url = hashObject.update(url).digest("hex").slice(0, 8);

   
    const email = req.body.email;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user_id = user._id;

    
    await urlModel.create({
      url,
      tiny_url: `/tiny_url/${tiny_url}`,
      userId: user_id,
      no_of_clicks : 0 , 
    });

    await publicurlModel.create({
       url,
      tiny_url: `/tiny_url/${tiny_url}`,
    });

    res.json({ msg: "Tiny URL created successfully", tiny_url: `/tiny_url/${tiny_url}` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = { urlRouter };
 
  urlRouter.get("/my_urls" , userMiddleware ,  async ( req,res)  => {  

    const email = req.body.email ; 
    console.log(email) ; 
     
    const user = await userModel.findOne({email:email })   ; 
    console.log(user)  ;   
     
    
    const user_id = user._id ; 
    

    const urls = await urlModel.find( { userId : user_id }) ;  

    console.log(urls) 
     

    res.json ({ urls : urls }  ) ;   
}   
) 

module.exports = { urlRouter : urlRouter} ; 

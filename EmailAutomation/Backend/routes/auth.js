const router = require("express").Router();
const passport = require("passport");

router.get ("/signin/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Log in failure",
    });
});



router.get("/signin/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfully Logged In",
            user:req.user,
        });
    }else{
        res.status(403).json({error:true,message:"Invalid User"});
    }
})


router.get("/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("http://localhost:5173/signin");
});

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:5173/",
    failureRedirect:"http://localhost:5173/signin",
}));

module.exports = router;

import { Router } from "express";

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    return res.json({msg:"user router helloo"});
})

export default userRouter;
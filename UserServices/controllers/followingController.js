import Base from "../models/Base";
import constants from "../utils/constants";

const followingUser = async (req,res)=>{

    try {
        const user = req.user;

    const SecondUser = req.body.id;
    // if user is alredy follow that person
    if(user.following.contains(SecondUser))
    {
        return res.status(401).json({
            success:false,
            message:constants.USER_ALREDY_FOLLOWING
        })
    }

    const ExistSeconsUser = await Base.findById(SecondUser);
    // check secondUser exist or not
    if(!ExistSeconsUser)
    {
        return res.status(401).json({
            success:false,
            message:constants.USER_NOT_FOUND
        })
    }

    const updatedUser = await Base.findByIdAndUpdate(user._id,{
        $push:{
            following:SecondUser
        }
    },{
        new:true
    })
    
    const updatedSecondUser = await Base.findByIdAndUpdate(SecondUser,{
        $push:{
            followers:user._id
        }
    })

    return res.status(200).json({
        success:true,
        message:constants.FOLLOWING_SUCCESSFULL,
        updatedUser
    })

    } catch (error) {
        return res.status(401).json({
            success:false,
            message:constants.FOLLOWING_UNSUCCESSFULL,
            
        })    
    }

}

export {followingUser};
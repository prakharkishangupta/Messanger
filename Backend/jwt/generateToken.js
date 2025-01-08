import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECURITY_KEY, {expiresIn:"5d"});
    res.cookie("jwt", token, {
             httpOnly: true, //saves from xss attack
             secure:false,
             sameSite:"strict" //saves fron csrf attack
        });
    
};

export default createTokenAndSaveCookie;

// {
//     httpOnly: true, //saves from xss attack
//     secure:false,
//     sameSite:"strict" //saves fron csrf attack
// }
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
export const authMiddleware = async (req, res, next) => {
    
    try {
        const token = await req.cookies.jwt;
        console.log("token: ", token);
        if (!token) {
            console.log("unauthorized");
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECURITY_KEY);
        req.user = decoded; // Attach the user's ID (or other payload data) to req.user
        next();
    } catch (err) {
        console.log("invalid token");
        res.status(403).json({ message: "Invalid token" });
    }
};

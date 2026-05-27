import jwt from "jsonwebtoken"

export async function accessTokenChecker(req, res, next) {

    const token = req.cookies?.accessToken

    if(!token){
        return res.status(401).json({message: "Token Expired"})
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded //attaching the user data to request

        next()
        
    }
    catch(err){
        console.log("Token Checker Error", err)
        return res.status(500).json({message: "Token Checker Internal Server Error"})
    }
    
}
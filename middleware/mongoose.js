import mongoose from "mongoose";

const errorHandler = handler => async (req, res)=>{
      try {
        await handler(req, res);
      } catch (error) {
        console.error("Error caught by middleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    };




const connectDb = handler => async (req, res)=>{
    if(mongoose.connections[0].readystate){
        return  errorHandler(handler(req,res))
    }
        await mongoose.connect(process.env.MONGOURL)
        return errorHandler(handler(req,res))
}
export default connectDb;
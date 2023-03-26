import {config} from 'dotenv'
import connectDB from 'mongoose'
config()


connectDB.set('strictQuery', false);

(async ()=>{
  await connectDB.connect(process.env.MONGO_URI)

console.log("base de datos")
})();


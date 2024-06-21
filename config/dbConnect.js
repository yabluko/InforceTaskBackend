import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected To DB')
    } catch (err) {
        console.error(err)
    }
}


export default connectDB
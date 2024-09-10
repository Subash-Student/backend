import mongoose from"mongoose";


const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://subashmurugan2021:SubashBanu2020$@cluster0.n526n.mongodb.net/?").then(()=>{
        console.log("DB connected");
    }).catch(e=>{console.log(e)});
}
export default connectDB;












//mongodb+srv://subashmurugan2021:SubashBanu2020$@cluster0.n526n.mongodb.net/?
//mongodb+srv://subashmurugan2021:SubashBanu2020$@cluster0.n526n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
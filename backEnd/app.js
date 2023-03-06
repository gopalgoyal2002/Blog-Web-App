// #db config
const mongoose=require("mongoose")
require("dotenv").config();

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log("DB connected")
}).catch(()=>{
    console.log("DB not Connected")
});

const express=require('express')
const app=express()

const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
// cors({origin:"http:localhost:3000", credentials:true})
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// import the routes
const userRoutes= require("./routes/user")
const blogRoutes= require("./routes/blog")


//using routes
app.use('/api',userRoutes)
app.use('/api',blogRoutes)


app.get("/", (req, res) => {
    res.json("welcome");
});



const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`App is running at ${port}`)
})


// module.exports= app



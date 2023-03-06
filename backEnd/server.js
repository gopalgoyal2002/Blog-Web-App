const http=require('http')
require("dotenv").config();

const port=process.env.PORT || 8000;
const app=require("./index")

var httpServer=http.createServer(app);

const server=   httpServer.listen(port,()=>{
        console.log(`App is running at ${port}`)
    })
    
    
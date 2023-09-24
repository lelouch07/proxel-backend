const express =require('express');
const bodyParser=require('body-parser');
const app=express();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
import authRouter from './Routes/server';
import  createUserTable  from './models/user';




app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth',authRouter);







// User table created with key params USERID , EMAILID
// createUserTable.then(()=>{
//     console.log("User Table Created Successfully");
// })

app.get('/',(req,res)=>{
    console.log("req received",Date.now());
    res.status(200);
})

console.log("hello");

// const Port=process.env.port;
app.listen(3030,()=>{
        
    console.log(`listening on port`);
}
)
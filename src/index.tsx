// require('dotenv').config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
import authRouter from './Routes/auth';
import createUserTable from './models/user';
import profileRouter from './Routes/profile'
import cookieParser from 'cookie-parser';




app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);





// // User table created with key params USERID , EMAILID
// createUserTable.then(()=>{
//     console.log("User Table Created Successfully");
// }).catch(()=>{
//     console.log("User Table Already exists")
// })


// const Port=process.env.port;
app.listen(3030, () => {

    console.log(`listening on port ${3030}`);
}
)



// bun --hot src/index.tsx
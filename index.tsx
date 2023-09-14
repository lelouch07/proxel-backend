const express =require('express');
const app=express();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;

import  createUserTable  from './models/user';




app.use(express.json());

// createUserTable.then(()=>{
//     console.log("User Table Created Successfully");
// })




const port=4000;
app.listen(port,()=>{
        
    console.log(`listening on port ${port}`);
}
)
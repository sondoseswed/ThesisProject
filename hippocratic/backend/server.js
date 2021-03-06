const express = require ('express');
const mongoose = require('mongoose');
const cors = require ('cors');

require('dotenv').config();


//SetUp express
const app = express();
app.use(express.json());
app.use(cors());

//set up routes
app.use('/users',require("./routes/userRouter"))
app.use('/infos', require("./routes/infosRouter"))
app.use('/appointments', require("./routes/appointmentRouter"))



const PORT = process.env.PORT || 3000;

//StartUp the server
app.listen(PORT, ()=> {
    console.log(`Server is running on port :${PORT}`);
})

//Setup mongoose
mongoose.connect(process.env.MONGODB_CONNRCTION_STRING, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}, (err) => {
    if(err) throw err;
    console.log("MongoDB connection established")
});


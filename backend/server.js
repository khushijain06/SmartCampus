const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express()
app.use(cors());
app.use(express.json())
app.use("/api/auth",require("./routes/auth"))
app.use("/api/student",require("./routes/student"))
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/results", require("./routes/result"));
app.use("/api/homework", require("./routes/homework"));
app.use("/api/subjects", require("./routes/subject"));
app.use("/api/timetable", require("./routes/timetable"));

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology :true
}).then(()=> console.log("Mongo connected"))
.catch(err => console.log(err));

//routes

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>console.log(`Server running on port ${PORT}`))
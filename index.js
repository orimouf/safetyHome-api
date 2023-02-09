const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const investorRoute = require("./routes/investors")
const packageRoute = require("./routes/packages")
const profitRoute = require("./routes/profits")
const listRoute = require("./routes/lists")

dotenv.config();

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("DB connection Successfull!"))
//     .catch((err) => console.log(err));
// }

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection Successfull!"))
    .catch((err) => console.log(err));

    const cors = require('cors');
    const corsOptions ={
        origin:'http://localhost:3000', 
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200
    }
    app.use(cors(corsOptions));
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/investors", investorRoute)
app.use("/api/packages", packageRoute)
app.use("/api/profits", profitRoute)
app.use("/api/lists", listRoute)


app.listen(8800, () => {
    console.log("Backend server is running!");
})

const express = require('express');
const userroute = require('./routes/UserRoute');
const adminroute = require('./routes/AdminRoute')
const courseroute = require('./routes/CourseRoute');
const connectDb = require('./db');

const env = require('dotenv');
const cors = require('cors')
env.config();

const app = express();
const port = process.env.PORT || 4000;





app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use('/user', userroute);
app.use('/admin', adminroute)
app.use('/course', courseroute)


// connectDB().then(() => {
//     app.listen(port, () => {
//         console.log(`server is running on ${port}`);
//     });
// });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDb();
  });


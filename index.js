import express from 'express';                                    //  thư viện sử lý http, router.       
import {ServerApiVersion} from 'mongodb';                         //  thư viện mongodb atlat mới.
import bodyParser from 'body-parser';                             //  xỷ lý JSON, text và mã hóa URL.
import cors from 'cors';                                          //  cho phép các client truy cập api.
import mongoose from 'mongoose';                                  //  thư viện mongoose
import posts from './router/posts.js';
import auths from './router/auths.js';
import dotenv from 'dotenv';
// 
dotenv.config();
const app = express();                                            // khởi tạo app bằng thư viện express.
const PORT = process.env.PORT;                            // cấu hình PORT chạy trên cổng 5000 nếu không có giá trị từ .env

app.use(bodyParser.json({limit: '30mb'}));                        // phân tích data , giới hạn lượng data gửi đi , lấy data từ form ,...
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));  // chuyển đổi data thành json.
app.use(cors());                                                  // sử dụng cors cho app.

// POSTS
app.use('/posts',posts);                                          // gọi router
//
// USERS
app.use('/auths',auths);  
// 
// connect mongo atlats nếu kết nối thành công thì mở PORT.
//

mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  .then(() => {
    console.log('connected');
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  }).catch(err => {
    console.log('err',err);
  });


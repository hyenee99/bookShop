const express = require('express');
const app = express();
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// CORS 설정
const corsOptions = {
  origin: 'http://localhost:3000',  // 리액트 앱의 주소
  credentials: true             // 쿠키 사용 시 필요
};

// CORS 미들웨어 적용
app.use(cors(corsOptions));

app.listen(process.env.PORT);

const userRouter = require('./routes/users')
const bookRouter = require('./routes/books')
const categoryRouter=require('./routes/category')
const likeRouter = require('./routes/likes')
const cartRouter = require('./routes/carts')
const orderRouter = require('./routes/orders')

app.use("/users",userRouter)
app.use("/books",bookRouter)
app.use("/category",categoryRouter)
app.use("/likes",likeRouter)
app.use("/carts",cartRouter)
app.use("/orders",orderRouter)
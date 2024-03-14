const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));//인코딩 모드로 전환 하기위해 타사패키지 사용(multer)
app.use(express.static('public'));
app.use("/images",express.static("images"));//미들웨어를 지정해서 /images에 대한 요청에 활성화

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});

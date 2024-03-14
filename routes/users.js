const express = require('express');
const multer = require("multer");

const db = require("../data/database");//DB연결

const storageConfig =multer.diskStorage({
  destination: function(req,res,cb){//경로와 파일이름을 완전히 제어 가능
    cb(null,"images");//이미지 폴더에 저장하고 싶다고 알리면 매개변수값을 함수로 실행
  },
  filename: function(req,file,cb){
    cb(null, Date.now()+"-" + file.originalname );//확장자가 있는 고유파일로 만든다.
  }
});//새 저장 객체를 만든다. 

const upload = multer({ storage:storageConfig }); //파일을 저장할 위치 images 폴더
const router = express.Router();

router.get('/', async function(req, res) {
 const users = await db.getDb().collection("users").find().toArray();//toArray => 모든 데이터의 배열을 얻음
  res.render('profiles',{ users:users});
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

router.post("/profiles", upload.single("image") , async function(req, res){ //upload.single() 하나의 파일을 호출
  const uploadImageFile = req.file; //저장한 image데이터
  const userData =req.body; //본문에 저장된 다른 데이터

  await db.getDb().collection("users").insertOne({ //데이터 삽입
    name:userData.username,
    imagePath:uploadImageFile.path
  });
  res.redirect("/");

}); //multer 미들웨어로 적용하려는 라우터

module.exports = router;
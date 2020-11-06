const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const {User} = require('./modes/User');

const config = require('./config/key');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const mongoose = require("mongoose")
mongoose.connect(config.mongoURI, {
	useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(() => console.log("MongoDB Connected...")).catch(err => console.log("MongoDb Error"))
// mongoose.connect("mongodb+srv://test:a12345@cluster0.uyvtq.mongodb.net/<dbname>?retryWrites=true&w=majority", {
// 	useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
// }).then(() => console.log("MongoDB Connected...")).catch(err => console.log("MongoDb Error"))


app.get('/', (req, res) => {
  res.send('Hello World!12345')
})

app.post('/register', (req, res) => {
	// 회원가입 할때 필요한 정보들을 client 에서 가져오면 데이터베이스에 넣어준다.
	const user = new User(req.body);

	user.save((err, userInfo) => {
		if(err) return res.json({success:false, err})
		return res.status(200).json({
			success:true
		})
	});
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
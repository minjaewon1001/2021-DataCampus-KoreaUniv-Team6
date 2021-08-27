var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var router = app.Router();
var ejs=require('ejs');
//var fs = require('fs');
var port=3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './views');
//const mainPage = fs.readFileSync('home/ubuntu/nodePythonAPP/view.ejs', 'utf8');

var mysql = require('mysql');
var db=mysql.createConnection({
	host: 'database-1.c1tu061kfdet.ap-northeast-2.rds.amazonaws.com',
	port: '3306',
	user: 'admin',
	password:'epzoa123!',
	database:'KPOP_Music'
    //ssl: true
});
db.connect();

var result=[];
var cnt=0;

id=['하성운','옹성우'];

app.get('/', (req, res) => {

  for(cnt=0;cnt<id.length;cnt++){
      console.log(cnt);
      db.query('select * from person where person.name=?', id[cnt] , function (error, results, fields){
          if (error) {
              console.log(error);
          }
          result.push(results);
         
          if (result.length==id.length) {
            console.log(result);
            res.render('view.ejs',{
              data : result[0]
            });
          }
          
      });
  }
});

app.listen(port, ()=>{
    console.log('server running on port'+port);
});
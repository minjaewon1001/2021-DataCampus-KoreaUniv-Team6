const express = require('express');
const fileUpload = require('../lib/index');
const app = express();
const path = require('path');
var fs = require('fs');
const { PythonShell } = require('python-shell');
const PORT = 8000;
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('views'));
app.use('/form', express.static(__dirname + '/whois.html'));
app.use('/main', express.static(__dirname + '/index copy2.html'));
//app.use('/prediction', express.static(__dirname + '/views/index.html'));

//app.use('/main2', express.static(__dirname + '/Voico_Home.html'));
//app.use('/main', express.static(__dirname + '/Voico_Home.html'));
console.log(__dirname)
// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
  res.send('pong');
});

/*app.get('/index_copy.html', function(req, res){
  res.sendFile(path.join(__dirname, '/index copy.html'));
});*/
//var router = express.Router();
//app.use(express.static(__dirname));
app.use(express.static(__dirname+''));
app.post('/main', function(req, res) {
  let sampleFile;
  let uploadPath;
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log('No files were uploaded.');
    return;
  }
  console.log('req.files >>>', req.files); // eslint-disable-line
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/image/' + sampleFile.name;
  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('File uploaded');
  })
  res.sendFile(path.join(__dirname, 'index copy2.html'));
  var dir = './image';
  var dir2 = './image/'
  var file = dir2+ fs.readdirSync(dir) +'';
  var options = {
    mode: 'text',
    pythonPath: '',
    pythonOptions: ['-u'],
    scriptPath: '',
    args: ['best_model.h5', 60, file]
  };
  PythonShell.run('test_final.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: %j', results);
    fs.writeFileSync("./text/prediction.txt", '\ufeff' + results, {encoding: 'utf8'});  
    fileclean();
  })
  function fileclean(){
  fs.unlinkSync('./image/'+sampleFile.name, function(err){
    if( err ) throw err;
    console.log('file deleted');
  })}
});

app.get('/prediction', function(req,res){
  /*fs.readFileSync('./views/index.html', function(error,data){
      res.writeHead(200, { 'Content-Type' : 'text/html'});
      res.end(data);
  })
});*/
    var arr = fs.readFileSync("./text/prediction.txt")+'';
    var arr_re = arr.replace(/ /gi,",");
    var name = arr_re.split(',');
    //var name = fs.readFileSync("./text/prediction.txt");
    
    //console.log(name);
    res.render(__dirname+'/views/index.html', {name : name});
      
});


app.listen(PORT, function() {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
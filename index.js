var http = require('http');
var fs = require('fs');
var CAL = ["January","February","March","April","May","June","July","August","September","October","November","December"]

http.createServer(function(req,res) {
  var map = {
    unix: null,
    natural: null
  };

  if (req.url == '/'){
    fs.readFile('./index.html',function(erro,html) {
      res.writeHead(200,{"Content-Type":"text/html"});
      res.write(html);
      res.end();
    });
  } else {
    var dateReq = req.url.split("/").join("");

    try {
      if (eval(dateReq)){
        var date = new Date(eval(dateReq) * 1000);
        var format = CAL[date.getMonth()] + " " +date.getUTCDate() + ", " + date.getUTCFullYear();
        map.unix = eval(dateReq);
        map.natural = format;
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify(map));
      }
    } catch (e){
      var url = decodeURIComponent(req.url).split(/\W/gi);
      var dateArray = url.filter(function (item) {
        if (item == ""){
          return false;
        }
        return true
      });
      var date = dateArray[0] + " " +  dateArray[1] + ", " + dateArray[2];
      var unix = new Date(date).getTime() / 1000;
      if (unix) {
        map.unix = unix;
        map.natural = date;
        res.writeHead(200,{"Content-Type":"application/json"});
        res.write(JSON.stringify(map));
      } else {
        res.writeHead(404,{"Content-Type":"application/json"});
        res.write(JSON.stringify(map));
      }
    }

    res.end();
  }
}).listen(3000,function() {
  console.log('server on...');
});

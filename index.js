// Setup basic express server
var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var request = require('request');
var restler = require('restler');

var port = process.env.PORT || 443;
var TIMER_LENGTH = 1000; // ms
var DOMAIN = "http://127.0.0.1:3000";
var EXPIRE_TIME = 60; // s

var userids = {};

var server = https.createServer({ 
  key: fs.readFileSync(__dirname + "/cert/privkey.pem"),
  cert: fs.readFileSync(__dirname + "/cert/fullchain.pem"),
  ca: fs.readFileSync(__dirname + "/cert/chain.pem")
}, app);

var io = require('socket.io')(server);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var numUsers = 0;

var getAuth = function (userid, callback) {
  var password = (new Buffer(userid)).toString('base64');
  // Set the headers
  var headers = {
    'Authorization': 'Basic Y2xpZW50X2lkOmNsaWVudF9zZWNyZXQ=',
    'Content-Type': 'application/json'
  }

  // Configure the request
  var options = {
    url: DOMAIN + '/oauth/token?grant_type=password&username=' + userid + '&password=' + password + '&scope=read',
    method: 'POST',
    headers: headers
  }

  request(
    options, callback
  );
}

var getToken = function (ip, callback) {
  restler.post(DOMAIN + '/getToken', {
    data: { userip: ip }
  })
    .on('complete', function (data) {
      var res = {};
      res.success = false;
      if (data && data.success && data.data) {
        // 已经有token 跳转到搜索页
        res.success = true;
        res.data = data;
        callback(res);
      }
      else {
        // 没有token生成用户id
        getUser(ip, function (user) {
          res.data = user;
          callback(res);
        });
      }
    });
}

var getUser = function (ip, callback) {
  restler.post(DOMAIN + '/getUserid', {
    data: { userip: ip }
  })
    .on('complete', function (data) {
      if (data) {
        callback(data);
      }
      else {
        callback(null);
      }
    })
}

var getRealIp = function (sHeaders) {
  if (!sHeaders) {
    return null;
  }
  else if (sHeaders.hasOwnProperty('x-real-ip')) {
    return sHeaders['x-real-ip'];
  }
  else if (sHeaders.hasOwnProperty('x-forwarded-for')) {
    return sHeaders['x-forwarded-for']
  }
  return null;
}

io.on('connection', function (socket) {
  var sHeaders = socket.handshake.headers;
  var clientIp = socket.request.connection.remoteAddress;
  if (getRealIp(sHeaders)) {
    clientIp = getRealIp(sHeaders);
  }

  getToken(clientIp, function (result) {
    var res = result.data;
    if (res.success) {
      socket.emit('login success', res.data);
      socket.disconnect();
      return;
    }
    socket.userid = result.data.username;
    socket.upassword = result.data.password;
    socket.emit('connected', socket.userid);
    var addedUser = false;

    socket.on('add user', function () {
      if (socket.userintervalnum > 0) {
        return;
      }

      // add the client's userid to the global list
      userids[socket.userid] = socket.id;
      ++numUsers;
      addedUser = true;
      socket.emit('login', socket.userid);

      socket.userintervalnum = 0;
      socket.userinterval = setInterval(function () {
        if (socket.userintervalnum > EXPIRE_TIME) {
          clearInterval(socket.userinterval);
          socket.disconnect();
          return;
        }
        socket.emit('time count', 60 - socket.userintervalnum);
        socket.userintervalnum += 1;
      }, TIMER_LENGTH)
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
      // remove the userid from global userids list
      if (addedUser) {
        delete userids[socket.userid];
        --numUsers;
      }
    });
  });

});

/**
 * =========== 登录页 =============
 */
app.post('/login', function (req, res) {
  if (!req.query || !req.query.userid) {
    res.status(404)        // HTTP status 404: NotFound
      .send('Not found');
    return;
  }
  var userid = req.query.userid;

  getAuth(userid, function (error, response, body) {
    if (error) {
      res.status(200).send("error");
      return;
    }
    else if (response.statusCode == 200) {
      //console.log(body);
      var json = JSON.parse(body);
      var socket = io.to(userids[userid]);
      socket.emit('login success', json["access_token"]);
      io.sockets.connected[userids[userid]].disconnect();

      res.status(200).send("Logging...");
    }
  });

});

/**
 * =========== 查询页 ============
 */
var getSearchResults = function (token, q, start, callback) {
  var num = 10;
  var headers = {
    'Accept-Language': 'zh-CN,zh',
    'Content-Type': 'application/json; charset=UTF-8'
  }
  // start from 1
  var options = {
    url: DOMAIN + '/g?access_token=' + token + '&num=' + num + '&start=' + start + '&q=' + encodeURIComponent(q),
    method: 'GET'
  }

  request(
    options, callback
  );
}

var getSearchSuggest = function (token, q, callback) {
  var headers = {
    'Accept-Language': 'zh-CN,zh',
    'Content-Type': 'application/json; charset=UTF-8'
  }
  var options = {
    url: DOMAIN + '/suggest?access_token=' + token + '&q=' + encodeURIComponent(q),
    method: 'GET'
  }

  request(
    options, callback
  );
}

app.get('/s', function (req, res) {
  res.sendFile(__dirname + '/public/search.html');
})

app.post('/s', function (req, res) {
  //if (!req.query || !req.query.q || !req.query.start) {
  if (!req.query || !req.query.start) {
    res.status(404).send('Not found');
    return;
  }
  var sHeaders = req.headers;
  var clientIp = res.connection.remoteAddress;
  if (getRealIp(sHeaders)) {
    clientIp = getRealIp(sHeaders);
  }
  //console.log(sHeaders);
  console.log("ip---: " + clientIp);
  getToken(clientIp, function (result) {
    var restoken = result.data;
    if (restoken.success) {
      getSearchResults(restoken.data, req.query.q, req.query.start, function (error, response, body) {
        try {
          JSON.parse(body)
        }
        catch (e) {
          res.status("200").send({ 'error': 'parse json error' });
        }
        res.status("200").send(JSON.parse(body));
      })
    }
    else {
      res.status("200").send({ 'error': 'Not found' });
    }
  });
  //return res.status("200").send(json);
})

app.post('/suggest', function (req, res) {
  if (!req.query || !req.query.q) {
    return [];
  }
  var sHeaders = req.headers;
  var clientIp = res.connection.remoteAddress;
  if (getRealIp(sHeaders)) {
    clientIp = getRealIp(sHeaders);
  }
  console.log("ip++++: " + clientIp);
  getToken(clientIp, function (result) {
    var restoken = result.data;
    if (restoken.success) {
      getSearchSuggest(restoken.data, req.query.q, function (error, response, body) {
        try {
          JSON.parse(body)
        }
        catch (e) {
          res.status("200").send([]);
        }
        var jarr = JSON.parse(body);
        if (!Array.isArray(jarr)) {
          res.status("200").send([]);
        }
        var list = [];
        jarr.forEach(function (item) {
          list.push(item[0]);
        });
        res.status("200").send(list);
      })
    }
    else {
      res.status("200").send([]);
    }
  });
})

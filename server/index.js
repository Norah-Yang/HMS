var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');
//链接数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hms'
});
connection.connect();
// 创建 application/x-www-form-urlencoded 编码解析(post方法)
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//登录
app.post('/login', urlencodedParser, function (req, res) {
    var userid = req.body.userid;
    var password = req.body.password;
    var sql = `select * from user where userid = '${userid}' and userpass = '${password}'`;
    connection.query(sql, function (err, result) {
        console.log(result)
        if (err || result.length == 0) {
            res.status(200),
                res.json(1)//fail
        } else {
            res.status(200),
                res.json(result)//success
        }
    });
})

// ------------------------------------用户--------------------------------


//查询
app.get('/userlist', function (req, res) {
    var sql = 'select * from user order by userid asc';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(result)
    });
});

//添加
app.get('/useradd', function (req, res) {
    console.log(req.query)
    var userid = req.query.userid;
    var username = req.query.username;
    var ident = req.query.ident;
    var userpass = req.query.userpass;
    var sql = `select * from user where userid="${userid}"`;
    // var sql = `insert into user values ('${userid}','${username}','${ident}')`;

    connection.query(sql, function (err, result) {
        if (err || result.length != 0) {
            res.status(200),
                res.json(1)//fail
        } else {
            var sql1 = `insert into user values ('${userid}','${username}','${ident}','${userpass}')`;
            connection.query(sql1, function (err, result) {
                if (err) {
                    console.log('err:', err.message);
                }
                console.log(result);
                res.status(200),
                    res.json(0)
            });

        }
    });

})
//删除
app.get('/userDel/:userid', function (req, res) {
    var userid = req.param('userid');
    console.log(userid)
    var sql = `delete from user where userid='${userid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

//修改
app.get('/userChange', function (req, res) {
    var userid = req.query.userid;
    var username = req.query.username;
    var ident = req.query.ident;
    var sql = `update user set username = '${username}',ident = '${ident}' where userid = '${userid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

// ------------------------------------------------房间----------------------------------------
//查询
app.get('/roomlist', function (req, res) {
    var sql = 'select * from room order by roomid asc';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(result)
    });
});

//添加
app.get('/roomadd', function (req, res) {
    console.log(req.query)
    var roomid = req.query.roomid;
    var detail = req.query.detail;
    var price = req.query.price;
    var state = req.query.state;
    var sql = `select * from room where roomid="${roomid}"`;

    connection.query(sql, function (err, result) {
        if (err || result.length != 0) {
            res.status(200),
                res.json(1)//fail
        } else {
            var sql1 = `insert into room values ('${roomid}','${detail}','${price}','${state}')`;
            connection.query(sql1, function (err, result) {
                if (err) {
                    console.log('err:', err.message);
                }
                console.log(result);
                res.status(200),
                    res.json(0)
            });

        }
    });

})
//删除
app.get('/roomDel/:roomid', function (req, res) {
    var roomid = req.param('roomid');
    console.log(roomid)
    var sql = `delete from room where roomid='${roomid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

//修改
app.get('/roomChange', function (req, res) {
    var roomid = req.query.roomid;
    var detail = req.query.detail;
    var price = req.query.price;
    var sql = `update room set detail = '${detail}',price = '${price}' where roomid = '${roomid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

//订房
app.get('/book', function (req, res) {
    var roomid = req.query.roomid;
    var info = req.query.info;
    var state = req.query.state;
    var c_tel = req.query.c_tel;
    var c_name = req.query.c_name;
    var c_card = req.query.c_card;
    var time_length = req.query.time_length;
    var sql = `insert into custom(info,roomid,c_name,c_tel,c_card,time_length) values('${info}','${roomid}','${c_name}','${c_tel}','${c_card}','${time_length}')`
    var sql1 = `update room set state='${state}' where roomid = '${roomid}'`
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }else{
            connection.query(sql1,function(err,result){
                if(err){
                    console.log('err:', err.message);
                    res.json(3)//fail
                }else{
                    console.log(result);
                    res.status(200),
                    res.json(1)//success
                }
            })
        }
        
    });
})

//修改密码
app.get('/findPsw',function(req,res){
    var userid = req.query.userid;
    var sql = `select userpass from user where userid = '${userid}'`;
    connection.query(sql, function (err, result) {
        // if(result==oldpsw)
        console.log(result);
        res.json(result)
    });
})
app.get('/changePsw',function(req,res){
    var userid = req.query.userid;
    var userpass = req.query.psw_new;
    var sql = `update user set userpass='${userpass}'where userid = '${userid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

//退订房间的状态信息
app.get('/cancelList', function (req, res) {
    var sql = `select custom.roomid,c_name,c_tel,c_card,info,time_length,price from custom inner join room on custom.roomid = room.roomid where state='订'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
        }
        console.log(result);
        res.status(200),
            res.json(result)
    });
});

//房间退订
app.get('/cancel',function(req,res){
    var roomid = req.query.roomid;
    var state = req.query.state;
    var sql = `update room set state='${state}' where roomid = '${roomid}'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(1)//success
    });
})

//查询消费记录
app.get('/msgList',function(req,res){
    var msg = req.query.msg;
    var sql = `select roomid,info,c_name,c_card,time_length from custom`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(result)//success
    });
})
app.get('/findMsg',function(req,res){
    var msg = req.query.msg;
    var sql = `select roomid,info,c_name,c_card,time_length from custom  where c_card like '%${msg}%'`;
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('err:', err.message);
            res.json(0)//fail
        }
        console.log(result);
        res.status(200),
            res.json(result)//success
    });
})

//创建
app.listen(3000)
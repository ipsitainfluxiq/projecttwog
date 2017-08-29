/**
 * Created by debasis on 14/9/16.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3004;
//var port = process.env.PORT || 3014;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
var mailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.json({ parameterLimit: 10000000,
    limit: '90mb'}));
app.use(bodyParser.urlencoded({ parameterLimit: 10000000,
    limit: '90mb', extended: false}));
var datetimestamp='';
var filename='';
var EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter()
//emitter.setMaxListeners(100)
emitter.setMaxListeners(0)
var multer  = require('multer');
var datetimestamp='';
var filename='';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
       //   cb(null, '../assets/uploads/'); // this is for server site, run remotehost and check the path
        cb(null, '../src/assets/uploads/');
    },
    filename: function (req, file, cb) {
        //console.log(cb);

        console.log('file.originalname'+file.originalname);
        filename=file.originalname.split('.')[0].replace(/ /g,'') + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        // console.log(filename);
        cb(null, filename);
    }
});



var upload = multer({ //multer settings
    storage: storage
}).single('file');

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.post('/uploads', function(req, res) {
    datetimestamp = Date.now();
    upload(req,res,function(err){
        /*console.log(1);
         console.log(err);
         console.log(filename);*/

        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.json(filename);


    });
});




var mongodb = require('mongodb');
var db;
var url = 'mongodb://localhost:27017/projecttwo';
var MongoClient = mongodb.MongoClient;
MongoClient.connect(url, function (err, database) {
    if (err) {
        console.log(err);

    }else{
        db=database;
console.log("connected");
    }});


/*-----------------------------------------------------------------(start_for_geoai)
------------------------------------------------------------------------*/

app.post('/signup' , function (req,resp) {
    var collection = db.collection('signup');
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    collection.insert([{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            month: req.body.month,
            day: req.body.day,
            year: req.body.year,
            phone: req.body.phone,
            location: req.body.location,
            state: req.body.state,
        }],
        function(err, result) {
            if (err){
                console.log('err');
                resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
            }
            else{
                console.log(result);
                resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
            }
        });
});

app.post('/changepassword', function (req, resp) {
    console.log('has-error');
    var cryptoold = require('crypto');
    var secretold = req.body.oldpassword;
    var hashold = cryptoold.createHmac('sha256', secretold)
        .update('password')
        .digest('hex');


    var cryptonew = require('crypto');
    var secretnew = req.body.password;
    var hashnew = cryptonew.createHmac('sha256', secretnew)
        .update('password')
        .digest('hex');
    var data = {
        password: hashnew
    }

    var collection = db.collection('signup');
    var mail = req.body.email;

    collection.find({email: mail, password: hashold}).toArray(function (err, items) {

        if(items.length==0) {
            resp.send(JSON.stringify({'status': 'error', 'msg': 'Old password doesnot match'}));
            return;
        }
        else {
            collection.update({email: mail}, {$set: data}, true, true);
            resp.send(JSON.stringify({'status': 'success', 'msg': 'Password updated..'}));
        }
    });
});


app.post('/updateprofile',function(req,resp){
    console.log('called');
    var collection = db.collection('signup');
    var data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        month: req.body.month,
        day: req.body.day,
        year: req.body.year,
        phone: req.body.phone,
        location: req.body.location,
        state: req.body.state,
    }
    var mail = req.body.email;
    console.log(mail);
    collection.update({email:mail}, {$set: data}, true, true);

    resp.send(JSON.stringify({'status':'success'}));
});


app.post('/login', function (req, resp) {
    console.log('callloginnn');
    console.log(req.body.email);
    console.log(req.body.password);
    var crypto = require('crypto');
    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var collection = db.collection('signup');
    collection.find({ email:req.body.email }).toArray(function(err, items){
        console.log('items[0]'); //admin_login details shown here
        console.log(items[0]); //admin_login details shown here
        if(items.length==0){
            resp.send(JSON.stringify({'status':'error','msg':'Username invalid...'}));
            return;
        }
        if(items.length>0 && items[0].password!=hash){
            resp.send(JSON.stringify({'status':'error','msg':'Password Doesnot match'}));
            return;
        }
        /* if(items.length>0 && items[0].status!=1){
         resp.send(JSON.stringify({'status':'error','msg':'You are Blocked..'}));
         return;
         }*/
        if(items.length>0 && items[0].password==hash){
            resp.send(JSON.stringify({'status':'success','msg':items[0].email}));
            return;
        }
    });
});

app.post('/accountdetails',function(req,resp){        // this is for editadmin page
    console.log("accountdetails from server.js called");
    var resitem = {};
    var collection = db.collection('signup');
    var mail = req.body.emailid;

    collection.find({email:mail}).toArray(function(err, items) {
        if (err) {
            resp.send(JSON.stringify({'status':'error','id':0}));
        } else {
            resitem = items[0];
            resp.send(JSON.stringify({'status':'success','item':resitem}));
        }
    });
});



app.post('/calluploads',function (req,resp) {
    console.log(req.body.filenameis);
    console.log(req.body.srcfile);
    //var filepath = req.body.srcfile;
    var filepath = '../src/assets/uploads/'+req.body.filenameis;   // this is same path as uploads file has at the top of this page

    //  var filepath = '../assets/uploads/'+req.body.filenameis;    // (server) run remote host and check the path

    console.log('filepath');
    console.log(filepath);
    var fs = require('fs'),
        path = require('path');
   // filePath = path.join(__dirname, 'start.html');
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            console.log('received data: ' + data);
            resp.send(data);
        } else {
            console.log(err);
        }
    });
});

app.get('/userlist',function (req,resp) {

    var collection = db.collection('signup');

    collection.find().toArray(function(err, items) {

        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify(items));
        }

    });

});



app.post('/simplesolution' , function (req,resp) {
    var collection = db.collection('simplesolution');
/*console.log('req.body');
console.log(req.body);
console.log('req.body.audiences_automative');
console.log(req.body.audiences_automative);
console.log('req.body.audiences_buisness_employment_account_bank');
console.log(req.body.audiences_buisness_employment_account_bank);
console.log('show?');*/
collection.insert([req.body],
    function(err, result) {
    if (err){
        console.log('err');
        resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
    }
    else{
        console.log(result);
        resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
    }
});
});

app.post('/basicinformation' , function (req,resp) {
    var collection = db.collection('basicinformation');
    var o_id = new mongodb.ObjectID(req.body.simplesolutionid);
    console.log('req.body');
    console.log(req.body);
    collection.insert([req.body],
    function(err, result) {
    if (err){
        console.log('err');
        resp.send(JSON.stringify({'id':0, 'status':'Some error occured..!'}));
    }
    else{
       // console.log(result);
        var dataupdate = {
            simplesolutionid: o_id,
        }
        collection.update({ _id:result.ops[0]._id}, {$set: dataupdate}, true, true);
        resp.send(JSON.stringify({'id':result.ops[0]._id, 'status':'success'}));
    }
});
});


app.post('/confirmation', function (req,resp) {
    var html='<table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;font-family: Arial, Helvetica, sans-serif; margin: 0 auto;overflow-wrap: break-word;word-wrap: break-word;  hyphens: auto;  -ms-hyphens: auto; -moz-hyphens: auto; -webkit-hyphens: auto; hyphens: auto;"> <tr> <td style="text-align: center; vertical-align: top; font-size: 0; background:#e5e7e0; padding: 0px;"> <!--[if (gte mso 9)|(IE)]> <table width="100%" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0px;"> <tr> <td style="padding: 0px;"> <![endif]--> <div style="display: block; width: 100%; margin: 0; padding: 0;"> <div style="width: 100%; margin: 0 auto; display: block;"> <a  href="javascript:void(0);" target="_blank" style="display:inline-block;margin: 16px auto 10px; background-color: #fff; padding: 10px;border: 1px solid #dfdcd6;"> <img src="http://geoai.influxiq.com/assets/images/geoai_logo.jpg" style="max-width: 100%;" alt="#"> </a> </div> <div style="width: 100%; margin: 0 auto; display: block;"> <h2 style="text-transform:uppercase; font-size:24px; font-weight: bold; color:#1979c3; line-height:25px; text-align: center; margin: 0; padding: 10px 0 20px 0 !important;text-decoration: none;display: block;">Order Information From GEOAI</h2> </div>  <div style="width: 100%; margin: 0 auto; display: block;"> <div style="width: 94%;margin: 0 auto 20px;display: block;border: 1px solid #bcbcbc;padding: 5px;background: #fff;">';

    var o_id = new mongodb.ObjectID(req.body.id);
    var collection = db.collection('simplesolution').aggregate([
        { "$match": { "_id": o_id } },
        {
            $lookup: {
                from: "basicinformation",
                localField: "_id",
                foreignField: "simplesolutionid",
                as: "Userlogindata"
            }
        },
        { "$unwind": "$Userlogindata" },
    ]);
    var val = [];
    collection.toArray(function (err, items) {
    //    resp.send(JSON.stringify(items));

console.log(items.length);
           for(i in items[0]){
           //console.log(i);
           //console.log(items[0]);
               var i1;
          if(items[0][i].length>1 || items[0][i]==true){
                html+=' <div style="width: 44%;overflow: hidden;display: inline-block;vertical-align: top;padding: 0% 1% 0% 1%;"> <div style="text-transform:capitalize; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 0 !important;text-decoration: none;display: block;">'+i.replace("_", " ")+':</div> </div> <div style="width: 50%;display: inline-block;vertical-align: top;padding: 0% 2% 0% 1%;"> <div style="text-transform:none; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 20px !important;text-decoration: none;display: block;">'+items[0][i]+'</div> </div><div class="clearfix"></div>';

            }

}



        //for(i in items[0]){
        //console.log(i);
        //console.log(items[0]);
        var i1;

        for(i1 in items[0].Userlogindata) {
            if (items[0].Userlogindata[i1].length > 1) {
                html += ' <div style="width: 44%;overflow: hidden;display: inline-block;vertical-align: top;padding: 0% 1% 0% 1%;"> <div style="text-transform:capitalize; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 0 !important;text-decoration: none;display: block;">' + i1.replace("_", " ") + ':</div> </div> <div style="width: 50%;display: inline-block;vertical-align: top;padding: 0% 2% 0% 1%;"> <div style="text-transform:none; font-size:16px; font-weight: normal; color:#1b1b1b; line-height:18px; vertical-align: middle; text-align: left; margin: 0; padding: 10px 0 10px 20px !important;text-decoration: none;display: block;">' + JSON.stringify(items[0].Userlogindata[i1]) + '</div> </div><div class="clearfix"></div>';

            }
        }
        // }

        html+='</div></div> ';
        html+='</div> <!--[if (gte mso 9)|(IE)]> </td> </tr> </table> <![endif]--> </td> </tr> </table>';

        var smtpTransport = mailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user: "itplcc40@gmail.com",
                pass: "DevelP7@"
            }
        });

        var mail = {
            from: "Admin <ipsitaghosal1@gmail.com>",
            // to: req.body.email,
            to: 'ipsita.influxiq@gmail.com',
            subject: 'Welcome to Admin Management System',
            html:html,
        }

        smtpTransport.sendMail(mail, function (error, response) {
            console.log('send');
            smtpTransport.close();
        });

        });

    resp.send(JSON.stringify({'status': 'success'}));
});


app.get('/viewlogindetails', function (req, resp) {
    var collection1 = db.collection('users');
    var collection = db.collection('users').aggregate([

        { "$match": { "type": 3 } },
        {
            $lookup: {
                from: "ipaddress",
                localField: "email",
                foreignField: "mailid",
                as: "Userlogindata"
            }
        },
        /*{$match:{"Userlogindata._id":new mongodb.ObjectID('591d68b3957b8c55328d5cc3')}},*/
        { "$unwind": "$Userlogindata" },
        {$match:{"Userlogindata.type":0}},


    ]);
    collection.toArray(function (err, items) {
        resp.send(JSON.stringify(items));

    });
});
app.get('/getdetails11', function (req,resp) {

    var smtpTransport = mailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: "itplcc40@gmail.com",
            pass: "DevelP7@"
        }
    });

    var mail = {
        from: "Admin <ipsitaghosal1@gmail.com>",
        // to: req.body.email,
        to: 'ipsita.influxiq@gmail.com',
        subject: 'Welcome to Admin Management System',
        //  html: '<p> '+senddetails+' </p>'
        html: '<p>HIIIIIIIIIIIIIIIII </p>'
    }

    smtpTransport.sendMail(mail, function (error, response) {
        console.log('send');
        smtpTransport.close();
    });
    resp.send(JSON.stringify({'status':'done'}));
});


/*-----------------------------------------------------------------(end_for_geoai)
--------------------------------------------------------------------------*/



/*-----------------------------------------------------------------(start)----------------------------------------------------------------------------------*/
app.get('/getdetails', function (req,resp) {
    var collection= db.collection('details');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});

app.get('/getdetails1', function (req,resp) {
    var collection= db.collection('details');
    var k=0;
    collection.find().skip(0).limit(200).toArray(function(err, items) {
    var counter=0;
        for(var i in items){
            var email=items[i].email;
            var uniqid=items[i]._id;
            setTimeout(function () {
                if(counter==700){
                    return;
                }
                calltodelete(items[i]);
                counter++;
            },1000)
          /*  for(var j in items) {
                calltodelete(items[j]);
              if ((items[j]._id != uniqid) && (items[j].email == email)) {
                    collection.remove( {"_id": items[j]._id});
                }
            }*/
        }
    });
});

function calltodelete(items){
    var collection1= db.collection('details');
    collection1.find().toArray(function(err1, items1) {
        console.log("2.3");
        for(p in items1){
            if(items1[p]._id != items._id && items1[p].email == items.email){

                collection1.remove( {"_id": items1[p]._id});
            }
        }
    });
}

/*-------------------------------------------------------------(end)---------------------------------------------------------------------------------------*/
var urlstartcounters=0;
app.get('/autos',function (req,resp) {
    console.log(req.query.counter);
    urlstartcounters=req.query.counter;
    var interv=setInterval(function () {

        request('http://localhost:3004/autourlupdates?counter='+urlstartcounters, function(error2, response, html2){
            if(!error2) {
                var $ = cheerio.load(html2);
                var dealernames;
            }
            else {
                console.log("inside geturllists");
                console.log('in error  :'+error2);
            }
        });
        urlstartcounters=parseInt(urlstartcounters+10);
        console.log(urlstartcounters+'url sc');
        if(urlstartcounters>1000) clearInterval(interv);
    },5000);
    resp.send("success");
});



app.get('/autourlupdates',function(req,resp){
    var url = 'https://www.autotrader.com/car-dealers/Seattle+WA-98121?filterName=pagination&firstRecord='+req.query.counter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
    setTimeout(function () {
        console.log("inside autourlupdates");
        geturllists(url);
    },500)

    setInterval(function () {
        //urlstartcounter+=10;
        var curls = 'https://www.autotrader.com/car-dealers/Seattle+WA-98121?filterName=zip&firstRecord='+urlstartcounters+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
        //console.log(urlstartcounter);
        //console.log(curl);
        //console.log("inside autourlupdate");
        //if(urlstartcounter<300)geturllist(curl);
    },1000);

    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});


function geturllists(url){

    request(url, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealernames;
            //setInterval(function () {

            dealernames=$('.dealer-listing').each(function () {
                /*console.log("Dealer name");
                 console.log($(this).find('.dealer-name').html());
                 console.log("Address 1");
                 console.log($(this).find('.address1').html());
                 console.log("Address 2");
                 console.log($(this).find('.address2').html());
                 console.log("City State Zip");
                 console.log($(this).find('.cityStateZip').html());
                 console.log("City");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html());
                 console.log("State");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html());
                 console.log("Zip");
                 console.log($(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html());
                 console.log("Phone no");
                 console.log($(this).find('.atcui-block').html());*/
                var collection = db.collection('dealerss');
                collection.insert([{
                        dealername:$(this).find('.dealer-name').html() ,
                        url:$(this).find('.dealer-name').attr('href') ,
                        address1: $(this).find('.address1').html() ,
                        address2: $(this).find('.address2').html(),
                        city: $(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html(),
                        state: $(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html(),
                        zip: $(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html(),
                        phoneno: $(this).find('.atcui-block').html(),
                        facebookurl: '',
                    }],
                    function (err2, result2) {
                        if (err2) {
                            console.log('error'+err);
                        } else {
                            //response.send(JSON.stringify({'id':result2.ops[0]._id}));
                            //console.log(result2.ops[0]._id);
                            //console.log('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);
                            getdetailss('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);

                            setTimeout(function () {

                                $('.pagination-button').each(function () {

                                    if($(this).hasClass('active')){
                                        console.log('pageination text');
                                        //$(this).next().click();
                                        console.log($(this).text());
                                    }
                                })
                            },5000);
                        }
                    });
            });
            // },12000);

            /*setTimeout(function () {

             },500);*/
        }
        else {
            console.log("inside geturllists");
            console.log('in error  :'+error2);
        }
    });
}

function getdetailss(url,id){

    request(url, function(error2, response, html2){

        if(!error2) {
            var $ = cheerio.load(html2);
            var dealerinfo;
            var dealerfb;
            //dealerinfo=$('.atcui-list').find('a').attr('href')(function () {
            var collection = db.collection('dealerss');
            var data = {
                websiteurl: $('a[target="_siteLink"]').attr('href'),
                facebookurl: $('a[target="_facebook"]').attr('href'),
            }
            console.log($('#j_id_2q').html());
            $('.atcui-title').each(function(){

                if($(this).text()=='Facebook Feed'){

                    console.log('got fb url');
                    console.log($(this).next().attr('href'));
                }

            });
            //console.log("hi");
            console.log(data);
            collection.update({_id: id}, {$set: data}, true, true);

            // });
        }
        else {
            console.log("inside getdetailserrors");
            console.log('in error  :'+error2);
        }
    });



}
/*---------------------------------------------------------------------------------------------------------------------------------------------------*/

var urlstartcounter=50;
app.get('/auto',function (req,resp) {
    console.log(req.query.counter);
    urlstartcounter=req.query.counter;
    var interv=setInterval(function () {


    request('http://localhost:3004/autourlupdate?counter='+urlstartcounter, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealername;
            //setInterval(function () {

            // },12000);

            /*setTimeout(function () {

             },500);*/
        }
        else {
            console.log("inside geturllist");
            console.log('in error  :'+error2);
        }
    });
    urlstartcounter=parseInt(urlstartcounter+10);
    console.log(urlstartcounter+'url sc');
    if(urlstartcounter>1000) clearInterval(interv);
         },5000);
    resp.send("success");
});



app.get('/autourlupdate',function(req,resp){
    var url = 'https://www.autotrader.com/car-dealers/Dallas+TX-75207?filterName=pagination&firstRecord='+req.query.counter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';

    setTimeout(function () {
        console.log("inside autourlupdate");
        geturllist(url);
    },500)



    setInterval(function () {
        //urlstartcounter+=10;
        var curl = 'https://www.autotrader.com/car-dealers/Dallas+TX-75207?filterName=zip&firstRecord='+urlstartcounter+'&numRecords=10&searchRadius=500&sortBy=distanceASC';
        //console.log(urlstartcounter);
        //console.log(curl);
        //console.log("inside autourlupdate");
        //if(urlstartcounter<300)geturllist(curl);
    },1000);

    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});


function geturllist(url){

    /*if(urlstartcounter>150){
        //console.log('in get url');
        //console.log(url);
        return;
    }*/
    request(url, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealername;
            //setInterval(function () {

                dealername=$('.dealer-listing').each(function () {
                    /*console.log("Dealer name");
                     console.log($(this).find('.dealer-name').html());
                     console.log("Address 1");
                     console.log($(this).find('.address1').html());
                     console.log("Address 2");
                     console.log($(this).find('.address2').html());
                     console.log("City State Zip");
                     console.log($(this).find('.cityStateZip').html());
                     console.log("City");
                     console.log($(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html());
                     console.log("State");
                     console.log($(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html());
                     console.log("Zip");
                     console.log($(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html());
                     console.log("Phone no");
                     console.log($(this).find('.atcui-block').html());*/
                    var collection = db.collection('dealers');
                    collection.insert([{
                            dealername:$(this).find('.dealer-name').html() ,
                            url:$(this).find('.dealer-name').attr('href') ,
                            address1: $(this).find('.address1').html() ,
                            address2: $(this).find('.address2').html(),
                            city: $(this).find('.cityStateZip').find('span[itemprop="addressLocality"]').html(),
                            state: $(this).find('.cityStateZip').find('span[itemprop="addressRegion"]').html(),
                            zip: $(this).find('.cityStateZip').find('span[itemprop="postalCode"]').html(),
                            phoneno: $(this).find('.atcui-block').html(),
                            facebookurl: '',
                        }],
                        function (err2, result2) {
                            if (err2) {
                                //console.log('error'+err);

                            } else {
                                //response.send(JSON.stringify({'id':result2.ops[0]._id}));
                                //console.log(result2.ops[0]._id);
                                //console.log('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);
                                getdetails('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);

                                setTimeout(function () {

                                    $('.pagination-button').each(function () {

                                        if($(this).hasClass('active')){
                                            console.log('pageination text');
                                            //$(this).next().click();
                                            console.log($(this).text());
                                        }
                                    })
                                },5000);
                            }
                        });
                });
           // },12000);

            /*setTimeout(function () {

            },500);*/
        }
        else {
            console.log("inside geturllist");
            console.log('in error  :'+error2);
        }
    });
}

function getdetails(url,id){

    request(url, function(error2, response, html2){

        if(!error2) {
            var $ = cheerio.load(html2);
                var dealerinfo;
            var dealerfb;
            //dealerinfo=$('.atcui-list').find('a').attr('href')(function () {
                var collection = db.collection('dealers');
                var data = {
                    websiteurl: $('a[target="_siteLink"]').attr('href'),
                    facebookurl: $('a[target="_facebook"]').attr('href'),
                }
                console.log($('#j_id_2q').html());
                $('.atcui-title').each(function(){

                    if($(this).text()=='Facebook Feed'){

                        console.log('got fb url');
                        console.log($(this).next().attr('href'));
                    }

                });
                //console.log("hi");
                console.log(data);
                collection.update({_id: id}, {$set: data}, true, true);

           // });
            dealerfb=$('.lfloat').each(function () {
                var collection = db.collection('dealers');
                var data1 = {
                    fburl: $(this).find('a').attr('href'),
                }
                console.log("hi");
                console.log(data1);
                collection.update({_id: id}, {$set: data1}, true, true);

            });

        }
        else {
            console.log("inside getdetailserror");
            console.log('in error  :'+error2);
        }
    });



}



app.get('/ipaddress', function (req, resp) {
    var collection = db.collection('dealerss');
    //collection.drop(function(err, items) {
    collection.find().toArray(function(err, items) {
        if (err) {
            console.log(err);
            resp.send(JSON.stringify({'res':[]}));
        } else {
            resp.send(JSON.stringify({'res':items}));
        }
    });
});


/*
app.get('/addpeople',function(req,resp){
    var collection = db.collection('information');
    collection.insert([{
        firstname: "Ipsita",
        lastname: "Ghosal",
        email: "ips@gmail.com",
    }], function (err, result) {
        if (err) {
            resp.send(JSON.stringify({'status':'error'}));
        } else {
            resp.send(JSON.stringify(result));
        }
    });
});
 */

app.get('/dealerslist', function (req, resp) {
    var collection = db.collection('dealers');
    collection.find().toArray(function(err, items) {
        resp.send(JSON.stringify(items));
    });
});


app.get('/getusastates',function (req,resp) {


    var usastates=[
        {
            "name": "Alabama",
            "abbreviation": "AL"
        },
        {
            "name": "Alaska",
            "abbreviation": "AK"
        },
        {
            "name": "American Samoa",
            "abbreviation": "AS"
        },
        {
            "name": "Arizona",
            "abbreviation": "AZ"
        },
        {
            "name": "Arkansas",
            "abbreviation": "AR"
        },
        {
            "name": "California",
            "abbreviation": "CA"
        },
        {
            "name": "Colorado",
            "abbreviation": "CO"
        },
        {
            "name": "Connecticut",
            "abbreviation": "CT"
        },
        {
            "name": "Delaware",
            "abbreviation": "DE"
        },
        {
            "name": "District Of Columbia",
            "abbreviation": "DC"
        },
        {
            "name": "Federated States Of Micronesia",
            "abbreviation": "FM"
        },
        {
            "name": "Florida",
            "abbreviation": "FL"
        },
        {
            "name": "Georgia",
            "abbreviation": "GA"
        },
        {
            "name": "Guam",
            "abbreviation": "GU"
        },
        {
            "name": "Hawaii",
            "abbreviation": "HI"
        },
        {
            "name": "Idaho",
            "abbreviation": "ID"
        },
        {
            "name": "Illinois",
            "abbreviation": "IL"
        },
        {
            "name": "Indiana",
            "abbreviation": "IN"
        },
        {
            "name": "Iowa",
            "abbreviation": "IA"
        },
        {
            "name": "Kansas",
            "abbreviation": "KS"
        },
        {
            "name": "Kentucky",
            "abbreviation": "KY"
        },
        {
            "name": "Louisiana",
            "abbreviation": "LA"
        },
        {
            "name": "Maine",
            "abbreviation": "ME"
        },
        {
            "name": "Marshall Islands",
            "abbreviation": "MH"
        },
        {
            "name": "Maryland",
            "abbreviation": "MD"
        },
        {
            "name": "Massachusetts",
            "abbreviation": "MA"
        },
        {
            "name": "Michigan",
            "abbreviation": "MI"
        },
        {
            "name": "Minnesota",
            "abbreviation": "MN"
        },
        {
            "name": "Mississippi",
            "abbreviation": "MS"
        },
        {
            "name": "Missouri",
            "abbreviation": "MO"
        },
        {
            "name": "Montana",
            "abbreviation": "MT"
        },
        {
            "name": "Nebraska",
            "abbreviation": "NE"
        },
        {
            "name": "Nevada",
            "abbreviation": "NV"
        },
        {
            "name": "New Hampshire",
            "abbreviation": "NH"
        },
        {
            "name": "New Jersey",
            "abbreviation": "NJ"
        },
        {
            "name": "New Mexico",
            "abbreviation": "NM"
        },
        {
            "name": "New York",
            "abbreviation": "NY"
        },
        {
            "name": "North Carolina",
            "abbreviation": "NC"
        },
        {
            "name": "North Dakota",
            "abbreviation": "ND"
        },
        {
            "name": "Northern Mariana Islands",
            "abbreviation": "MP"
        },
        {
            "name": "Ohio",
            "abbreviation": "OH"
        },
        {
            "name": "Oklahoma",
            "abbreviation": "OK"
        },
        {
            "name": "Oregon",
            "abbreviation": "OR"
        },
        {
            "name": "Palau",
            "abbreviation": "PW"
        },
        {
            "name": "Pennsylvania",
            "abbreviation": "PA"
        },
        {
            "name": "Puerto Rico",
            "abbreviation": "PR"
        },
        {
            "name": "Rhode Island",
            "abbreviation": "RI"
        },
        {
            "name": "South Carolina",
            "abbreviation": "SC"
        },
        {
            "name": "South Dakota",
            "abbreviation": "SD"
        },
        {
            "name": "Tennessee",
            "abbreviation": "TN"
        },
        {
            "name": "Texas",
            "abbreviation": "TX"
        },
        {
            "name": "Utah",
            "abbreviation": "UT"
        },
        {
            "name": "Vermont",
            "abbreviation": "VT"
        },
        {
            "name": "Virgin Islands",
            "abbreviation": "VI"
        },
        {
            "name": "Virginia",
            "abbreviation": "VA"
        },
        {
            "name": "Washington",
            "abbreviation": "WA"
        },
        {
            "name": "West Virginia",
            "abbreviation": "WV"
        },
        {
            "name": "Wisconsin",
            "abbreviation": "WI"
        },
        {
            "name": "Wyoming",
            "abbreviation": "WY"
        }
    ];

    resp.send(usastates);

});



var server = app.listen(port, function () {

    var host = server.address().address
    var port = server.address().port
})

/*
server.listen(80, 'current_local_ip');*/

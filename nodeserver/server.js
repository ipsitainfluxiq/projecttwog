/**
 * Created by debasis on 14/9/16.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3004;
var request = require('request');
var cheerio = require('cheerio');
var http = require('http').Server(app);
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
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
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



app.get('/autourlupdate',function(req,resp){
    var url = 'https://www.autotrader.com/car-dealers/Dallas+TX-75207?filterName=zip&firstRecord=0&numRecords=10&searchRadius=500&sortBy=distanceASC';

    setTimeout(function () {
        console.log("inside autourlupdate");
        geturllist(url);
    },500)

    resp.send(JSON.stringify({'status': 'success', 'msg': ''}));
});


function geturllist(url){

    request(url, function(error2, response, html2){
        if(!error2) {
            var $ = cheerio.load(html2);
            var dealername;
            dealername=$('.dealer-listing').each(function () {
                console.log("Dealer name");
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
                console.log($(this).find('.atcui-block').html());
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
                }],
                    function (err2, result2) {
                        if (err2) {
                            //console.log('error'+err);

                        } else {
                            //response.send(JSON.stringify({'id':result2.ops[0]._id}));
                            console.log(result2.ops[0]._id);
                            getdetails('https://www.autotrader.com'+result2.ops[0].url,result2.ops[0]._id);
                        }
                });
            });
            setTimeout(function () {
               // getdetails(url);
            },500);
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
            var dealerdetails;
       /*     dealerdetails=$('.dealer-listing').each(function () {
                var collection = db.collection('dealers');
                var data = {
                    websiteurl: $(this).find('a').attr('href'),
                }
                collection.update({_id: id}, {$set: data}, true, true);

            });*/

        }
        else {
            console.log("inside geturllist");
            console.log('in error  :'+error2);
        }
    });



/*    var collection = db.collection('dealers');

    collection.find({ _id:req.body.email }).toArray(function(err, items){

        collection.insert([{
            mailid: req.body.email,
            ipaddress: ip,
            time: Math.floor(Date.now() / 1000),
            type:1, //logout
        }], function (err2, result2) {

        });

        resp.send(JSON.stringify({'status':'success','msg':items[0]}));
        return;
    });*/
}


app.post('/addemployee',function(req,resp){
    //console.log("Hello");
    var collection = db.collection('users');

    var crypto = require('crypto');

    var secret = req.body.password;
    var hash = crypto.createHmac('sha256', secret)
        .update('password')
        .digest('hex');
    var added_on=new Date();
    collection.insert([{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        designation: req.body.designation,
        note: req.body.note,
        //added_time: Math.floor(Date.now() / 1000),
        type:3 //1=>admin, 0=>user, 2=>aces, 3=>employee
    }], function (err, result) {
        if (err) {
            console.log('error'+err);
            resp.send(JSON.stringify({'id':0}));
        } else {
            var smtpTransport = mailer.createTransport("SMTP", {
                service: "Gmail",
                auth: {
                    user: "itplcc40@gmail.com",
                    pass: "DevelP7@"
                }
            });


            //var link=mzsadielink+'emailverify/'+result.ops[0]._id;
            var link='http://localhost:4200/#/emailverify/'+result.ops[0]._id;
            var name=req.body.firstname+' '+req.body.lastname;
            var email=req.body.email;
            var mail = {
                from: "Admin <ipsitaghosal1@gmail.com>",
                to: req.body.email,
                //to: 'ipsita.influxiq@gmail.com',
                subject: 'Welcome to Employee Management System',


                /*html: '<P>Below is your login information – Login Link: http://localhost:4200/#/login</p>' +
                 '<p>Please click on the link below to activate your account.</p><a href="'+link+'">Click Here</a>'*/
                html: '<p>Welcome </p>'+name +'<P>We are please to let you know that you have been successfully registered as an Employee.</p>'+'<P>Below is your login information:</p>'+'<p>Email id: </p>'+email+'<p>Password: Protected due to security</p>'+'<p>Login Link: http://mzsadie.influxiq.com/#/login</p>' +
                '<p>Please click on the link below to activate your account.</p><a href="'+link+'">Click Here</a>'



            }

            smtpTransport.sendMail(mail, function (error, response) {
                // resp.send((response.message));
                console.log('send');
                smtpTransport.close();
            });
            resp.send(JSON.stringify({'id':result.ops[0]._id}));
        }
        //console.log("Hi");
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
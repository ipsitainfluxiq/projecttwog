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


/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
/*var urlstartcounters=0;
app.get('/autos',function (req,resp) {
    console.log(req.query.counter);
    urlstartcounters=req.query.counter;
    var interv=setInterval(function () {

    request('http://localhost:3004/autourlupdates?counter='+urlstartcounters, function(error2, response, html2){
            if(!error2) {
                var $ = cheerio.load(html2);
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
});*/



app.get('/autourlupdates',function(req,resp){

    var url = 'https://www.autotrader.com/car-dealers/Atlanta+GA-30301?filterName=pagination&firstRecord=20&numRecords=10&searchRadius=500&sortBy=distanceASC';

    setTimeout(function () {
        console.log("inside autourlupdates");
        console.log(url);
        geturllists(url);
    },500)

    setInterval(function () {
        var curl = 'https://www.autotrader.com/car-dealers/Atlanta+GA-30301?filterName=pagination&firstRecord=20&numRecords=10&searchRadius=500&sortBy=distanceASC';
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
                var collection = db.collection('dealersss');
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
            var dealerfbs;
            var collection = db.collection('dealersss');
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

        }
        else {
            console.log("inside getdetailserror");
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


const express = require("express");
const http = require("https");
const bodyparser=require("body-parser");
var Parse = require('parse');
const axios=require("axios");
const { WebClient } = require('@slack/web-api');
var Slack = require('node-slack');
var Client = require('node-rest-client').Client;
const app = express();
const  SLACK_VERIFICATION_TOKEN =  process.env.SLACK_VERIFICATION_TOKEN;
const Workspace=process.env.Workspace;
app.use(express.static("public"));
app.use(bodyparser.json());

app.post('/', (req, res) => {    //To recieve request from apex trigger  
console.log('welcome',res);
let cname=req.body.Account.Name;
  let naming =cname.toLowerCase();  //Changing the account name according to slack naming convention
  console.log('naming',naming);
  let finalname=naming.replace(/\s/g,'');
let secfinal=finalname.replace(/,/g,'_');
   console.log('secfinal',secfinal);
  console.log('finalname',finalname);
          let fields = [];
         let subject;
   
  console.log('data',req.body);
            fields.push({title: "Subject", value:req.body.Subject, short:false});
            fields.push({title: "Description", value: req.body.Description, short:false});
             fields.push({title: "AccountName", value:req.body.Account.Name , short:false});
            fields.push({title: "CaseNumber", value: req.body.CaseNumber, short:false});
  
            console.log('case',fields);
              let message = {
                text: "A new case has been created/updated:",
              //attachments: 
            };
       console.log('hy1');
     
      const url="https://slack.com/api/channels.create";
   
       const headers = {
      
    "Content-Type": "application/json",
    "token": `xoxp-701650376675-701650377683-835791408581-cf0f1607d1353e00063de5b0320686ea`,
        // "HTTP ":'Post',
         "name":'req.body.Account.Name'
     
  };
  // Http req for channel creation & post in that channel
  http.get('https://slack.com/api/channels.create?token='+'xoxp-701650376675-701650377683-835791408581-cf0f1607d1353e00063de5b0320686ea'+'&name='+secfinal,(response)=>{
     http.get('https://slack.com/api/chat.postMessage?token='+'xoxp-701650376675-701650377683-835791408581-cf0f1607d1353e00063de5b0320686ea'+'&channel='+secfinal+'&text='+'the case is created and updated:\n'+
             'casenumber:'+req.body.CaseNumber+'\n'+'subject:'+req.body.Subject+'\n'+'Description:'+req.body.Description+'\n'+'Status:'+req.body.Status+'\n'+'Account:'+cname
              ,(res)=>
               {
       //  console.log('response',res);
       });
  
  })
  
  res.send('Welcome !!');

    })
var keepAlive = require("node-keepalive");
//keepAlive({}, app);
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
  setInterval(function() {
    http.get("https://newslackchannel.herokuapp.com");
},300000);
app.listen(process.env.PORT);
  console.log("Your app is listening on port " + listener.address().port);
});
   

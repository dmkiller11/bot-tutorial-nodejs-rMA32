var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/principles/;
  var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                "MIA","BUF","SF","WAS","NYJ","TB"]
  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("1.	We admitted we were powerless—that our lives meant nothing 2.	Came to believe that sanity is a made up word and we don’t want that anyway. 3.	Made a decision to never turn our will or our lives over to a nonexistent power. 4.	Concluded that making a “moral inventory” of ourselves was a waste of time. 5.	Admitted our flaws to ourselves but nobody else because that was also a waste of time. 6.	Were entirely ready to concede that a god could not do anything about said flaws. 7.	Clung to our flaws, making no effort to fix them because it doesn’t matter.8.	Made a list of all persons we had harmed (on purpose), so that we could get some back up in destroying our enemies together. 9.	Kept grudges against everyone who had ever wronged us. 10.	 Accepted the belief that nothing matters. 11.	Resolved to never pray again because we know that a mythical sky creature has no control over our lives. 12.	Having had the revelation that nothing matters, we brought the message and these principles to other cynical people.");
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(response) {
  var botResponse,options, body, botReq;

  botResponse = response

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;

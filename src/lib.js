import {nameMapping} from "./token.js";
var requestify = require('requestify');
//Find user from given name

export function getDiscordUserInChannel(name,discordUserList){
  name = name.toLowerCase();
  let user = discordUserList.find(val => val.username.toLowerCase() === name);
  if(user != null)
    return user;
  if(typeof nameMapping[name] != 'undefined')
  {
    let user = discordUserList.find(val => val.username.toLowerCase() ===
               nameMapping[name].toLowerCase());
    if(user != null)
      return user;
  }
  return undefined;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


export function sendKodenamesLink(request, channel,client){
  let tokens = request.split(/[\s,\t|]+/);
  tokens = tokens.slice(1);
  let m = 5
  let n = 5
  let assasin = 1
  if(tokens.length==0)
    console.log("Not cool!! Wrong command");
  else if(tokens.length>2)
    if(!(isNaN(tokens[tokens.length-1]) ||
         isNaN(tokens[tokens.length-2]) ||
         isNaN(tokens[tokens.length-3]) ))
   {
      n = +tokens[tokens.length-3];
      m = +tokens[tokens.length-2];
      assasin = +tokens[tokens.length-1];
      tokens = tokens.slice(0,-3)
    }

  let group1 = [], group2=[];

  let groupPartition = request.split("|");
  if(groupPartition.length==2){
    group1=tokens.filter(x=>groupPartition[0].split(/[\s\t,]+/).includes(x));
    group2=tokens.filter(x=>!group1.includes(x));
  } else{
    let shuffled = shuffle(tokens);
    group1 = shuffled.slice(0,shuffled.length/2);
    group2 = shuffled.slice(shuffled.length/2);
  }

  if(group1.length<2||group2.length<2)
  {
    console.log(group1);
    console.log(group2);
    console.log('Not enough players in one group bye bye');
    return;
  }
  let user1 = group1.map(x => getDiscordUserInChannel(x,client.users));
  let user2 = group2.map(x => getDiscordUserInChannel(x,client.users));

  if(user1.includes(undefined) || user2.includes(undefined))
  {
    console.log(user1);
    console.log(user2);
    console.log("Invalid user found! Bye Bye");
    return;
  }

  let data = {"action": "create", "num_rows": n,
              "num_cols": m, "num_assasins": assasin, "language": "English"};


  var requestify = require('requestify');

  requestify.post("http://www.syeedibnfaiz.com/cgi-bin/codenames/controller.cgi", data)
  .then(function(response) {
      let data = JSON.parse(response.body);
      let clueMaster = data.id;
      let plebs = data.id.split("+")[0];
      user1[0].send("You have been invited to play kodenmaes you are clue master:" +
                    " http://www.syeedibnfaiz.com/codenames/#"+clueMaster);
      user2[0].send("You have been invited to play kodenmaes you are a clue master:" +
                    " http://www.syeedibnfaiz.com/codenames/#"+clueMaster);
      user1.slice(1).forEach(x=>x.send("You have been invited to play kodenmaes you are dirty pleb:"
                    + " http://www.syeedibnfaiz.com/codenames/#"+plebs));
      user2.slice(1).forEach(x=>x.send("You have been invited to play kodenmaes you are dirty pleb:"
                    + " http://www.syeedibnfaiz.com/codenames/#"+plebs));
  });
}

function soundDispatcher(message, soundFile){
  message.member.voiceChannel.join().
  then(connection => {
    const dispatcher = connection.playFile(soundFile);
    /*dispatcher.on('end', () => {
      console.log("Sound ended");
    });*/
    dispatcher.on('error', e => {
      console.log(e);
    });
  }).catch(console.log);
}

export function playSound(message){
  let command = message.content.toLowerCase().trim();
  if(message.member.voiceChannel)
  {
    if(command === "!cry")
      soundDispatcher(message, "./resource/Chatwheel_crybaby.wav");
    else if(command === "!disaster" ||
            command === "!disastah")
      soundDispatcher(message, "./resource/Chatwheel_disastah.wav");
    else if(command === "!patience" ||
            command === "!zhou" ||
            command === "!pfz" ||
            command === "!pz"
          )
      soundDispatcher(message, "./resource/Chatwheel_patience.wav");
    else if(command === "!dead"||
            command === "!all_dead")
      soundDispatcher(message, "./resource/Chatwheel_all_dead.wav");
    else if(command === "!wow"||
            command === "!waow")
        soundDispatcher(message, "./resource/Chatwheel_wow.wav");
    else if(command === "!brutal"||
            command === "!bsr"||
            command === "!brutal savage rekt"
          )
          soundDispatcher(message, "./resource/Chatwheel_brutal.wav");


  }

}

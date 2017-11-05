import {token} from './token.js'
import * as lib from './lib.js';

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
  //message.channel.send("Lets see how useless slain will be today!!");
  //let user = lib.getDiscordUserInChannel("khageshpatel",client.users);
  //user.send("Howdy!!!");
  //console.log(lib.getKodenameLinks(5,5,1));
  //lib.sendKodenamesLink('/codename bkt patel darkmorpheus slain',"123",client);
});

client.on("message", (message) => {
  let content = message.content;
  let channel = message.channel;
  if (content.toLowerCase().startsWith("/ping")) {
    channel.send("pong!");
  } else if(content.toLowerCase().startsWith("/blame slain")) {
    channel.send("Kya slain kuch to kiya karo!!!");
  } else if(content.toLowerCase().startsWith("/kodename") ||
    content.startsWith("/codename"))
  {
    lib.sendKodenamesLink(content,channel,client);
  }

});

client.login(token);

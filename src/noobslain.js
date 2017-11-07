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
  } else if(content.toLowerCase().startsWith("/ns ")){
    let cmd = content.toLowerCase().split(" ")[1];
    if(cmd === "j" && message.member.voiceChannel)
      message.member.voiceChannel.join().catch(console.log);
    else if(cmd === "l" && message.member.voiceChannel)
      message.member.voiceChannel.leave();
    else if(cmd === "c")
    {
      channel.send("Commands: \n/ns [j|l|c] \n/ping \n/blame slain"
                  + "\n[/kodename|/codename] names \n!cry !disaster !disastah"
                  + "\n!zhou !patience !pfz !pz"
                  + "\n!dead !all_dead"
                  + "\n!wow !waow"
                  + "\n!brutal !bsr !brutal savage rekt"
                  );
    }
  }
  else if(content.startsWith("!")){
    lib.playSound(message);
  }

});

client.login(token);

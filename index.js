const Discord = require('discord.js');
const client = new Discord.Client();
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    kickThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 7, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    exemptPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredUsers: [], // Array of User IDs that get ignored.
    // And many more options... See the documentation.
});
const activities_list = [
    "Lionbot!",
    "!help for commands!",
    "Forward bugs to phyouthcenter1",
    "c:"
];
 
const prefix = '!';
 
const fs = require('fs');
 
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
const { Client, MessageEmbed } = require('discord.js');
 
client.once('ready', () => {
    console.log('Lionbot is online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command.toLowerCase() === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command.toLowerCase() == 'kick'){
        client.commands.get('kick').execute(message, args);
    } else if(command.toLowerCase() == 'ban'){
        client.commands.get('ban').execute(message, args);
    } else if(command.toLowerCase() == 'mute'){
        client.commands.get('mute').execute(message, args);
    } else if(command.toLowerCase() == 'unmute'){
        client.commands.get('unmute').execute(message, args);
    } else if(command.toLowerCase() == 'clear'){
        client.commands.get('clear').execute(message, args);
    } else if(command.toLowerCase() == 'slowmode'){
        client.commands.get('slowmode').execute(message, args);
    } else if(command.toLowerCase() == 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command.toLowerCase() == 'avatar'){
        client.commands.get('avatar').run(client, message, args);
    }
});

client.on('message', message =>{
    if(message.content.toLowerCase() == '!help'){
        const newEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Lionbot Commands")
        .setDescription("\n **Moderation** \n\nBan\n\nKick\n\nMute\n\nUnmute\n\nSlowmode\n\n**Fun**\n\nPing\n\n**INFO**\n\nHelp\n\nAvatar")
        .setFooter("Prefix: !")

        message.author.send(newEmbed)
        message.channel.send(`${message.author.username}, you have mail!`);
    }
})

client.on('guildMemberAdd', member => {
    const welcomes = [`Welcome to server, ${member}!`, `${member} is here! Lets get this party started!`, `We hope you brought pizza, ${member}!`];
    const randomMessage = welcomes[Math.floor(Math.random() * welcomes.length)];
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(randomMessage);
});

client.on('message', (message) => antiSpam.message(message)); 

client.on('message', msg => {
    let wordArrary = msg.content.toLowerCase().split(" ");
  
    let filterWords = ["fuck", "f4ck", "cock", "c0ck", "shit", "bitch", "b1tch", "pussy", "ass", "sex", "cum", "bastard", "arse", "asshole", "bollocks", "brotherfucker", "bugger", "bullshit", "child-fucker", "Christ on a bike", "Christ on a cracker", "crap", "cunt", "damn", "eefing", "fatherfucker", "frigger", "goddamn", "godsdamn", "hell", "holyshit", "horseshit", "porn", "porm", "Jesus fuck", "Jesus wept", "motherfucker", "nigga", "prick", "shitass", "sisterfucker", "slut", "son of a bitch", "son of a whore", "twat"];
  
    for(var i = 0; i < filterWords.length; i++) {
      if(wordArrary.includes(filterWords[i])) {
        msg.delete();
        msg.channel.send(
          `${msg.author.username
          }, you can't send bad words here!\nRule 2: "Swearing is not permitted in this server. Violation of this rule will lead to an immediate ban."`
        );
      }
    }
});

client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
});

client.login('NzI1MDM0MjY3MDc5MzQ0MTU4.XvI2xw.6n5FTo-lkQlpLpObx5p4371Va3c');

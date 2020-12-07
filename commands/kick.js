module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    execute(message, args){
        const target = message.mentions.users.first();
        if(!message.member.permissions.has("KICK_MEMBERS")){
            message.channel.send("You don't have permission to run this command!");
            return;
        }
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.kick();
            message.channel.send("The member has succesfully been kicked from the server!");
        }else{
            message.channel.send(`You coudn't kick that member!`);
        }
    }
}
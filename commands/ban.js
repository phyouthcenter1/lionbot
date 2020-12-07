module.exports = {
    name: 'ban',
    description: "This command bans a member!",
    execute(message, args){
        const target = message.mentions.users.first();
        if(!message.member.permissions.has("BAN_MEMBERS")){
            message.channel.send("You don't have permission to run this command!");
            return;
        }
        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);
            memberTarget.ban();
            message.channel.send("The member has succesfully been banned from the server!");
        }else{
            message.channel.send(`You coudn't ban that member!`);
        }
    }
}
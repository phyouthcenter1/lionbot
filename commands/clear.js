module.exports = {
    name: 'clear',
    description: "Clear messages!",
    async execute(message, args) {
        if(!message.member.permissions.has("MANAGE_MESSAGES")){
            message.channel.send("You don't have permission to run this command!");
            return;
        }
        if(!args[0]) return message.reply("Please enter the ammount of messages to clear!");
        if(isNaN(args[0])) return message.reply("Please enter a number.");

        if(args[0] > 100 ) return message.reply("The limit to clear messages is 100.");
        if(args[0] <1 ) return message.reply("You must enter  a message greater than 0.");

        await message.channel.messages.fetch({limit: args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}
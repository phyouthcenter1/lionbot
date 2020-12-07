module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(message, args){
        message.channel.send('Calculating ping..').then(resultMessage => {
            const ping = resultMessage.createdTimestamp - message.createdTimestamp

            message.channel.send(`Bot ping: ${ping}`)
        })
    },
}
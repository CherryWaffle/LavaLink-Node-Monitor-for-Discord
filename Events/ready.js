const { MessageEmbed } = require("discord.js");
const config = require("../config.json")
module.exports = async (client) => {

 const channel = await client.channels.fetch(process.env.CHANNEL_ID)
    const embed = new MessageEmbed()
    .setColor("#2F3136")
    .setDescription("Please wait for a minute!\nStatus is being ready!")
    channel.bulkDelete(10);
    channel.send(embed).then((msg) => {
   setInterval(() =>{
     
            let all = []
            
            client.manager.nodes.forEach(node => {
              let info = []
              info.push(`Node: ${(node.options.identifier)}`)
              info.push(`Status: ${node.connected ? "🟩 Online" : "🟥 Offline"}`)
              info.push(`Player: ${node.stats.players}`)
              info.push(`Playing Players: ${node.stats.playingPlayers}`)
              info.push(`Uptime: ${new Date(node.stats.uptime).toISOString().slice(11, 19)}`)
              info.push("\nCPU")
              info.push(`Cores: ${node.stats.cpu.cores}`)
              info.push(`System Load: ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%`)
              info.push(`Lavalink Load: ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}%`)
              all.push(info.join('\n'))
            });
        const rembed = new MessageEmbed()
            .setAuthor('Lavalink Node', client.user.displayAvatarURL())
					  .setURL(`https://discodes.ml/lavalinks`)
            .setDescription(`\`\`\`${all.join('\n\n----------------------------\n')}\n\n` + 

                    `---------------------------- \n` +
                    `Hosting Server Info -> \n\n` +
                    `📁 Total Memory  :: ${Math.round(require('os').totalmem() / 1024 / 1024)} mb\n` +
                    `📁 Free Memory   :: ${Math.round(require('os').freemem() / 1024 / 1024)} mb\n` +
                    `📁 RSS           :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `📨 Heap Total    :: ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} mb\n` +
                    `📨 Heap Used     :: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} mb\n` +
                    `📋 External      :: ${Math.round(process.memoryUsage().external / 1024 / 1024)} mb\n` +
                    `📺 Array Buffer  :: ${Math.round(process.memoryUsage().rss / 1024 / 1024)} mb\n` +
                    `🔧 CPU Model     :: ${require('os').cpus()[0].model}\n` +
                    `🔃 Cores         :: ${require('os').cpus().length}\n` +
                    `🥏 Speed         :: ${require('os').cpus()[0].speed}Mhz\n` +
                    `💻 Platform      :: ${process.platform}\n` +
                    `💻 PID           :: ${process.pid}\n` +
                    `\n` + `\`\`\``)
					.addField("LavaLink Server" , `Click [here](https://github.com/freyacodes/Lavalink) for LavaLink's Source Code`)
                    .addField("LavaLink Monitor" , `Click [here](https://github.com/CherryWaffle/LavaLink-Node-Monitor-for-Discord) for LavaLink Monitor's Source Code`)
            .setColor("#9966ff")
            
        .setTimestamp(Date.now());
        msg.edit(rembed);
        }, 2000);})
  
    client.manager.init(client.user.id);
    console.log(`${client.user.username} online!`);
    
} 
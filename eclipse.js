const Discord = require("discord.js");
const client = new Discord.Client();
const request = require('request');

var prefix = "!";

	var hoje = new Date();
            var dd = hoje.getDate();
            var mm = hoje.getMonth()+1;
            var hh = hoje.getHours()-3;
            var min = hoje.getMinutes();
            var ss = hoje.getSeconds();
            var yyyy = hoje.getFullYear();
            if(dd<10){
                dd = '0'+dd;
            }
            if (mm<10) {
                mm = '0'+mm;
            }
            if (hh<10){
		if(hh<01){
		    hh = 3+hh;
		}
                hh = '0'+hh;
            }
            if (min<10){
                min = '0'+min;
            }
            var hoje = dd+ '/' +mm+ '/' +yyyy + ' às ' + hh + ':' + min;
	    var hojee = dd+ '/' +mm+ '/' +yyyy;

client.on("ready", () => {
	
    client.channels.get('449624551505264640').send(':white_check_mark: | Bot reiniciado com sucesso !\n\nData: ' + hoje).then(msg => {
    	msg.delete(60000)
    })
    client.channels.get('449624551505264640').send('<@318511700808695818>').then(msg => {
    	msg.delete(10000)
    })
	    
    const activities = ['jogar.loop-mc.com.br', 'Divulgue nosso discord', 'Sorteio de minecraft full acessos !', 'Sorteio de VIPs']
    let counter = 0
    setInterval(function() {
        client.user.setGame(activities[counter], "https://twitch.tv/zgholsk")
        counter+= 1
        counter %= activities.length
    }, 10000)
});

client.on('message', (message) => {
	
    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
	
    if(message.channel.type === 'dm') return;
	
    if (!message.content.startsWith(prefix) || message.author.bot) return;
	
    if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)){
  	message.delete();
	message.author.send(`:x: | Você não pode divulgar em ${message.channel} ! :rage: !`).then(msg => {
		msg.delete(10000)
	})
	let embed = new Discord.RichEmbed()
	    .setTitle(':warning: LoopLogs - Divulgação :warning:')
	    .addField('Autor:', `<@!${message.author.id}>`)
	    .addField('Discord:', message.content)
	    .addField('Canal:', `<#${message.channel.id}>`)
	    .setColor('f7db60')
	    .setFooter(client.user.username, client.user.avatarURL)
	client.channels.get('449624551505264640').send(embed);
	client.channels.get('449624551505264640').send('<@&421714694672351237>').then(msg => {
		msg.delete(10000);
	})
  	return;
    }
	
	
    if(msg.startsWith(prefix + 'EMBED')){
        
	message.delete();
        if(!message.member.roles.find("name", 'DC Configurator')) return message.channel.sendMessage(":x: | Você não possui permissão").then(msg => {
		msg.delete(10000)
	})
      	let args1 = message.content.slice(prefix.length + 5).split('/');
        let embed = new Discord.RichEmbed()
	    .setTitle(`:loudspeaker: LoopAnúncio - ${args1[0]} :loudspeaker:`)
	    .setDescription(args1[1])
            .setThumbnail('https://i.imgur.com/7MtwvU4.png')
	    .setColor('f26363')
	    .setFooter(message.author.username, message.author.avatarURL)
	message.channel.send(embed);

    }
	
    if(msg.startsWith(prefix + 'CHANGELOG')){
        
	message.delete();
        if(!message.member.roles.find("name", '🔰 • Staff')) return message.channel.sendMessage(":x: | Você não possui permissão").then(msg => {
		msg.delete(10000)
	})
      	let args1 = message.content.slice(prefix.length + 9);
        let embed = new Discord.RichEmbed()
            .setTitle(`:loudspeaker: LoopLogs - ${hojee} :loudspeaker:`)
            .setDescription(` - ${args1}`)
	    .setThumbnail('https://i.imgur.com/7MtwvU4.png')
	    .setColor('f26363')
	    .setFooter(message.author.username, message.author.avatarURL)
	client.channels.get('416304384687734795').send('@everyone').then(msg => {
		msg.delete(10000);
	})
	client.channels.get('416304384687734795').send({embed});
    }
	
    if(msg.startsWith(prefix + 'AVISO')){
        
	message.delete();
        if(!message.member.roles.find("name", '🔰 • Staff')) return message.channel.sendMessage(":x: | Você não possui permissão").then(msg => {
		msg.delete(10000)
	})
      	let args1 = message.content.slice(prefix.length + 5).split(";");
        let embed = new Discord.RichEmbed()
            .setFooter(hoje)
            .setTitle(`:loudspeaker: LoopAnúncio - ${args1[0]} :loudspeaker:`)
            .setDescription(args1[1])
	    .setThumbnail('https://i.imgur.com/7MtwvU4.png')
            .addField('Atenciosamente,', message.author)
	    .setColor('f26363')
	client.channels.get('416304349699112961').send('@everyone').then(msg => {
		msg.delete(10000);
	})
	client.channels.get('416304349699112961').send({embed});
    }
	
    if(msg.startsWith(prefix + 'INFO')){
    
        var IP = 'jogar.loop-mc.com.br';
        var Porta = '25565';
        message.delete();
        var url = 'http://mcapi.us/server/status?ip=' + IP + '&port=' + Porta;
        request(url, function(err, response, body) {
		
            if(err){
	        client.channels.get('449624551505264640').send(`:x: | Erro de conexão com o server ${IP}`);
                return message.reply(':x: | Erro !!! Servidor não encontrado !')
	    }
            body = JSON.parse(body);
	    if(body.online){
	        if(body.players.now){
	            let embed = new Discord.RichEmbed()
	                .setTitle('📢 LoopStatus 📢')
                        .setDescription('Informações sobre nosso server !')
                        .addField(':white_check_mark: | Conexão: ', 'Rede em Funcionamento !')
		        .addField('⚔ | Jogadores: ', body.players.now)
                        .setTimestamp()
                        .setFooter(`Requisitado por: ${message.author.username}`, message.author.avatarURL)
			.setColor('a7f970');
		    message.channel.send(embed).then(msg => {
		        msg.delete(20000)
		    })
                }else{
	            let embed = new Discord.RichEmbed()
	                .setTitle('📢 LoopStatus 📢')
                        .setDescription('Informações sobre nosso server !')
                        .addField(':x: | Conexão: ', 'Rede em Manutenção !')
		        .addField('⚔ | Jogadores: ', 'Nenhum')
			.setColor('f97070');
		    message.channel.send(embed);
		}
	    }else{
	        let embed = new Discord.RichEmbed()
	            .setTitle('📢 LoopStatus 📢')
                    .setDescription('Informações sobre nosso server !')
                    .addField(':x: | Conexão: ', 'Rede Inoperantes !')
		    .setColor('f97070');
		message.channel.send(embed);
	    }
		
	});
    
    }
	
});

client.on('guildMemberAdd', member => {
	var hoje = new Date();
            var dd = hoje.getDate();
            var mm = hoje.getMonth()+1;
            var hh = hoje.getHours();
            var min = hoje.getMinutes();
            var ss = hoje.getSeconds();
            var yyyy = hoje.getFullYear();
            if(dd<10){
                dd = '0'+dd;
            }
            if (mm<10) {
                mm = '0'+mm;
            }
            if (hh<10){
                hh = '0'+hh;
            }
            if (min<10){
                min = '0'+min;
            }
            var hoje = dd+ '/' +mm+ '/' +yyyy + ' às ' + hh + ':' + min;
	let avatar = member.user.avatarURL
  
	let embed = new Discord.RichEmbed()
		.setColor('RANDOM')
		.setThumbnail(avatar)
		.addField(':tada: | Seja Bem vindo(a)!', `» Bem vindo(a) ao Discord da Rede LoopMC ${member}!\n \nNosso IP: jogar.loop-mc.com.br\n \nNosso Site: https://loop-mc.com.br/`)
		.setFooter(`${member.guild.name} × ${hoje}`);
    	client.channels.get('446378249740615700').send({embed});
  })

client.login(process.env.BOT_TOKEN);

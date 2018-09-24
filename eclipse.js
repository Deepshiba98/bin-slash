const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require('ms');
const moment = require('moment');

var prefix = "/";

var hoje = new Date();
            var dd = hoje.getDate();
            var mm = hoje.getMonth()+1;
            var hh = hoje.getHours()+1;
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

    console.log(' ');
    console.log(' ');
    console.log('O Second Life BOT foi iniciado com sucesso!');
    console.log('Data: ' + hoje);
    console.log(' ');
    console.log(' ');

    client.channels.get('493119324513632276').send(':white_check_mark: | Bot reiniciado com sucesso !\n\nData: ' + hoje).then(msg => {
    	msg.delete(60000)
    })
        
    const activities = ['My Second Life RP', `Somos ${client.users.size} amiguinhos !`]
    let counter = 0
    setInterval(function() {
        counter+= 1
        counter %= activities.length
    }, 10000)

    const activities2 = ['LISTENING', 'WATCHING', 'PLAYING', 'WATCHING']
    let counter2 = 0
    setInterval(function() {
        client.user.setActivity(activities[counter], { type: activities2[counter2] })
        counter2+= 1
        counter2 %= activities2.length
    }, 10000)

});

client.on('message', (message) => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    
    if(message.channel.type === 'dm') return;

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    if(msg.startsWith(prefix + 'PING')){

        message.reply(new Date().getTime() - message.createdTimestamp + " ms").then(msg => {
            msg.react('🏓');
        });

    }

    if(/(?:https?:\/)?discord(?:app.com\/invite|.gg)/gi.test(message.content)){
        message.delete();
      message.author.send(`:x: | Você não pode divulgar outros servidores em ${message.channel} ! :rage: !`).then(msg => {
          msg.delete(10000)
      })
      let embed = new Discord.RichEmbed()
          .setTitle(':warning: SecondLife BOT Logs - Divulgação :warning:')
          .addField('Autor:', `<@!${message.author.id}>`)
          .addField('Discord:', message.content)
          .addField('Canal:', `<#${message.channel.id}>`)
          .setColor('f7db60')
          .setFooter(client.user.username, client.user.avatarURL)
      client.channels.get('493119324513632276').send(embed);
      client.channels.get('493119324513632276').send('<@&421714694672351237>').then(msg => {
          msg.delete(10000);
      })
        return;
      }

    if(msg.startsWith(prefix + 'AJUDA') || msg.startsWith(prefix + 'HELP') || msg.startsWith(prefix + 'INFO')){

        message.delete();

        const nada = new Discord.RichEmbed()
            .setAuthor(message.guild, message.author.avatarURL)
            .setTitle(`<:logo:493458750049484831> Olá ${message.author.tag}, posso ajudar ?`)
            .setDescription("Eu sou um rabô e fui criado pelo <@125324468913438720>, pois se encontrar algum erro/bug em mim por-favor informe a STAFF.\n\n**💡 | Prefixo:**\nMeu prefixo é ``/``\n\n**Servidor será aberto brevemente.**")
            .setColor('RANDOM')
            .setThumbnail('https://i.imgur.com/Td24sD6.png')
            .setTimestamp()

        message.author.send(nada).then(msg => {
            msg.delete(50000);
        });

        const depois = new Discord.RichEmbed()
            .setAuthor('Lista disponível:', client.user.avatarURL)
            .setDescription("**👮 Administração** - *(Veja sobre comandos de administração.)*\n\n**💡 Outros** - *(Veja sobre outros comandos.)*")
            .setColor('RANDOM')
            .setTimestamp()

        message.author.send(depois).then(msg => {
            msg.delete(50000);

            msg.react('👮').then(r => {

                if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.author.send('😕 | Ops... Desculpe esse comando está em manutenção.').then(msg => {
                    msg.delete(10000);
                });

                const adm = (reaction, user) => reaction.emoji.name === '👮' && user.id === message.author.id;

                const mda = msg.createReactionCollector(adm, { time: 49000 });

                mda.on('collect', r => {

                    const comandinhos = new Discord.RichEmbed()
                        .setTitle('👮 Administração')
                        .setColor('d83f31')
                        .setDescription('*Veja informações sobre os comandos de administração.*')
                        .addField('📢 | Anúncio:', "/anuncio ``<mensagem>.``", true)
                        .addField('📰 | ChangeLog:', "/changelog ``<mensagem>.``", true)
                        .addField('🗑 | LimparChat:', "/cc ``<1 a 100>``", true)
                        .addField(':no_entry_sign: | Ban:', "/ban ``<@membro>`` ``<motivo>``", true)
                        .addField(':mute: | Desmutar', "/desmutar ``<@membro>``", true)
                        .addField('👢 | Kick:', "/kick ``<@membro>`` ``<motivo>``", true)
                        .addField('⏰ | Mutar:', "/mutar ``<@membro>`` ``<tempo>`` - *(1s = 1 Segundo)* **Modos: s/m/d/h**")
                        .setThumbnail(client.user.avatarURL)

                    message.author.send(comandinhos).then(msg1 => {
                        msg1.delete(30000);
                    });

                });

            })

            msg.react('💡').then(r => {

                const cmd = (reaction, user) => reaction.emoji.name === '💡' && user.id === message.author.id;

                const dmc = msg.createReactionCollector(cmd, { time: 49000 });

                dmc.on('collect', r => {

                    const comandinhos = new Discord.RichEmbed()
                        .setTitle('💡 Outros')
                        .setColor('efd94a')
                        .setDescription('*Veja informações sobre outros comandos.*')
                        .addField('🏓 | Ping:', 'Veja seu ping.', true)
                        /*.addField('<:youtuber:454339303821279242> | Requisitos:', "/requisitos", true)*/
                        .addField('💁 | Informações do Servidor:', "/serverinfo", true)
                        .addField('🖼 | Avatar:', "/avatar ``<@membro>``", true)
                        .addField('🛡 | Denúncia:', "/denunciar ``<@membro>`` ``<motivo>`` - ``<prova>``")
                        .addField('💡 | Sugestão:', "/sugerir ``<sugestão>``")
                        .setThumbnail(client.user.avatarURL)

                    message.author.send(comandinhos).then(msg1 => {
                        msg1.delete(30000);
                    });

                });

            })

        });

        message.reply(':bell: | Enviei as informações no seu privado!').then(msg => {
            msg.delete(10000);
        });
    }

    if(msg.startsWith(prefix + 'LIMPAR') || msg.startsWith(prefix + 'CC') || msg.startsWith(prefix + 'CLEARCHAT')){

        message.delete();

        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        const embed = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTitle('🚽 | Limpeza')
            .setThumbnail(client.user.avatarURL)
            .setDescription("*Limpe os canais.*\n\n⛓ **| /limpar ``<1 a 100>``**\n\n:twisted_rightwards_arrows: **| Alternativas:**\n/cc, /clearchat")

        if(isNaN(args[0])) return message.channel.send({embed}).then(msg => {
            msg.delete(20000);
        });

        if(args[0] < 2 || args[0] > 100) return message.channel.send({embed}).then(msg => {
            msg.delete(20000);
        });

        message.channel.bulkDelete(args[0]);

        const limpo = new Discord.RichEmbed()
            .setTimestamp()
            .setFooter('Limpeza', client.user.avatarURL)
            .setTitle('🚽 | Limpeza')
            .setColor('22d615')
            .setDescription('*Limpe os canais.*')
            .addField('⚙ | Status:', 'Limpo com sucesso.', true)
            .addField('🗑 | Mensagem apagadas:', args[0], true)

        message.channel.send(limpo).then(msg => {
            msg.delete(20000);
        });

    }

    /*if(msg.startsWith(prefix + 'REQUISITOS') || msg.startsWith(prefix + 'YT') || msg.startsWith(prefix + 'YOUTUBE')){

        message.delete();

        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setFooter(`Comando usado: ${message.content}`)
            .setTimestamp()
            .setThumbnail('https://i.imgur.com/HhJxVEk.png')
            .setTitle('<:youtuber:454339303821279242> | Requisitos')
            .setDescription('*Requisitos para tag youtubers, utilize /requisitos.*')
            .addField('💖 | Youtubers', '10k inscritos.', true)
            .addField('<:pkbswag:446437162322231296> | Ativar', 'Para ativar chame um Staff.', true)
            .addField(':twisted_rightwards_arrows: | Alternativas:', '/yt, /youtube')
        message.channel.send({embed}).then(msg => {
            msg.delete(25000);
            msg.react('💖');
        });

    }*/

    if(msg.startsWith(prefix + 'ANUNCIO')){

        message.delete();

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        const cnt = message.content.slice(prefix.length + 8);

        if(!cnt) return message.reply(':x: | Você não adicionou uma mensagem.').then(msg => {
            msg.delete(10000);
        });

        /*const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTitle('📢 Anúncio')
            .setDescription(cnt)
        client.channels.get('485569932449546240').send({embed}).then(msg => {
            msg.react('💖');
            msg.react('💎');
        });
        client.channels.get('485569932449546240').send(':bell: | Pedimos desculpa pelo everyone... Isto é apenas um anúncio!\n\n[ @everyone ] [ @here ]').then(msg => {
            msg.delete(5000);
        });*/

        const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setFooter(message.author.tag, message.author.avatarURL)
            .setThumbnail('https://i.imgur.com/Td24sD6.png')
            .setTitle('📢  Anúncio - My Second Life')
            .addField('**Atenciosamente,**', message.author)
            .setTimestamp()
			.setDescription(`⤳ ${cnt}`)
        client.channels.get('493119324513632276').send({embed}).then(msg => {
        });
        client.channels.get('493119324513632276').send(' | Pedimos desculpa pelo everyone... Isto é apenas um anúncio!\n\n[ @everyone ] [ @here ]').then(msg => {
            msg.delete(5000);
        });

    }

    if(msg.startsWith(prefix + 'CHANGELOG')){

        message.delete();

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        const cnt = message.content.slice(prefix.length + 10);

        if(!cnt) return message.reply(':x: | Você não adicionou uma mensagem.').then(msg => {
            msg.delete(10000);
        });

        /*const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setFooter(message.author.tag, message.author.avatarURL)
            .setTitle('📢 ChangeLog')
			.setDescription(cnt)
        client.channels.get('493119324513632276').send({embed}).then(msg => {
            msg.react('💖');
            msg.react('💎');
        });
        client.channels.get('493119324513632276').send(':bell: | Desculpe pelo everyone... Isso é apenas um anúncio!\n\n[ @everyone ] [ @here ]').then(msg => {
            msg.delete(5000);
        });*/
        const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setFooter(message.author.tag, message.author.avatarURL)
            .setThumbnail('https://i.imgur.com/Td24sD6.png')
            .setTitle('📢  Logs - My Second Life')
            .addField(`:date: ${hojee}`, `⤳ ${cnt}`)
            .addField('**Atenciosamente,**', message.author)
			/*.setDescription()*/
        client.channels.get('493119324513632276').send({embed}).then(msg => {
        });
        client.channels.get('493119324513632276').send(' | Pedimos desculpa pelo everyone... Isto é apenas um anúncio!\n\n[ @everyone ] [ @here ]').then(msg => {
            msg.delete(5000);
        });

    }

    if(msg.startsWith(prefix + 'TEMPMUTE') || msg.startsWith(prefix + 'MUTAR') || msg.startsWith(prefix + 'MUTE')){

        message.delete();

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        let role = message.guild.roles.find('name', 'MUTADO');
        const ert = new Discord.RichEmbed()
            .setTitle(':warning: Opaah... Erros encontrados !')
            .addField(':no_entry_sign: | Erro encontrado:', "Grupo ``MUTADO`` não foi encontrado porfavor crie-o!")
            .setColor('f4eb42')
            .setTimestamp()
            .setFooter('Erro: TempMute', client.user.avatarURL)
        if(!message.guild.roles.exists("name", "MUTADO")) return client.channels.get('493119324513632276').send(ert);

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('⏰ TempMute')
            .setDescription("*Mute membros temporariamente.*\n\n:bulb: **| /mutar ``<@membro>`` ``<tempo>`` ``<motivo>`` - ``<provas>``** - *(1s = 1 Segundo)* **Modos: s/m/d/h**")
            .addField(':twisted_rightwards_arrows: | Alternativa:', '/tempmute, /mute')

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let time = args[1];

        if(!time) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let motivo = args.slice(2).join(" ").split('-');
        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        if(!motivo[1]) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        var tempo = ms(ms(time));

        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`:no_entry_sign: Punições - Mute Temporario`)
            .addField(':spy: | Usuário punido:', user, true)
            .addField(':cop: | Autor do punimento:', message.author, true)
            .addField('💬 | Canal:', message.channel, true)
            .addField('⏰ | Tempo:', tempo, true)
            .addField(':pencil: | Motivo:', motivo[0], true)
            .addField('🖼 | Prova:', motivo[1], true)
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setColor('d62a13')
        client.channels.get('493119324513632276').send({embed}).then(msg => {
            msg.react('⏰');
        });

        user.addRole(role)

        const completo = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`:no_entry_sign: Você foi mutado !`)
            .addField(':cop: | Autor do punimento:', message.author.tag)
            .addField(':pencil: | Motivo:', motivo[0])
            .addField('🖼 | Prova:', motivo[1], true)
            .addField('⏰ | Tempo:', tempo)
            .addField('💬 | Canal:', message.channel, true)
            .setFooter(`Seu ID: ${user.id}`)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setColor('d62a13')
        user.send(completo);

        message.reply(':bell: | Usuário punido com sucesso!').then(msg => {
            msg.delete(10000);
        });

        setTimeout(function() {

            if(!user.roles.has(role.id)) return;

            user.removeRole(role);
            user.send('⏰ | Seu tempo acabou... Você foi desmutado com sucesso!');

            const unmutee = new Discord.RichEmbed()
                .setAuthor(user.user.tag, user.user.avatarURL)
                .setTimestamp()
                .setColor('RANDOM')
                .setThumbnail(client.user.avatarURL)
                .setTitle(`🔇 Desmutado`)
                .setDescription(`:spy: **|** **Usuário:**\n${user}\n:cop: **| Autor:**\n${client.user}`)
                .setFooter(`ID do usuário: ${user.id}`)
            client.channels.get('493119324513632276').send(unmutee)

        }, ms(time));

    }

    if(msg.startsWith(prefix + 'DESMUTAR') || msg.startsWith(prefix + 'UNMUTE')){

        message.delete();

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        let role = message.guild.roles.find('name', 'MUTADO');
        const ert = new Discord.RichEmbed()
            .setTitle(':warning: Opaah... Erros encontrados !')
            .addField(':no_entry_sign: | Erro encontrado:', "Grupo ``MUTADO`` não foi encontrado porfavor crie-o!")
            .setColor('f4eb42')
            .setTimestamp()
            .setFooter('Erro: TempMute', client.user.avatarURL)
        if(!message.guild.roles.exists("name", "MUTADO")) return client.channels.get('493119324513632276').send(ert);

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('🔇 Desmutar')
            .setDescription("*Desmute membros.*\n\n:bulb: **| /desmutar ``<@membro>``**")
            .addField(':twisted_rightwards_arrows: | Alternativa', '/unmute')

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        if(!user.roles.has(role.id)) return message.reply(':x: | Esse jogador não está mutado !').then(msg => {
            msg.delete(10000);
        });

        user.removeRole(role);
        user.send('⏰ | Você foi desmutado com sucesso!');

        const unmutee = new Discord.RichEmbed()
            .setAuthor(user.user.tag, user.user.avatarURL)
            .setTimestamp()
            .setColor('RANDOM')
            .setThumbnail(client.user.avatarURL)
            .setTitle(`🔇 Desmutado`)
            .setDescription(`:spy: **|** **Usuário:**\n${user}\n:cop: **| Autor:**\n${message.author}`)
            .setFooter(`ID do usuário: ${user.id}`)
        client.channels.get('493119324513632276').send(unmutee);

        message.reply(':bell: | Usuário desmutado com sucesso!').then(msg => {
            msg.delete(10000);
        });

    }

    if(msg.startsWith(prefix + 'BANIR') || msg.startsWith(prefix + 'BAN')){

        message.delete()

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('🚫 Banir')
            .setDescription("*Banir membros permanentemente.*\n\n:bulb: **| /banir ``<@membro>`` ``<motivo>``**")
            .addField(':twisted_rightwards_arrows: | Alternativa:', '/ban')

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let motivo = args.slice(1).join(" ");

        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`:no_entry_sign: Punições - Banimento`)
            .addField(':spy: | Usuário punido:', user, true)
            .addField(':cop: | Autor do punimento:', message.author, true)
            .addField(':pencil: | Motivo:', motivo, true)
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setColor('d62a13')
        client.channels.get('493119324513632276').send({embed}).then(msg => {
            msg.react('🚫');
        });

        message.reply(':bell: | Usuário punido com sucesso!').then(msg => {
            msg.delete(10000);
        });

        user.ban((`${motivo} - By: ${message.author.tag}`), 150);

    }

    if(msg.startsWith(prefix + 'EXPULSAR') || msg.startsWith(prefix + 'KICK')){

        message.delete()

        if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('👢 Expulsar')
            .setDescription("*Expulse membros.*\n\n:bulb: **| /expulsar ``<@membro>`` ``<motivo>``**")
            .addField(':twisted_rightwards_arrows: | Alternativa:', '/kick')

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let motivo = args.slice(1).join(" ");

        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle(`:no_entry_sign: Punições - KICK`)
            .addField(':spy: | Usuário punido:', user, true)
            .addField(':cop: | STAFF:', message.author, true)
            .addField(':pencil: | Motivo:', motivo, true)
            .setFooter(`ID do usuário: ${user.id}`)
            .setTimestamp()
            .setThumbnail(message.author.avatarURL)
            .setColor('d62a13')
        client.channels.get('493119324513632276').send({embed}).then(msg => {
            msg.react('👢');
        });

        message.reply(':bell: | Usuário punido com sucesso!').then(msg => {
            msg.delete(10000);
        });

        user.kick((`${motivo} - By: ${message.author.tag}`), 150);

    }

    if(msg.startsWith(prefix + 'SERVERINFO')){

        message.delete();

        let regiao = {

            "brazil": "Brasil",
            "eu-central": "Europa central",
            "singapore": "Singapora",
            "us-central": "U.S. Central",
            "sydney": "Sydney",
            "us-east": "U.S. East",
            "us-south": "U.S. Sul",
            "us-west": "U.S. West",
            "eu-west": "Western Europe",
            "vip-us-east": "VIP U.S. East",
            "london": "London",
            "amsterdam": "Amsterdam",
            "hongkong": "Hong Kong"

        }

        const embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle('💁 Informações do Servidor')
            .setDescription('Informações sobre o servidor.')
            .addField('⚙ | ID:', message.guild.id, true)
            .addField(':crown: | Pai de todos:', message.guild.owner, true)
            .addField(':earth_americas: | Local:', regiao[message.guild.region], true)
            .addField(':date: | Criado em:', moment(message.guild.createdAt).format('DD/MM/YY') + ' às ' + moment(message.guild.createdAt).format('HH:mm'), true)
            .addField('<:ai:456100450786213938> | Entrou em:', moment(message.guild.joinedAt).format('DD/MM/YY') + ' às ' + moment(message.guild.joinedAt).format('HH:mm'), true)
            .addField('<:visionario:452700782001913867> | Total de:', message.guild.memberCount, true)
            .setColor('RANDOM')
            .setThumbnail(client.user.avatarURL)
            .setTimestamp()
        message.channel.send(embed);

    }

    if(msg.startsWith(prefix + 'MESSAGE')){

        message.delete();

        if(message.author.id !== '318511700808695818') return;

        let args1 = args.slice(0).join(" ").split('-');

        message.channel.send(args1);

    }

    if(msg.startsWith(prefix + 'SAY')){

        message.delete()

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        let args1 = message.content.slice(prefix.length + 4);

        const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setFooter('Mensagem da STAFF', message.author.avatarURL)
            .setThumbnail('https://i.imgur.com/Td24sD6.png')
            .setTitle('<:logo:493458750049484831> My Second Life')
            .addField(`⤳ ${args1}`, '_ _')
            .setDescription('_ _')
            /*.addField('**Atenciosamente,**', message.author)*/
            .addField('_ _', '**Atenciosamente,**')
            .setTimestamp()

        message.channel.send(embed);

    }

    /*if (message.content.toLowerCase().startsWith(prefix + `ticket`)) {
        
        message.delete()

        const reason = message.content.split(" ").slice(1).join(" ");
        if (!message.guild.roles.exists("name", "+perm")) return message.channel.send(`Este servidor não tem uma '+perm' função feita, assim que o bilhete não será aberto.\n Se você é um administrador, faça um com esse nome exatamente e dê-o aos usuários que devem poder ver bilhetes.`);
        if (message.guild.channels.exists("name", "ticket-" + message.author.username)) { message.channel.send(`Você já possui um ticket aberto!.`).then(msg => {
            msg.delete(6000);
            return;
        })}
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "+perm");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            if (!message.channel.send(`:white_check_mark: ${message.author} O seu ticket foi criado com sucesso em <#${c.id}>!`).then(msg => {
                msg.delete(6000);
            }));
            const embed = new Discord.RichEmbed()
            .setColor(0xCF40FA)
            .addField(`Olá ${message.author.username}!`, `Por favor, tente explicar por que você abriu este bilhete com o máximo de detalhes possível. Nossa equipe de apoio estará aqui em breve para ajudar.`)
            .setTimestamp();
            c.send({ embed: embed });
        }).catch(console.error);
    }
    if (message.content.toLowerCase().startsWith(prefix + `fechar`)) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Este comando só pode ser usado em tickets!`);
    
        message.channel.send(`Você tem certeza?\nPara confirmar use  \`*confirmar\`. Caso não haja resposta, cancelaremos o pedido de encerramento do ticket em 10 segundos..`)
        .then((m) => {
          message.channel.awaitMessages(response => response.content === '*confirmar', {
            max: 1,
            time: 10000,
            errors: ['time'],
          })
          .then((collected) => {
              message.channel.delete();
            })
            .catch(() => {
              m.edit('Encerramento de ticket cancelado.\nO ticket continuará aberto.').then(m2 => {
              }, 3000);
            });
        });
    }*/
    

    if(msg.startsWith(prefix + 'DENUNCIAR') || msg.startsWith(prefix + 'REPORT') || msg.startsWith(prefix + 'REPORTAR')){

        message.delete();

        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        let motivo = args.slice(1).join(" ").split('-');

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('🛡 Denúnciar')
            .setDescription("*Denúncia membros.*\n\n:bulb: **| /denunciar ``<@membro>`` ``<motivo>`` - ``<prova>``**")
            .addField(':twisted_rightwards_arrows: | Alternativa:', '/report, /reportar')

        if(!user) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        if(!motivo[1]) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('🛡');
        });

        const reportado = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('🛡 Denúncia')
            .setDescription('Nova denúncia criada.')
            .addField('<:empresario:457899299213279243> | Acusado:', user, true)
            .addField('<:pm:457899299376726016> | Autor:', message.author, true)
            .addField('💬 | Canal:', message.channel, true)
            .addField('📝 | Motivo:', motivo[0], true)
            .addField('🖼 | Prova:', motivo[1], true)
            .setThumbnail(client.user.avatarURL)
        client.channels.get('493119324513632276').send(reportado).then(msg => {
            msg.react('✅');
            msg.react('❌');
        });

        message.reply('🛡 | Sua denúncia foi enviada com sucesso, agradecemos pela sua denúncia!').then(msg => {
            msg.delete(10000);
        });

    }

    if(msg.startsWith(prefix + 'SUGERIR')){

        message.delete();

        let sugerindo = args.slice(0).join(" ");

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('📝 Sugestão')
            .setDescription("*Faça sugestões para o nosso servidor.*\n\n:bulb: **| /sugerir ``<sugestão>``**")

        if(!sugerindo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
            msg.react('💡');
        });

        const embed = new Discord.RichEmbed()
            .setThumbnail(client.user.avatarURL)
            .setTitle('💡 Sugestão')
            .setColor('RANDOM')
            .setDescription('Faça sua sugestão, /sugerir.')
            .addField('📝 | Sugestão:', sugerindo)
            .addField('<:visionario:452700782001913867> | Autor:', message.author, true)
        client.channels.get('493119324513632276').send({embed}).then(msg => {
            msg.react('👍');
            msg.react('👎');
        });

        message.reply('💡 | Sua sugestão foi enviada com sucesso.').then(msg => {
            msg.delete(10000);
        });
    }

    if(msg.startsWith(prefix + 'AVATAR')){

        message.delete();

        let picture = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;

        if(!picture) message.reply(":x: | Use: /avatar ``<@membro>``").then(msg => {
            msg.delete(10000);
        });

        const embed = new Discord.RichEmbed()
            .setDescription(`[Clique aqui](${picture}) para baixar a imagem.`)
            .setImage(picture)
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTimestamp()
        message.channel.send(embed);

    }

    if(msg.startsWith(prefix + 'ENQUETE') || msg.startsWith(prefix + 'VOTAÇAO')){

        message.delete();

        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(':x: | Você não pode usar esse comando.').then(msg => {
            msg.delete(10000);
        });

        const erd = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('📮 Enquete')
            .setDescription("*Faça uma enquete temporaria.*\n\n:bulb: **| /enquete ``<votação>``**")
            .addField(':twisted_rightwards_arrows: | Alternativa:', '/votaçao')

        let motivo = args.slice(0).join(" ");
        if(!motivo) return message.channel.send(erd).then(msg => {
            msg.delete(20000);
        });

        /*const embed = new Discord.RichEmbed()
            .setTitle('📮 Enquete')
            .setColor('RANDOM')
            .addField('📝 | Votação:', motivo)
            .setTimestamp()
            .setFooter(message.author.tag, message.author.avatarURL)*/

            const embed = new Discord.RichEmbed()
            .setColor('f44242')
            .setFooter('Autor: ' + message.author.tag, message.author.avatarURL)
            .setThumbnail('https://i.imgur.com/Td24sD6.png')
            .setTitle(':loudspeaker: Votação')
            .addField(':postbox: | Informações:', motivo)
            .setTimestamp()

        client.channels.get('493119324513632276').send({embed}).then(msg => {

            msg.react('👍');
            msg.react('👎');

        });

        client.channels.get('493119324513632276').send('@everyone').then(msg => {
            msg.delete(5000);
        });

        message.reply(':white_check_mark: | Enquete criada com sucesso, confira em <#493119324513632276>.').then(msg => {
            msg.delete(10000);
        });

    }

});

client.on('guildMemberAdd', member => {

    let avatar = member.user.avatarURL;

    let role = member.guild.roles.find('name', '👤 Civil 👤');

    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(avatar)
        .setDescription('_ _')
        .setAuthor(`${member.user.tag}`, client.user.avatarURL)
        .addField('🍻 | Seja bem-vindo(a)', 'Você acabou de entrar no discord da rede <:logo:493458750049484831> **My Second Life RP** o melhor servidor de FiveM para se jogar.\n', true)
        .addField('_ _', 'Aqui você pode interagir com diversas pessoas, fazer amigos e muito mais! Qualquer dúvida, chame algum dos nossos membros da STAFF.\n\n', true)
        .addField('⭐ | Novidades', 'Veja todas as novidades em <#485215309553205262>.\n\n', true)
        .addField(':warning:  | Fique atento!', 'Leia as nossas <#485218949890572304> e evite ser punido!\n', true)
        .addField('_ _', 'Sabia que o nosso servidor conta com um sistema de ranks exclusivos? Evolua o seu rank integarindo com os nossos usuários em canais de conversas e chegue ao TOP!\n\n', true)
        .setFooter(`My Second Life RP • © Todos direitos reservados.`, 'https://i.imgur.com/Td24sD6.png')
        .setTimestamp()
    client.channels.get('485569932449546240').send({embed}).then(msg => {
        msg.react('493458750049484831')
    });

    member.addRole(role);

});

client.login(process.env.BOT_TOKEN);

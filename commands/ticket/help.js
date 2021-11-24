const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: [''],

    async execute(client, message, args) {
        const $o = async () => {
            if (!message.guild) {
                return;
            }

            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
                return message.delete(), message.channel.send(`Você não tem permissão para executar tal comando`);
            }

            let embed = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(
                    '`-clear`: para limpar os chats\n  `-como-reportar`: para mandar a mensagem de como reportar\n  `-embed`: para mandar qualquer frase que escreva em embed\n  `-embedimage`: para mandar uma embed com a imagem que deseja\n  `-report`: comando usado para abrir o ticket\n  `-say`: comando usado para falar sem embed\n  `-setarcanal-banimento`: comando usado para setar o canal da mensagem de banimentos\n  `-setarcargo-verificado`: comando usado para setar o cargo de "verificado"\n `-setarcategoria`: comando usado para setar a categoria onde os tickets irão abrir\n  `-setarcanal-report`: comando usado para setar o canal onde irão aprovar os tickets\n  `-setarcanal-verificar`: comando usado para setar o canal em que aprovarão as verificações\n `-verificar`: comando usado para mandar a mensagem de verificação',
                );

            message.delete();
            message.channel.send({ embeds: [embed] });
        };

        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};

const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Message, MessageCollector } = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'setariniciar-comoreportar',
	aliases: [''],

	async execute(client, message, args) {
		const $o = async () => {
			if (!message.guild) {
				return;
			}

			if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
				return message.delete(), message.channel.send(`Você não tem permissão para executar tal comando`);
			}
			const id = args[0];

			if (!id) {
				message.delete();
				message.channel.send(`Coloque o ID do canal de mensagens de banimentos.`);
			} else {
				db.set(`IniciarReportar_${message.guild.id}`, id);
				message.delete();
				message.channel.send(`O iniciar de como-reportar foi setado nesse ID: ${id}`);
			}
		};

		try {
			$o();
		} catch (err) {
			console.log(err);
		}
	},
};

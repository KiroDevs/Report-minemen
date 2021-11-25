const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Message, MessageCollector } = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'setarcanal-verificar',
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
				message.channel.send(`Coloque o ID do canal.`);
			} else {
				db.set(`CanalVerificar_${message.guild.id}`, id);
				message.delete();
				message.channel.send(`O canal para mensagens de verificação foi setado nesse ID: ${id}`);
			}
		};

		try {
			$o();
		} catch (err) {
			console.log(err);
		}
	},
};

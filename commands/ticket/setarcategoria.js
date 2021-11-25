const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Message, MessageCollector } = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'setarcategoria',
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
				message.channel.send(`Coloque o ID da categoria.`);
			} else {
				db.set(`CategoriaId_${message.guild.id}`, id);
				message.delete();
				message.channel.send(`O id da categoria setado é: ${id}`);
			}
		};

		try {
			$o();
		} catch (err) {
			console.log(err);
		}
	},
};

const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

module.exports = async (client, message, guild) => {
	console.log(
		`Logado ${client.user.username} \n Estou em ${client.guilds.cache.size} servidores com um total de ${client.users.cache.size} usuários.`,
	);

	client.user.setStatus(`online`);

	client.on('messageCreate', (message) => {
		if (message.content.includes(client.user.id)) {
			const prefix = db.fetch(`prefix_${message.guild.id}`);
			const embed = new MessageEmbed()
				.setColor('#ea11e6')
				.setDescription('Meu prefixo nesse servidor é `' + prefix + '`');
			message.delete();
			message.channel.send({ embeds: [embed] });
		}
	});
};

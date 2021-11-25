const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'say',
	aliases: ['falar'],

	async execute(client, message, args) {
		const $o = async () => {
			const cavalo = args.join(' ');

			if (!cavalo) {
				message.delete();
			}

			message.delete();
			message.channel.send(`${cavalo}`);
		};

		try {
			$o();
		} catch (err) {
			console.log(err);
		}
	},
};

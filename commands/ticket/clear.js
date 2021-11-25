module.exports = {
	name: 'clear',
	aliases: ['limpar'],

	async execute(client, message, args) {
		const $o = async () => {
			let messager = args[0];

			if (!messager) {
				message.delete();
			}

			message.channel.bulkDelete(messager);
			message.channel.send(`Deletei **${args[0]}** mensagens`);
		};

		try {
			$o();
		} catch (err) {
			console.log(err);
		}
	},
};

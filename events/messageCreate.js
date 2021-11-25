const db = require('quick.db');

module.exports = (client, message) => {
	if (message.channel.type === 'dm') {
		return;
	}

	var prefix = db.fetch(`prefix_${message.guild.id}`);
	if (prefix === null) {
		prefix = process.env.PREFIX;
	}

	if (!message.content.startsWith(prefix)) {
		return;
	}
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd =
		client.commands.get(command) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(command));

	if (cmd) cmd.execute(client, message, args);
};

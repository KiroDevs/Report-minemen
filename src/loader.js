const { readdirSync } = require('fs');
const { Collection } = require('discord.js');

client.commands = new Collection();

const events = readdirSync('./events/').filter((file) => file.endsWith('.js'));

console.log('Carregando Eventos');

for (const file of events) {
	let event = require(`../events/${file}`);
	console.log(`Carregando => ${file.split('.'[0])}`);
	client.on(file.split('.')[0], event.bind(null, client));
	delete require.cache[require.resolve(`../events/${file}`)];
}

console.log(`Carregando Comandos`);

readdirSync('./commands/').forEach((dirs) => {
	let commands = readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`../commands/${dirs}/${file}`);
		console.log(`Carregando => ${command.name.toLowerCase()}`);
		client.commands.set(command.name.toLowerCase(), command);
		delete require.cache[require.resolve(`../commands/${dirs}/${file}`)];
	}
});

console.log(`Comandos e Eventos carregados com sucesso`);

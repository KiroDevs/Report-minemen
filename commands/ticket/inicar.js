const db = require('quick.db');
module.exports = {
    name: 'iniciar',
    aliases: ['start'],

    async execute(client, message, args) {
        if (!message.guild.id) {
            return;
        }

        if (message.author.id !== '705969437370613762') {
            return;
        }

        const report = db.fetch(`IniciarReport_${message.guild.id}`);
        const como_reportar = db.fetch(`IniciarReportar_${message.guild.id}`);
        const verificar = db.fetch(`IniciarVerificar_${message.guild.id}`);

        const xane = message.guild.channels.cache.find((ch) => ch.id === report);
        const xan = message.guild.channels.cache.find((ch) => ch.id === como_reportar);
        const xa = message.guild.channels.cache.find((ch) => ch.id === verificar);

        xane.send(`-report`);
        xan.send(`-como-reportar`);
        xa.send('-verificar');
    },
};

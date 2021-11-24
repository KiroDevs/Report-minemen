const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'embed',
    aliases: [''],

    async execute(client, message, args) {
        const $o = async () => {
            const cavalo = args.join(' ');

            if (!cavalo) {
                message.delete();
            }

            let embed = new MessageEmbed().setColor('#ea11e6').setDescription(`${cavalo}`);

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

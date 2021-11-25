const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Message, MessageCollector } = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
const mss = require('pretty-ms');
module.exports = {
    name: 'verificar',
    aliases: [''],

    async execute(client, message, args) {
        async function $o() {
            if (!message.guild) {
                return;
            }

            const $embed1 = new MessageEmbed()
                .setTitle(`OLÁ! SEJA BEM-VINDO AO MINEMEN REPORTS!`)
                .setDescription(
                    `Este servidor é fechado para __pessoas selecionadas__ enviarem denúncias, portanto não é aberto para qualquer pessoa entrar e utilizar o nosso sistema.\n
                    Caso você tenha sido convidado por um staffer, clique em "Solicitar Verificação" e aguarde para liberarmos o servidor.`,
                )
                .setColor(`#ea11e6`);

            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('VERIFICAR').setStyle('PRIMARY').setLabel('☑️ Solicitar verificação'),
            );

            const yesno = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('SIM').setStyle('PRIMARY').setLabel('Aprovar'),
                new MessageButton().setCustomId('NAO').setStyle('PRIMARY').setLabel('Negar'),
            );

            const $veri = new MessageEmbed()
                .setTitle('A sua solicitação foi enviada!')
                .setColor('#ea11e6')
                .setDescription('Aguarde algum staffer analisar, aprovar e liberar o servidor.');

            const { guild } = message;
            const membros = client.users.cache.get('705969437370613762');

            message.channel.send({ embeds: [$embed1], components: [row] });

            const collector = message.channel.createMessageComponentCollector();

            await collector.on('collect', async (i) => {
                if (i.customId === 'VERIFICAR') {
                    const membro = guild.members.cache.get(i.user.id);
                    membro.send({ embeds: [$veri] }).catch(() => {
                        message.channel.send(`<@${i.user.id}> sua DM está trancada, por favor abra ela.`).then(() => {
                            setTimeout((msg) => {
                                msg.delete();
                            }, 1000 * 10);
                        });
                    });

                    const himane = db.fetch(`CanalVerificar_${message.guild.id}`);

                    const xane = message.guild.channels.cache.find((ch) => ch.id === himane);

                    function addZero(i) {
                        if (i < 10) {
                            i = '0' + i;
                        }
                        return i;
                    }
                    const d = new Date();
                    let h = addZero(d.getHours());
                    let m = addZero(d.getMinutes());
                    let s = addZero(d.getSeconds());
                    let time = h + ':' + m + ':' + s;

                    const $embed2 = new MessageEmbed()
                        .setTitle(`Solicitação de verificação`)
                        .setDescription(`> Usuário: <@${i.user.id}> \n > ID: ${i.user.id} \n > Data: Hoje ás ${time} `)
                        .setColor(`#ea11e6`);
                    await xane.send(`<@${membros.id}>`);
                    await xane.bulkDelete(1);
                    xane.send({ embeds: [$embed2], components: [yesno] });
                    const $collector = xane.createMessageComponentCollector();

                    const role = db.fetch(`CargoVerificado_${message.guild.id}`);
                    const cargo = message.guild.roles.cache.find((r) => r.id === role);

                    await $collector.on('collect', async (u) => {
                        if (u.customId === 'SIM') {
                            if (membro.roles.cache.has(cargo.id)) {
                                membro.send(`Você já esta verificado`).catch((err) => {
                                    console.log(err);
                                });
                            } else {
                                if (!cargo) {
                                    message.channel.send(
                                        `Crie um cargo com o nome de 'Verificado', antes de executar esse comando`,
                                    );
                                }
                                await membro.roles.add(cargo);
                                const $ver = new MessageEmbed()
                                    .setColor('#ea11e6')
                                    .setTitle('A sua solicitação foi aceita!')
                                    .setDescription('Agora você pode utilizar o nosso servidor normalmente.');
                                membro.send({ embeds: [$ver] }).catch((err) => {
                                    console.log(err);
                                });
                            }
                        }
                        if (u.customId === 'NAO') {
                            const membro = guild.members.cache.get(i.user.id);
                            await membro.send(`Você não foi verificado, será expulso`).catch((err) => {
                                console.log(err);
                            });
                            membro.kick();
                        }
                    });
                }
            });
        }
        try {
            $o();
        } catch (err) {
            console.log(err.message);
        }
    },
};

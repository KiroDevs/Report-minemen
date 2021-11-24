'use strict';
const {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    MessageCollector,
    MessageAttachment,
    Permissions,
    Collector,
} = require('discord.js');

const db = require('quick.db');

module.exports = {
    name: 'report',
    aliases: ['reportar'],

    async execute(client, message, args) {
        const $o = async () => {
            if (!message.guild) {
                return;
            }
            //embeds e buttons
            const report = new MessageEmbed().setColor('#ea11e6').setTitle(`SISTEMA DE REPORT`)
                .setDescription(`> Para iniciar sua denúncia, clique em "Reportar", e responda tudo que lhe for pedido.
                > 
                > Certifique que copiou o nome de usuário corretamente, e tenha um vídeo (de até 1 minuto) como prova.

                **Obs:** Se você ainda não configurou a ferramenta para clipar as suas partidas, verifique o canal <#910611892546977793>`);

            const report1 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`**Qual o nick da pessoa que quer denunciar? **`)
                .setFooter('Para cancelar a denúncia, clique no ✖️');

            const report2 = new MessageEmbed()
                .setColor('#ea11e6')
                .setDescription(`**Selecione sua opção de Denúncia**`)
                .setFooter('Para cancelar a denúncia, clique no ✖️');

            const report3 = new MessageEmbed()
                .setTitle(`**Envie um vídeo como prova**`)
                .setColor('#ea11e6')
                .setDescription(
                    `>  **Arquivo (de até 1m)**
                    > 1) Envie o vídeo no chat
                    > 2) Clique com o botão direito
                    > 3) Copie e envie o link no chat
> 
                    > **Vídeo no Youtube**
                    > 1) Upe o vídeo (não-listado)
                    > 2) Envie o link no chat`,
                )
                .setFooter(`Para cancelar a denúncia, clique no ✖️`);

            const report4 = new MessageEmbed()
                .setTitle(`**Envie um vídeo como prova**`)
                .setColor('#ea11e6')
                .setDescription(
                    `>  **Arquivo (de até 1m)**
                    > 1) Envie o vídeo no chat
                    > 2) Clique com o botão direito
                    > 3) Copie e envie o link no chat
> 
                    > **Vídeo no Youtube**
                    > 1) Upe o vídeo (não-listado)
                    > 2) Envie o link no chat`,
                )
                .setFooter(`Para cancelar a denúncia, clique no ✖️`);

            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('Inicio-report').setStyle('PRIMARY').setLabel('✉️ Reportar'),
            );

            const row1 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('HACK').setStyle('DANGER').setLabel('Uso de hacks'),
                new MessageButton().setCustomId('OUTRO').setStyle('PRIMARY').setLabel('Outro'),
                new MessageButton().setCustomId('apagar').setStyle('SECONDARY').setLabel('❌'),
            );

            const yesno = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('SIM').setStyle('PRIMARY').setLabel('Sim'),
                new MessageButton().setCustomId('NAO').setStyle('PRIMARY').setLabel('Não'),
            );

            const row3 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('apagar').setStyle('SECONDARY').setLabel('❌'),
            );

            const $embed = new MessageEmbed();

            //fim

            const collector = message.channel.createMessageComponentCollector();

            $embed.setColor('#ea11e6');

            message.channel.send({
                embeds: [report],
                components: [row],
            });

            //collector da criação de canal
            await collector.on('collect', async (i) => {
                if (i.customId === 'Inicio-report') {
                    //const de ticket nome e database dos cargos de verificado e de verificar se o canal ja está criado
                    const name = `ticket-` + i.user.id;
                    const cargo = message.guild.roles.cache.find((ch) => ch.name === '@everyone');
                    const cargoId = db.fetch(`CargoVerificado_${message.guild.id}`);
                    const cargove = message.guild.roles.cache.find((ch) => ch.id === cargoId);
                    if (message.guild.channels.cache.find((ch) => ch.name === name)) {
                        const { guild } = message;
                        const membro = guild.members.cache.get(i.user.id);
                        membro.send(`<@${i.user.id}>, Você já tem um ticket aberto`);
                        //fim
                    } else {
                        //criando canal e setando ele na categoria setada por database
                        await message.guild.channels
                            .create(`ticket-${i.user.id}`, {
                                type: 'GUILD_TEXT',
                            })
                            .then((chann) => {
                                const categoryId = db.fetch(`CategoriaId_${message.guild.id}`);
                                chann.permissionOverwrites.create(cargo.id, {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false,
                                });
                                chann.permissionOverwrites.create(i.user.id, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                    READ_MESSAGE_HISTORY: true,
                                    ATTACH_FILES: true,
                                });
                                chann.permissionOverwrites.create(cargove.id, {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false,
                                });

                                chann.setParent(categoryId);
                                //fim
                            });
                        //fim

                        //collectors
                        let chonel = message.guild.channels.cache.find((ch) => ch.name === name);

                        const $collector = chonel.createMessageCollector({});

                        const $colle = chonel.createMessageCollector({});

                        const $cha = chonel.createMessageComponentCollector({});

                        const $cho = chonel.createMessageComponentCollector({});

                        const { guild } = message;
                        const membro = guild.members.cache.get(i.user.id);
                        //fim

                        //base do codigo
                        await chonel.send({
                            content: `<@${i.user.id}>`,
                            embeds: [report1],
                            components: [row3],
                        });
                        //collector do botão de apagar o canal
                        $cho.on('collect', async (bed) => {
                            if (bed.customId === 'apagar') {
                                try {
                                    message.guild.channels.cache.find((ch) => ch.name === name).delete();
                                } catch (err) {
                                    console.log(err);
                                }
                            }
                        });
                        //fim

                        //collector do nome do usuario \ input do author do ticket
                        await $colle.on('collect', async (u) => {
                            const message1 = u.content;

                            if (message1) {
                                $colle.stop();
                                await chonel.bulkDelete(2);

                                chonel.send({
                                    embeds: [report2],
                                    components: [row1],
                                });
                            }
                            //fim
                            //collector dos botões e opções dentro da msg embed | hack ou outro
                            await $cha.on('collect', async (ma) => {
                                if (ma.customId === 'HACK') {
                                    await chonel.bulkDelete(1);
                                    await chonel.send({
                                        embeds: [report3],
                                        components: [row3],
                                    });
                                    //fim
                                    //collector do link
                                    $collector.on('collect', async (s) => {
                                        $cha.stop();

                                        if (s.content.startsWith('https:')) {
                                            $embed.setDescription(
                                                `> Motivo: Uso de Hacks \n > Prova: [clique aqui](${s.content}) para ver \n \n Solicitado por <@${i.user.id}>`,
                                            );

                                            chonel.bulkDelete(5);

                                            const awairepo = new MessageEmbed()
                                                .setTitle(`A SUA DENÚNCIA FOI ENVIADA!`)
                                                .setColor('#ea11e6')
                                                .setDescription(
                                                    `> Aguarde a revisão de algum Staffer. Caso sua denúncia seja aprovada, ela será redirecionada para o chonel banimentos`,
                                                )
                                                .setFooter(``);

                                            $embed.setTitle(`${u.content} foi reportado`);

                                            $embed.setColor('#ea11e6');

                                            chonel.send({
                                                embeds: [awairepo],
                                            });

                                            const himane = db.fetch(`CanalReport_${message.guild.id}`);

                                            const xanel = message.guild.channels.cache.find((cx) => cx.id == himane);

                                            await xanel.send({
                                                embeds: [$embed],
                                                components: [yesno],
                                            });

                                            const $banido = xanel.createMessageComponentCollector({});
                                            $collector.stop();

                                            await $banido.on('collect', async (porra) => {
                                                await $collector.stop();
                                                if (porra.customId === 'SIM') {
                                                    const himan = db.fetch(`CanalBanimentos_${message.guild.id}`);

                                                    const xane = message.guild.channels.cache.find(
                                                        (cx) => cx.id == himan,
                                                    );

                                                    const awairep1 = new MessageEmbed()
                                                        .setTitle(`A SUA DENÚNCIA FOI APROVADA!`)
                                                        .setDescription(
                                                            `

                                                        > Player: ${u.content}
                                                        > Motivo: Uso de Hacks
                                                        > Prova: [clique aqui](${s.content}) para ver

                                                        Denúncia aprovada por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');

                                                    const aproban = new MessageEmbed()
                                                        .setTitle(`${u.content} foi Banido`)
                                                        .setDescription(
                                                            `> Motivo: Uso de Hacks \n > Prova: [clique aqui](${s.content}) para ver \n \n Banido por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');

                                                    xane.send({
                                                        embeds: [aproban],
                                                    });
                                                    await chonel.bulkDelete(10);
                                                    await xanel.bulkDelete(1);
                                                    chonel.send({
                                                        embeds: [awairep1],
                                                        components: [row3],
                                                    });
                                                }
                                                if (porra.customId === 'NAO') {
                                                    await $collector.stop();
                                                    const awairep2 = new MessageEmbed()
                                                        .setTitle(`A SUA DENÚNCIA FOI REJEITADA`)
                                                        .setDescription(
                                                            `

                                                        > Player: ${u.content}
                                                        > Motivo: Uso de Hacks
                                                        > Prova: [clique aqui](${s.content}) para ver

                                                        Denúncia rejeitada por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');

                                                    await chonel.bulkDelete(10);
                                                    await xanel.bulkDelete(1);
                                                    await chonel.send({
                                                        embeds: [awairep2],
                                                        components: [row3],
                                                    });
                                                }
                                            });
                                        } else {
                                            const $eas = new MessageEmbed()
                                                .setTitle(`Erro`)
                                                .setColor('#ea11e6')
                                                .setDescription('Envie um link de arquivo ou de um vídeo no Youtube.');
                                            await chonel.bulkDelete(1);
                                            membro.send({
                                                embeds: [$eas],
                                            });
                                        }
                                    });
                                }
                                if (ma.customId === 'OUTRO') {
                                    await chonel.bulkDelete(1);
                                    await chonel.send({
                                        embeds: [report4],
                                        components: [row3],
                                    });

                                    $collector.on('collect', async (s) => {
                                        $cha.stop();

                                        if (s.content.startsWith('https:')) {
                                            chonel.bulkDelete(5);

                                            $collector.stop();

                                            const awairepo = new MessageEmbed()
                                                .setColor('#ea11e6')
                                                .setDescription(
                                                    `**<@${i.user.id}>,Seu report foi enviado, espere algum staff um aprovar**`,
                                                );

                                            $embed.setTitle(`${u.content} foi reportado`);
                                            $embed.setColor('#ea11e6');

                                            $embed.setDescription(
                                                `> Motivo: Outro \n > Prova: [clique aqui](${s.content}) para ver \n \n Solicitado por <@${i.user.id}>`,
                                            );

                                            chonel.send({
                                                embeds: [awairepo],
                                            });

                                            const himane = db.fetch(`CanalReport_${message.guild.id}`);

                                            const xanel = message.guild.channels.cache.find((cx) => cx.id == himane);

                                            await xanel.send({
                                                embeds: [$embed],
                                                components: [yesno],
                                            });
                                            $collector.stop();

                                            const $banido = xanel.createMessageComponentCollector({});

                                            await $banido.on('collect', async (porra) => {
                                                if (porra.customId === 'SIM') {
                                                    await $collector.stop();
                                                    const himan = db.fetch(`CanalBanimentos_${message.guild.id}`);

                                                    const xane = message.guild.channels.cache.find(
                                                        (cx) => cx.id == himan,
                                                    );
                                                    await chonel.bulkDelete(1);

                                                    const awairep1 = new MessageEmbed()
                                                        .setTitle(`A SUA DENÚNCIA FOI APROVADA!`)
                                                        .setDescription(
                                                            `

                                                        > Player: ${u.content}
                                                        > Motivo: Uso de Hacks
                                                        > Prova: [clique aqui](${s.content}) para ver

                                                        Denúncia aprovada por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');

                                                    const aproban = new MessageEmbed()
                                                        .setTitle(`${u.content} foi Banido`)
                                                        .setDescription(
                                                            `> Motivo: Outro \n > Prova: [clique aqui](${s.content}) para ver \n \n Banido por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');

                                                    xane.send({
                                                        embeds: [aproban],
                                                    });
                                                    await chonel.bulkDelete(10);
                                                    await xanel.bulkDelete(1);
                                                    chonel.send({
                                                        embeds: [awairep1],
                                                        components: [row3],
                                                    });
                                                }
                                                if (porra.customId === 'NAO') {
                                                    await $collector.stop();
                                                    const awairep2 = new MessageEmbed()
                                                        .setTitle(`A SUA DENÚNCIA FOI REJEITADA!`)
                                                        .setDescription(
                                                            `

                                                        > Player: ${u.content}
                                                        > Motivo: Uso de Hacks
                                                        > Prova: [clique aqui](${s.content}) para ver

                                                        Denúncia rejeitada por <@${porra.user.id}>`,
                                                        )
                                                        .setColor('#ea11e6');
                                                    await chonel.bulkDelete(10);
                                                    await xanel.bulkDelete(1);
                                                    await chonel.send({
                                                        embeds: [awairep2],
                                                        components: [row3],
                                                    });
                                                }
                                            });
                                        } else {
                                            const $eas = new MessageEmbed()
                                                .setTitle(`Erro`)
                                                .setColor('#ea11e6')
                                                .setDescription('Envie um link de arquivo ou de um vídeo no Youtube.');
                                            await chonel.bulkDelete(1);
                                            membro.send({
                                                embeds: [$eas],
                                            });
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
            });
            //fim
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};

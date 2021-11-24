const { MessageEmbed, MessageActionRow, MessageButton, Permissions, Message, MessageCollector } = require('discord.js');
const db = require('quick.db');
module.exports = {
    name: 'como-reportar',
    aliases: [''],

    async execute(client, message, args) {
        const $o = async () => {
            if (!message.guild) {
                return;
            }

            const embed = new MessageEmbed().setColor('#ea11e6').setTitle(`GUIA SIMPLES DE COMO UTILIZAR NOSSO SISTEMA`)
                .setDescription(`
                > Para enviar uma denúncia, acesse <#910583866102792253>
                > 
                > O Windows possui uma ferramenta para clipar, dos 30 segundos, até os 10 últimos minutos da sua última janela.
                > 
                > Para receber instruções de como configurar essa ferramenta, clique em "Receber Instruções".

                **Obs:** não é preciso de nenhum programa externo, como o OBS, ou softwares de placa de vídeo.`);

            const $embed = new MessageEmbed().setColor('#ea11e6').setTitle(`**CONFIGURANDO O XBOX GAME BAR**`)
                .setDescription(`> 1) Acesse as configurações
                    > 2) Clique em "Jogos"
                    > 3) Selecione uma bind para o "Gravar isso"
                    > 4) Em "capturas", configure de acordo com seu gosto
                    > 
                    > **Configurações recomendadas:**
                    > 
                    > - Gravar o último "1 minuto"
                    > - Volume do microfone: 0%
                    > - Taxa de quadros: 60
                    > - Qualidade do vídeo: padrão

                    **Obs:** você não pode dar "alt-tab" durante a sua partida, porque isso cancelará o processo que estará gravando em segundo plano. Toda vez que trocar de aba, ele reinicia. Então, ao ir duel com alguém suspeito, aperte a bind configurada, e aí sim troque de aba.`);

            const $button = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('COMOR').setStyle('PRIMARY').setLabel('📋 Receber Instruções'),
            );
            const collector = message.channel.createMessageComponentCollector();
            const { guild } = message;
            message.channel.send({ embeds: [embed], components: [$button] });

            await collector.on('collect', (i) => {
                if (i.customId === 'COMOR') {
                    const membro = guild.members.cache.get(i.user.id);
                    membro.send({ embeds: [$embed] }).catch((err) => {
                        console.log(err);
                    });
                }
            });
        };
        try {
            $o();
        } catch (err) {
            console.log(err);
        }
    },
};

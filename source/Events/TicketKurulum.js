const {Permissions, MessageEmbed, MessageActionRow, MessageSelectMenu}=require('discord.js')
const { kategori, yetkilirole } = require("../Configurations/Server_Settings.js");

module.exports = async (interaction) => {
    if (!interaction.isSelectMenu()) return;
        
	const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                    .setCustomId('del')
                    .setPlaceholder('Bileti silmek için tıkla!')
					.addOptions([
						{
							label: 'Bileti Sil',
							description: 'Açılan bileti silersiniz.',
							value: 'delete',
						}
					])
                );
                
        let categorie = kategori
        let roleStaff = interaction.guild.roles.cache.get(yetkilirole)

        let DejaUnChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id)
        
        if(interaction.customId === "del") {
            if (interaction.values[0] == "delete") {
                const channel = interaction.channel
                channel.delete();
              
            }
        }

        if (interaction.customId == "select") {
            if (DejaUnChannel) return interaction.reply({content: 'Sunucuda zaten açık bir biletin var.', ephemeral: true})
            if (interaction.values[0] == "yetkilialım") {
                interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${categorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const yetkilialım = new MessageEmbed()
                    .setTitle('Yetkili Alım Başvurusu')
                    .setDescription('Yetkililerimiz kısa süre içinde sizinle ilgilenecektir. Lütfen bekleyiniz.')
                    .setFooter('Chewy Ticket')
                    c.send({embeds: [yetkilialım], content: `${roleStaff}, ${interaction.user} kullanıcısı sizi bekliyor...`, components: [row]})
                    interaction.reply({content: `Biletin başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
                
            } else if (interaction.values[0] == "öneriistekşikayet") {
                interaction.guild.channels.create(`${interaction.user.username}-ticket`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${categorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const öneriistekşikayet = new MessageEmbed()
                    .setTitle('Öneri, İstek ve Şikayet Bileti')
                    .setDescription('Yetkililerimiz kısa süre içinde sizinle ilgilenecektir. Lütfen bekleyiniz.')
                    .setFooter('Chewy Ticket')
                    c.send({embeds: [öneriistekşikayet], content: `${roleStaff}, ${interaction.user} kullanıcısı sizi bekliyor...`, components: [row]})
                    interaction.reply({content: `Biletin başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
            } else if (interaction.values[0] == "destek") {
                interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
                    type: 'GUILD_TEXT',
                    topic: `${interaction.user.id}`,
                    parent: `${categorie}`,
                    permissionOverwrites: [
                        {   
                            id: interaction.guild.id,
                            deny: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: interaction.user.id,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        },
                        {
                            id: roleStaff,
                            allow: [Permissions.FLAGS.VIEW_CHANNEL]
                        }
                    ]
                }).then((c)=>{
                    const destek = new MessageEmbed()
                    .setTitle('Destek Bileti')
                    .setDescription('Yetkililerimiz kısa süre içinde sizinle ilgilenecektir. Lütfen bekleyiniz.')
                    .setFooter('Chewy Ticket')
                    c.send({embeds: [destek], content: `${roleStaff}, ${interaction.user} kullanıcısı sizi bekliyor...`, components: [row]})
                    interaction.reply({content: `Biletin başarıyla açıldı. <#${c.id}>`, ephemeral: true})
                })
            }
        }
    }

module.exports.config = {
    name: "interactionCreate"
};

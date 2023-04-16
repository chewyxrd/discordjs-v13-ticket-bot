const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		aliases: ["çıkar"],
		name: "çıkar",
        help: "çıkar <kullanıcı>",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

		const chewy = await client.users.fetch("920723217956634715");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply({content: `Belirttiğin kullanıcıyı sunucuda bulamıyorum!`})

        if (member.permissionsIn(message.channel).has("VIEW_CHANNEL") === true) {
            message.channel.permissionOverwrites.edit(member, {VIEW_CHANNEL: false, SEND_MESSAGES: false, ATTACH_FILES: false})
            message.reply({content: `${member} adlı kişi talepten çıkartıldı!`})
            } else {
            message.reply({content: `:x: ${member} adlı kişi bu talepten zaten çıkartılmış!`}) 
            }
                },
            };

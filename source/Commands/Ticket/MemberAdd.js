const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		aliases: ["ekle"],
		name: "ekle",
        help: "ekle <kullanıcı>",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

		const chewy = await client.users.fetch("920723217956634715");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!member) return message.reply({content: `Belirttiğin kullanıcıyı sunucuda bulamıyorum!`})

if (member.permissionsIn(message.channel).has("VIEW_CHANNEL") === false) {
message.channel.permissionOverwrites.edit(member, {VIEW_CHANNEL: true, SEND_MESSAGES: true, ATTACH_FILES: true})
message.reply({content: `${member} adlı kişi talebe eklendi!`})
} else {
message.reply({content: `:x: ${member} adlı kişi bu talebe zaten eklenmiş!`}) 
}
    },
};

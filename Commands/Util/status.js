const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder, UserFlags, version } = require('discord.js');
const { connection } = require('mongoose');
const { logHandler } = require('../../Handlers/logHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("status")
		.setDescription("Displays the status of the bot."),
	/**
	 * 
	 * @param {CommandInteraction} interaction 
	 * @param {Client} client 
	 * @returns 
	 */
	async execute(interaction, client) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		await interaction.deferReply();
		try {
			const status = ["Disconnected", "Connected", "Connecting", "Disconnecting"];

			await client.user.fetch();
			await client.application.fetch();

			const embed = new EmbedBuilder()
				.setTitle(`🤖 ${client.user.username} Status`)
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
				.setDescription(client.application.description || null)
				.addFields(
					{ name: "👩🏻‍🔧 Client", value: client.user.tag, inline: true },
					{ name: "📆 Created", value: `<t:${parseInt(client.user.createdTimestamp / 1000)}:R>`, inline: true },
					{ name: "☑ Verified", value: client.user.flags & UserFlags.VerifiedBot ? "Yes" : "No", inline: true },
					{ name: "👩🏻‍💻 Owner", value: `${client.application.owner.tag || "None"}`, inline: true },
					{ name: "📚 Database", value: status[connection.readyState], inline: true },
					{ name: "⏰ Up Since", value: `<t:${parseInt(client.readyTimestamp / 1000)}:R>`, inline: true },
					{ name: "💾 CPU Usage", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}%`, inline: true },
					{ name: "🛠 Discord.js", value: version, inline: true },
					{ name: "🏓 Ping", value: `${client.ws.ping}ms`, inline: true },
					{ name: "🤹🏻‍♀️ Commands", value: `${client.commands.size}`, inline: true },
					{ name: "🌍 Servers", value: `${client.guilds.cache.size}`, inline: true },
					{ name: "👨‍👩‍👧‍👦 Users", value: `${client.users.cache.size}`, inline: true },
				);

			logHandler("2", interaction.user.tag, interaction.commandName);
			return interaction.followUp({ embeds: [embed] });
		} catch (error) {
			logHandler("4", interaction.user.tag, interaction.commandName, error);
			return interaction.followUp({ content: "⛔ | Something went wrong...", ephemeral: true })
		}
	}
}
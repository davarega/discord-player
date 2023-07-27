const { EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const { useQueue, useTimeline } = require('discord-player');
const { logHandler } = require("../../Handlers/logHandler");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("See information about music playig now."),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		logHandler("1", interaction.user.tag, interaction.commandName);

		await interaction.deferReply();
		const { guild, user } = interaction;

		const queue = useQueue(guild.id);
		const timeline = useTimeline(guild.id);

		if (!queue) {
			logHandler("4", interaction.user.tag, interaction.commandName, "bot not in voice channel");
			return interaction.followUp({ content: `❌ | I am **not** in a voice channel`, ephemeral: true });
		};
		
		if (!queue.currentTrack) {
			logHandler("4", interaction.user.tag, interaction.commandName, "no music playing now");
			return interaction.followUp({ content: "❌ | There is no track **currently** playing", ephemeral: true });
		};

		const track = queue.currentTrack;

		const embed = new EmbedBuilder()
			.setAuthor({ name: "Now playing...", iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
			.setTitle(`${track.title || 'Unknown Title'}`)
			.setURL(`${track.url}`)
			.setThumbnail(track.thumbnail ?? user.displayAvatarURL())
			.addFields([
				{ name: 'Author', value: track.author, inline: true },
				{ name: `Requester by:`, value: `<@${user.id}>`, inline: true },
				{ name: 'volume', value: `\`${queue.node.volume}%\``, inline: true },
				{ name: 'filter', value: `\`None\``, inline: false },
				{ name: 'Extractor', value: `\`${track.extractor?.identifier || 'N/A'}\``, inline: false },
				{ name: 'Progress', value: `${queue.node.createProgressBar()} (${timeline.timestamp?.progress}%)`, inline: false },
			]);

			logHandler("6", interaction.user.tag, "", track.title);
		return interaction.followUp({ embeds: [embed] });
	}
}
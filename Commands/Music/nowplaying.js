const { EmbedBuilder, ChatInputCommandInteraction, SlashCommandBuilder } = require("discord.js");
const { useQueue, useTimeline } = require('discord-player')

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("See information about music playig now."),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		console.log(`[Log] ${interaction.user.tag} is trying to use the ${interaction.commandName} command`);

		await interaction.deferReply();
		const { guild, user } = interaction;

		const queue = useQueue(guild.id);
		const timeline = useTimeline(guild.id);

		if (!queue)
			return interaction.followUp({ content: `❌ | I am **not** in a voice channel`, ephemeral: true });
		if (!queue.currentTrack)
			return interaction.followUp({ content: "❌ | There is no track **currently** playing", ephemeral: true });

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

		return interaction.followUp({ embeds: [embed] });
	}
}
const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "playerStart",
	/**
	 * 
	 * @param {*} client 
	 * @param {*} queue 
	 * @param {*} track 
	 * @param {CommandInteraction} interaction 
	 * @returns 
	 */
	execute(client, queue, track) {

		if (!track.requestedBy) track.requestedBy = client.user;

		const embed = new EmbedBuilder()
			.setAuthor({ name: "Starting playing...", iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
			.setTitle(`${track.title || 'Unknown Title'}`)
			.setURL(`${track.url}`)
			.addFields(
				{ name: `Requester by:`, value: `${queue.requestedBy}`, inline: true },
				{ name: "Duration", value: `${track.duration}`, inline: false },
				{ name: 'volume', value: `\`${queue.node.volume}%\``, inline: false },
				{ name: `Current Duration: \`[0:00 / ${track.duration}]\``, value: `\`\`\`🔴 | 🎶──────────────────────────────────\`\`\``, inline: false }
			)
			.setThumbnail(`${track.thumbnail}`)
			.setFooter({
				text: `Played by: ${track.requestedBy.tag}`,
				iconURL: `${track.requestedBy.displayAvatarURL({ dynamic: true })}`,
			});

		return queue.metadata.send({ embeds: [embed] });
	},
};